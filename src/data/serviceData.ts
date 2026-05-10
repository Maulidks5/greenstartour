import kendwaImg from "@/assets/dest-kendwa.jpg";
import pajeImg from "@/assets/dest-paje.jpg";
import stoneTownImg from "@/assets/tour-stone-town.jpg";
import jambianiImg from "@/assets/dest-jambiani.jpg";
import heroImg from "@/assets/hero-zanzibar.jpg";
import safariBlueImg from "@/assets/tour-safari-blue.jpg";

export const featuredHotels = [
  {
    id: "kendwa-beach-resort",
    name: "Kendwa Beach Resort",
    location: "Kendwa, Zanzibar",
    type: "Beach Resort",
    price: "From $180 / night",
    rating: 4.9,
    image: kendwaImg,
    gallery: [kendwaImg, heroImg, pajeImg, jambianiImg],
    amenities: ["Beachfront", "Sunset area", "Restaurant", "Airport transfer help"],
    description: "Calm beach stay with sunset views, easy swimming, and premium guest comfort.",
  },
  {
    id: "paje-boutique-stay",
    name: "Paje Boutique Stay",
    location: "Paje, Zanzibar",
    type: "Boutique Hotel",
    price: "From $95 / night",
    rating: 4.8,
    image: pajeImg,
    gallery: [pajeImg, jambianiImg, kendwaImg, safariBlueImg],
    amenities: ["Near beach", "Kite area", "Breakfast options", "Tour pickup help"],
    description: "Relaxed stay near the beach for couples, solo travellers, and kite lovers.",
  },
  {
    id: "stone-town-heritage-hotel",
    name: "Stone Town Heritage Hotel",
    location: "Stone Town",
    type: "City Hotel",
    price: "From $120 / night",
    rating: 4.7,
    image: stoneTownImg,
    gallery: [stoneTownImg, heroImg, kendwaImg, pajeImg],
    amenities: ["City location", "Culture nearby", "Restaurant access", "Airport transfer help"],
    description: "Convenient cultural stay near markets, old streets, restaurants, and the seafront.",
  },
  {
    id: "jambiani-ocean-villa",
    name: "Jambiani Ocean Villa",
    location: "Jambiani, Zanzibar",
    type: "Luxury Villa",
    price: "From $240 / night",
    rating: 4.9,
    image: jambianiImg,
    gallery: [jambianiImg, pajeImg, kendwaImg, heroImg],
    amenities: ["Private-friendly", "Family option", "Ocean area", "Driver arrangement"],
    description: "Private-friendly villa option for families, honeymooners, and small groups.",
  },
];

export const transportServices = [
  {
    id: "airport-transfer",
    title: "Airport Transfer",
    description: "Smooth pickup from Zanzibar Airport to your hotel or villa.",
    image: heroImg,
  },
  {
    id: "private-driver",
    title: "Private Driver",
    description: "Flexible driver service for shopping, restaurants, beaches, and day plans.",
    image: stoneTownImg,
  },
  {
    id: "hotel-transfer",
    title: "Hotel to Hotel Transfer",
    description: "Move between beach areas, Stone Town, and resorts without stress.",
    image: kendwaImg,
  },
  {
    id: "tour-transport",
    title: "Tour Transport",
    description: "Reliable transport for tours, groups, families, and custom experiences.",
    image: safariBlueImg,
  },
];
