<?php

namespace App\Models;

use Spatie\Image\Enums\Fit;
use Spatie\Sluggable\HasSlug;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Post extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;
    protected $fillable = [
        'name',
        'slug',
        'summary',
        'content',
        'views_count',
        'is_featured',
        'is_published',
        'published_at',
        'post_type_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'is_published' => 'boolean',
            'is_featured' => 'boolean',
        ];
    }

    public function getSlugOptions(): SlugOptions
    {
        return SlugOptions::create()
            ->generateSlugsFrom('name')
            ->saveSlugsTo('slug');
    }

    public function registerMediaCollections(): void
    {
        $this->addMediaCollection('gallery')
            ->useDisk('s3');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('hero')
            ->fit(Fit::Crop, 1920, 1080)
            ->quality(85)
            ->sharpen(10);

        $this->addMediaConversion('main')
            ->fit(Fit::Crop, 1200, 620)
            ->quality(85)
            ->sharpen(10)
            ->withResponsiveImages();
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function type()
    {
        return $this->belongsTo(PostType::class, 'post_type_id');
    }

    public function categories()
    {
        return $this->belongsToMany(PostCategory::class, 'category_posts', 'post_id', 'post_category_id')->withPivot('id');
    }
}
