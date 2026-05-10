import { Footer } from "./Footer";
import { Navbar } from "./Navbar";
import { WhatsAppFab } from "./WhatsAppFab";

export const SiteLayout = ({ children }: { children: React.ReactNode }) => (
  <main className="min-h-screen overflow-x-hidden bg-background">
    <Navbar />
    {children}
    <Footer />
    <WhatsAppFab />
  </main>
);
