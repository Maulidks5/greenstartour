import { Link } from "react-router-dom";
import { Facebook, Instagram, LockKeyhole, Mail, MapPin, MessageCircle, Phone, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePublicContent } from "@/hooks/use-public-content";
import logo from "@/assets/green-star-logo.png";

export const Footer = () => {
  const { categories, siteSettings } = usePublicContent();

  return (
    <footer className="relative overflow-hidden gradient-ocean pb-8 pt-20 text-white">
      <div className="container relative">
        <div className="grid grid-cols-1 gap-12 border-b border-white/15 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-14 w-14 place-items-center overflow-hidden rounded-full border border-accent/40 bg-primary shadow-gold">
                <img src={logo} alt="Green Star Island Tour & Safari logo" className="h-12 w-12 rounded-full object-cover" />
              </div>
              <span className="leading-none">
                <span className="block font-display text-2xl font-semibold">Green Star</span>
                <span className="mt-1 block text-[10px] font-extrabold uppercase tracking-[0.22em] text-accent">Island Tour & Safari</span>
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-white/70">
              Simple Zanzibar tours, hotel booking help, transport, safaris, and custom travel packages.
            </p>
            <div className="flex gap-2">
              {[
                [Instagram, siteSettings.instagramUrl, "Instagram"],
                [Facebook, siteSettings.facebookUrl, "Facebook"],
                [Youtube, siteSettings.youtubeUrl, "YouTube"],
              ].map(([Icon, href, label]) => (
                <a key={label as string} href={href as string} aria-label={label as string} className="grid h-10 w-10 place-items-center rounded-full bg-white/12 transition-colors hover:bg-accent hover:text-primary">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol
            title="Quick Links"
            links={[
              { label: "Home", href: "/" },
              { label: "Tours", href: "/tours" },
              { label: "Hotels", href: "/hotels" },
              { label: "Transport", href: "/transport" },
              { label: "Safaris", href: "/safari-packages" },
              { label: "Gallery", href: "/gallery" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
            ]}
          />
          <FooterCol
            title="Tour Categories"
            links={categories.map((category) => ({ label: category.title, href: `/tours?category=${category.key}` }))}
          />

          <div>
            <h4 className="mb-5 font-display text-xl">Contact</h4>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex gap-3"><Phone className="h-4 w-4 text-accent" /> {siteSettings.whatsappNumber}</div>
              <div className="flex gap-3"><Mail className="h-4 w-4 text-accent" /> {siteSettings.contactEmail}</div>
              <div className="flex gap-3"><MapPin className="h-4 w-4 text-accent" /> {siteSettings.officeLocation}</div>
            </div>
            <Button className="mt-6" variant="whatsapp" size="lg" asChild>
              <a href={siteSettings.whatsappUrl} target="_blank" rel="noreferrer"><MessageCircle className="h-4 w-4" /> WhatsApp Contact</a>
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-8 text-xs text-white/50 md:flex-row">
          <div>© {new Date().getFullYear()} {siteSettings.siteName}. All rights reserved.</div>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
            <a href="https://www.myt.co.tz" target="_blank" rel="noreferrer" className="hover:text-white">
              Developed by Mwambao Youth Technology
            </a>
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a
              href="/admin/login"
              onClick={(event) => {
                event.preventDefault();
                window.location.assign("/admin/login");
              }}
              aria-label="Admin login"
              title="Admin login"
              className="inline-grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white/55 transition-colors hover:border-accent/60 hover:bg-accent hover:text-primary"
            >
              <LockKeyhole className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterCol = ({ title, links }: { title: string; links: { label: string; href: string }[] }) => (
  <div>
    <h4 className="mb-5 font-display text-xl">{title}</h4>
    <ul className="space-y-3">
      {links.map((l) => (
        <li key={l.href}><Link to={l.href} className="text-sm text-white/70 transition-colors hover:text-accent">{l.label}</Link></li>
      ))}
    </ul>
  </div>
);
