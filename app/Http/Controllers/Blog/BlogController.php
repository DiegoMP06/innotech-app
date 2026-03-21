<?php

namespace App\Http\Controllers\Blog;

use App\Models\Blog\Post;
use App\Traits\ApiQueryable;
use Inertia\Inertia;
use App\Models\Blog\PostType;
use App\Models\Blog\PostCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Blog\PostCollection;
use Spatie\QueryBuilder\AllowedFilter;

class BlogController extends Controller
{
    use ApiQueryable;

    private function formData(): array
    {
        return [
            'types' => PostType::orderBy('order')->get(),
            'categories' => PostCategory::orderBy('order')->get(),
        ];
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = $this->buildQuery(
            $request->user()->posts(),
            [
                AllowedFilter::exact('type', 'post_type_id'),
                AllowedFilter::exact('category', 'categories.post_category_id'),
            ],
            ['type', 'categories', 'media']
        )->paginate(20)->withQueryString();

        return Inertia::render('blog/blog', [
            ...$this->formData(),
            'posts' => new PostCollection($posts),
            'filters' => $request->query('filter'),
            'message' => $request->session()->get('message'),
        ]);
    }

    public function create()
    {
        return Inertia::render('blog/create-post', $this->formData());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:50'],
            'images' => ['required', 'array', 'min:1', 'max:20'],
            'images.*' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
            'post_type_id' => ['required', 'integer', 'exists:post_types,id'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'integer', 'exists:post_categories,id'],
        ]);

        $post = $request->user()->posts()->create([
            'name' => $data['name'],
            'summary' => $data['summary'],
            'content' => [],
            'post_type_id' => $data['post_type_id'],
        ]);

        $post->categories()->sync($data['categories']);

        foreach ($request->file('images') as $file) {
            $post->addMedia($file)->toMediaCollection('gallery');
        }

        return redirect()->intended(
            route('posts.content.edit', ['post' => $post, 'edit' => false], false)
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('blog/show-post', [
            'post' => (new PostCollection([$post->load(['categories', 'type', 'media', 'author'])]))->first(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post, Request $request)
    {
        return Inertia::render('blog/edit-post', [
            ...$this->formData(),
            'post' => (new PostCollection([$post->load(['categories', 'type', 'media'])]))->first(),
            'message' => $request->session()->get('message'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:50'],
            'post_type_id' => ['required', 'integer', 'exists:post_types,id'],
            'categories' => ['required', 'array', 'min:1'],
            'categories.*' => ['required', 'integer', 'exists:post_categories,id'],
        ]);

        $post->update([
            'name' => $data['name'],
            'summary' => $data['summary'],
            'post_type_id' => $data['post_type_id'],
        ]);

        $post->categories()->sync($data['categories']);

        return back()->with('message', 'Post actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->delete();

        return back()->with('message', 'Post eliminado correctamente.');
    }
}
