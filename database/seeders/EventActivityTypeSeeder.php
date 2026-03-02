<?php

namespace Database\Seeders;

use App\Models\EventActivityType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventActivityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Hackathon',
                'slug' => 'hackathon',
            ],
            [
                'name' => 'Competencia',
                'slug' => 'competition',
            ],
            [
                'name' => 'Bootcamp',
                'slug' => 'bootcamp',
            ],
            [
                'name' => 'Conferencia',
                'slug' => 'conference',
            ],
            [
                'name' => 'Charla',
                'slug' => 'development-talk',
            ],
            [
                'name' => 'Taller',
                'slug' => 'workshop',
            ],
            [
                'name' => 'Contribución Open Source',
                'slug' => 'open-source-contribution',
            ],
            [
                'name' => 'Webinar de IA',
                'slug' => 'ai-webinar',
            ],
            [
                'name' => 'Demostración de Software',
                'slug' => 'demo-day',
            ],
            [
                'name' => 'Revisión de Código',
                'slug' => 'code-review-party'
            ],
        ];

        EventActivityType::insert($types);
    }
}
