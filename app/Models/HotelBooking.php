<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class HotelBooking extends Model
{
    protected $fillable = [
        'hotel_id',
        'full_name',
        'email',
        'whatsapp_number',
        'country',
        'check_in',
        'check_out',
        'number_of_adults',
        'number_of_children',
        'number_of_guests',
        'estimated_total',
        'room_type',
        'message',
        'admin_note',
        'status',
    ];

    protected $casts = [
        'check_in' => 'date',
        'check_out' => 'date',
        'estimated_total' => 'decimal:2',
    ];

    public function hotel(): BelongsTo
    {
        return $this->belongsTo(Hotel::class);
    }
}
