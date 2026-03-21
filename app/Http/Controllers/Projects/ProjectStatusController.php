<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\Project;
use Illuminate\Http\Request;

class ProjectStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Project $project)
    {
        $project->is_published = !$project->is_published;
        $project->published_at = $project->is_published ? now() : null;
        $project->save();

        return back()->with('message', "El estado del proyecto ha sido actualizado.");
    }
}
