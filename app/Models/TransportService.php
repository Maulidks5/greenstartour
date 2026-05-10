<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TransportService extends Model
{
    protected $fillable = ['title', 'slug', 'description', 'image', 'status', 'sort_order'];
}
