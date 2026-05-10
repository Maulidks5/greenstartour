<?php

namespace App\Mail;

use App\Models\Inquiry;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ContactMessageAdmin extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public Inquiry $inquiry)
    {
    }

    public function build(): self
    {
        return $this
            ->subject('New website contact message - '.$this->inquiry->full_name)
            ->view('emails.contact-message-admin');
    }
}
