<?php

namespace Database\Seeders\Projects;

use App\Models\Projects\ProjectCategory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Aplicación Web',
                'slug' => 'web-app',
                'color' => '#3b82f6',
                'icon' => 'globe-alt',
                'description' => 'Sistemas o aplicaciones accesibles desde el navegador.',
                'order' => 1,
            ],
            [
                'name' => 'Aplicación Móvil',
                'slug' => 'mobile-app',
                'color' => '#22c55e',
                'icon' => 'device-phone-mobile',
                'description' => 'Apps para iOS o Android.',
                'order' => 2,
            ],
            [
                'name' => 'API / Backend',
                'slug' => 'api-backend',
                'color' => '#6366f1',
                'icon' => 'server',
                'description' => 'Servicios REST, GraphQL o microservicios.',
                'order' => 3,
            ],
            [
                'name' => 'Inteligencia Artificial',
                'slug' => 'artificial-intelligence',
                'color' => '#a855f7',
                'icon' => 'cpu-chip',
                'description' => 'Proyectos de ML, DL, NLP o visión computacional.',
                'order' => 4,
            ],
            [
                'name' => 'Automatización y DevOps',
                'slug' => 'automation-devops',
                'color' => '#f97316',
                'icon' => 'cog-6-tooth',
                'description' => 'Scripts, pipelines CI/CD, herramientas de automatización.',
                'order' => 5,
            ],
            [
                'name' => 'Internet de las Cosas (IoT)',
                'slug' => 'internet-of-things',
                'color' => '#14b8a6',
                'icon' => 'wifi',
                'description' => 'Dispositivos físicos conectados con software embebido.',
                'order' => 6,
            ],
            [
                'name' => 'Ciberseguridad',
                'slug' => 'cybersecurity',
                'color' => '#ef4444',
                'icon' => 'shield-check',
                'description' => 'Herramientas de análisis de seguridad, auditoría o protección.',
                'order' => 7,
            ],
            [
                'name' => 'Ciencia de Datos',
                'slug' => 'data-science',
                'color' => '#06b6d4',
                'icon' => 'chart-bar',
                'description' => 'Análisis, visualización y procesamiento de datos.',
                'order' => 8,
            ],
            [
                'name' => 'Videojuego',
                'slug' => 'game',
                'color' => '#8b5cf6',
                'icon' => 'puzzle-piece',
                'description' => 'Juegos desarrollados con motores o desde cero.',
                'order' => 9,
            ],
            [
                'name' => 'Open Source',
                'slug' => 'open-source',
                'color' => '#16a34a',
                'icon' => 'code-bracket',
                'description' => 'Proyectos de código abierto con licencia pública.',
                'order' => 10,
            ],
            [
                'name' => 'Proyecto Integrador',
                'slug' => 'integrative-project',
                'color' => '#64748b',
                'icon' => 'squares-2x2',
                'description' => 'Proyecto final que integra múltiples materias del programa TIID.',
                'order' => 11,
            ],
        ];

        foreach ($categories as $category) {
            ProjectCategory::create($category);
        }
    }
}
