<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Booking extends Model
{
    protected $fillable = [
        'tour_id',
        'full_name',
        'email',
        'whatsapp_number',
        'country',
        'travel_date',
        'number_of_adults',
        'number_of_children',
        'pickup_location',
        'number_of_guests',
        'estimated_total',
        'message',
        'admin_note',
        'status',
    ];

    protected $casts = [
        'travel_date' => 'date',
        'estimated_total' => 'decimal:2',
    ];

    public function tour(): BelongsTo
    {
        return $this->belongsTo(Tour::class);
    }
}
