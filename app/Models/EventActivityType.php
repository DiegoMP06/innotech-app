<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventActivityType extends Model
{
    protected $fillable = [
        'name',
        'slug',
    ];
}
