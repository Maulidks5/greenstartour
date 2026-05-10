<?php

namespace App\Http\Middleware;

use App\Models\Booking;
use App\Models\HotelBooking;
use App\Models\Inquiry;
use App\Models\PartnershipRequest;
use App\Models\Testimonial;
use App\Models\TransportBooking;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->only('id', 'name', 'email', 'role'),
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'requestCounts' => fn () => $request->user() && $request->is('admin*') ? [
                'bookings' => Booking::where('status', 'pending')->count(),
                'hotelBookings' => HotelBooking::where('status', 'pending')->count(),
                'transportBookings' => TransportBooking::where('status', 'pending')->count(),
                'inquiries' => Inquiry::where('status', 'pending')->count(),
                'partnershipRequests' => PartnershipRequest::where('status', 'pending')->count(),
                'testimonials' => Testimonial::where('status', 'pending')->count(),
            ] : [],
        ];
    }
}
