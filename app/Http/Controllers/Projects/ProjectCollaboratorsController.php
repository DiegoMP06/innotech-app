<?php

namespace App\Http\Controllers\Projects;

use App\Enums\Projects\RolesOfProjectCollaborators;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectCollaborator;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class ProjectCollaboratorsController extends Controller
{
    public function index(Project $project, Request $request)
    {
        $users = User::whereNot('id', $request->user()->id)
            ->when($request->search, fn($q, $search) => $q->where(
                fn($q) =>
                $q->whereLike('name', "%{$search}%")
                    ->orWhereLike('father_last_name', "%{$search}%")
                    ->orWhereLike('mother_last_name', "%{$search}%")
                    ->orWhereLike('email', "%{$search}%")
            ))
            ->orderByDesc('id')
            ->paginate(20);

        return Inertia::render('projects/project-collaborators', [
            'users' => new UserCollection($users),
            'project' => $project->load('collaborators'),
            'search' => $request->string('search', ''),
            'message' => $request->session()->get('message'),
            'edit' => $request->boolean('edit', false),
        ]);
    }

    public function store(Project $project, Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
            'role' => ['required', 'string', Rule::enum(RolesOfProjectCollaborators::class)],
        ]);

        if ($project->collaborators()->wherePivot('user_id', $data['user_id'])->exists()) {
            throw ValidationException::withMessages(['user_id' => 'El colaborador ya pertenece al proyecto.']);
        }

        $project->collaborators()->attach($data['user_id'], ['role' => $data['role']]);

        return back()->with('message', 'Colaborador agregado correctamente.');
    }

    public function destroy(Project $project, ProjectCollaborator $projectCollaborator)
    {
        $projectCollaborator->delete();

        return back()->with('message', 'Colaborador eliminado correctamente.');
    }
}
