import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { whatsappUrl } from "@/data/tourData";
import logo from "@/assets/green-star-logo.png";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tours & Safari", href: "/tours" },
  { label: "Hotels", href: "/hotels" },
  { label: "Transportation", href: "/transport" },
  { label: "About Us", href: "/about" },
  { label: "Contact / Booking", href: "/contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 py-3 shadow-card-luxury backdrop-blur-xl"
          : "bg-primary/95 py-0 shadow-[0_10px_30px_hsla(205,75%,12%,0.25)] backdrop-blur-xl"
      )}
    >
      <div className="border-b border-white/10 bg-primary text-white">
        <div className="container flex flex-col items-center justify-between gap-2 py-2 text-center text-xs sm:flex-row sm:text-left">
          <span>Tours, safari, hotels, and transport made simple in Zanzibar.</span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3 py-1.5 font-semibold text-white shadow-[0_10px_24px_-16px_rgba(37,211,102,0.9)] transition-colors hover:bg-[#1ebe5d]">
            <MessageCircle className="h-4 w-4" />
            WhatsApp us for fast booking
          </a>
        </div>
      </div>

      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div className={cn(
            "grid h-12 w-12 place-items-center overflow-hidden rounded-full border shadow-card-luxury transition-colors",
            scrolled ? "border-accent/40 bg-primary" : "border-accent/40 bg-white/14 backdrop-blur"
          )}>
            <img src={logo} alt="Green Star Island Tour & Safari logo" className="h-12 w-12 rounded-full object-cover" />
          </div>
          <span className="leading-none">
            <span className={cn(
              "block font-display text-xl font-semibold sm:text-2xl",
              scrolled ? "text-primary" : "text-white"
            )}>
              Green Star
            </span>
            <span className={cn(
              "mt-1 block text-[10px] font-extrabold uppercase tracking-[0.22em]",
              scrolled ? "text-accent" : "text-accent"
            )}>
              Island Tour & Safari
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((l) => (
            <NavLink
              key={l.href}
              to={l.href}
              className={({ isActive }) =>
                cn(
                  "relative text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:bg-accent after:transition-all hover:after:w-full xl:text-[15px]",
                  isActive ? "after:w-full" : "after:w-0",
                  scrolled
                    ? isActive ? "text-primary" : "text-foreground/80 hover:text-primary"
                    : isActive ? "text-accent" : "text-white hover:text-accent"
                )
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="green"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
              <Link to="/contact">Book Now</Link>
          </Button>
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full lg:hidden",
              scrolled ? "bg-island-green-soft text-primary shadow-card-luxury" : "glass text-white"
            )}
            aria-label="Menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className={cn(
        "lg:hidden overflow-hidden transition-all duration-500",
        open ? "max-h-[620px] mt-2" : "max-h-0"
      )}>
        <div className="container">
          <div className="mb-4 flex flex-col gap-2 rounded-2xl border border-border/70 bg-white p-3 shadow-luxury">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                onClick={() => setOpen(false)}
                className="mobile-touch flex items-center rounded-xl px-4 text-sm font-semibold text-foreground/80 hover:bg-island-green-soft hover:text-primary"
              >
                {l.label}
              </Link>
            ))}
            <Button variant="green" className="mt-1 w-full" asChild>
              <Link to="/contact" onClick={() => setOpen(false)}>Book Now</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
