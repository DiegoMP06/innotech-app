<?php

namespace App\Http\Controllers\Projects;

use App\Http\Controllers\Controller;
use App\Http\Resources\Projects\ProjectCollection;
use App\Models\Projects\Project;
use App\Models\Projects\ProjectCategory;
use App\Models\Projects\ProjectStatus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    private function formData(): array
    {
        return [
            'statuses' => ProjectStatus::orderBy('order')->get(),
            'categories' => ProjectCategory::orderBy('order')->get(),
        ];
    }

    public function index(Request $request)
    {
        $projects = $request->user()
            ->projects()
            ->when(
                $request->search,
                fn($q, $search) =>
                $q->whereLike('name', "%{$search}%")
            )
            ->when(
                $request->integer('category'),
                fn($q, $category) =>
                $q->whereHas(
                    'categories',
                    fn($q) =>
                    $q->where('project_category_id', $category)
                )
            )
            ->when(
                $request->integer('status'),
                fn($q, $status) =>
                $q->where('project_status_id', $status)
            )
            ->with(['media', 'status', 'categories'])
            ->orderByDesc('id')
            ->paginate(20);

        return Inertia::render('projects/projects', [
            ...$this->formData(),
            'projects' => new ProjectCollection($projects),
            'category' => $request->integer('category'),
            'status' => $request->integer('status'),
            'search' => $request->string('search', ''),
            'message' => session()->get('message'),
        ]);
    }

    public function create()
    {
        return Inertia::render('projects/create-project', $this->formData());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:50'],
            'images' => ['required', 'array', 'min:1', 'max:20'],
            'images.*' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
            'repository_url' => ['required', 'url', 'max:255'],
            'demo_url' => ['required', 'url', 'max:255'],
            'tech_stack' => ['required', 'array', 'min:1'],
            'tech_stack.*' => ['required', 'string', 'max:255'],
            'version' => ['required', 'string', 'max:255'],
            'license' => ['required', 'string', 'max:255'],
            'project_status_id' => ['required', 'integer', 'exists:project_statuses,id'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'integer', 'exists:project_categories,id'],
        ]);

        $project = $request->user()->projects()->create([
            ...$data,
            'content' => [],
        ]);

        $project->categories()->sync($data['categories']);

        foreach ($request->file('images') as $file) {
            $project->addMedia($file)->toMediaCollection('screenshots');
        }

        return redirect()->intended(
            route('projects.content.edit', ['project' => $project, 'edit' => false], false)
        );
    }

    public function show(Project $project)
    {
        return Inertia::render('projects/show-project', [
            'project' => (new ProjectCollection([$project->load(['collaborators', 'author', 'media', 'categories', 'status'])]))->first(),
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('projects/edit-project', [
            ...$this->formData(),
            'project' => (new ProjectCollection([$project->load(['media', 'categories', 'status'])]))->first(),
            'message' => session()->get('message'),
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:50'],
            'repository_url' => ['required', 'url', 'max:255'],
            'demo_url' => ['required', 'url', 'max:255'],
            'tech_stack' => ['required', 'array', 'min:1'],
            'tech_stack.*' => ['required', 'string', 'max:255'],
            'version' => ['required', 'string', 'max:255'],
            'license' => ['required', 'string', 'max:255'],
            'project_status_id' => ['required', 'integer', 'exists:project_statuses,id'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'integer', 'exists:project_categories,id'],
        ]);

        $project->update($data);
        $project->categories()->sync($data['categories']);

        return back()->with('message', 'Proyecto actualizado correctamente.');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return back()->with('message', 'Proyecto eliminado correctamente.');
    }
}
