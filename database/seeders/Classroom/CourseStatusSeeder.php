<?php

namespace Database\Seeders\Classroom;

use App\Models\Classroom\CourseStatus;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CourseStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'Borrador',
                'slug' => 'draft',
                'color' => '#94a3b8',
                'description' => 'El curso está en construcción, no visible para estudiantes.',
                'order' => 1,
            ],
            [
                'name' => 'Activo',
                'slug' => 'active',
                'color' => '#22c55e',
                'description' => 'El curso está disponible e inscripciones abiertas.',
                'order' => 2,
            ],
            [
                'name' => 'En Curso',
                'slug' => 'ongoing',
                'color' => '#10b981',
                'description' => 'El curso ya inició y está en progreso.',
                'order' => 3,
            ],
            [
                'name' => 'Finalizado',
                'slug' => 'finished',
                'color' => '#64748b',
                'description' => 'El curso ha concluido.',
                'order' => 4,
            ],
            [
                'name' => 'Archivado',
                'slug' => 'archived',
                'color' => '#475569',
                'description' => 'El curso está archivado, solo lectura para consulta.',
                'order' => 5,
            ],
            [
                'name' => 'Cancelado',
                'slug' => 'cancelled',
                'color' => '#ef4444',
                'description' => 'El curso fue cancelado antes de iniciar.',
                'order' => 6,
            ],
        ];

        foreach ($statuses as $status) {
            CourseStatus::create($status);
        }
    }
}
