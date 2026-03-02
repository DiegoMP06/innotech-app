<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MediaResource extends JsonResource
{
    public function __construct(
        $resource,
        private string $mainConversion,
        private array $dimensions,
        private $extraConversions = []
    ) {
        parent::__construct($resource);
    }

    public function toArray(Request $request): array
    {
        $isProcessed = $this->hasGeneratedConversion($this->mainConversion);
        $responsiveUrls = $this->getResponsiveImageUrls($this->mainConversion);

        $mapped = collect(IMAGE_SIZES)
            ->mapWithKeys(
                fn($label, $index) =>
                isset($responsiveUrls[$index]) ? [$label => $responsiveUrls[$index]] : []
            )->toArray();

        $urls = [
            $this->mainConversion => $isProcessed ? $this->getUrl($this->mainConversion) : null,
            'original' => $this->getUrl(),
        ];

        foreach ($this->extraConversions as $conversion) {
            $urls[$conversion] = $this->getUrl($conversion);
        }

        return [
            'id' => $this->id,
            'is_processed' => $isProcessed,
            'urls' => $urls,
            'dimensions' => $this->dimensions,
            'responsive' => $mapped,
            'custom_properties' => $this->custom_properties,
        ];
    }
}
