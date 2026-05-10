<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Gallery;
use App\Models\Hotel;
use App\Models\HotelBooking;
use App\Models\Inquiry;
use App\Models\PartnershipRequest;
use App\Models\Testimonial;
use App\Models\Tour;
use App\Models\TransportBooking;
use App\Models\TransportService;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        $recentTourBookings = Booking::with('tour:id,title')->latest()->limit(5)->get()->map(fn (Booking $booking) => [
            'id' => 'tour-'.$booking->id,
            'type' => 'Tour booking',
            'name' => $booking->full_name,
            'service' => $booking->tour?->title ?? 'Custom tour',
            'contact' => $booking->whatsapp_number,
            'status' => $booking->status,
            'created_at' => $booking->created_at?->toDateTimeString(),
        ]);

        $recentHotelBookings = HotelBooking::with('hotel:id,name')->latest()->limit(5)->get()->map(fn (HotelBooking $booking) => [
            'id' => 'hotel-'.$booking->id,
            'type' => 'Hotel booking',
            'name' => $booking->full_name,
            'service' => $booking->hotel?->name ?? 'Custom hotel',
            'contact' => $booking->whatsapp_number,
            'status' => $booking->status,
            'created_at' => $booking->created_at?->toDateTimeString(),
        ]);

        $recentTransport = TransportBooking::latest()->limit(5)->get()->map(fn (TransportBooking $booking) => [
            'id' => 'transport-'.$booking->id,
            'type' => 'Transport',
            'name' => $booking->full_name,
            'service' => $booking->service_type,
            'contact' => $booking->whatsapp_number,
            'status' => $booking->status,
            'created_at' => $booking->created_at?->toDateTimeString(),
        ]);

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalTours' => Tour::count(),
                'totalHotels' => Hotel::count(),
                'totalBookings' => Booking::count(),
                'hotelBookings' => HotelBooking::count(),
                'transportRequests' => TransportBooking::count(),
                'transportServices' => TransportService::count(),
                'pendingInquiries' => Inquiry::where('status', 'pending')->count(),
                'galleryImages' => Gallery::count(),
                'testimonials' => Testimonial::count(),
                'partnershipRequests' => PartnershipRequest::count(),
            ],
            'latestBookings' => Booking::with('tour:id,title')->latest()->limit(5)->get(),
            'latestRequests' => $recentTourBookings
                ->concat($recentHotelBookings)
                ->concat($recentTransport)
                ->sortByDesc('created_at')
                ->values()
                ->take(8),
        ]);
    }
}
