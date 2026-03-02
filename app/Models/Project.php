<?php

namespace App\Models;

use Spatie\Image\Enums\Fit;
use Spatie\Sluggable\HasSlug;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Project extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'content',
        'repository_url',
        'demo_url',
        'tech_stack',
        'version',
        'license',
        'is_featured',
        'is_published',
        'published_at',
        'user_id'
    ];

    public function casts(): array
    {
        return [
            'content' => 'array',
            'tech_stack' => 'array',
            'is_featured' => 'boolean',
            'is_published' => 'boolean',
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
        $this->addMediaCollection('screenshots')
            ->useDisk('s3');
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('screenshot')
            ->fit(Fit::Crop, 1920, 1080)
            ->quality(85)
            ->sharpen(10)
            ->withResponsiveImages();
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'project_collaborators', 'project_id', 'user_id')->withPivot('id');
    }
}
