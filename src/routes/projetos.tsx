import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-conexao.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaFinal } from "@/components/site/CtaFinal";

export const Route = createFileRoute("/projetos")({
  head: () => ({
    meta: [
      { title: "Projetos — REDE CONECTA" },
      { name: "description", content: "Conheça os projetos de legado, propósito e transformação comunitária da REDE CONECTA." },
      { property: "og:title", content: "Projetos — REDE CONECTA" },
      { property: "og:description", content: "Iniciativas que conectam pessoas, organizações e comunidades." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/projetos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/projetos" }],
  }),
  component: ProjetosPage,
});

const projetos = [
  { titulo: "REDE Legado", texto: "Uma jornada para líderes e famílias que desejam construir uma influência saudável e duradoura nas próximas gerações." },
  { titulo: "REDE Propósito", texto: "Experiências de descoberta de talentos, identidade e projeto de vida para jovens e adultos em transição." },
  { titulo: "REDE Reino", texto: "Mobilização de igrejas e lideranças para servir pessoas e comunidades com excelência, compaixão e unidade." },
  { titulo: "Rede que Sustenta Vidas", texto: "Ações de saúde emocional, escuta e prevenção para formar comunidades onde pedir ajuda é possível." },
];

function ProjetosPage() {
  return (
    <>
      <PageHero eyebrow="Projetos" title="Transformação que se torna movimento." text="Projetos especiais ampliam o alcance da REDE e conectam pessoas, igrejas, empresas e comunidades em torno de necessidades reais." image={heroImg} imageAlt="Grupo de pessoas conectado em círculo" />
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-7 md:grid-cols-2">
          {projetos.map((projeto, index) => (
            <Reveal key={projeto.titulo} delay={(index % 2) * 80}>
              <article className="card-rede h-full p-9">
                <p className="font-display text-2xl text-gold">0{index + 1}</p>
                <h2 className="mt-4 text-3xl">{projeto.titulo}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{projeto.texto}</p>
                <Link to="/contato" search={{ interesse: projeto.titulo }} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-navy-soft">Conversar sobre este projeto <ArrowRight className="size-4" /></Link>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaFinal titulo="Quer construir um projeto conosco?" texto="Conte a sua ideia ou necessidade. A REDE pode ajudar a transformar intenção em caminho." />
    </>
  );
}