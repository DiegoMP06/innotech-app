<?php

namespace App\Http\Controllers\Projects;

use App\Models\Projects\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class ProjectScreenshotsController extends Controller
{
    public function store(Request $request, Project $project)
    {
         $request->validate([
            'images' => ['required', 'array', 'min:1', 'max:20'],
            'images.*' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
        ]);

        $images = $request->file('images');

        foreach ($images as $file) {
            $project->addMedia($file)
                ->toMediaCollection('screenshots');
        }
        
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
