<?php

namespace App\Models\Projects;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Project extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, SoftDeletes, Searchable;

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
        'project_status_id',
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

    public function toSearchableArray(): array
    {
        return [
            'id' => (int) $this->id,
            'name' => $this->name,
            'summary' => $this->summary,
            'repository_url' => $this->repository_url,
            'demo_url' => $this->demo_url,
            'tech_stack' => $this->tech_stack,
            'version' => $this->version,
            'license' => $this->license,
            'published_at' => $this->published_at,
            'categories' => $this->categories()->pluck('project_categories.name')->toArray(),
            'author' => $this->author()->get(['name', 'father_last_name', 'email'])->toArray(),
            'status' => $this->status()->pluck('name')->toArray(),
            'collaborators' => $this->collaborators()->get(['name', 'father_last_name', 'email'])->toArray(),
        ];
    }

    public function makeAllSearchableUsing(Builder $query)
    {
        return $query->with(['categories', 'status', 'collaborators']);
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

    public function status() {
        return $this->belongsTo(ProjectStatus::class, 'project_status_id');
    }

    public function categories() {
        return $this->belongsToMany(ProjectCategory::class, 'project_category', 'project_id', 'project_category_id')->withPivot('id');
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function collaborators()
    {
        return $this->belongsToMany(User::class, 'project_collaborators', 'project_id', 'user_id')->withPivot(['id', 'role']);
    }
}
