<?php

namespace Database\Seeders;

use App\Models\Gallery;
use App\Models\HeroSlide;
use App\Models\Hotel;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\Tour;
use App\Models\TourCategory;
use App\Models\TransportRoute;
use App\Models\TransportService;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Green Star Admin',
                'password' => Hash::make('password'),
                'role' => 'admin',
                'status' => 'active',
            ]
        );

        foreach ([
            ['key' => 'site_name', 'label' => 'Site Name', 'value' => 'Green Star Island Tour & Safari', 'group' => 'general'],
            ['key' => 'whatsapp_number', 'label' => 'WhatsApp Number', 'value' => '+255 628 686 994', 'group' => 'contact'],
            ['key' => 'currency_symbol', 'label' => 'Currency Symbol', 'value' => '€', 'group' => 'booking'],
            ['key' => 'contact_email', 'label' => 'Contact Email', 'value' => 'hello@greenstarisland.com', 'group' => 'contact'],
            ['key' => 'office_location', 'label' => 'Office Location', 'value' => 'Stone Town, Zanzibar', 'group' => 'contact'],
            ['key' => 'instagram_url', 'label' => 'Instagram URL', 'value' => '#', 'group' => 'social'],
            ['key' => 'facebook_url', 'label' => 'Facebook URL', 'value' => '#', 'group' => 'social'],
            ['key' => 'youtube_url', 'label' => 'YouTube URL', 'value' => '#', 'group' => 'social'],
        ] as $setting) {
            SiteSetting::updateOrCreate(
                ['key' => $setting['key']],
                [
                    ...$setting,
                    'status' => 'active',
                ]
            );
        }

        foreach ([
            [
                'label' => 'Zanzibar Travel Help',
                'title' => 'Tours, Hotels & Transport Made Simple',
                'subtitle' => 'Book beach tours, safaris, hotel stays, and private transfers with trusted local support.',
                'image' => '/assets/hero-zanzibar.jpg',
            ],
            [
                'label' => 'Ocean & Beach Tours',
                'title' => 'Clear Blue Water, Private Island Moments',
                'subtitle' => 'Snorkeling, sandbanks, dhow cruises, beach hotels, and smooth pickup plans.',
                'image' => '/assets/tour-mnemba.jpg',
            ],
            [
                'label' => 'Safari Blue Experience',
                'title' => "Sail Zanzibar's Most Beautiful Coastline",
                'subtitle' => 'Dhow sailing, lagoon swimming, seafood, hotel pickup, and friendly local help.',
                'image' => '/assets/tour-safari-blue.jpg',
            ],
        ] as $index => $slide) {
            HeroSlide::updateOrCreate(
                ['title' => $slide['title']],
                [
                    ...$slide,
                    'sort_order' => $index + 1,
                    'status' => 'active',
                ]
            );
        }

        $categories = collect([
            ['name' => 'Ocean & Beach Tours', 'icon' => 'waves', 'image' => '/assets/tour-mnemba.jpg'],
            ['name' => 'Nature & Wildlife Tours', 'icon' => 'leaf', 'image' => '/assets/tour-jozani.jpg'],
            ['name' => 'Cultural & Historical Tours', 'icon' => 'landmark', 'image' => '/assets/tour-stone-town.jpg'],
            ['name' => 'Special Zanzibar Experiences', 'icon' => 'sparkles', 'image' => '/assets/romantic-beach.jpg'],
            ['name' => 'Tanzania Safari Tours', 'icon' => 'binoculars', 'image' => '/assets/tour-serengeti.jpg'],
            ['name' => 'City & Cultural Tours', 'icon' => 'map', 'image' => '/assets/tour-stone-town.jpg'],
        ])->mapWithKeys(function (array $category) {
            $record = TourCategory::updateOrCreate(
                ['slug' => Str::slug($category['name'])],
                [
                    'name' => $category['name'],
                    'description' => 'Curated travel experiences designed for comfort, culture, and unforgettable memories.',
                    'icon' => $category['icon'],
                    'image' => $category['image'],
                    'status' => 'active',
                ]
            );

            return [$category['name'] => $record];
        });

        $tours = [
            [
                'category' => 'Ocean & Beach Tours',
                'title' => 'Mnemba Island Snorkeling',
                'location' => 'Mnemba Atoll, Zanzibar',
                'duration' => 'Half day',
                'price' => 75,
                'image' => '/assets/tour-mnemba.jpg',
                'short' => 'Clear-water snorkeling with reef life, dolphins, and a relaxed beach escape.',
            ],
            [
                'category' => 'Ocean & Beach Tours',
                'title' => 'Safari Blue Tour',
                'location' => 'Menai Bay, Zanzibar',
                'duration' => 'Full day',
                'price' => 95,
                'image' => '/assets/tour-safari-blue.jpg',
                'short' => 'Traditional dhow sailing, sandbank swimming, seafood lunch, and lagoon views.',
            ],
            [
                'category' => 'Ocean & Beach Tours',
                'title' => 'Dolphin Tour Kizimkazi',
                'location' => 'Kizimkazi, Zanzibar',
                'duration' => 'Half day',
                'price' => 65,
                'image' => '/assets/tour-dolphin.jpg',
                'short' => 'Early morning dolphin watching with a peaceful southern coast beach visit.',
            ],
            [
                'category' => 'Cultural & Historical Tours',
                'title' => 'Stone Town Tour',
                'location' => 'Stone Town, Zanzibar',
                'duration' => '3 hours',
                'price' => 45,
                'image' => '/assets/tour-stone-town.jpg',
                'short' => 'Walk through UNESCO heritage streets, spice markets, carved doors, and old forts.',
            ],
            [
                'category' => 'Nature & Wildlife Tours',
                'title' => 'Jozani Forest Tour',
                'location' => 'Jozani Chwaka Bay',
                'duration' => 'Half day',
                'price' => 55,
                'image' => '/assets/tour-jozani.jpg',
                'short' => 'Meet red colobus monkeys and explore mangrove boardwalks with a local guide.',
            ],
            [
                'category' => 'Tanzania Safari Tours',
                'title' => 'Serengeti Safari',
                'location' => 'Serengeti National Park',
                'duration' => '3 days',
                'price' => 780,
                'image' => '/assets/tour-serengeti.jpg',
                'short' => "Premium wildlife safari across one of Africa's most iconic national parks.",
            ],
            [
                'category' => 'Tanzania Safari Tours',
                'title' => 'Ngorongoro Crater Safari',
                'location' => 'Ngorongoro, Tanzania',
                'duration' => '2 days',
                'price' => 620,
                'image' => '/assets/tour-ngorongoro.jpg',
                'short' => 'A dramatic crater safari with rich wildlife, sweeping views, and expert guiding.',
            ],
            [
                'category' => 'Special Zanzibar Experiences',
                'title' => 'Romantic Beach Setup',
                'location' => 'Nungwi or Kendwa',
                'duration' => 'Evening',
                'price' => 180,
                'image' => '/assets/romantic-beach.jpg',
                'short' => 'Private sunset styling for proposals, anniversaries, and unforgettable dinners.',
            ],
        ];

        foreach ($tours as $tour) {
            Tour::updateOrCreate(
                ['slug' => Str::slug($tour['title'])],
                [
                    'category_id' => $categories[$tour['category']]->id,
                    'title' => $tour['title'],
                    'location' => $tour['location'],
                    'duration' => $tour['duration'],
                    'price' => $tour['price'],
                    'adult_price' => $tour['price'],
                    'child_price' => round($tour['price'] * 0.55),
                    'pricing_note' => 'Children price applies for ages 4-11. Infants can be confirmed by WhatsApp.',
                    'short_description' => $tour['short'],
                    'description' => 'A refined Green Star Island experience with private-friendly planning, reliable communication, and local insight from start to finish.',
                    'highlights' => ['Private-friendly itinerary', 'Local expert guide', 'Hotel pickup options', 'Flexible WhatsApp support'],
                    'included' => ['Professional guide', 'Pickup guidance', 'Entry coordination', 'Drinking water'],
                    'not_included' => ['Personal expenses', 'Tips', 'International flights'],
                    'itinerary' => ['Pickup and briefing', 'Main tour experience', 'Photo stops and free time', 'Return transfer guidance'],
                    'what_to_bring' => ['Comfortable clothes', 'Sunscreen', 'Camera', 'Valid ID'],
                    'important_information' => ['Final timing is confirmed by WhatsApp after inquiry.', 'Prices are placeholders and may vary by group size.'],
                    'main_image' => $tour['image'],
                    'gallery_images' => [$tour['image'], '/assets/hero-zanzibar.jpg', '/assets/gallery-sunset.jpg'],
                    'rating' => 4.9,
                    'status' => 'active',
                    'is_featured' => true,
                ]
            );
        }

        foreach ([
            ['name' => 'Amina Clarke', 'country' => 'United Kingdom', 'rating' => 5, 'review' => 'Beautiful planning, quick WhatsApp support, and guides who made Zanzibar feel effortless.', 'image' => '/assets/testimonial-1.jpg'],
            ['name' => 'Marco Silva', 'country' => 'Italy', 'rating' => 5, 'review' => 'The safari and beach combination was smooth, premium, and exactly what we hoped for.', 'image' => '/assets/testimonial-2.jpg'],
            ['name' => 'Nora Jensen', 'country' => 'Denmark', 'rating' => 5, 'review' => 'Clean communication, lovely tour choices, and very friendly local service.', 'image' => '/assets/testimonial-3.jpg'],
        ] as $testimonial) {
            Testimonial::updateOrCreate(
                ['name' => $testimonial['name'], 'country' => $testimonial['country']],
                [...$testimonial, 'status' => 'active']
            );
        }

        foreach ([
            ['title' => 'Zanzibar Sunset Dhow', 'image' => '/assets/gallery-sunset.jpg', 'category' => 'Ocean'],
            ['title' => 'Stone Town Heritage', 'image' => '/assets/tour-stone-town.jpg', 'category' => 'Culture'],
            ['title' => 'Serengeti Wildlife', 'image' => '/assets/tour-serengeti.jpg', 'category' => 'Safari'],
            ['title' => 'Mnemba Lagoon', 'image' => '/assets/tour-mnemba.jpg', 'category' => 'Beach'],
        ] as $gallery) {
            Gallery::updateOrCreate(
                ['title' => $gallery['title']],
                [...$gallery, 'status' => 'active']
            );
        }

        foreach ([
            [
                'name' => 'Kendwa Beach Resort',
                'location' => 'Kendwa, Zanzibar',
                'hotel_type' => 'Beach Resort',
                'price_from' => '$180 / night',
                'price_per_night' => 180,
                'child_policy' => 'Children and extra beds are confirmed by room type.',
                'short_description' => 'Calm beach stay with sunset views, easy swimming, and premium guest comfort.',
                'main_image' => '/assets/dest-kendwa.jpg',
                'gallery_images' => ['/assets/dest-kendwa.jpg', '/assets/hero-zanzibar.jpg', '/assets/dest-paje.jpg'],
            ],
            [
                'name' => 'Paje Boutique Stay',
                'location' => 'Paje, Zanzibar',
                'hotel_type' => 'Boutique Hotel',
                'price_from' => '$95 / night',
                'price_per_night' => 95,
                'child_policy' => 'Children and extra beds are confirmed by room type.',
                'short_description' => 'Light, relaxed stay near the beach for couples, solo travellers, and kite lovers.',
                'main_image' => '/assets/dest-paje.jpg',
                'gallery_images' => ['/assets/dest-paje.jpg', '/assets/dest-jambiani.jpg', '/assets/tour-safari-blue.jpg'],
            ],
            [
                'name' => 'Stone Town Heritage Hotel',
                'location' => 'Stone Town, Zanzibar',
                'hotel_type' => 'City Hotel',
                'price_from' => '$120 / night',
                'price_per_night' => 120,
                'child_policy' => 'Children and extra beds are confirmed by room type.',
                'short_description' => 'Convenient cultural stay near markets, old streets, restaurants, and the seafront.',
                'main_image' => '/assets/tour-stone-town.jpg',
                'gallery_images' => ['/assets/tour-stone-town.jpg', '/assets/hero-zanzibar.jpg', '/assets/dest-kendwa.jpg'],
            ],
            [
                'name' => 'Jambiani Ocean Villa',
                'location' => 'Jambiani, Zanzibar',
                'hotel_type' => 'Luxury Villa',
                'price_from' => '$240 / night',
                'price_per_night' => 240,
                'child_policy' => 'Children and extra beds are confirmed by room type.',
                'short_description' => 'Private-friendly villa option for families, honeymooners, and small groups.',
                'main_image' => '/assets/dest-jambiani.jpg',
                'gallery_images' => ['/assets/dest-jambiani.jpg', '/assets/dest-paje.jpg', '/assets/hero-zanzibar.jpg'],
            ],
        ] as $hotel) {
            Hotel::updateOrCreate(
                ['slug' => Str::slug($hotel['name'])],
                [
                    ...$hotel,
                    'rating' => 4.8,
                    'status' => 'active',
                    'is_featured' => true,
                ]
            );
        }

        foreach ([
            [
                'title' => 'Airport Transfer',
                'description' => 'Smooth pickup from Zanzibar Airport to your hotel, villa, or ferry area.',
                'image' => '/assets/hero-zanzibar.jpg',
            ],
            [
                'title' => 'Private Driver',
                'description' => 'Flexible driver service for restaurants, shopping, beaches, and custom day plans.',
                'image' => '/assets/tour-stone-town.jpg',
            ],
            [
                'title' => 'Hotel to Hotel Transfer',
                'description' => 'Easy movement between Stone Town, beach areas, resorts, and villas.',
                'image' => '/assets/dest-kendwa.jpg',
            ],
            [
                'title' => 'Tour Transport',
                'description' => 'Reliable cars and group transport for tours, families, and special experiences.',
                'image' => '/assets/tour-safari-blue.jpg',
            ],
        ] as $index => $service) {
            TransportService::updateOrCreate(
                ['slug' => Str::slug($service['title'])],
                [
                    ...$service,
                    'status' => 'active',
                    'sort_order' => $index + 1,
                ]
            );
        }

        foreach ([
            ['pickup_location' => 'Zanzibar Airport', 'dropoff_location' => 'Stone Town', 'vehicle_type' => 'Private car', 'base_price' => 25],
            ['pickup_location' => 'Zanzibar Airport', 'dropoff_location' => 'Nungwi / Kendwa', 'vehicle_type' => 'Private car', 'base_price' => 60],
            ['pickup_location' => 'Zanzibar Airport', 'dropoff_location' => 'Paje / Jambiani', 'vehicle_type' => 'Private car', 'base_price' => 55],
            ['pickup_location' => 'Stone Town', 'dropoff_location' => 'Nungwi / Kendwa', 'vehicle_type' => 'Private car', 'base_price' => 55],
            ['pickup_location' => 'Stone Town', 'dropoff_location' => 'Paje / Jambiani', 'vehicle_type' => 'Private car', 'base_price' => 50],
        ] as $index => $route) {
            TransportRoute::updateOrCreate(
                [
                    'pickup_location' => $route['pickup_location'],
                    'dropoff_location' => $route['dropoff_location'],
                    'vehicle_type' => $route['vehicle_type'],
                ],
                [
                    ...$route,
                    'status' => 'active',
                    'sort_order' => $index + 1,
                ]
            );
        }
    }
}
