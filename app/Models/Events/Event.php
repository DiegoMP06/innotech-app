<?php

namespace App\Models\Events;

use App\Models\Events\EventActivity;
use App\Models\Events\EventStatus;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Scout\Searchable;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;
use Spatie\Sluggable\HasSlug;
use Spatie\Sluggable\SlugOptions;

class Event extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia, SoftDeletes, Searchable;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'content',
        'price',
        'percent_off',
        'capacity',
        'is_online',
        'online_link',
        'location',
        'lat',
        'lng',
        'registration_started_at',
        'registration_ended_at',
        'start_date',
        'end_date',
        'is_published',
        'event_status_id',
        'user_id',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'price' => 'float',
            'percent_off' => 'float',
            'is_online' => 'boolean',
            'lat' => 'float',
            'lng' => 'float',
            'registration_started_at' => 'datetime:Y-m-d H:i:s',
            'registration_ended_at' => 'datetime:Y-m-d H:i:s',
            'start_date' => 'date:Y-m-d',
            'end_date' => 'date:Y-m-d',
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
        $this->addMediaCollection('logo')
            ->useDisk('s3')
            ->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('thumbnail')
            ->fit(Fit::Crop, 1080, 1080)
            ->quality(85)
            ->sharpen(10)
            ->withResponsiveImages();
    }

    public function author()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function activities()
    {
        return $this->hasMany(EventActivity::class, );
    }

    public function status()
    {
        return $this->belongsTo(EventStatus::class, 'event_status_id');
    }
}
