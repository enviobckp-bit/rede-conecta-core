import { createFileRoute } from "@tanstack/react-router";
import { Instagram, LoaderCircle, Mail, Send, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { PageHero } from "@/components/site/PageHero";
import { INSTAGRAM, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/data/rede";

const contactSchema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome.").max(100),
  whatsapp: z.string().trim().min(8, "Informe um WhatsApp válido.").max(30),
  email: z.string().trim().email("Informe um e-mail válido.").max(255),
  organizacao: z.string().trim().max(150).optional().default(""),
  evento: z.enum(["Palestra", "Treinamento", "Imersão", "Mentoria", "Projeto personalizado"]),
  interesse: z.string().trim().min(2, "Informe seu interesse.").max(150),
  mensagem: z.string().trim().min(10, "Escreva uma mensagem com pelo menos 10 caracteres.").max(2000),
  website: z.string().max(0).optional().default(""),
});

const requestTimes = new Map<string, number[]>();

type ContactSearch = { interesse?: string | undefined };

export const Route = createFileRoute("/contato")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
        const clientKey = forwarded || "unknown";
        const now = Date.now();
        const recent = (requestTimes.get(clientKey) ?? []).filter((time) => now - time < 10 * 60 * 1000);
        if (recent.length >= 5) {
          return Response.json({ error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." }, { status: 429 });
        }
        requestTimes.set(clientKey, [...recent, now]);

        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ error: "Dados inválidos." }, { status: 400 });
        }
        const parsed = contactSchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.issues[0]?.message ?? "Revise os campos informados." }, { status: 400 });
        }
        if (parsed.data.website) {
          return Response.json({ ok: true });
        }

        const submissionId = crypto.randomUUID();
        try {
          const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
          const templateData = {
            name: parsed.data.nome,
            whatsapp: parsed.data.whatsapp,
            email: parsed.data.email,
            organization: parsed.data.organizacao || "Não informada",
            eventType: parsed.data.evento,
            interest: parsed.data.interesse,
            message: parsed.data.mensagem,
          };
          const teamResult = await sendTemplateEmail("contact-request", "", {
            templateData,
            idempotencyKey: `contact-request-${submissionId}`,
            replyTo: parsed.data.email,
          });
          if (!teamResult.sent) {
            return Response.json({ error: "Não foi possível entregar sua mensagem. Tente novamente mais tarde." }, { status: 503 });
          }
          await sendTemplateEmail("contact-confirmation", parsed.data.email, {
            templateData: { name: parsed.data.nome, interest: parsed.data.interesse },
            idempotencyKey: `contact-confirmation-${submissionId}`,
          });
          return Response.json({ ok: true });
        } catch (error) {
          console.error("Contact email failed", error instanceof Error ? error.message : "Unknown error");
          return Response.json({ error: "Não foi possível enviar agora. Tente novamente mais tarde." }, { status: 503 });
        }
      },
    },
  },
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    interesse: typeof search["interesse"] === "string" ? search["interesse"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Contato — REDE CONECTA" },
      { name: "description", content: "Fale com Jesiel Ribeiro e leve palestras, treinamentos e projetos da REDE para sua igreja ou empresa." },
      { property: "og:title", content: "Contato — REDE CONECTA" },
      { property: "og:description", content: "Vamos conversar sobre o próximo passo para sua igreja, empresa ou comunidade." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contato" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  const { interesse } = Route.useSearch();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setStatus("error");
      setFeedback(parsed.error.issues[0]?.message ?? "Revise os campos informados.");
      return;
    }
    setStatus("sending");
    setFeedback("");
    try {
      const response = await fetch("/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = await response.json() as { ok?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error || "Não foi possível enviar sua mensagem.");
      setStatus("sent");
      setFeedback("Recebemos sua solicitação. Enviamos uma confirmação para o seu e-mail.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(error instanceof Error ? error.message : "Não foi possível enviar sua mensagem.");
    }
  }

  const inputClass = "mt-2 h-12 w-full rounded-xl border border-input bg-background px-4 text-sm outline-none transition-colors focus:border-gold";

  return (
    <>
      <PageHero eyebrow="Contato" title="Vamos começar uma conversa." text="Conte o momento da sua igreja, empresa ou comunidade. Responderemos com atenção para construir a melhor proposta." />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 lg:grid-cols-[0.72fr_1.28fr] lg:px-8">
        <aside>
          <p className="eyebrow">Contato direto</p>
          <h2 className="mt-5 text-4xl">Jesiel Ribeiro</h2>
          <p className="mt-2 text-sm font-semibold tracking-[0.15em] text-muted-foreground uppercase">Pastor · Terapeuta Familiar · Palestrante</p>
          <div className="mt-9 space-y-4">
            <a href={whatsappLink("Olá! Gostaria de conversar sobre a REDE.")} target="_blank" rel="noreferrer" className="card-rede flex items-center gap-4 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/15"><Phone className="size-5 text-gold" /></span><span><span className="block text-xs text-muted-foreground">Telefone e WhatsApp</span><strong>{WHATSAPP_DISPLAY}</strong></span></a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="card-rede flex items-center gap-4 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/15"><Instagram className="size-5 text-gold" /></span><span><span className="block text-xs text-muted-foreground">Instagram</span><strong>{INSTAGRAM}</strong></span></a>
            <div className="card-rede flex items-center gap-4 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/15"><Mail className="size-5 text-gold" /></span><span><span className="block text-xs text-muted-foreground">E-mail</span><strong>contato@gruporedeconecta.com.br</strong></span></div>
          </div>
        </aside>

        <form onSubmit={submit} className="rounded-3xl border border-border bg-secondary p-6 sm:p-10">
          <label className="sr-only" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Nome *<input name="nome" required minLength={2} maxLength={100} autoComplete="name" className={inputClass} /></label>
            <label className="text-sm font-semibold">WhatsApp *<input name="whatsapp" required minLength={8} maxLength={30} inputMode="tel" autoComplete="tel" className={inputClass} /></label>
            <label className="text-sm font-semibold">E-mail *<input name="email" type="email" required maxLength={255} autoComplete="email" className={inputClass} /></label>
            <label className="text-sm font-semibold">Organização<input name="organizacao" maxLength={150} autoComplete="organization" className={inputClass} /></label>
            <label className="text-sm font-semibold">Tipo de evento *
              <select name="evento" required defaultValue="" className={inputClass}><option value="" disabled>Selecione</option><option>Palestra</option><option>Treinamento</option><option>Imersão</option><option>Mentoria</option><option>Projeto personalizado</option></select>
            </label>
            <label className="text-sm font-semibold">Interesse *<input name="interesse" required minLength={2} maxLength={150} defaultValue={interesse ?? ""} placeholder="Tema ou frente desejada" className={inputClass} /></label>
          </div>
          <label className="mt-5 block text-sm font-semibold">Mensagem *<textarea name="mensagem" required minLength={10} maxLength={2000} rows={6} className="mt-2 w-full rounded-xl border border-input bg-background p-4 text-sm outline-none transition-colors focus:border-gold" /></label>
          <button type="submit" disabled={status === "sending"} className="btn-base btn-gold mt-7 disabled:cursor-not-allowed disabled:opacity-60">
            {status === "sending" ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
            {status === "sending" ? "Enviando..." : "Enviar solicitação"}
          </button>
          {feedback ? <p role="status" className={`mt-4 text-sm ${status === "error" ? "text-destructive" : "text-muted-foreground"}`}>{feedback}</p> : null}
        </form>
      </section>
    </>
  );
}