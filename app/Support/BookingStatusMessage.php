<?php

namespace App\Support;

use App\Models\Booking;
use App\Models\HotelBooking;
use App\Models\TransportBooking;
use Illuminate\Support\Carbon;

class BookingStatusMessage
{
    public static function details(Booking|HotelBooking|TransportBooking $booking, string $type): array
    {
        $status = (string) $booking->status;

        return [
            'type' => $type,
            'customerName' => $booking->full_name,
            'email' => $booking->email,
            'whatsapp' => $booking->whatsapp_number,
            'serviceName' => self::serviceName($booking, $type),
            'dateLine' => self::dateLine($booking, $type),
            'total' => self::money($booking->estimated_total),
            'status' => $status,
            'statusTitle' => self::statusTitle($status),
            'intro' => self::intro($status),
            'adminNote' => $booking->admin_note,
        ];
    }

    public static function plainText(Booking|HotelBooking|TransportBooking $booking, string $type): string
    {
        $details = self::details($booking, $type);

        return collect([
            'Hello '.$details['customerName'].',',
            $details['intro'],
            'Service: '.$details['serviceName'],
            $details['dateLine'] ? 'Date: '.$details['dateLine'] : null,
            'Status: '.$details['statusTitle'],
            $details['total'] ? 'Agreed price: '.$details['total'] : null,
            $details['adminNote'] ? 'Note: '.$details['adminNote'] : null,
            'For quick help, reply to this message on WhatsApp.',
            'Green Star Island Tour & Safari',
        ])->filter()->implode("\n");
    }

    private static function serviceName(Booking|HotelBooking|TransportBooking $booking, string $type): string
    {
        if ($type === 'hotel') {
            return $booking->hotel?->name ?? 'Hotel booking';
        }

        if ($type === 'transport') {
            return trim(($booking->service_type ?: 'Transport').' - '.$booking->pickup_location.' to '.$booking->dropoff_location);
        }

        return $booking->tour?->title ?? 'Tour booking';
    }

    private static function dateLine(Booking|HotelBooking|TransportBooking $booking, string $type): ?string
    {
        if ($type === 'hotel') {
            $checkIn = self::readableDate($booking->check_in);
            $checkOut = self::readableDate($booking->check_out);

            return trim($checkIn.($checkOut ? ' to '.$checkOut : '')) ?: null;
        }

        return self::readableDate($booking->travel_date);
    }

    private static function readableDate(mixed $value): ?string
    {
        if (! $value) {
            return null;
        }

        return Carbon::parse($value)->format('D, d M Y');
    }

    private static function money(mixed $value): ?string
    {
        if ($value === null || $value === '') {
            return null;
        }

        return '$'.number_format((float) $value, 2);
    }

    private static function statusTitle(string $status): string
    {
        return match ($status) {
            'confirmed' => 'Confirmed',
            'cancelled' => 'Cancelled',
            default => 'Pending',
        };
    }

    private static function intro(string $status): string
    {
        return match ($status) {
            'confirmed' => 'Good news. Your booking has been confirmed.',
            'cancelled' => 'Your booking request has been cancelled. Please contact us if you would like another option.',
            default => 'We have received your booking request and our team is reviewing it.',
        };
    }
}
