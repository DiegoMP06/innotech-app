<?php

namespace Database\Seeders\Blog;

use App\Models\Blog\PostCategory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Tecnología',
                'slug' => 'technology',
                'color' => '#3b82f6',
                'order' => 1,
            ],
            [
                'name' => 'Programación',
                'slug' => 'programming',
                'color' => '#6366f1',
                'order' => 2,
            ],
            [
                'name' => 'Desarrollo Web',
                'slug' => 'web-development',
                'color' => '#0ea5e9',
                'order' => 3,
            ],
            [
                'name' => 'Arquitectura de Software',
                'slug' => 'software-architecture',
                'color' => '#8b5cf6',
                'order' => 4,
            ],
            [
                'name' => 'Buenas Prácticas de Desarrollo',
                'slug' => 'best-practices',
                'color' => '#10b981',
                'order' => 5,
            ],
            [
                'name' => 'Inteligencia Artificial',
                'slug' => 'artificial-intelligence',
                'color' => '#a855f7',
                'order' => 6,
            ],
            [
                'name' => 'Bases de Datos',
                'slug' => 'databases',
                'color' => '#f59e0b',
                'order' => 7,
            ],
            [
                'name' => 'Ciberseguridad',
                'slug' => 'cybersecurity',
                'color' => '#ef4444',
                'order' => 8,
            ],
            [
                'name' => 'Internet de las Cosas (IoT)',
                'slug' => 'internet-of-things',
                'color' => '#14b8a6',
                'order' => 9,
            ],
            [
                'name' => 'Proyectos Tecnológicos',
                'slug' => 'tech-projects',
                'color' => '#f97316',
                'order' => 10,
            ],
            [
                'name' => 'Ingeniería en Tecnologías de la Información',
                'slug' => 'information-technology-engineering',
                'color' => '#64748b',
                'order' => 11,
            ],
        ];

        foreach ($categories as $category) {
            PostCategory::create($category);
        }
    }
}
