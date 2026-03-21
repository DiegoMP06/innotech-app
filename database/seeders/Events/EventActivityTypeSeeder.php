<?php

namespace Database\Seeders\Events;

use App\Models\Events\EventActivityType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EventActivityTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            // ── Competitivas ──────────────────────────────────────────
            [
                'name' => 'Hackathon',
                'slug' => 'hackathon',
                'behavior_type' => 'competition',
                'description' => 'Maratón de programación por equipos con rondas, retos y premiación.',
                'icon' => 'trophy',
                'order' => 1,
            ],
            [
                'name' => 'Competencia',
                'slug' => 'competition',
                'behavior_type' => 'competition',
                'description' => 'Actividad competitiva individual o por equipos con rondas clasificatorias.',
                'icon' => 'medal',
                'order' => 2,
            ],

            // ── Formativas ────────────────────────────────────────────
            [
                'name' => 'Bootcamp',
                'slug' => 'bootcamp',
                'behavior_type' => 'bootcamp',
                'description' => 'Programa intensivo de entrenamiento técnico vinculado a un curso en la plataforma Classroom.',
                'icon' => 'academic-cap',
                'order' => 3,
            ],
            [
                'name' => 'Taller',
                'slug' => 'workshop',
                'behavior_type' => 'workshop',
                'description' => 'Sesión práctica guiada por un instructor con ejercicios y materiales.',
                'icon' => 'wrench-screwdriver',
                'order' => 4,
            ],

            // ── Divulgación ───────────────────────────────────────────
            [
                'name' => 'Conferencia',
                'slug' => 'conference',
                'behavior_type' => 'talk',
                'description' => 'Presentación formal con uno o varios ponentes expertos.',
                'icon' => 'presentation-chart-bar',
                'order' => 5,
            ],
            [
                'name' => 'Charla',
                'slug' => 'development-talk',
                'behavior_type' => 'talk',
                'description' => 'Conversación técnica o de industria en formato más informal.',
                'icon' => 'chat-bubble-left-right',
                'order' => 6,
            ],
            [
                'name' => 'Webinar de IA',
                'slug' => 'ai-webinar',
                'behavior_type' => 'talk',
                'description' => 'Seminario en línea enfocado en inteligencia artificial y tecnologías emergentes.',
                'icon' => 'cpu-chip',
                'order' => 7,
            ],

            // ── Colaborativas ─────────────────────────────────────────
            [
                'name' => 'Contribución Open Source',
                'slug' => 'open-source-contribution',
                'behavior_type' => 'open_source',
                'description' => 'Sesión de contribución colaborativa a repositorios de código abierto.',
                'icon' => 'code-bracket',
                'order' => 8,
            ],

            // ── Exhibición y Evaluación ───────────────────────────────
            [
                'name' => 'Demostración de Software',
                'slug' => 'demo-day',
                'behavior_type' => 'demo',
                'description' => 'Presentación pública de proyectos tecnológicos desarrollados por los participantes.',
                'icon' => 'computer-desktop',
                'order' => 9,
            ],
            [
                'name' => 'Revisión de Código',
                'slug' => 'code-review-party',
                'behavior_type' => 'code_review',
                'description' => 'Sesión de análisis y retroalimentación técnica sobre proyectos de código.',
                'icon' => 'magnifying-glass-circle',
                'order' => 10,
            ],
        ];

        foreach ($types as $type) {
            EventActivityType::create($type);
        }
    }
}
