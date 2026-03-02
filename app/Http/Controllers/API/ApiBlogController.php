<?php

namespace App\Http\Controllers\API;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollection;

class ApiBlogController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $posts = Post::where('is_published', true)
            ->with(['author', 'type', 'categories'])
            ->orderBy('is_featured', 'DESC')
            ->paginate();

        return new PostCollection($posts);
    }
}
