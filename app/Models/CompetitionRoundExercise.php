<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CompetitionRoundExercise extends Model
{
    protected $fillable = [
        'name',
        'content',
        'score',
        'competition_round_id',
    ];
}
