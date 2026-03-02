<?php

namespace App\Http\Controllers\User\Project;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Models\ProjectCollaborator;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class ProjectCollaboratorsController extends Controller
{
    public function index(Project $project, Request $request)
    {
        $edit = $request->boolean('edit', false);
        $search = $request->string('search', '');
        $page = $request->integer('page', 1);

        $users = User::whereNot('id', '=', $request->user()->id)
            ->when(
                $search,
                fn($query, $search) =>
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('father_last_name', 'like', "%{$search}%")
                        ->orWhere('mother_last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
            )
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Inertia::render('user/projects/project-collaborators', [
            'users' => $users,
            'project' => $project->load('collaborators'),
            'page' => $page,
            'search' => $search,
            'message' => $request->session()->get('message'),
            'edit' => $edit,
        ]);
    }

    public function store(Project $project, Request $request)
    {
        $data = $request->validate([
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $collaborationExists = $project->collaborators()->wherePivot('user_id', '=', $data['user_id'])->exists();

        if ($collaborationExists) {
            throw ValidationException::withMessages([
                'user_id' => 'El colaborador ya pertenece al proyecto.',
            ]);
        }

        $project->collaborators()->attach($data['user_id']);
        return back()->with('message', 'Colaborador agregado correctamente.');
    }

    public function destroy(Project $project, ProjectCollaborator $projectCollaborator)
    {
        $projectCollaborator->delete();
        return back()->with('message', 'Colaborador eliminado correctamente.');
    }
}
