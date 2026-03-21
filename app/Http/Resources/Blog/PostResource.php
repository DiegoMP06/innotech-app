<?php

namespace App\Http\Resources\Blog;

use App\Http\Resources\MediaResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['media'] = $this->getMedia('gallery')->map(
            fn($m) =>
            new MediaResource($m, 'main', [
                'main' => ['width' => 1200, 'height' => 620],
                'hero' => ['width' => 1920, 'height' => 1080]
            ], ['hero'])
        );

        return $data;
    }
}
