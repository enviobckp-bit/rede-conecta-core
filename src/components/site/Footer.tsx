import { Link } from "@tanstack/react-router";
import { Instagram, Phone } from "lucide-react";
import { INSTAGRAM, INSTAGRAM_URL, WHATSAPP_DISPLAY, whatsappLink } from "@/data/rede";

export function Footer() {
  return (
    <footer className="surface-navy mt-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-display text-3xl">REDE</p>
          <p className="mt-2 text-sm tracking-[0.2em] text-gold uppercase">
            Reconstruir · Encorajar · Despertar · Edificar
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-80">
            Uma rede de acolhimento, desenvolvimento humano e transformação de vidas. Ninguém
            deveria caminhar sozinho.
          </p>
        </div>

        <div>
          <p className="eyebrow">Navegação</p>
          <ul className="mt-5 grid grid-cols-2 gap-y-3 text-sm opacity-85">
            <li><Link to="/sobre" className="hover:text-gold">Sobre a REDE</Link></li>
            <li><Link to="/frentes" className="hover:text-gold">Nossas Frentes</Link></li>
            <li><Link to="/palestras" className="hover:text-gold">Palestras</Link></li>
            <li><Link to="/igrejas" className="hover:text-gold">Para Igrejas</Link></li>
            <li><Link to="/empresas" className="hover:text-gold">Para Empresas</Link></li>
            <li><Link to="/projetos" className="hover:text-gold">Projetos</Link></li>
            <li><Link to="/contato" className="hover:text-gold">Contato</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow">Contato</p>
          <p className="mt-5 font-display text-xl">Jesiel Ribeiro</p>
          <p className="text-sm opacity-75">Pastor · Terapeuta Familiar · Palestrante</p>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <a
              href={whatsappLink("Olá! Gostaria de falar com a REDE.")}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold"
            >
              <Phone className="size-4 shrink-0" /> {WHATSAPP_DISPLAY}
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 hover:text-gold"
            >
              <Instagram className="size-4 shrink-0" /> {INSTAGRAM}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-6 text-xs opacity-60 lg:px-8">
          © 2026  GRUPO REDE CONECTA · Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
