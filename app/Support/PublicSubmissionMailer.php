<?php

namespace App\Support;

use App\Mail\BookingRequestAdmin;
use App\Mail\BookingRequestCustomer;
use App\Mail\ContactMessageAdmin;
use App\Models\Booking;
use App\Models\HotelBooking;
use App\Models\Inquiry;
use App\Models\TransportBooking;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class PublicSubmissionMailer
{
    private const BOOKING_INBOX = 'booking@greenstartour.com';
    private const CONTACT_INBOX = 'info@greenstartour.com';

    public function bookingReceived(Booking|HotelBooking|TransportBooking $booking, string $type): void
    {
        $this->loadBookingRelation($booking, $type);
        $details = $this->bookingDetails($booking, $type);

        $this->send('public booking admin notification', function () use ($booking, $type, $details) {
            Mail::to(self::BOOKING_INBOX)->send(new BookingRequestAdmin($booking, $type, $details));
        });

        if ($booking->email) {
            $this->send('public booking customer confirmation', function () use ($booking, $type, $details) {
                Mail::to($booking->email)->send(new BookingRequestCustomer($booking, $type, $details));
            });
        }
    }

    public function contactReceived(Inquiry $inquiry): void
    {
        $this->send('public contact admin notification', function () use ($inquiry) {
            Mail::to(self::CONTACT_INBOX)->send(new ContactMessageAdmin($inquiry));
        });
    }

    private function send(string $label, callable $callback): void
    {
        try {
            $callback();
        } catch (\Throwable $exception) {
            Log::warning($label.' failed', ['error' => $exception->getMessage()]);
        }
    }

    private function loadBookingRelation(Booking|HotelBooking|TransportBooking $booking, string $type): void
    {
        if ($type === 'tour') {
            $booking->loadMissing('tour');
        }

        if ($type === 'hotel') {
            $booking->loadMissing('hotel');
        }
    }

    private function bookingDetails(Booking|HotelBooking|TransportBooking $booking, string $type): array
    {
        return [
            'typeLabel' => match ($type) {
                'hotel' => 'hotel booking',
                'transport' => 'transport booking',
                default => 'tour booking',
            },
            'customerName' => $booking->full_name,
            'email' => $booking->email,
            'whatsapp' => $booking->whatsapp_number,
            'serviceName' => $this->serviceName($booking, $type),
            'dateLine' => $this->dateLine($booking, $type),
            'guestsLine' => $this->guestsLine($booking),
            'pickupLine' => $this->pickupLine($booking, $type),
            'roomType' => $type === 'hotel' ? $booking->room_type : null,
            'total' => $this->money($booking->estimated_total),
            'message' => $booking->message,
            'submittedAt' => $booking->created_at?->format('D, d M Y H:i'),
        ];
    }

    private function serviceName(Booking|HotelBooking|TransportBooking $booking, string $type): string
    {
        if ($type === 'hotel') {
            return $booking->hotel?->name ?? 'Hotel booking request';
        }

        if ($type === 'transport') {
            return trim(($booking->service_type ?: 'Transport').' - '.$booking->pickup_location.' to '.$booking->dropoff_location);
        }

        return $booking->tour?->title ?? 'Tour booking request';
    }

    private function dateLine(Booking|HotelBooking|TransportBooking $booking, string $type): ?string
    {
        if ($type === 'hotel') {
            $checkIn = $this->readableDate($booking->check_in);
            $checkOut = $this->readableDate($booking->check_out);

            return trim($checkIn.($checkOut ? ' to '.$checkOut : '')) ?: null;
        }

        return $this->readableDate($booking->travel_date);
    }

    private function guestsLine(Booking|HotelBooking|TransportBooking $booking): string
    {
        $adults = (int) ($booking->number_of_adults ?? $booking->number_of_guests ?? $booking->number_of_passengers ?? 1);
        $children = (int) ($booking->number_of_children ?? 0);

        return $adults.' adult'.($adults === 1 ? '' : 's').', '.$children.' child'.($children === 1 ? '' : 'ren');
    }

    private function pickupLine(Booking|HotelBooking|TransportBooking $booking, string $type): ?string
    {
        if ($type === 'transport') {
            return trim($booking->pickup_location.' to '.$booking->dropoff_location);
        }

        return $booking->pickup_location ?: null;
    }

    private function readableDate(mixed $value): ?string
    {
        return $value ? Carbon::parse($value)->format('D, d M Y') : null;
    }

    private function money(mixed $value): ?string
    {
        return $value === null || $value === '' ? null : '$'.number_format((float) $value, 2);
    }
}
