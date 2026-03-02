<?php

namespace App\Models;

use Spatie\Image\Enums\Fit;
use Spatie\Sluggable\HasSlug;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Sluggable\SlugOptions;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class EventActivity extends Model implements HasMedia
{
    use HasSlug, InteractsWithMedia;

    protected $fillable = [
        'name',
        'slug',
        'summary',
        'content',
        'requirements',
        'is_online',
        'online_link',
        'location',
        'lat',
        'lng',
        'is_a_team_event',
        'is_a_full_team_event',
        'min_team_size',
        'max_team_size',
        'max_participants',
        'only_students',
        'is_competition',
        'participants_per_round',
        'is_published',
        'started_at',
        'ended_at',
        'event_id',
        'event_activity_type_id',
    ];

    protected function casts(): array
    {
        return [
            'content' => 'array',
            'is_online' => 'boolean',
            'lat' => 'float',
            'lng' => 'float',
            'is_a_team_event' => 'boolean',
            'is_a_full_team_event' => 'boolean',
            'only_students' => 'boolean',
            'is_competition' => 'boolean',
            'is_published' => 'boolean',
            'started_at' => 'datetime',
            'ended_at' => 'datetime',
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
        $this->addMediaCollection('banner_image')
            ->useDisk('s3')
            ->singleFile();
    }

    public function registerMediaConversions(?Media $media = null): void
    {
        $this->addMediaConversion('banner')
            ->fit(Fit::Crop, 1920, 1080)
            ->quality(85)
            ->sharpen(10)
            ->withResponsiveImages();
    }

    public function status()
    {
        return $this->belongsTo(EventStatus::class, 'event_status_id');
    }

    public function realStatus()
    {
        $statusId = $this->realStatusId();
        return $statusId === -1 ?
            $this->belongsTo(EventStatus::class, 'event_status_id') :
            $this->belongsTo(EventStatus::class, 'event_status_id')
                ->where('id', $statusId);
    }

    public function getRealStatusId()
    {
        $now = now();
        $statusId = $this->status->id;

        $statuses = EventStatus::all()->pluck('id', 'slug');

        if (
            ($statusId === $statuses['draft']) ||
            ($statusId === $statuses['finished']) ||
            ($statusId === $statuses['canceled'])
        ) {
            return -1;
        }

        if ($now->lt($this->start_date)) {
            return $statuses['upcoming'];
        }

        if ($now->between($this->start_date, $this->end_date)) {
            return $statuses['ongoing'];
        }

        return $statuses['finished'];
    }
}
