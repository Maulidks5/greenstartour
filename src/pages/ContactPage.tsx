import { Contact } from "@/components/site/Contact";
import { PageHero } from "@/components/site/PageHero";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroImg from "@/assets/tour-stone-town.jpg";

const ContactPage = () => (
  <SiteLayout>
    <PageHero
      image={heroImg}
      title="Contact & Booking"
      subtitle="Tell us what you need: tour, hotel, transport, safari, or a full package."
    />
    <Contact />
  </SiteLayout>
);

export default ContactPage;
