<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProjectCollaborator extends Model
{
    protected $fillable = [
        'user_id',
        'project_id',
    ];
}
