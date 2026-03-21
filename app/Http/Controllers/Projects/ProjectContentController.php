<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Models\Projects\Project;
use Illuminate\Http\Request;

class ProjectContentController extends Controller
{
    public function edit(Project $project, Request $request)
    {
        $edit = $request->boolean('edit', false);
        return inertia('projects/project-content', [
            'project' => $project,
            'edit' => $edit,
            'message' => $request->session()->get('message'),
        ]);
    }

    public function update(Project $project, Request $request)
    {
        $edit = $request->boolean('edit', false);
        $data = $request->validate([
            'content' => ['required', 'array'],
            'content.*.props' => ['required', 'array'],
            'content.*.type' => ['required', 'string'],
        ]);

        $project->content = $data['content'];
        $project->save();

        $route = $edit ?
            back() :
            redirect()->intended(route(
                'project-collaborators.index',
                ['project' => $project, 'edit' => false],
                false
            ));

        return $route->with('message', 'Contenido guardado correctamente.');
    }
}
