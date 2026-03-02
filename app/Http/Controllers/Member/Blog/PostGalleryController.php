<?php

namespace App\Http\Controllers\Member\Blog;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class PostGalleryController extends Controller
{
    public function store(Request $request, Post $post)
    {
        $request->validate([
            'image' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
        ]);

        $post->addMediaFromRequest('image')
            ->toMediaCollection('gallery');

        return back()->with('message', 'Post actualizado correctamente.');
    }

    public function destroy(Request $request, Post $post, Media $media)
    {
        if($post->media()->count() == 1){
            throw ValidationException::withMessages([
                'image' => 'El post debe tener al menos una imagen.',
            ]);
        }

        $media->delete();
        return back()->with('message', 'Post actualizado correctamente.');
    }
}
