<?php

namespace App\Mail;

use App\Models\Booking;
use App\Models\HotelBooking;
use App\Models\TransportBooking;
use App\Support\BookingStatusMessage;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingStatusUpdated extends Mailable
{
    use Queueable;
    use SerializesModels;

    public array $details;

    public function __construct(public Booking|HotelBooking|TransportBooking $booking, public string $type)
    {
        $this->details = BookingStatusMessage::details($booking, $type);
    }

    public function build(): self
    {
        return $this
            ->subject('Your Green Star booking is '.$this->details['statusTitle'])
            ->view('emails.booking-status-updated');
    }
}
