<?php

namespace App\Http\Controllers\User\Project;

use Inertia\Inertia;
use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\ProjectCollection;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search', '');
        $page = $request->integer('page', 1);

        $projects = $request->user()
            ->projects()
            ->when(
                $search,
                fn($query, $search) =>
                $query->where('name', 'like', "%{$search}%")
            )
            ->with(['media'])
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Inertia::render('user/projects/projects', [
            'projects' => new ProjectCollection($projects),
            'search' => $search,
            'page' => $page,
            'message' => session()->get('message'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('user/projects/create-project');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:100'],
            'images' => ['required', 'array', 'min:1', 'max:20'],
            'images.*' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
            'repository_url' => ['required', 'url', 'max:255'],
            'demo_url' => ['required', 'url', 'max:255'],
            'tech_stack' => ['array', 'required', 'min:1'],
            'tech_stack.*' => ['required', 'string', 'max:255'],
            'version' => ['required', 'string', 'max:255'],
            'license' => ['required', 'string', 'max:255'],
        ]);

        $images = $request->file('images');

        $project = $request->user()->projects()->create([
            'name' => $data['name'],
            'summary' => $data['summary'],
            'content' => [],
            'repository_url' => $data['repository_url'],
            'demo_url' => $data['demo_url'],
            'tech_stack' => $data['tech_stack'],
            'version' => $data['version'],
            'license' => $data['license'],
        ]);

        foreach ($images as $file) {
            $project->addMedia($file)
                ->toMediaCollection('screenshots');
        }

        return redirect()->intended(route(
            'projects.content.edit',
            ['project' => $project, 'edit' => false],
            false
        ));
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        return Inertia::render('user/projects/show-project', [
            'project' => (new ProjectCollection([$project->load(['collaborators', 'author', 'media'])]))->first(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return Inertia::render('user/projects/edit-project', [
            'project' => (new ProjectCollection([$project->load(['media'])]))->first(),
            'message' => session()->get('message'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:100'],
            'repository_url' => ['required', 'url', 'max:255'],
            'demo_url' => ['required', 'url', 'max:255'],
            'tech_stack' => ['array', 'required', 'min:1'],
            'tech_stack.*' => ['required', 'string', 'max:255'],
            'version' => ['required', 'string', 'max:255'],
            'license' => ['required', 'string', 'max:255'],
        ]);

        $project->name = $data['name'];
        $project->summary = $data['summary'];
        $project->repository_url = $data['repository_url'];
        $project->demo_url = $data['demo_url'];
        $project->tech_stack = $data['tech_stack'];
        $project->version = $data['version'];
        $project->license = $data['license'];
        $project->save();

        return back()->with('message', 'Proyecto actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        $project->clearMediaCollection('screenshots');
        $project->delete();

        return back()->with('message', 'Proyecto eliminado correctamente.');
    }
}
