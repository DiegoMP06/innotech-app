<?php

namespace App\Http\Controllers\Blog;

use App\Models\Blog\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostContentController extends Controller
{
    public function edit(Post $post, Request $request)
    {
        $edit = $request->boolean('edit', false);
        return inertia('blog/post-content', [
            'post' => $post,
            'edit' => $edit,
            'message' => request()->session()->get('message'),
        ]);
    }

    public function update(Post $post, Request $request)
    {
        $edit = $request->boolean('edit', false);
        $data = $request->validate([
            'content' => ['required', 'array'],
            'content.*.props' => ['required', 'array'],
            'content.*.type' => ['required', 'string'],
        ]);

        $post->content = $data['content'];
        $post->save();

        $route = $edit ?
            back() :
            redirect()->intended(route('posts.index', absolute: false));

        return $route->with('message', 'Contenido guardado correctamente.');
    }
}
