import { createFileRoute } from "@tanstack/react-router";
import { Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { useState, type FormEvent } from "react";
import { PageHero } from "@/components/site/PageHero";
import { INSTAGRAM, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/data/rede";

type ContactSearch = { interesse?: string };

export const Route = createFileRoute("/contato")({
  validateSearch: (search: Record<string, unknown>): ContactSearch => ({
    interesse: typeof search.interesse === "string" ? search.interesse : undefined,
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
  const [sent, setSent] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const mensagem = [
      "Olá! Gostaria de enviar uma solicitação para a REDE.",
      `Nome: ${data.get("nome")}`,
      `WhatsApp: ${data.get("whatsapp")}`,
      `E-mail: ${data.get("email")}`,
      `Organização: ${data.get("organizacao") || "Não informada"}`,
      `Tipo de evento: ${data.get("evento")}`,
      `Interesse: ${data.get("interesse")}`,
      `Mensagem: ${data.get("mensagem")}`,
    ].join("\n");
    setSent(true);
    window.open(whatsappLink(mensagem), "_blank", "noopener,noreferrer");
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
            <div className="card-rede flex items-center gap-4 p-5"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gold/15"><Mail className="size-5 text-gold" /></span><span><span className="block text-xs text-muted-foreground">Atendimento</span><strong>Via formulário ou WhatsApp</strong></span></div>
          </div>
        </aside>

        <form onSubmit={submit} className="rounded-3xl border border-border bg-secondary p-6 sm:p-10">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-semibold">Nome *<input name="nome" required autoComplete="name" className={inputClass} /></label>
            <label className="text-sm font-semibold">WhatsApp *<input name="whatsapp" required inputMode="tel" autoComplete="tel" className={inputClass} /></label>
            <label className="text-sm font-semibold">E-mail *<input name="email" type="email" required autoComplete="email" className={inputClass} /></label>
            <label className="text-sm font-semibold">Organização<input name="organizacao" autoComplete="organization" className={inputClass} /></label>
            <label className="text-sm font-semibold">Tipo de evento *
              <select name="evento" required defaultValue="" className={inputClass}><option value="" disabled>Selecione</option><option>Palestra</option><option>Treinamento</option><option>Imersão</option><option>Mentoria</option><option>Projeto personalizado</option></select>
            </label>
            <label className="text-sm font-semibold">Interesse *<input name="interesse" required defaultValue={interesse ?? ""} placeholder="Tema ou frente desejada" className={inputClass} /></label>
          </div>
          <label className="mt-5 block text-sm font-semibold">Mensagem *<textarea name="mensagem" required rows={6} className="mt-2 w-full rounded-xl border border-input bg-background p-4 text-sm outline-none transition-colors focus:border-gold" /></label>
          <button type="submit" className="btn-base btn-gold mt-7"><MessageCircle className="size-4" /> Enviar solicitação</button>
          {sent ? <p role="status" className="mt-4 text-sm text-muted-foreground">Sua mensagem foi preparada no WhatsApp. Basta revisar e enviar.</p> : null}
        </form>
      </section>
    </>
  );
}