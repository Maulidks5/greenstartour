<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Hotel extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'location',
        'hotel_type',
        'price_from',
        'price_per_night',
        'child_policy',
        'short_description',
        'amenities',
        'main_image',
        'gallery_images',
        'rating',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'amenities' => 'array',
        'gallery_images' => 'array',
        'price_per_night' => 'decimal:2',
        'rating' => 'decimal:1',
        'is_featured' => 'boolean',
    ];

    public function bookings(): HasMany
    {
        return $this->hasMany(HotelBooking::class);
    }
}
