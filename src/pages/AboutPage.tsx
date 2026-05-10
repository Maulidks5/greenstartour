import { CheckCircle2 } from "lucide-react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PageHero } from "@/components/site/PageHero";
import { FinalBookingCTA } from "@/components/site/CtaSections";
import aboutImg from "@/assets/about-zanzibar.jpg";
import heroImg from "@/assets/hero-zanzibar.jpg";

const AboutPage = () => (
  <SiteLayout>
    <PageHero
      image={aboutImg}
      title="About Us"
      subtitle="A local team helping visitors book tours, hotels, transport, and safaris with clear communication."
    />
    <section className="py-12 md:py-16">
      <div className="container grid items-center gap-10 lg:grid-cols-2">
        <div>
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">Local experts</div>
          <h2 className="font-display text-4xl font-semibold leading-tight text-primary md:text-5xl">Simple planning with trusted local support.</h2>
          <p className="mt-5 leading-relaxed text-muted-foreground">
            We help visitors arrange the important parts of a Zanzibar trip: tours, hotel booking help, private transport, and safari extensions.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Fast WhatsApp replies",
              "Tour, hotel, and transport help",
              "Local guides and drivers",
              "Clear booking follow-up",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-xl bg-secondary/55 p-4">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="font-medium text-primary">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <img src={heroImg} alt="Zanzibar luxury travel" className="h-full min-h-[420px] rounded-2xl object-cover shadow-luxury" />
      </div>
    </section>
    <FinalBookingCTA />
  </SiteLayout>
);

export default AboutPage;
