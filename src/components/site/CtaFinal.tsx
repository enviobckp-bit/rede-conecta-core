import { Link } from "@tanstack/react-router";
import { whatsappLink } from "@/data/rede";

export function CtaFinal({
  titulo = "Vamos caminhar juntos?",
  texto = "Leve a REDE para sua igreja, empresa ou comunidade.",
}: {
  titulo?: string;
  texto?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 lg:px-8">
      <div className="surface-navy overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-14">
        <p className="eyebrow">Próximo passo</p>
        <h2 className="mx-auto mt-5 max-w-2xl text-4xl sm:text-5xl">{titulo}</h2>
        <p className="mx-auto mt-5 max-w-xl text-base opacity-80">{texto}</p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Link to="/contato" className="btn-base btn-gold">
            Solicitar palestra
          </Link>
          <a
            href={whatsappLink("Olá! Gostaria de levar a REDE para minha igreja/empresa.")}
            target="_blank"
            rel="noreferrer"
            className="btn-base btn-outline-light"
          >
            Falar pelo WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
