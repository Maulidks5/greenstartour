<?php

namespace App\Support;

use App\Models\Gallery;
use App\Models\HeroSlide;
use App\Models\Hotel;
use App\Models\PartnershipRequest;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\Tour;
use App\Models\TourCategory;
use App\Models\TransportRoute;
use App\Models\TransportService;

class PublicContent
{
    public static function payload(): array
    {
        return [
            'settings' => SiteSetting::where('status', 'active')
                ->pluck('value', 'key'),
            'categories' => TourCategory::where('status', 'active')->orderBy('name')->get(),
            'heroSlides' => HeroSlide::where('status', 'active')
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(),
            'tours' => Tour::with('category:id,name,slug')
                ->where('status', 'active')
                ->latest()
                ->get(),
            'hotels' => Hotel::where('status', 'active')
                ->latest()
                ->get(),
            'gallery' => Gallery::where('status', 'active')
                ->latest()
                ->get(),
            'testimonials' => Testimonial::where('status', 'active')
                ->latest()
                ->get(),
            'partners' => PartnershipRequest::where('status', 'approved')
                ->whereNotNull('logo')
                ->latest()
                ->get(['id', 'company_name', 'full_name', 'logo']),
            'transportServices' => TransportService::where('status', 'active')
                ->orderBy('sort_order')
                ->orderBy('title')
                ->get(),
            'transportRoutes' => TransportRoute::where('status', 'active')
                ->orderBy('sort_order')
                ->orderBy('pickup_location')
                ->get(),
        ];
    }
}
