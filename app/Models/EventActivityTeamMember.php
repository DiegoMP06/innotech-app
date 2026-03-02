<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventActivityTeamMember extends Model
{
    protected $fillable = [
        'user_id',
        'event_activity_team_id'
    ];
}
