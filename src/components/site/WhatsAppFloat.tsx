import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/rede";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Olá! Vim pelo site da REDE e gostaria de mais informações.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
