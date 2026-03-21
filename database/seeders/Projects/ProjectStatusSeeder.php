<?php

namespace Database\Seeders\Projects;

use App\Models\Projects\ProjectStatus;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'En Desarrollo',
                'slug' => 'in-development',
                'color' => '#3b82f6',
                'description' => 'El proyecto está siendo desarrollado activamente.',
                'order' => 1,
            ],
            [
                'name' => 'En Revisión',
                'slug' => 'in-review',
                'color' => '#f59e0b',
                'description' => 'El proyecto está siendo evaluado por un maestro o revisor.',
                'order' => 2,
            ],
            [
                'name' => 'Publicado',
                'slug' => 'published',
                'color' => '#22c55e',
                'description' => 'El proyecto ha sido aprobado y está visible públicamente.',
                'order' => 3,
            ],
            [
                'name' => 'Archivado',
                'slug' => 'archived',
                'color' => '#64748b',
                'description' => 'El proyecto ya no está en desarrollo activo pero se conserva como referencia.',
                'order' => 4,
            ],
            [
                'name' => 'Rechazado',
                'slug' => 'rejected',
                'color' => '#ef4444',
                'description' => 'El proyecto no cumplió con los criterios de evaluación.',
                'order' => 5,
            ],
        ];

        foreach ($statuses as $status) {
            ProjectStatus::create($status);
        }
    }
}
