import { Contact } from "@/components/site/Contact";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import { SEO } from "@/components/site/SEO";
import heroImg from "@/assets/tour-stone-town.jpg";

const ContactPage = () => (
  <SiteLayout>
    <SEO
      title="Contact & Booking"
      description="Contact Green Star Island Tour & Safari for Zanzibar tours, hotel booking, transport, safari packages, and WhatsApp booking help."
      path="/contact"
      image={heroImg}
    />
    <PageHero
      image={heroImg}
      title="Contact & Booking"
      subtitle="Tell us what you need: tour, hotel, transport, safari, or a full package."
    />
    <Contact />
  </SiteLayout>
);

export default ContactPage;
