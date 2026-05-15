import { SiteLayout } from "@/components/site/SiteLayout";
import { Hero } from "@/components/site/Hero";
import { FeaturedTours } from "@/components/site/FeaturedTours";
import { Gallery } from "@/components/site/Gallery";
import { Testimonials } from "@/components/site/Testimonials";
import { ApprovedPartners, FinalBookingCTA, PartnershipCTA } from "@/components/site/CtaSections";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { TravelServices } from "@/components/site/TravelServices";
import { SEO, siteImage, siteUrl } from "@/components/site/SEO";

const Index = () => {
  return (
    <SiteLayout>
      <SEO
        title="Zanzibar Tours, Safaris, Hotels & Transport"
        description="Book Zanzibar tours, Tanzania safaris, hotels, transport, and local experiences with Green Star Island Tour & Safari."
        path="/"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            name: "Green Star Island Tour & Safari",
            url: siteUrl("/"),
            logo: siteImage("/favicon.png"),
            image: siteImage("/favicon.png"),
            areaServed: ["Zanzibar", "Tanzania"],
            knowsAbout: ["Zanzibar tours", "Tanzania safari", "hotel booking", "transport booking"],
            sameAs: [],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Green Star Island Tour & Safari",
            url: siteUrl("/"),
            potentialAction: {
              "@type": "SearchAction",
              target: `${siteUrl("/tours")}?search={search_term_string}`,
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <Hero />
      <TravelServices />
      <FeaturedTours />
      <WhyChooseUs />
      <Gallery />
      <Testimonials />
      <ApprovedPartners />
      <PartnershipCTA />
      <FinalBookingCTA />
    </SiteLayout>
  );
};

export default Index;
