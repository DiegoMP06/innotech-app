<?php

namespace App\Providers;

use App\Events\MediaProcessed;
use App\Models\Blog\Post;
use App\Models\Projects\Project;
use App\Models\Events\Event as EventModel;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Spatie\MediaLibrary\Conversions\Events\ConversionHasBeenCompletedEvent;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Event::listen(ConversionHasBeenCompletedEvent::class, function ($event) {
            $media = $event->media;

            if ($media->model_type === Post::class) {
                broadcast(new MediaProcessed($media->model_id, 'post'));
            }

            if ($media->model_type === Project::class) {
                broadcast(new MediaProcessed($media->model_id, 'project'));
            }

            if ($media->model_type === EventModel::class) {
                broadcast(new MediaProcessed($media->model_id, 'event'));
            }
        });
    }
}
