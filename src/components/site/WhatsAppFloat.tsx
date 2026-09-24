import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/rede";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink("Olá! Vim pelo site da REDE e gostaria de mais informações.")}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar pelo WhatsApp"
      className="fixed right-5 bottom-[calc(1.25rem+1cm)] z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-primary-foreground shadow-lift transition-transform hover:scale-105"
    >
      <MessageCircle className="size-7" />
    </a>
  );
}
