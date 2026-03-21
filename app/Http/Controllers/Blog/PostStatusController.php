<?php

namespace App\Http\Controllers\Blog;

use App\Models\Blog\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Post $post, Request $request)
    {
        $post->is_published = !$post->is_published;
        $post->published_at = $post->is_published ? now() : null;
        $post->save();

        return back()->with('message', "El estado de la publicación ha sido actualizado.");
    }
}
