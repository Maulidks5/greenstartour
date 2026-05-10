<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Hotel;
use App\Models\HotelBooking;
use App\Models\Inquiry;
use App\Models\PartnershipRequest;
use App\Models\Testimonial;
use App\Models\Tour;
use App\Models\TransportBooking;
use App\Models\TransportRoute;
use App\Support\PublicSubmissionMailer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PublicSubmissionController extends Controller
{
    public function __construct(private PublicSubmissionMailer $mailer)
    {
    }

    public function booking(Request $request): JsonResponse
    {
        $data = $request->validate([
            'tour_slug' => ['nullable', 'string'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'travel_date' => ['nullable', 'date'],
            'number_of_adults' => ['nullable', 'integer', 'min:1'],
            'number_of_children' => ['nullable', 'integer', 'min:0'],
            'pickup_location' => ['nullable', 'string', 'max:255'],
            'number_of_guests' => ['nullable', 'integer', 'min:1'],
            'estimated_total' => ['nullable', 'numeric', 'min:0'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $tour = isset($data['tour_slug']) ? Tour::where('slug', $data['tour_slug'])->first() : null;

        $booking = Booking::create([
            'tour_id' => $tour?->id,
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'whatsapp_number' => $data['whatsapp_number'],
            'country' => $data['country'] ?? null,
            'travel_date' => $data['travel_date'] ?? null,
            'number_of_adults' => $data['number_of_adults'] ?? $data['number_of_guests'] ?? 1,
            'number_of_children' => $data['number_of_children'] ?? 0,
            'pickup_location' => $data['pickup_location'] ?? null,
            'number_of_guests' => $data['number_of_guests'] ?? 1,
            'estimated_total' => $data['estimated_total'] ?? null,
            'message' => $data['message'] ?? null,
            'status' => 'pending',
        ]);

        $this->mailer->bookingReceived($booking, 'tour');

        return response()->json(['message' => 'Booking inquiry sent.']);
    }

    public function inquiry(Request $request): JsonResponse
    {
        $inquiry = Inquiry::create($request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:255'],
            'subject' => ['nullable', 'string', 'max:255'],
            'message' => ['required', 'string', 'max:5000'],
        ]) + ['status' => 'pending']);

        $this->mailer->contactReceived($inquiry);

        return response()->json(['message' => 'Message sent.']);
    }

    public function hotelBooking(Request $request): JsonResponse
    {
        $data = $request->validate([
            'hotel_slug' => ['nullable', 'string'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'check_in' => ['nullable', 'date'],
            'check_out' => ['nullable', 'date', 'after_or_equal:check_in'],
            'number_of_adults' => ['nullable', 'integer', 'min:1'],
            'number_of_children' => ['nullable', 'integer', 'min:0'],
            'number_of_guests' => ['nullable', 'integer', 'min:1'],
            'estimated_total' => ['nullable', 'numeric', 'min:0'],
            'room_type' => ['nullable', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $hotel = isset($data['hotel_slug']) ? Hotel::where('slug', $data['hotel_slug'])->first() : null;

        $booking = HotelBooking::create([
            'hotel_id' => $hotel?->id,
            'full_name' => $data['full_name'],
            'email' => $data['email'],
            'whatsapp_number' => $data['whatsapp_number'],
            'country' => $data['country'] ?? null,
            'check_in' => $data['check_in'] ?? null,
            'check_out' => $data['check_out'] ?? null,
            'number_of_adults' => $data['number_of_adults'] ?? $data['number_of_guests'] ?? 1,
            'number_of_children' => $data['number_of_children'] ?? 0,
            'number_of_guests' => $data['number_of_guests'] ?? 1,
            'estimated_total' => $data['estimated_total'] ?? null,
            'room_type' => $data['room_type'] ?? null,
            'message' => $data['message'] ?? null,
            'status' => 'pending',
        ]);

        $this->mailer->bookingReceived($booking, 'hotel');

        return response()->json(['message' => 'Hotel booking request sent.']);
    }

    public function transportBooking(Request $request): JsonResponse
    {
        $data = $request->validate([
            'service_type' => ['required', 'string', 'max:255'],
            'full_name' => ['required', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'whatsapp_number' => ['required', 'string', 'max:255'],
            'pickup_location' => ['required', 'string', 'max:255'],
            'dropoff_location' => ['required', 'string', 'max:255'],
            'travel_date' => ['nullable', 'date'],
            'travel_time' => ['nullable', 'string', 'max:255'],
            'number_of_adults' => ['nullable', 'integer', 'min:1'],
            'number_of_children' => ['nullable', 'integer', 'min:0'],
            'number_of_passengers' => ['nullable', 'integer', 'min:1'],
            'estimated_total' => ['nullable', 'numeric', 'min:0'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]);

        $route = TransportRoute::where('pickup_location', $data['pickup_location'])
            ->where('dropoff_location', $data['dropoff_location'])
            ->where('status', 'active')
            ->orderBy('sort_order')
            ->first();

        $adults = $data['number_of_adults'] ?? $data['number_of_passengers'] ?? 1;
        $children = $data['number_of_children'] ?? 0;

        $booking = TransportBooking::create([
            'service_type' => $data['service_type'],
            'full_name' => $data['full_name'],
            'email' => $data['email'] ?? null,
            'whatsapp_number' => $data['whatsapp_number'],
            'pickup_location' => $data['pickup_location'],
            'dropoff_location' => $data['dropoff_location'],
            'travel_date' => $data['travel_date'] ?? null,
            'travel_time' => $data['travel_time'] ?? null,
            'number_of_adults' => $adults,
            'number_of_children' => $children,
            'number_of_passengers' => $data['number_of_passengers'] ?? ($adults + $children),
            'estimated_total' => $data['estimated_total'] ?? $route?->base_price,
            'message' => $data['message'] ?? null,
            'status' => 'pending',
        ]);

        $this->mailer->bookingReceived($booking, 'transport');

        return response()->json(['message' => 'Transport request sent.']);
    }

    public function partnership(Request $request): JsonResponse
    {
        PartnershipRequest::create($request->validate([
            'full_name' => ['required', 'string', 'max:255'],
            'company_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255'],
            'whatsapp_number' => ['nullable', 'string', 'max:255'],
            'partnership_type' => ['required', 'string', 'max:255'],
            'message' => ['nullable', 'string', 'max:5000'],
        ]) + ['status' => 'pending']);

        return response()->json(['message' => 'Partnership request sent.']);
    }

    public function testimonial(Request $request): JsonResponse
    {
        Testimonial::create($request->validate([
            'name' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'review' => ['required', 'string', 'min:10', 'max:1000'],
        ]) + ['status' => 'pending']);

        return response()->json(['message' => 'Review received and waiting for approval.']);
    }
}
