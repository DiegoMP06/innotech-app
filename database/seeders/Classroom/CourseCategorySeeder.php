<?php

namespace Database\Seeders\Classroom;

use App\Models\Classroom\CourseCategory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Programación',
                'slug' => 'programming',
                'color' => '#6366f1',
                'icon' => 'code-bracket',
                'description' => 'Cursos de lenguajes de programación y algoritmos.',
                'order' => 1,
            ],
            [
                'name' => 'Desarrollo Web',
                'slug' => 'web-development',
                'color' => '#3b82f6',
                'icon' => 'globe-alt',
                'description' => 'Frontend, backend y desarrollo full-stack.',
                'order' => 2,
            ],
            [
                'name' => 'Bases de Datos',
                'slug' => 'databases',
                'color' => '#f59e0b',
                'icon' => 'circle-stack',
                'description' => 'SQL, NoSQL, modelado y administración de datos.',
                'order' => 3,
            ],
            [
                'name' => 'Inteligencia Artificial',
                'slug' => 'artificial-intelligence',
                'color' => '#a855f7',
                'icon' => 'cpu-chip',
                'description' => 'Machine learning, deep learning e IA aplicada.',
                'order' => 4,
            ],
            [
                'name' => 'Ciberseguridad',
                'slug' => 'cybersecurity',
                'color' => '#ef4444',
                'icon' => 'shield-check',
                'description' => 'Seguridad informática, ethical hacking y protección de datos.',
                'order' => 5,
            ],
            [
                'name' => 'Redes e Infraestructura',
                'slug' => 'networking',
                'color' => '#0ea5e9',
                'icon' => 'server',
                'description' => 'Redes, sistemas operativos y administración de servidores.',
                'order' => 6,
            ],
            [
                'name' => 'DevOps y Cloud',
                'slug' => 'devops-cloud',
                'color' => '#f97316',
                'icon' => 'cloud',
                'description' => 'CI/CD, Docker, Kubernetes y servicios en la nube.',
                'order' => 7,
            ],
            [
                'name' => 'Desarrollo Móvil',
                'slug' => 'mobile-development',
                'color' => '#22c55e',
                'icon' => 'device-phone-mobile',
                'description' => 'Apps nativas e híbridas para iOS y Android.',
                'order' => 8,
            ],
            [
                'name' => 'Gestión de Proyectos TI',
                'slug' => 'it-project-management',
                'color' => '#64748b',
                'icon' => 'clipboard-document-list',
                'description' => 'Metodologías ágiles, Scrum, Kanban y PMI.',
                'order' => 9,
            ],
            [
                'name' => 'Habilidades Blandas',
                'slug' => 'soft-skills',
                'color' => '#84cc16',
                'icon' => 'users',
                'description' => 'Comunicación, liderazgo y trabajo en equipo para ingenieros.',
                'order' => 10,
            ],
        ];

        foreach ($categories as $category) {
            CourseCategory::create($category);
        }
    }
}
