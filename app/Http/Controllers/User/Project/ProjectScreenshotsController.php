<?php

namespace App\Http\Controllers\User\Project;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectScreenshotsController extends Controller
{
    public function store(Request $request, Project $project)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
        ]);

        $project->addMediaFromRequest('image')
            ->toMediaCollection('screenshots');

        return back()->with('message', 'Proyecto actualizado correctamente.');
    }

    public function destroy(Request $request, Project $project, Media $media)
    {
        if($project->media()->count() == 1){
            throw ValidationException::withMessages([
                'image' => 'El proyecto debe tener al menos una imagen.',
            ]);
        }

        $media->delete();
        return back()->with('message', 'Proyecto actualizado correctamente.');
    }
}
