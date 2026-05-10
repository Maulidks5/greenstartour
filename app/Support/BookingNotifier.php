<?php

namespace App\Support;

use App\Mail\BookingStatusUpdated;
use App\Models\Booking;
use App\Models\HotelBooking;
use App\Models\TransportBooking;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class BookingNotifier
{
    public function notify(Booking|HotelBooking|TransportBooking $booking, string $type): void
    {
        if ($type === 'tour') {
            $booking->loadMissing('tour');
        }

        if ($type === 'hotel') {
            $booking->loadMissing('hotel');
        }

        $this->sendEmail($booking, $type);
        $this->sendWhatsapp($booking, $type);
    }

    private function sendEmail(Booking|HotelBooking|TransportBooking $booking, string $type): void
    {
        if (! $booking->email) {
            return;
        }

        try {
            Mail::to($booking->email)->send(new BookingStatusUpdated($booking, $type));
        } catch (\Throwable $exception) {
            Log::warning('Booking status email failed', [
                'booking_type' => $type,
                'booking_id' => $booking->id,
                'error' => $exception->getMessage(),
            ]);
        }
    }

    private function sendWhatsapp(Booking|HotelBooking|TransportBooking $booking, string $type): void
    {
        $token = config('services.whatsapp.token');
        $phoneNumberId = config('services.whatsapp.phone_number_id');

        if (! $token || ! $phoneNumberId || ! $booking->whatsapp_number) {
            return;
        }

        try {
            Http::withToken($token)
                ->timeout(10)
                ->post("https://graph.facebook.com/v20.0/{$phoneNumberId}/messages", [
                    'messaging_product' => 'whatsapp',
                    'to' => preg_replace('/\D+/', '', $booking->whatsapp_number),
                    'type' => 'text',
                    'text' => [
                        'preview_url' => false,
                        'body' => BookingStatusMessage::plainText($booking, $type),
                    ],
                ])
                ->throw();
        } catch (\Throwable $exception) {
            Log::warning('Booking status WhatsApp failed', [
                'booking_type' => $type,
                'booking_id' => $booking->id,
                'error' => $exception->getMessage(),
            ]);
        }
    }
}
