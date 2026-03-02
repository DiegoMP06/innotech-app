<?php

namespace App\Http\Controllers\Member\Blog;

use App\Models\Post;
use Inertia\Inertia;
use App\Models\PostType;
use App\Models\PostCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\PostCollection;

class BlogController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search', '');
        $page = $request->integer('page', 1);
        $category = $request->query('category', null);
        $type = $request->query('type', null);

        $posts = $request->user()
            ->posts()
            ->when(
                $search,
                fn($query, $search) =>
                $query->where('name', 'like', "%{$search}%")
            )
            ->when(
                $category,
                fn($query, $category) =>
                $query->whereHas('categories', function ($query) use ($category) {
                    $query->where('post_category_id', $category);
                })
            )
            ->when(
                $type,
                fn($query, $type) =>
                $query->where('post_type_id', $type)
            )
            ->orderBy('id', 'desc')
            ->with(['type', 'categories', 'media'])
            ->paginate(20);

        $types = PostType::all();
        $categories = PostCategory::all();

        return Inertia::render('member/blog/blog', [
            'posts' => new PostCollection($posts),
            'types' => $types,
            'categories' => $categories,
            'category' => $request->integer('category'),
            'type' => $request->integer('type'),
            'page' => $page,
            'search' => $search,
            'message' => $request->session()->get('message'),
        ]);
    }

    public function create()
    {
        $types = PostType::all();
        $categories = PostCategory::all();

        return Inertia::render('member/blog/create-post', [
            'types' => $types,
            'categories' => $categories,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'min:100'],
            'images' => ['required', 'array', 'min:1', 'max:20'],
            'images.*' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
            'post_type_id' => ['required', 'integer', 'exists:post_types,id'],
            'categories' => ['array', 'required', 'min:1'],
            'categories.*' => ['required', 'integer', 'exists:post_categories,id'],
        ]);

        $images = $request->file('images');

        $post = $request->user()->posts()->create([
            'name' => $data['name'],
            'summary' => $data['summary'],
            'content' => [],
            'post_type_id' => $data['post_type_id'],
        ]);

        $post->categories()->sync($data['categories']);

        foreach ($images as $file) {
            $post->addMedia($file)
                ->toMediaCollection('gallery');
        }

        return redirect()
            ->intended(route(
                'posts.content.edit',
                ['post' => $post, 'edit' => false],
                false
            ));
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        return Inertia::render('member/blog/show-post', [
            'post' => (new PostCollection([$post->load(['categories', 'type', 'media', 'author'])]))->first(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post, Request $request)
    {
        $types = PostType::all();
        $categories = PostCategory::all();

        return Inertia::render('member/blog/edit-post', [
            'post' => (new PostCollection([$post->load(['categories', 'type', 'media'])]))->first(),
            'types' => $types,
            'categories' => $categories,
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
            'summary' => ['required', 'string', 'min:100'],
            'post_type_id' => ['required', 'integer', 'exists:post_types,id'],
        ]);

        $post->name = $data['name'];
        $post->summary = $data['summary'];
        $post->post_type_id = $data['post_type_id'];
        $post->save();

        return back()->with('message', 'Post actualizado correctamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->clearMediaCollection('gallery');
        $post->delete();

        return back()->with('message', 'Post eliminado correctamente.');
    }
}
