<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventActivityTeam extends Model
{
    protected $fillable = [
        'name',
        'description',
        'event_activity_id',
    ];
}
