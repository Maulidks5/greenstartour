<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PartnershipRequest extends Model
{
    protected $fillable = [
        'full_name',
        'company_name',
        'logo',
        'email',
        'whatsapp_number',
        'partnership_type',
        'message',
        'status',
    ];
}
