<?php

namespace Database\Seeders\Events;

use Illuminate\Database\Seeder;
use App\Models\Events\EventActivityCategory;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EventActivityCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Desarrollo Web',
                'slug' => 'web-development',
                'color' => '#3b82f6',
                'order' => 1,
            ],
            [
                'name' => 'Desarrollo de Software',
                'slug' => 'software-development',
                'color' => '#6366f1',
                'order' => 2,
            ],
            [
                'name' => 'Ciberseguridad',
                'slug' => 'cybersecurity',
                'color' => '#ef4444',
                'order' => 3,
            ],
            [
                'name' => 'Inteligencia Artificial',
                'slug' => 'artificial-intelligence',
                'color' => '#8b5cf6',
                'order' => 4,
            ],
            [
                'name' => 'Redes e Infraestructura',
                'slug' => 'networking-and-infrastructure',
                'color' => '#0ea5e9',
                'order' => 5,
            ],
            [
                'name' => 'Ciencia de Datos',
                'slug' => 'data-science',
                'color' => '#06b6d4',
                'order' => 6,
            ],
            [
                'name' => 'DevOps y Automatización',
                'slug' => 'devops-and-automation',
                'color' => '#f97316',
                'order' => 7,
            ],
            [
                'name' => 'Cloud Computing',
                'slug' => 'cloud-computing',
                'color' => '#38bdf8',
                'order' => 8,
            ],
            [
                'name' => 'Internet de las Cosas (IoT)',
                'slug' => 'internet-of-things',
                'color' => '#10b981',
                'order' => 9,
            ],
            [
                'name' => 'Blockchain y Web3',
                'slug' => 'blockchain-and-web3',
                'color' => '#f59e0b',
                'order' => 10,
            ],
            [
                'name' => 'Desarrollo Móvil',
                'slug' => 'mobile-development',
                'color' => '#22c55e',
                'order' => 11,
            ],
            [
                'name' => 'Desarrollo de Videojuegos',
                'slug' => 'game-development',
                'color' => '#a855f7',
                'order' => 12,
            ],
            [
                'name' => 'Diseño UI/UX',
                'slug' => 'ui-ux-design',
                'color' => '#ec4899',
                'order' => 13,
            ],
            [
                'name' => 'Calidad de Software (QA)',
                'slug' => 'quality-assurance',
                'color' => '#14b8a6',
                'order' => 14,
            ],
            [
                'name' => 'Habilidades Blandas',
                'slug' => 'soft-skills',
                'color' => '#84cc16',
                'order' => 15,
            ],
            [
                'name' => 'Gestión de Proyectos TI',
                'slug' => 'it-management',
                'color' => '#64748b',
                'order' => 16,
            ],
            [
                'name' => 'Cultura Open Source',
                'slug' => 'open-source-culture',
                'color' => '#16a34a',
                'order' => 17,
            ],
        ];

        foreach ($categories as $category) {
            EventActivityCategory::create($category);
        }
    }
}
