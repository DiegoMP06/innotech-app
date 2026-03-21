<?php

namespace Database\Seeders\Classroom;

use App\Models\Classroom\ResourceType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ResourceTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            ['name' => 'Video', 'slug' => 'video', 'icon' => 'play-circle'],
            ['name' => 'PDF', 'slug' => 'pdf', 'icon' => 'document'],
            ['name' => 'Enlace externo', 'slug' => 'link', 'icon' => 'link'],
            ['name' => 'Archivo', 'slug' => 'file', 'icon' => 'paper-clip'],
            ['name' => 'Presentación', 'slug' => 'presentation', 'icon' => 'presentation-chart-bar'],
            ['name' => 'Código', 'slug' => 'code', 'icon' => 'code-bracket'],
            ['name' => 'Imagen', 'slug' => 'image', 'icon' => 'photo'],
        ];

        foreach ($types as $type) {
            ResourceType::create($type);
        }
    }
}
