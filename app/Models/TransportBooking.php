<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportBooking extends Model
{
    protected $fillable = [
        'service_type',
        'full_name',
        'email',
        'whatsapp_number',
        'pickup_location',
        'dropoff_location',
        'travel_date',
        'travel_time',
        'number_of_adults',
        'number_of_children',
        'number_of_passengers',
        'estimated_total',
        'message',
        'admin_note',
        'status',
    ];

    protected $casts = [
        'travel_date' => 'date',
        'estimated_total' => 'decimal:2',
    ];
}
