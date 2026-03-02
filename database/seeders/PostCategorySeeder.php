<?php

namespace Database\Seeders;

use App\Models\PostCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            ],
            [
                'name' => 'Programación',
                'slug' => 'programming',
            ],
            [
                'name' => 'Desarrollo Web',
                'slug' => 'web-development',
            ],
            [
                'name' => 'Arquitectura de Software',
                'slug' => 'software-architecture',
            ],
            [
                'name' => 'Buenas Prácticas de Desarrollo',
                'slug' => 'best-practices',
            ],
            [
                'name' => 'Inteligencia Artificial',
                'slug' => 'artificial-intelligence',
            ],
            [
                'name' => 'Bases de Datos',
                'slug' => 'databases',
            ],
            [
                'name' => 'Ciberseguridad',
                'slug' => 'cybersecurity',
            ],
            [
                'name' => 'Internet de las Cosas (IoT)',
                'slug' => 'internet-of-things',
            ],
            [
                'name' => 'Proyectos Tecnológicos',
                'slug' => 'tech-projects',
            ],
            [
                'name' => 'Ingeniería en Tecnologías de la Información',
                'slug' => 'information-technology-engineering',
            ],
        ];

        PostCategory::insert($categories);
    }
}
