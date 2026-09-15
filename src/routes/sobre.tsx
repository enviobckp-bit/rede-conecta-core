import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import jesielAsset from "@/assets/jesiel.jpg.asset.json";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { CtaFinal } from "@/components/site/CtaFinal";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a REDE e Jesiel Ribeiro — REDE CONECTA" },
      { name: "description", content: "Conheça a história, o propósito e a liderança da REDE CONECTA, com Jesiel Ribeiro." },
      { property: "og:title", content: "Sobre a REDE e Jesiel Ribeiro — REDE CONECTA" },
      { property: "og:description", content: "Uma rede criada para acolher, desenvolver e conectar pessoas ao que transforma vidas." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sobre" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

const dimensoes = [
  { nome: "REDE Legado", texto: "Formar pessoas que deixam marcas saudáveis em suas famílias, equipes e comunidades." },
  { nome: "REDE Propósito", texto: "Ajudar cada pessoa a reconhecer seus talentos e construir uma vida com sentido e direção." },
  { nome: "REDE Reino", texto: "Servir pessoas com valores cristãos, cuidado genuíno e compromisso com a transformação integral." },
];

function SobrePage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre a REDE"
        title="Conectar pessoas àquilo que pode transformar suas vidas."
        text="A REDE nasceu da convicção de que ninguém deveria enfrentar sozinho os desafios da família, da liderança, das emoções e do propósito."
      />

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-24 lg:grid-cols-[0.8fr_1fr] lg:items-center lg:px-8">
        <Reveal>
          <img src={jesielAsset.url} alt="Retrato de Jesiel Ribeiro" width={1024} height={1280} className="w-full rounded-3xl object-cover shadow-lift" />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow">Quem lidera</p>
          <h2 className="mt-5 text-4xl sm:text-5xl">Jesiel Ribeiro</h2>
          <p className="mt-3 text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">Pastor · Terapeuta Familiar · Palestrante</p>
          <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
            Jesiel dedica sua trajetória a compreender pessoas e ajudá-las a reconstruir relações, recuperar a esperança e encontrar direção. Sua experiência pastoral trouxe a escuta; a terapia familiar, método; e os palcos, a capacidade de transformar temas profundos em conversas possíveis.
          </p>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Na REDE, essas experiências se encontram. O resultado é uma atuação humana e profissional, capaz de dialogar com a Igreja e com o mundo corporativo sem perder a identidade cristã que sustenta seu propósito.
          </p>
          <Link to="/contato" className="btn-base btn-navy mt-9">Convidar Jesiel <ArrowRight className="size-4" /></Link>
        </Reveal>
      </section>

      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Três dimensões</p>
            <h2 className="mt-5 max-w-2xl text-4xl sm:text-5xl">O que desejamos construir.</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {dimensoes.map((item, index) => (
              <Reveal key={item.nome} delay={index * 90}>
                <article className="card-rede h-full p-8">
                  <h3 className="text-2xl">{item.nome}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.texto}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div className="pt-24"><CtaFinal /></div>
    </>
  );
}