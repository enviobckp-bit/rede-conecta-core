import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import empresasImg from "@/assets/empresas.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaFinal } from "@/components/site/CtaFinal";

export const Route = createFileRoute("/empresas")({
  head: () => ({
    meta: [
      { title: "Para Empresas — REDE CONECTA" },
      { name: "description", content: "Palestras e treinamentos sobre liderança, inteligência emocional, propósito e cultura para empresas e equipes." },
      { property: "og:title", content: "Para Empresas — REDE CONECTA" },
      { property: "og:description", content: "Pessoas transformadas constroem organizações mais fortes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/empresas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/empresas" }],
  }),
  component: EmpresasPage,
});

const temasEmpresa = ["Liderança", "Desenvolvimento humano", "Propósito", "Inteligência emocional", "Relacionamentos", "Formação de líderes", "Cultura organizacional"];

function EmpresasPage() {
  return (
    <>
      <PageHero eyebrow="Para empresas" title="Pessoas transformadas constroem organizações mais fortes." text="Desenvolvemos líderes e equipes mais conscientes, emocionalmente saudáveis e preparados para construir culturas que cuidam de pessoas e entregam resultados." image={empresasImg} imageAlt="Equipe profissional colaborando" >
        <Link to="/contato" search={{ interesse: "Proposta corporativa" }} className="btn-base btn-gold">Solicitar proposta corporativa</Link>
      </PageHero>
      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <Reveal>
          <p className="eyebrow">Desenvolvimento que permanece</p>
          <h2 className="mt-5 text-4xl sm:text-5xl">Da palestra à mudança de cultura.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">Cada proposta parte de uma escuta cuidadosa. Entendemos o cenário, o público e os desafios para entregar uma experiência relevante, prática e alinhada à realidade da organização.</p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2">
          {temasEmpresa.map((tema, index) => (
            <Reveal key={tema} delay={(index % 2) * 70}>
              <div className="card-rede flex items-center gap-4 p-6"><Check className="size-5 shrink-0 text-gold" /><span className="font-semibold">{tema}</span></div>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaFinal titulo="Vamos fortalecer sua organização?" texto="Receba uma proposta pensada para os desafios e objetivos da sua equipe." />
    </>
  );
}