import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/data/tourData";

export const WhatsAppFab = () => (
  <a
    href={whatsappUrl}
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-5 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-luxury transition-transform hover:scale-105 md:bottom-6 md:right-6 md:h-14 md:w-14"
  >
    <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
    <MessageCircle className="h-6 w-6 relative" />
  </a>
);
