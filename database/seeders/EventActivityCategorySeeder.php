<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\EventActivityCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
            ],
            [
                'name' => 'Desarrollo de Software',
                'slug' => 'software-development',
            ],
            [
                'name' => 'Ciberseguridad',
                'slug' => 'cybersecurity',
            ],
            [
                'name' => 'Inteligencia Artificial',
                'slug' => 'artificial-intelligence',
            ],
            [
                'name' => 'Redes e Infraestructura',
                'slug' => 'networking-and-infrastructure',
            ],
            [
                'name' => 'Ciencia de Datos',
                'slug' => 'data-science',
            ],
            [
                'name' => 'DevOps y Automatización',
                'slug' => 'devops-and-automation',
            ],
            [
                'name' => 'Cloud Computing',
                'slug' => 'cloud-computing',
            ],
            [
                'name' => 'Internet de las Cosas (IoT)',
                'slug' => 'internet-of-things',
            ],
            [
                'name' => 'Blockchain y Web3',
                'slug' => 'blockchain-and-web3',
            ],
            [
                'name' => 'Desarrollo Móvil',
                'slug' => 'mobile-development',
            ],
            [
                'name' => 'Desarrollo de Videojuegos',
                'slug' => 'game-development',
            ],
            [
                'name' => 'Diseño UI/UX',
                'slug' => 'ui-ux-design',
            ],
            [
                'name' => 'Calidad de Software (QA)',
                'slug' => 'quality-assurance',
            ],
            [
                'name' => 'Habilidades Blandas',
                'slug' => 'soft-skills',
            ],
            [
                'name' => 'Gestión de Proyectos TI',
                'slug' => 'it-management',
            ],
            [
                'name' => 'Cultura Open Source',
                'slug' => 'open-source-culture',
            ],
        ];

        EventActivityCategory::insert($categories);
    }
}
