import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-conexao.jpg";
import igrejasImg from "@/assets/igrejas.jpg";
import empresasImg from "@/assets/empresas.jpg";
import jesielAsset from "@/assets/jesiel.jpg.asset.json";
import { Reveal } from "@/components/site/Reveal";
import { CtaFinal } from "@/components/site/CtaFinal";
import { frentes, palestras, pilares, whatsappLink } from "@/data/rede";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REDE CONECTA — Ninguém deveria caminhar sozinho" },
      {
        name: "description",
        content:
          "Acolhimento, desenvolvimento humano e transformação de vidas para igrejas e empresas. Palestras, treinamentos e mentorias com Jesiel Ribeiro.",
      },
      { property: "og:title", content: "REDE CONECTA — Ninguém deveria caminhar sozinho" },
      {
        property: "og:description",
        content:
          "Uma rede de acolhimento, desenvolvimento humano e transformação de vidas para igrejas e empresas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

const diferenciais = [
  {
    titulo: "Fé e conhecimento",
    texto: "Uma abordagem que une profundidade espiritual, ciência do comportamento e prática clínica.",
  },
  {
    titulo: "Conteúdo personalizado",
    texto: "Cada encontro é desenhado para a realidade da sua igreja, equipe ou comunidade.",
  },
  {
    titulo: "Linguagem acessível",
    texto: "Temas profundos comunicados de forma simples, humana e aplicável ao cotidiano.",
  },
  {
    titulo: "Caminhada contínua",
    texto: "Mais do que um evento isolado: trilhas, mentorias e acompanhamento de longo prazo.",
  },
];

function Home() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImg}
          alt="Pessoas em círculo, acolhendo umas às outras"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,oklch(0.203_0.047_268/0.96)_0%,oklch(0.203_0.047_268/0.82)_45%,oklch(0.203_0.047_268/0.35)_100%)]" />
        <div className="relative mx-auto flex min-h-[86vh] max-w-7xl flex-col justify-center px-5 py-24 text-white lg:px-8">
          <div className="fade-up max-w-3xl">
            <h1 className="font-display text-7xl leading-none sm:text-8xl">REDE</h1>
            <p className="mt-4 text-[0.72rem] font-bold tracking-[0.3em] text-gold uppercase sm:text-sm">
              Reconstruir · Encorajar · Despertar · Edificar
            </p>
            <p className="mt-10 font-display text-4xl leading-tight sm:text-5xl">
              Ninguém deveria caminhar sozinho.
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-85">
              Uma rede de acolhimento, desenvolvimento humano e transformação de vidas.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/sobre" className="btn-base btn-gold">
                Conheça a REDE
              </Link>
              <Link to="/contato" className="btn-base btn-outline-light">
                Leve a REDE para sua igreja ou empresa
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Propósito */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <Reveal>
            <p className="eyebrow">Nosso propósito</p>
            <h2 className="mt-5 text-4xl leading-tight sm:text-5xl">
              Mais do que falar com pessoas. Caminhar com pessoas.
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
              A REDE existe para conectar pessoas àquilo que pode transformar suas vidas. Não
              acreditamos em respostas prontas, nem em palestras que terminam quando as luzes se
              apagam. Acreditamos em presença, escuta e continuidade.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Unimos fé, conhecimento, desenvolvimento humano, liderança, família, saúde emocional e
              propósito em uma abordagem que serve tanto a igrejas quanto a organizações.
            </p>
            <Link to="/sobre" className="btn-base btn-outline-navy mt-9">
              Sobre a REDE <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <Reveal delay={120}>
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { k: "+18", v: "palestras no portfólio" },
                { k: "7", v: "frentes de atuação" },
                { k: "2", v: "públicos: igrejas e empresas" },
                { k: "1", v: "propósito: transformar vidas" },
              ].map((s) => (
                <div key={s.v} className="card-rede p-7">
                  <p className="font-display text-4xl text-gold">{s.k}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{s.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Pilares */}
      <section className="bg-secondary py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Os cinco pilares</p>
            <h2 className="mt-5 max-w-2xl text-4xl sm:text-5xl">
              Um caminho com começo, cuidado e continuidade.
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {pilares.map((p, i) => (
              <Reveal key={p.num} delay={i * 80}>
                <div className="card-rede h-full p-7">
                  <p className="font-display text-2xl text-gold">{p.num}</p>
                  <h3 className="mt-4 text-xl">{p.titulo}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.texto}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Frentes */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
            <div>
              <p className="eyebrow">Nossas frentes</p>
              <h2 className="mt-5 max-w-2xl text-4xl sm:text-5xl">Sete caminhos, uma só rede.</h2>
            </div>
            <Link to="/frentes" className="btn-base btn-outline-navy">
              Ver todas
            </Link>
          </div>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {frentes.map((f, i) => (
            <Reveal key={f.slug} delay={i * 60}>
              <Link
                to="/frentes"
                hash={f.slug}
                className="card-rede block h-full p-8"
              >
                <h3 className="text-2xl">{f.nome}</h3>
                <p className="mt-2 text-sm font-semibold text-gold">{f.resumo}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.descricao}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Palestras */}
      <section className="surface-navy py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <p className="eyebrow">Palestras</p>
            <h2 className="mt-5 max-w-2xl text-4xl sm:text-5xl">
              Conteúdos que tocam a vida real.
            </h2>
            <p className="mt-5 max-w-xl opacity-80">
              Um portfólio de {palestras.length} palestras para igrejas, empresas, casais, jovens e
              equipes.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {palestras.slice(0, 6).map((p, i) => (
              <Reveal key={p.id} delay={i * 60}>
                <article className="flex h-full flex-col rounded-3xl border border-white/15 bg-white/5 p-8 transition-colors hover:border-gold">
                  <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">{p.tema}</p>
                  <h3 className="mt-4 text-xl leading-snug">{p.titulo}</h3>
                  <p className="mt-4 flex-1 text-sm leading-relaxed opacity-75">{p.sinopse}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link to="/palestras" className="btn-base btn-gold">
              Ver catálogo completo
            </Link>
          </div>
        </div>
      </section>

      {/* Públicos */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          {[
            {
              img: igrejasImg,
              alt: "Pessoas se abraçando em um espaço comunitário",
              eyebrow: "Para igrejas",
              titulo: "Fortalecendo pessoas para fortalecer a Igreja.",
              texto:
                "Palestras, treinamentos, imersões e mentorias para pastores, líderes, obreiros, casais, jovens e equipes de ministério.",
              to: "/igrejas" as const,
              cta: "Leve a REDE para sua igreja",
            },
            {
              img: empresasImg,
              alt: "Equipe corporativa em reunião colaborativa",
              eyebrow: "Para empresas",
              titulo: "Pessoas transformadas constroem organizações mais fortes.",
              texto:
                "Liderança, inteligência emocional, propósito e cultura organizacional para gestores, equipes e organizações.",
              to: "/empresas" as const,
              cta: "Solicitar proposta corporativa",
            },
          ].map((b, i) => (
            <Reveal key={b.eyebrow} delay={i * 100}>
              <article className="card-rede h-full overflow-hidden">
                <img
                  src={b.img}
                  alt={b.alt}
                  loading="lazy"
                  width={1600}
                  height={1008}
                  className="h-60 w-full object-cover"
                />
                <div className="p-9">
                  <p className="eyebrow">{b.eyebrow}</p>
                  <h3 className="mt-4 text-3xl leading-tight">{b.titulo}</h3>
                  <p className="mt-4 text-muted-foreground">{b.texto}</p>
                  <Link to={b.to} className="btn-base btn-outline-navy mt-8">
                    {b.cta}
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Jesiel */}
      <section className="bg-secondary py-24">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.8fr_1fr] lg:items-center lg:px-8">
          <Reveal>
            <img
              src={jesielAsset.url}
              alt="Retrato de Jesiel Ribeiro"
              loading="lazy"
              width={1024}
              height={1280}
              className="w-full rounded-3xl object-cover shadow-lift"
            />
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Quem lidera</p>
            <h2 className="mt-5 text-4xl sm:text-5xl">Jesiel Ribeiro</h2>
            <p className="mt-3 text-sm font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Pastor · Terapeuta Familiar · Palestrante
            </p>
            <p className="mt-7 text-lg leading-relaxed text-muted-foreground">
              Há anos dedicado ao cuidado de pessoas, Jesiel Ribeiro une a sensibilidade pastoral, a
              formação em terapia familiar e a experiência em palcos para falar de forma direta e
              acolhedora sobre aquilo que realmente atravessa a vida das pessoas.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Sua abordagem conecta fé e conhecimento, tratando temas como casamento, liderança,
              saúde emocional e propósito com profundidade e linguagem acessível.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/sobre" className="btn-base btn-navy">
                Conhecer a história
              </Link>
              <a
                href={whatsappLink("Olá, Jesiel! Gostaria de convidá-lo para uma palestra.")}
                target="_blank"
                rel="noreferrer"
                className="btn-base btn-outline-navy"
              >
                Convidar para palestrar
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <Reveal>
          <p className="eyebrow">Diferenciais</p>
          <h2 className="mt-5 max-w-2xl text-4xl sm:text-5xl">Por que a REDE é diferente.</h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {diferenciais.map((d, i) => (
            <Reveal key={d.titulo} delay={i * 70}>
              <div className="card-rede h-full p-8">
                <span className="block h-1 w-12 rounded-full bg-gold" />
                <h3 className="mt-6 text-xl">{d.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaFinal />
    </>
  );
}
