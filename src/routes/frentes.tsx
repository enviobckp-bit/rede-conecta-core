import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaFinal } from "@/components/site/CtaFinal";
import { frentes } from "@/data/rede";

export const Route = createFileRoute("/frentes")({
  head: () => ({
    meta: [
      { title: "Nossas Frentes — REDE CONECTA" },
      { name: "description", content: "Conheça as sete frentes da REDE para família, jovens, liderança, saúde emocional, propósito e comunidade." },
      { property: "og:title", content: "Nossas Frentes — REDE CONECTA" },
      { property: "og:description", content: "Sete caminhos de acolhimento, desenvolvimento e transformação." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/frentes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/frentes" }],
  }),
  component: FrentesPage,
});

function FrentesPage() {
  return (
    <>
      <PageHero eyebrow="Nossas frentes" title="Sete caminhos, uma só rede." text="Cada frente responde a uma dimensão da vida. Juntas, elas formam uma jornada integrada de cuidado, crescimento e transformação." />
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-7 md:grid-cols-2">
          {frentes.map((frente, index) => (
            <Reveal key={frente.slug} delay={(index % 2) * 80}>
              <article id={frente.slug} className="card-rede scroll-mt-28 p-8 sm:p-10">
                <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">Frente {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-3xl">{frente.nome}</h2>
                <p className="mt-2 font-semibold text-navy-soft">{frente.resumo}</p>
                <p className="mt-5 leading-relaxed text-muted-foreground">{frente.descricao}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {frente.itens.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm"><Check className="mt-0.5 size-4 shrink-0 text-gold" />{item}</li>
                  ))}
                </ul>
                <Link to="/contato" search={{ interesse: frente.nome }} className="btn-base btn-outline-navy mt-8">Quero saber mais</Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaFinal />
    </>
  );
}