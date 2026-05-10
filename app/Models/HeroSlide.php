<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HeroSlide extends Model
{
    protected $fillable = [
        'label',
        'title',
        'subtitle',
        'image',
        'sort_order',
        'status',
    ];
}
