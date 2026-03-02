<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventActivityRegistration extends Model
{
    protected $fillable = [
        'user_id',
        'event_activity_id'
    ];
}
