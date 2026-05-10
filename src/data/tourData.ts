import heroZanzibar from "@/assets/hero-zanzibar.jpg";
import aboutZanzibar from "@/assets/about-zanzibar.jpg";
import mnemba from "@/assets/tour-mnemba.jpg";
import safariBlue from "@/assets/tour-safari-blue.jpg";
import stoneTown from "@/assets/tour-stone-town.jpg";
import jozani from "@/assets/tour-jozani.jpg";
import nungwi from "@/assets/tour-nungwi.jpg";
import kendwa from "@/assets/dest-kendwa.jpg";
import paje from "@/assets/dest-paje.jpg";
import matemwe from "@/assets/dest-matemwe.jpg";
import jambiani from "@/assets/dest-jambiani.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

export const whatsappNumber = "255628686994";
export const whatsappWelcomeMessage = "Hello Green Star Tour, welcome! I would like help with tours, safari, hotels, transport, or booking in Zanzibar.";
export const whatsappBaseUrl = `https://wa.me/${whatsappNumber}`;
export const whatsappUrl = `${whatsappBaseUrl}?text=${encodeURIComponent(whatsappWelcomeMessage)}`;
export const whatsappMessageUrl = (message: string) => `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;

export type TourCategoryKey =
  | "ocean-beach"
  | "nature-wildlife"
  | "cultural-historical"
  | "special-experiences"
  | "safari-tours"
  | "city-tours";

export type Tour = {
  id: string;
  name: string;
  category: TourCategoryKey;
  categoryLabel: string;
  location: string;
  duration: string;
  description: string;
  overview: string;
  rating: number;
  reviews: number;
  price: string;
  adultPrice: number;
  childPrice: number;
  pricingNote?: string;
  image: string;
  gallery: string[];
  highlights: string[];
  included: string[];
  notIncluded: string[];
  itinerary: string[];
  bring: string[];
  important: string[];
};

export const tourCategories = [
  {
    key: "ocean-beach",
    title: "Ocean & Beach Tours",
    description: "Snorkeling, sandbanks, dhow cruises, dolphins, and blue-water days.",
    image: mnemba,
  },
  {
    key: "nature-wildlife",
    title: "Nature & Wildlife Tours",
    description: "Forests, mangroves, endemic wildlife, spice farms, and natural reserves.",
    image: jozani,
  },
  {
    key: "cultural-historical",
    title: "Cultural & Historical Tours",
    description: "Stone Town, spice heritage, Swahili culture, food, and local stories.",
    image: stoneTown,
  },
  {
    key: "special-experiences",
    title: "Special Zanzibar Experiences",
    description: "Romantic beach setups, private charters, honeymoons, and custom events.",
    image: gallery5,
  },
  {
    key: "safari-tours",
    title: "Tanzania Safari Tours",
    description: "Serengeti, Ngorongoro, Tarangire, and mainland safari extensions.",
    image: aboutZanzibar,
  },
  {
    key: "city-tours",
    title: "City & Cultural Tours",
    description: "Local markets, villages, cooking, music, crafts, and city highlights.",
    image: gallery2,
  },
] as const;

const commonDetails = {
  highlights: [
    "Private or small-group experience",
    "Friendly local guide",
    "Flexible pickup from your hotel",
    "Beautiful photo stops",
  ],
  included: ["Professional guide", "Hotel pickup and drop-off", "Drinking water", "All planned tour stops"],
  notIncluded: ["Personal expenses", "Tips", "Meals unless mentioned", "International flights"],
  itinerary: [
    "Hotel pickup and short briefing",
    "Guided main experience with scenic stops",
    "Refreshment break and optional photos",
    "Return transfer to your hotel",
  ],
  bring: ["Sunscreen", "Comfortable shoes", "Camera", "Swimwear for water tours"],
  important: [
    "Exact pickup time is confirmed after booking",
    "Tour order may change due to weather or local conditions",
    "Private customization is available on request",
  ],
};

export const allTours: Tour[] = [
  {
    id: "mnemba-island-snorkeling",
    name: "Mnemba Island Snorkeling",
    category: "ocean-beach",
    categoryLabel: "Ocean & Beach",
    location: "Mnemba Atoll",
    duration: "Half day",
    description: "Clear-water snorkeling around one of Zanzibar's most loved coral areas.",
    overview: "A premium ocean escape with turquoise water, reef life, and a relaxed island mood.",
    rating: 4.9,
    reviews: 214,
    price: "From $85",
    adultPrice: 85,
    childPrice: 45,
    image: mnemba,
    gallery: [mnemba, gallery1, gallery4],
    ...commonDetails,
  },
  {
    id: "safari-blue-tour",
    name: "Safari Blue Tour",
    category: "ocean-beach",
    categoryLabel: "Ocean & Beach",
    location: "Menai Bay",
    duration: "Full day",
    description: "Dhow sailing, sandbanks, lagoon swimming, and fresh coastal flavors.",
    overview: "A classic Zanzibar sea adventure upgraded with smoother service and polished details.",
    rating: 4.8,
    reviews: 189,
    price: "From $95",
    adultPrice: 95,
    childPrice: 55,
    image: safariBlue,
    gallery: [safariBlue, gallery3, gallery6],
    ...commonDetails,
  },
  {
    id: "dolphin-tour-kizimkazi",
    name: "Dolphin Tour Kizimkazi",
    category: "ocean-beach",
    categoryLabel: "Ocean & Beach",
    location: "Kizimkazi",
    duration: "Morning",
    description: "Early morning coastal trip with a chance to see dolphins respectfully.",
    overview: "A sunrise ocean experience focused on responsible viewing and coastal beauty.",
    rating: 4.7,
    reviews: 142,
    price: "From $70",
    adultPrice: 70,
    childPrice: 40,
    image: nungwi,
    gallery: [nungwi, gallery4, jambiani],
    ...commonDetails,
  },
  {
    id: "stone-town-tour",
    name: "Stone Town Tour",
    category: "cultural-historical",
    categoryLabel: "Cultural & Historical",
    location: "Stone Town",
    duration: "3 hours",
    description: "UNESCO alleys, carved doors, markets, stories, and coastal history.",
    overview: "A guided walk through the soul of Zanzibar with culture, architecture, and spice-era stories.",
    rating: 4.9,
    reviews: 276,
    price: "From $45",
    adultPrice: 45,
    childPrice: 25,
    image: stoneTown,
    gallery: [stoneTown, gallery2, gallery5],
    ...commonDetails,
  },
  {
    id: "jozani-forest-tour",
    name: "Jozani Forest Tour",
    category: "nature-wildlife",
    categoryLabel: "Nature & Wildlife",
    location: "Jozani Chwaka Bay",
    duration: "Half day",
    description: "Red colobus monkeys, shaded forest trails, and mangrove boardwalks.",
    overview: "An easy nature escape into Zanzibar's protected forest and rare wildlife habitats.",
    rating: 4.8,
    reviews: 168,
    price: "From $55",
    adultPrice: 55,
    childPrice: 30,
    image: jozani,
    gallery: [jozani, gallery6, matemwe],
    ...commonDetails,
  },
  {
    id: "serengeti-safari",
    name: "Serengeti Safari",
    category: "safari-tours",
    categoryLabel: "Safari Tours",
    location: "Serengeti National Park",
    duration: "3-5 days",
    description: "A mainland safari extension for big cats, open plains, and iconic sunsets.",
    overview: "A luxury-ready safari template for future backend package pricing and availability.",
    rating: 5,
    reviews: 121,
    price: "From $890",
    adultPrice: 890,
    childPrice: 520,
    image: aboutZanzibar,
    gallery: [aboutZanzibar, gallery3, heroZanzibar],
    ...commonDetails,
  },
  {
    id: "ngorongoro-crater-safari",
    name: "Ngorongoro Crater Safari",
    category: "safari-tours",
    categoryLabel: "Safari Tours",
    location: "Ngorongoro",
    duration: "2-3 days",
    description: "Crater landscapes, premium game drives, and a compact safari itinerary.",
    overview: "A dramatic Tanzania safari add-on designed for guests combining beach and wildlife.",
    rating: 4.9,
    reviews: 104,
    price: "From $760",
    adultPrice: 760,
    childPrice: 440,
    image: kendwa,
    gallery: [kendwa, gallery1, aboutZanzibar],
    ...commonDetails,
  },
  {
    id: "romantic-beach-setup",
    name: "Romantic Beach Setup",
    category: "special-experiences",
    categoryLabel: "Special Experiences",
    location: "Zanzibar Beach",
    duration: "Evening",
    description: "Elegant beach styling for proposals, anniversaries, and private dinners.",
    overview: "A personalized romantic setup with soft lighting, beach ambiance, and concierge support.",
    rating: 5,
    reviews: 93,
    price: "From $180",
    adultPrice: 180,
    childPrice: 0,
    image: gallery5,
    gallery: [gallery5, paje, gallery6],
    ...commonDetails,
  },
  {
    id: "spice-farm-cultural-tour",
    name: "Spice Farm Cultural Tour",
    category: "city-tours",
    categoryLabel: "City Tours",
    location: "Central Zanzibar",
    duration: "Half day",
    description: "Cloves, vanilla, tropical fruits, and a sensory local culture experience.",
    overview: "A relaxed cultural tour through Zanzibar's spice heritage and village life.",
    rating: 4.7,
    reviews: 116,
    price: "From $50",
    adultPrice: 50,
    childPrice: 25,
    image: gallery2,
    gallery: [gallery2, jambiani, stoneTown],
    ...commonDetails,
  },
];

export const featuredTours = allTours.slice(0, 8);

export const testimonials = [
  {
    name: "Sophia Laurent",
    location: "Paris, France",
    rating: 5,
    text: "The team planned everything beautifully. Mnemba, Stone Town, and the beach dinner all felt effortless.",
  },
  {
    name: "Daniel Okafor",
    location: "Lagos, Nigeria",
    rating: 5,
    text: "Fast WhatsApp support, clean transfers, and guides who truly knew Zanzibar. Very professional.",
  },
  {
    name: "Amina Hassan",
    location: "Doha, Qatar",
    rating: 5,
    text: "Our family safari and beach package was smooth from the first message to the final airport transfer.",
  },
];

export const galleryImages = [
  { src: heroZanzibar, title: "Zanzibar coastline" },
  { src: mnemba, title: "Mnemba snorkeling" },
  { src: safariBlue, title: "Safari Blue dhow" },
  { src: stoneTown, title: "Stone Town culture" },
  { src: jozani, title: "Jozani forest" },
  { src: gallery1, title: "Beach escape" },
  { src: gallery2, title: "Local culture" },
  { src: gallery3, title: "Island day" },
  { src: gallery4, title: "Ocean blue" },
  { src: gallery5, title: "Romantic setup" },
  { src: gallery6, title: "Luxury moments" },
  { src: paje, title: "Paje beach" },
];

export const safariPackages = allTours.filter((tour) => tour.category === "safari-tours");
