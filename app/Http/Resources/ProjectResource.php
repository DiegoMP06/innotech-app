<?php

namespace App\Http\Resources;

use App\Http\Resources\MediaResource;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $data = parent::toArray($request);

        $data['media'] = $this->getMedia('screenshots')->map(
            fn($m) =>
            new MediaResource($m, 'screenshot', ['screenshot' => ['width' => 1920, 'height' => 1080]])
        );
        
        return $data;
    }
}
