<?php

namespace Database\Seeders;

use App\Models\EventStatus;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            ],
            [
                'name' => 'Próximo',
                'slug' => 'upcoming',
                'color' => '#3b82f6',
            ],
            [
                'name' => 'Inscripciones abiertas',
                'slug' => 'open',
                'color' => '#22C55E',
            ],
            [
                'name' => 'Inscripciones cerradas',
                'slug' => 'closed',
                'color' => '#ef4444',
            ],
            [
                'name' => 'En Curso',
                'slug' => 'ongoing',
                'color' => '#10b981',
            ],
            [
                'name' => 'Finalizado',
                'slug' => 'finished',
                'color' => '#64748b',
            ],
            [
                'name' => 'Cancelado',
                'slug' => 'cancelled',
                'color' => '#ef4444',
            ],
        ];

        EventStatus::insert($statuses);
    }
}
