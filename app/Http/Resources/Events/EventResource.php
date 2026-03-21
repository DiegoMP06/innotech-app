<?php

namespace App\Http\Resources\Events;

use App\Http\Resources\MediaResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EventResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['media'] = $this->getMedia('logo')->map(
            fn($m) =>
            new MediaResource($m, 'thumbnail', ['thumbnail' => ['width' => 1080, 'height' => 1080]])
        );

        return $data;
    }
}
