<?php

namespace App\Http\Controllers\Blog;

use App\Models\Blog\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PostGalleryController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'images' => ['required', 'array', 'min:1', 'max:20'],
            'images.*' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
        ]);
        
        $images = $request->file('images');

        foreach ($images as $file) {
            $post->addMedia($file)
                ->toMediaCollection('gallery');
        }

        return back()->with('message', 'Post actualizado correctamente.');
    }

    public function destroy(Request $request, Post $post, Media $media)
    {
        if ($post->media()->count() == 1) {
            throw ValidationException::withMessages([
                'image' => 'El post debe tener al menos una imagen.',
            ]);
        }

        $media->delete();
        return back()->with('message', 'Post actualizado correctamente.');
    }
}
