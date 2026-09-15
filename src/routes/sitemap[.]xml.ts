import { createFileRoute } from "@tanstack/react-router";

const pages = ["", "sobre", "frentes", "palestras", "igrejas", "empresas", "projetos", "contato"];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const urls = pages.map((page) => `<url><loc>${origin}/${page}</loc><changefreq>monthly</changefreq><priority>${page ? "0.8" : "1.0"}</priority></url>`).join("");
        return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, { headers: { "content-type": "application/xml; charset=utf-8", "cache-control": "public, max-age=3600" } });
      },
    },
  },
});