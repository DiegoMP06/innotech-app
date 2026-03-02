<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompetitionRound extends Model
{
    protected $fillable = [
        'name',
        'content',
        'round_number',
        'starting_from_scratch',
        'qualifed_teams',
        'winners_count',
        'is_the_final',
        'started_at',
        'ended_at',
        'event_activity_id',
    ];
}
