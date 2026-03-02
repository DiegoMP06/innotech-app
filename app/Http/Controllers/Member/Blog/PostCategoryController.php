<?php

namespace App\Http\Controllers\Member\Blog;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\CategoryPost;
use Illuminate\Validation\ValidationException;

class PostCategoryController extends Controller
{


    public function store(Post $post, Request $request)
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:post_categories,id'],
        ]);

        $categoryExists = $post->categories()->wherePivot('post_category_id', '=', $data['category_id'])->exists();

        if ($categoryExists) {
            throw ValidationException::withMessages([
                'category_id' => 'La categoría ya pertenece al post.',
            ]);
        }

        $post->categories()->attach($data['category_id']);

        return back();
    }

    public function destroy(Post $post, CategoryPost $categoryPost)
    {
        $categoryPost->delete();

        return back();
    }
}
