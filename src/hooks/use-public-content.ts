import { createContext, createElement, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  allTours as fallbackTours,
  galleryImages as fallbackGallery,
  testimonials as fallbackTestimonials,
  tourCategories as fallbackCategories,
  type Tour,
  type TourCategoryKey,
} from "@/data/tourData";
import { featuredHotels as fallbackHotels, transportServices as fallbackTransportServices } from "@/data/serviceData";
import heroZanzibar from "@/assets/hero-zanzibar.jpg";
import mnemba from "@/assets/tour-mnemba.jpg";
import safariBlue from "@/assets/tour-safari-blue.jpg";
import stoneTown from "@/assets/tour-stone-town.jpg";
import jozani from "@/assets/tour-jozani.jpg";
import kendwa from "@/assets/dest-kendwa.jpg";
import paje from "@/assets/dest-paje.jpg";
import jambiani from "@/assets/dest-jambiani.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

type BackendCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
};

type BackendHeroSlide = {
  id: number;
  label?: string | null;
  title: string;
  subtitle?: string | null;
  image?: string | null;
};

type BackendTour = {
  id: number;
  slug: string;
  title: string;
  location: string;
  duration: string;
  price?: number | string | null;
  adult_price?: number | string | null;
  child_price?: number | string | null;
  pricing_note?: string | null;
  short_description?: string | null;
  description?: string | null;
  highlights?: string[] | null;
  included?: string[] | null;
  not_included?: string[] | null;
  itinerary?: string[] | null;
  what_to_bring?: string[] | null;
  important_information?: string[] | null;
  main_image?: string | null;
  gallery_images?: string[] | string | null;
  rating?: number | string | null;
  is_featured?: boolean;
  category?: BackendCategory | null;
};

type BackendHotel = {
  id: number;
  slug: string;
  name: string;
  location: string;
  hotel_type?: string | null;
  price_from?: string | null;
  price_per_night?: number | string | null;
  child_policy?: string | null;
  short_description?: string | null;
  amenities?: string[] | string | null;
  main_image?: string | null;
  gallery_images?: string[] | string | null;
  rating?: number | string | null;
};

type BackendGallery = {
  id: number;
  title: string;
  image?: string | null;
  category?: string | null;
};

type BackendTestimonial = {
  id: number;
  name: string;
  country?: string | null;
  rating?: number | string | null;
  review: string;
};

type BackendPartner = {
  id: number;
  company_name?: string | null;
  full_name: string;
  logo?: string | null;
};

type BackendTransportService = {
  id: number;
  slug: string;
  title: string;
  description?: string | null;
  image?: string | null;
};

type BackendTransportRoute = {
  id: number;
  pickup_location: string;
  dropoff_location: string;
  vehicle_type?: string | null;
  base_price: number | string;
};

export type BackendContent = {
  settings?: Record<string, string | null>;
  categories?: BackendCategory[];
  heroSlides?: BackendHeroSlide[];
  tours?: BackendTour[];
  hotels?: BackendHotel[];
  gallery?: BackendGallery[];
  testimonials?: BackendTestimonial[];
  partners?: BackendPartner[];
  transportServices?: BackendTransportService[];
  transportRoutes?: BackendTransportRoute[];
};

export type HotelItem = (typeof fallbackHotels)[number];
export type TransportServiceItem = (typeof fallbackTransportServices)[number];
export type CategoryItem = (typeof fallbackCategories)[number];
export type GalleryItem = (typeof fallbackGallery)[number];
export type TestimonialItem = (typeof fallbackTestimonials)[number];
export type PartnerItem = {
  id: number;
  name: string;
  logo: string;
};

export type HeroSlideItem = {
  image: string;
  label: string;
  title: string;
  subtitle: string;
};

export type SiteSettings = {
  siteName: string;
  whatsappNumber: string;
  whatsappUrl: string;
  currencySymbol: string;
  contactEmail: string;
  officeLocation: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
};

const tourFallbackImages = [mnemba, safariBlue, stoneTown, jozani, heroZanzibar, kendwa, paje, gallery5, jambiani];
const hotelFallbackImages = [kendwa, paje, stoneTown, jambiani, heroZanzibar];
const galleryFallbackImages = [heroZanzibar, mnemba, safariBlue, stoneTown, jozani, gallery1, gallery2, gallery3, gallery4, gallery5, gallery6, paje];
const transportFallbackImages = [heroZanzibar, stoneTown, kendwa, safariBlue];

const fallbackHeroSlides: HeroSlideItem[] = [
  {
    image: heroZanzibar,
    label: "Zanzibar Travel Help",
    title: "Tours, Hotels & Transport Made Simple",
    subtitle: "Book beach tours, safaris, hotel stays, and private transfers with trusted local support.",
  },
  {
    image: mnemba,
    label: "Ocean & Beach Tours",
    title: "Clear Blue Water, Private Island Moments",
    subtitle: "Snorkeling, sandbanks, dhow cruises, beach hotels, and smooth pickup plans.",
  },
  {
    image: safariBlue,
    label: "Safari Blue Experience",
    title: "Sail Zanzibar's Most Beautiful Coastline",
    subtitle: "Dhow sailing, lagoon swimming, seafood, hotel pickup, and friendly local help.",
  },
  {
    image: stoneTown,
    label: "Culture & History",
    title: "Discover Stone Town With Local Experts",
    subtitle: "Short, rich cultural tours for travellers who want real Zanzibar stories.",
  },
];

const isManagedImage = (value?: string | null) => Boolean(value && (/^https?:\/\//.test(value) || value.startsWith("/uploads/") || value.startsWith("/storage/")));
const imageOrFallback = (value: string | null | undefined, fallback: string) => (isManagedImage(value) ? value! : fallback);

const normalizeCategoryKey = (slug?: string | null): TourCategoryKey => {
  const value = (slug || "").replace(/-tours$/, "");
  if (value.includes("ocean") || value.includes("beach")) return "ocean-beach";
  if (value.includes("nature") || value.includes("wildlife")) return "nature-wildlife";
  if (value.includes("cultural") || value.includes("historical")) return "cultural-historical";
  if (value.includes("special")) return "special-experiences";
  if (value.includes("safari") || value.includes("tanzania")) return "safari-tours";
  if (value.includes("city")) return "city-tours";
  return "ocean-beach";
};

const shortLabel = (name?: string | null) =>
  (name || "Tours")
    .replace(/^Tanzania\s+/i, "")
    .replace(/\s+Tours$/i, "")
    .replace(/\s+Experiences$/i, " Experiences");

const asArray = (value: string[] | string | null | undefined, fallback: string[]) => {
  if (Array.isArray(value) && value.length) return value;
  if (typeof value === "string" && value.trim()) {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed) && parsed.length) return parsed;
    } catch {
      return [value];
    }
  }
  return fallback;
};

export const formatCurrency = (value?: string | number | null, symbol = "€") => {
  if (value === null || value === undefined || value === "") return "Price on request";
  const amount = Number(value);
  const text = Number.isFinite(amount) ? amount.toLocaleString("en-US", { maximumFractionDigits: 2 }) : String(value);
  return symbol.trim().length > 1 ? `${symbol} ${text}` : `${symbol}${text}`;
};

const formatPriceText = (value?: string | number | null, symbol = "€") => {
  if (value === null || value === undefined || value === "") return "Price on request";
  const text = String(value).trim();
  const currency = symbol.trim().length > 1 ? `${symbol.trim()} ` : symbol.trim();
  const withExistingCurrency = text.match(/^(\s*From\s+)?(?:[$€£]|TZS|USD|EUR|GBP)\s*(.*)$/i);
  if (withExistingCurrency) return `${withExistingCurrency[1] || ""}${currency}${withExistingCurrency[2]}`.trim();

  const withPlainNumber = text.match(/^(\s*From\s+)?(\d+(?:\.\d+)?)(.*)$/i);
  if (withPlainNumber) return `${withPlainNumber[1] || ""}${formatCurrency(withPlainNumber[2], symbol)}${withPlainNumber[3] || ""}`.trim();

  return text;
};

const priceLabel = (price?: string | number | null, currencySymbol = "€") => {
  if (!price) return "Price on request";
  const text = String(price);
  if (/[$€£]|TZS|USD|EUR|GBP/i.test(text)) return text;
  return `From ${formatCurrency(text, currencySymbol)}`;
};

const mapContent = (content?: BackendContent) => {
  const rawSettings = content?.settings || {};
  const configuredWhatsApp = String(rawSettings.whatsapp_number || "+255 628 686 994");
  const whatsappNumber = configuredWhatsApp.replace(/\D+/g, "") === "255777123456" ? "+255 628 686 994" : configuredWhatsApp;
  const whatsappWelcomeMessage = "Hello Green Star Tour, welcome! I would like help with tours, safari, hotels, transport, or booking in Zanzibar.";
  const currencySymbol = String(rawSettings.currency_symbol || "€");
  const siteSettings: SiteSettings = {
    siteName: String(rawSettings.site_name || "Green Star Island Tour & Safari"),
    whatsappNumber,
    whatsappUrl: `https://wa.me/${whatsappNumber.replace(/\D+/g, "")}?text=${encodeURIComponent(whatsappWelcomeMessage)}`,
    currencySymbol,
    contactEmail: String(rawSettings.contact_email || "hello@greenstarisland.com"),
    officeLocation: String(rawSettings.office_location || "Stone Town, Zanzibar"),
    instagramUrl: String(rawSettings.instagram_url || "#"),
    facebookUrl: String(rawSettings.facebook_url || "#"),
    youtubeUrl: String(rawSettings.youtube_url || "#"),
  };

  const heroSlides = content?.heroSlides?.length
    ? content.heroSlides.map((slide, index) => ({
        image: imageOrFallback(slide.image, fallbackHeroSlides[index % fallbackHeroSlides.length].image),
        label: slide.label || "Green Star Island",
        title: slide.title,
        subtitle: slide.subtitle || "Tours, hotels, transport, and safaris with trusted local support.",
      }))
    : fallbackHeroSlides;

  const categories = content?.categories?.length
    ? content.categories.map((category, index) => ({
        key: normalizeCategoryKey(category.slug),
        title: category.name,
        description: category.description || "Curated travel experiences with local guidance and easy WhatsApp support.",
        image: imageOrFallback(category.image, fallbackCategories[index % fallbackCategories.length]?.image || heroZanzibar),
      }))
    : [...fallbackCategories];

  const tours: Tour[] = content?.tours?.length
    ? content.tours.map((tour, index) => {
        const fallback = tourFallbackImages[index % tourFallbackImages.length];
        const mainImage = imageOrFallback(tour.main_image, fallback);
        const gallery = asArray(tour.gallery_images, [mainImage, galleryFallbackImages[index % galleryFallbackImages.length], heroZanzibar]).map((image, galleryIndex) =>
          imageOrFallback(image, galleryIndex === 0 ? mainImage : galleryFallbackImages[galleryIndex % galleryFallbackImages.length])
        );

        return {
          id: tour.slug,
          name: tour.title,
          category: normalizeCategoryKey(tour.category?.slug),
          categoryLabel: shortLabel(tour.category?.name),
          location: tour.location,
          duration: tour.duration,
          description: tour.short_description || tour.description || "A curated Green Star Island experience.",
          overview: tour.description || tour.short_description || "A curated Green Star Island experience with reliable local planning.",
          rating: Number(tour.rating || 4.9),
          reviews: 0,
          price: priceLabel(tour.adult_price || tour.price, currencySymbol),
          adultPrice: Number(tour.adult_price || tour.price || 0),
          childPrice: Number(tour.child_price || 0),
          pricingNote: tour.pricing_note || undefined,
          image: mainImage,
          gallery: Array.from(new Set([mainImage, ...gallery])),
          highlights: asArray(tour.highlights, []),
          included: asArray(tour.included, []),
          notIncluded: asArray(tour.not_included, []),
          itinerary: asArray(tour.itinerary, []),
          bring: asArray(tour.what_to_bring, []),
          important: asArray(tour.important_information, []),
        };
      })
    : [...fallbackTours];

  const hotels: HotelItem[] = content?.hotels?.length
    ? content.hotels.map((hotel, index) => {
        const mainImage = imageOrFallback(hotel.main_image, hotelFallbackImages[index % hotelFallbackImages.length]);
        const gallery = asArray(hotel.gallery_images, [mainImage, ...hotelFallbackImages]).map((image, galleryIndex) =>
          imageOrFallback(image, galleryIndex === 0 ? mainImage : hotelFallbackImages[galleryIndex % hotelFallbackImages.length])
        );
        return {
          id: hotel.slug,
          name: hotel.name,
          location: hotel.location,
          type: hotel.hotel_type || "Hotel",
          price: hotel.price_per_night ? `${formatCurrency(hotel.price_per_night, currencySymbol)} / night` : formatPriceText(hotel.price_from, currencySymbol),
          pricePerNight: Number(hotel.price_per_night || 0),
          childPolicy: hotel.child_policy || "Children and extra beds are confirmed by room type.",
          rating: Number(hotel.rating || 4.8),
          image: mainImage,
          gallery: Array.from(new Set([mainImage, ...gallery])),
          amenities: asArray(hotel.amenities, [
            hotel.child_policy || "",
            hotel.price_per_night ? "Nightly price is shown before booking" : "",
            "Availability is confirmed by WhatsApp",
            "Transport can be arranged",
          ]).filter(Boolean),
          description: hotel.short_description || "Comfortable stay option managed from the admin panel.",
        };
      })
    : fallbackHotels.map((hotel) => ({
        ...hotel,
        price: formatPriceText(hotel.price, currencySymbol),
      }));

  const galleryImages = content?.gallery?.length
    ? content.gallery.map((image, index) => ({
        src: imageOrFallback(image.image, galleryFallbackImages[index % galleryFallbackImages.length]),
        title: image.title,
      }))
    : [...fallbackGallery];

  const testimonials = content?.testimonials?.length
    ? content.testimonials.map((testimonial) => ({
        name: testimonial.name,
        location: testimonial.country || "Guest",
        rating: Number(testimonial.rating || 5),
        text: testimonial.review,
      }))
    : [...fallbackTestimonials];

  const partners: PartnerItem[] = content?.partners?.length
    ? content.partners
        .filter((partner) => isManagedImage(partner.logo))
        .map((partner) => ({
          id: partner.id,
          name: partner.company_name || partner.full_name,
          logo: partner.logo!,
        }))
    : [];

  const transportServices = content?.transportServices?.length
    ? content.transportServices.map((service, index) => ({
        id: service.slug,
        title: service.title,
        description: service.description || "Reliable transport service managed from admin.",
        image: imageOrFallback(service.image, transportFallbackImages[index % transportFallbackImages.length]),
      }))
    : [...fallbackTransportServices];

  const transportRoutes = content?.transportRoutes?.length
    ? content.transportRoutes.map((route) => ({
        id: route.id,
        pickupLocation: route.pickup_location,
        dropoffLocation: route.dropoff_location,
        vehicleType: route.vehicle_type || "Private car",
        basePrice: Number(route.base_price || 0),
      }))
    : [
        { id: 1, pickupLocation: "Zanzibar Airport", dropoffLocation: "Stone Town", vehicleType: "Private car", basePrice: 25 },
        { id: 2, pickupLocation: "Zanzibar Airport", dropoffLocation: "Nungwi / Kendwa", vehicleType: "Private car", basePrice: 60 },
        { id: 3, pickupLocation: "Zanzibar Airport", dropoffLocation: "Paje / Jambiani", vehicleType: "Private car", basePrice: 55 },
      ];

  const featured = tours.filter((tour) => content?.tours?.find((item) => item.slug === tour.id)?.is_featured);

  return {
    categories,
    siteSettings,
    heroSlides,
    tours,
    featuredTours: (featured.length ? featured : tours).slice(0, 8),
    safariPackages: tours.filter((tour) => tour.category === "safari-tours"),
    hotels,
    galleryImages,
    testimonials,
    partners,
    transportServices,
    transportRoutes,
  };
};

const PublicContentContext = createContext<BackendContent | undefined>(undefined);

export const PublicContentProvider = ({ children, initialContent }: { children: ReactNode; initialContent?: BackendContent }) => (
  createElement(PublicContentContext.Provider, { value: initialContent }, children)
);

export const usePublicContent = () => {
  const initialContent = useContext(PublicContentContext);
  const [content, setContent] = useState<BackendContent | undefined>(initialContent);

  useEffect(() => {
    if (initialContent) {
      setContent(initialContent);
      return;
    }

    fetch("/api/public-content", { headers: { Accept: "application/json" } })
      .then((response) => (response.ok ? response.json() : undefined))
      .then((payload) => {
        if (payload) setContent(payload);
      })
      .catch(() => undefined);
  }, [initialContent]);

  return useMemo(() => mapContent(content), [content]);
};
