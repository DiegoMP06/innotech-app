<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\Blog\PostCollection;
use App\Models\Blog\Post;
use App\Traits\ApiQueryable;
use Illuminate\Http\Request;
use Spatie\QueryBuilder\AllowedFilter;

class ApiBlogController extends Controller
{
    use ApiQueryable;

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $posts = $this->buildQuery(
            Post::where('is_published', true),
            [
                AllowedFilter::exact('category', 'categories.id'),
                AllowedFilter::exact('type', 'post_type_id'),
            ],
            [
                'categories',
                'type',
                'media',
                'author',
            ]
        )->paginate(20)->withQueryString();

        return new PostCollection($posts);
    }
}
