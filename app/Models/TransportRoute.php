<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportRoute extends Model
{
    protected $fillable = [
        'pickup_location',
        'dropoff_location',
        'vehicle_type',
        'base_price',
        'status',
        'sort_order',
    ];

    protected $casts = [
        'base_price' => 'decimal:2',
    ];
}
