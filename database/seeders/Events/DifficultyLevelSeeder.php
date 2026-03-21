<?php

namespace Database\Seeders\Events;

use App\Models\Events\DifficultyLevel;
use Illuminate\Database\Seeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DifficultyLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = [
            [
                'name' => 'Principiante',
                'slug' => 'beginner',
                'color' => '#10b981',
                'description' => 'No se requieren conocimientos previos. Ideal para quienes inician.',
                'order' => 1,
            ],
            [
                'name' => 'Intermedio',
                'slug' => 'intermediate',
                'color' => '#f59e0b',
                'description' => 'Se requieren conocimientos básicos de programación o tecnología.',
                'order' => 2,
            ],
            [
                'name' => 'Avanzado',
                'slug' => 'advanced',
                'color' => '#ef4444',
                'description' => 'Dirigido a participantes con experiencia sólida en el área.',
                'order' => 3,
            ],
        ];

        foreach ($levels as $level) {
            DifficultyLevel::create($level);
        }
    }
}
