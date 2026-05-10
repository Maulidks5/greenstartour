<?php

namespace App\Mail;

use App\Models\Booking;
use App\Models\HotelBooking;
use App\Models\TransportBooking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingRequestAdmin extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(
        public Booking|HotelBooking|TransportBooking $booking,
        public string $type,
        public array $details,
    ) {
    }

    public function build(): self
    {
        return $this
            ->subject('New '.$this->details['typeLabel'].' request - '.$this->details['customerName'])
            ->view('emails.booking-request-admin');
    }
}
