<?php

namespace App\Mail;

use App\Models\PartnershipRequest;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class PartnershipApproved extends Mailable
{
    use Queueable;
    use SerializesModels;

    public function __construct(public PartnershipRequest $partnershipRequest)
    {
    }

    public function build(): self
    {
        return $this
            ->subject('Your Green Star partnership request is approved')
            ->view('emails.partnership-approved');
    }
}
