<?php

namespace Database\Seeders;

use App\Models\DifficultyLevel;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class DifficultyLevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DifficultyLevel::create(['name' => 'Principiante', 'slug' => 'beginner', 'color' => '#10b981']);
        DifficultyLevel::create(['name' => 'Intermedio', 'slug' => 'intermediate', 'color' => '#f59e0b']);
        DifficultyLevel::create(['name' => 'Avanzado', 'slug' => 'advanced', 'color' => '#ef4444']);
    }
}
