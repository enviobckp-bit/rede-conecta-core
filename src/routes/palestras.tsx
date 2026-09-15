import { createFileRoute } from "@tanstack/react-router";
import { Search, Users } from "lucide-react";
import { useMemo, useState } from "react";
import palestraImg from "@/assets/palestra.jpg";
import { PageHero } from "@/components/site/PageHero";
import { CtaFinal } from "@/components/site/CtaFinal";
import { palestras, publicos, temas, whatsappLink } from "@/data/rede";

export const Route = createFileRoute("/palestras")({
  head: () => ({
    meta: [
      { title: "Catálogo de Palestras — REDE CONECTA" },
      { name: "description", content: "Explore palestras sobre liderança, família, saúde emocional, propósito e desenvolvimento humano com Jesiel Ribeiro." },
      { property: "og:title", content: "Catálogo de Palestras — REDE CONECTA" },
      { property: "og:description", content: "Palestras transformadoras para igrejas, empresas, casais, jovens e líderes." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/palestras" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/palestras" }],
  }),
  component: PalestrasPage,
});

function PalestrasPage() {
  const [busca, setBusca] = useState("");
  const [tema, setTema] = useState("Todos");
  const [publico, setPublico] = useState("Todos");

  const resultados = useMemo(() => {
    const termo = busca.trim().toLocaleLowerCase("pt-BR");
    return palestras.filter((p) => {
      const texto = `${p.titulo} ${p.tema} ${p.sinopse} ${p.publico.join(" ")}`.toLocaleLowerCase("pt-BR");
      return (!termo || texto.includes(termo)) && (tema === "Todos" || p.tema === tema) && (publico === "Todos" || p.publico.includes(publico));
    });
  }, [busca, tema, publico]);

  return (
    <>
      <PageHero eyebrow="Palestras" title="Conteúdos que tocam a vida real." text="Encontre o tema ideal para o momento da sua igreja, empresa ou comunidade." image={palestraImg} imageAlt="Palestrante diante de uma plateia" />
      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <div className="sticky top-20 z-30 grid gap-4 rounded-2xl border border-border bg-background/95 p-4 shadow-soft backdrop-blur-md md:grid-cols-[minmax(0,1fr)_220px_220px]">
          <label className="relative block">
            <span className="sr-only">Pesquisar palestras</span>
            <Search className="absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />
            <input value={busca} onChange={(e) => setBusca(e.target.value)} placeholder="Pesquisar por título ou tema" className="h-12 w-full rounded-xl border border-input bg-background pr-4 pl-12 text-sm outline-none focus:border-gold" />
          </label>
          <select value={tema} onChange={(e) => setTema(e.target.value)} aria-label="Filtrar por tema" className="h-12 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold">
            <option>Todos</option>{temas.map((item) => <option key={item}>{item}</option>)}
          </select>
          <select value={publico} onChange={(e) => setPublico(e.target.value)} aria-label="Filtrar por público" className="h-12 rounded-xl border border-input bg-background px-4 text-sm outline-none focus:border-gold">
            <option>Todos</option>{publicos.map((item) => <option key={item}>{item}</option>)}
          </select>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">{resultados.length} {resultados.length === 1 ? "palestra encontrada" : "palestras encontradas"}</p>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {resultados.map((p) => (
            <article key={p.id} className="card-rede flex h-full flex-col p-8">
              <p className="text-xs font-bold tracking-[0.2em] text-gold uppercase">{p.tema}</p>
              <h2 className="mt-4 text-2xl leading-snug">{p.titulo}</h2>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{p.sinopse}</p>
              <div className="mt-6 flex items-start gap-2 text-xs text-muted-foreground"><Users className="size-4 shrink-0 text-gold" /><span>{p.publico.join(" · ")}</span></div>
              <a href={whatsappLink(`Olá! Gostaria de solicitar a palestra “${p.titulo}”.`)} target="_blank" rel="noreferrer" className="btn-base btn-outline-navy mt-7">Solicitar esta palestra</a>
            </article>
          ))}
        </div>
        {resultados.length === 0 ? (
          <div className="mt-10 rounded-2xl bg-secondary px-6 py-12 text-center">
            <h2 className="text-2xl">Nenhuma palestra encontrada</h2>
            <p className="mt-2 text-muted-foreground">Tente outro termo ou altere os filtros.</p>
          </div>
        ) : null}
      </section>
      <CtaFinal titulo="Encontrou o tema certo?" texto="Vamos adaptar a experiência ao momento e ao público do seu evento." />
    </>
  );
}