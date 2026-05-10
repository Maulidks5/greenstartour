<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Tour extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'location',
        'duration',
        'price',
        'adult_price',
        'child_price',
        'pricing_note',
        'short_description',
        'description',
        'highlights',
        'included',
        'not_included',
        'itinerary',
        'what_to_bring',
        'important_information',
        'main_image',
        'gallery_images',
        'rating',
        'status',
        'is_featured',
    ];

    protected $casts = [
        'highlights' => 'array',
        'included' => 'array',
        'not_included' => 'array',
        'itinerary' => 'array',
        'what_to_bring' => 'array',
        'important_information' => 'array',
        'gallery_images' => 'array',
        'is_featured' => 'boolean',
        'rating' => 'decimal:1',
        'adult_price' => 'decimal:2',
        'child_price' => 'decimal:2',
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(TourCategory::class, 'category_id');
    }

    public function bookings(): HasMany
    {
        return $this->hasMany(Booking::class);
    }
}
