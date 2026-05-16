<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = ['name', 'country', 'rating', 'review', 'image', 'show_on_home', 'status'];

    protected $casts = [
        'show_on_home' => 'boolean',
    ];
}
