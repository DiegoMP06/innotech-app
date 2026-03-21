<?php

namespace Database\Seeders\Classroom;

use App\Models\Classroom\SubmissionStatus;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SubmissionStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $statuses = [
            [
                'name' => 'Pendiente',
                'slug' => 'pending',
                'color' => '#94a3b8',
                'order' => 1,
            ],
            [
                'name' => 'Entregada',
                'slug' => 'submitted',
                'color' => '#3b82f6',
                'order' => 2,
            ],
            [
                'name' => 'Calificada',
                'slug' => 'graded',
                'color' => '#22c55e',
                'order' => 3,
            ],
            [
                'name' => 'Entrega tardía',
                'slug' => 'late',
                'color' => '#f97316',
                'order' => 4,
            ],
            [
                'name' => 'Reentregada',
                'slug' => 'resubmitted',
                'color' => '#8b5cf6',
                'order' => 5,
            ],
        ];

        foreach ($statuses as $status) {
            SubmissionStatus::create($status);
        }
    }
}
