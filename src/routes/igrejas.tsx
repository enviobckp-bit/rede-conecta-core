import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import igrejasImg from "@/assets/igrejas.jpg";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaFinal } from "@/components/site/CtaFinal";

export const Route = createFileRoute("/igrejas")({
  head: () => ({
    meta: [
      { title: "Para Igrejas — REDE CONECTA" },
      { name: "description", content: "Palestras, treinamentos, imersões e mentorias para fortalecer pessoas, líderes, famílias e ministérios." },
      { property: "og:title", content: "Para Igrejas — REDE CONECTA" },
      { property: "og:description", content: "Fortalecendo pessoas para fortalecer a Igreja." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/igrejas" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/igrejas" }],
  }),
  component: IgrejasPage,
});

const formatos = [
  ["Palestras", "Encontros objetivos e inspiradores para casais, jovens, líderes e toda a comunidade."],
  ["Treinamentos", "Formação prática para pastores, líderes, obreiros e equipes de ministério."],
  ["Imersões", "Experiências intensivas para aprofundar temas e promover mudanças consistentes."],
  ["Mentorias", "Acompanhamento próximo para líderes, casais e equipes que desejam avançar."],
  ["Conteúdo personalizado", "Uma proposta construída de acordo com o momento e as necessidades da igreja."],
];

function IgrejasPage() {
  return (
    <>
      <PageHero eyebrow="Para igrejas" title="Fortalecendo pessoas para fortalecer a Igreja." text="Cuidamos de quem cuida, desenvolvemos quem lidera e caminhamos com famílias, jovens e equipes em direção a uma vida mais saudável e significativa." image={igrejasImg} imageAlt="Pessoas em um encontro de comunidade" >
        <Link to="/contato" search={{ interesse: "Levar a REDE para minha igreja" }} className="btn-base btn-gold">Leve a REDE para sua igreja</Link>
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <p className="eyebrow">Como podemos servir</p>
          <h2 className="mt-5 max-w-3xl text-4xl sm:text-5xl">Conteúdo profundo, linguagem acessível e cuidado genuíno.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {formatos.map(([titulo, texto], index) => (
            <Reveal key={titulo} delay={(index % 3) * 70}>
              <article className="card-rede h-full p-8">
                <Check className="size-6 text-gold" />
                <h3 className="mt-5 text-2xl">{titulo}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{texto}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <CtaFinal titulo="Sua igreja não precisa caminhar sozinha." texto="Conte o que sua comunidade está vivendo. Vamos construir juntos o encontro certo." />
    </>
  );
}