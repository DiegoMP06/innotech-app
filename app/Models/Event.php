<?php

namespace App\Models;

use Spatie\Image\Enums\Fit;
use Spatie\Sluggable\HasSlug;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Event extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'content',
        'is_free',
        'price',
        'percent_off',
        'location',
        'lat',
        'lng',
        'registration_started_at',
        'registration_ended_at',
        'start_date',
        'end_date',
        'is_published',
        'user_id',
        'event_status_id',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'is_free' => 'boolean',
            'price' => 'float',
            'percent_off' => 'float',
            'is_published' => 'boolean',
            'lat' => 'float',
            'lng' => 'float',
            'registration_started_at' => 'datetime:Y-m-d H:i:s',
            'registration_ended_at' => 'datetime:Y-m-d H:i:s',
            'start_date' => 'date:Y-m-d',
            'end_date' => 'date:Y-m-d',
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
            ->fit(Fit::Crop,  1080, 1080)
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
        return $this->hasMany(EventActivity::class);
    }

    public function status()
    {
        return $this->belongsTo(EventStatus::class, 'event_status_id');
    }

    // public function getRealStatus()
    // {
    //     $statusId = $this->getRealStatusId();
    //     return $statusId === -1 ?
    //         $this->belongsTo(EventStatus::class, 'event_status_id') :
    //         $this->belongsTo(EventStatus::class, 'event_status_id')
    //             ->where('id', $statusId);
    // }

    // public function getRealStatusId()
    // {
    //     $now = now();
    //     $statusId = $this->status->id;

    //     $statuses = EventStatus::all()->pluck('id', 'slug');

    //     if (
    //         ($statusId === $statuses['draft']) ||
    //         ($statusId === $statuses['finished']) ||
    //         ($statusId === $statuses['canceled'])
    //     ) {
    //         return -1;
    //     }

    //     if ($now->lt($this->registration_started_at)) {
    //         return $statuses['upcoming'];
    //     }

    //     if ($now->between($this->registration_started_at, $this->registration_ended_at)) {
    //         return $statuses['open'];
    //     }

    //     if ($now->gt($this->registration_ended_at) && $now->lt($this->start_date)) {
    //         return $statuses['closed'];
    //     }

    //     if ($now->between($this->start_date, $this->end_date)) {
    //         return $statuses['ongoing'];
    //     }

    //     return $statuses['finished'];
    // }
}
