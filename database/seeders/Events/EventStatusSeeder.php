<?php

namespace Database\Seeders\Events;

use App\Models\Events\EventStatus;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventStatusSeeder extends Seeder
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
                'description' => 'El evento está siendo configurado, no es visible para el público.',
                'order' => 1,
            ],
            [
                'name' => 'Próximo',
                'slug' => 'upcoming',
                'color' => '#3b82f6',
                'description' => 'El evento está publicado y visible, pero las inscripciones aún no han abierto.',
                'order' => 2,
            ],
            [
                'name' => 'Inscripciones abiertas',
                'slug' => 'open',
                'color' => '#22c55e',
                'description' => 'Las inscripciones están disponibles para los usuarios.',
                'order' => 3,
            ],
            [
                'name' => 'Inscripciones cerradas',
                'slug' => 'closed',
                'color' => '#f97316',
                'description' => 'El periodo de inscripción ha concluido.',
                'order' => 4,
            ],
            [
                'name' => 'En Curso',
                'slug' => 'ongoing',
                'color' => '#10b981',
                'description' => 'El evento se está llevando a cabo en este momento.',
                'order' => 5,
            ],
            [
                'name' => 'Finalizado',
                'slug' => 'finished',
                'color' => '#64748b',
                'description' => 'El evento ha concluido exitosamente.',
                'order' => 6,
            ],
            [
                'name' => 'Cancelado',
                'slug' => 'cancelled',
                'color' => '#ef4444',
                'description' => 'El evento fue cancelado.',
                'order' => 7,
            ],
        ];

        foreach ($statuses as $status) {
            EventStatus::create($status);
        }
    }
}
