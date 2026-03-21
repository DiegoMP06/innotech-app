<?php

namespace Database\Seeders\Forms;

use App\Models\Forms\FormType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FormTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Examen',
                'slug' => 'quiz',
                'description' => 'Evaluación con respuestas correctas y calificación automática. Soporta tiempo límite, intentos máximos y puntuación mínima para aprobar.',
                'icon' => 'academic-cap',
                'color' => '#6366f1',
                'is_gradable' => true,
                'order' => 1,
            ],
            [
                'name' => 'Evaluación',
                'slug' => 'evaluation',
                'description' => 'Evaluación formal de desempeño. Puede ser maestro → alumno o estructurada por competencias.',
                'icon' => 'magnifying-glass-circle',
                'color' => '#ef4444',
                'is_gradable' => true,
                'order' => 2,
            ],
            [
                'name' => 'Diagnóstico',
                'slug' => 'diagnostic',
                'description' => 'Test de nivel de entrada o diagnóstico inicial. Identifica conocimientos previos del alumno.',
                'icon' => 'beaker',
                'color' => '#0ea5e9',
                'is_gradable' => true,
                'order' => 3,
            ],
            [
                'name' => 'Autoevaluación',
                'slug' => 'self_assessment',
                'description' => 'El alumno evalúa su propio desempeño o nivel de comprensión de los temas.',
                'icon' => 'user-circle',
                'color' => '#14b8a6',
                'is_gradable' => true,
                'order' => 4,
            ],
            [
                'name' => 'Evaluación entre pares',
                'slug' => 'peer_review',
                'description' => 'Los alumnos se evalúan mutuamente usando una rúbrica o criterios definidos.',
                'icon' => 'users',
                'color' => '#f97316',
                'is_gradable' => true,
                'order' => 5,
            ],
            [
                'name' => 'Encuesta',
                'slug' => 'survey',
                'description' => 'Encuesta de opinión o satisfacción para análisis estadístico. Sin respuestas correctas.',
                'icon' => 'clipboard-document-list',
                'color' => '#3b82f6',
                'is_gradable' => false,
                'order' => 6,
            ],
            [
                'name' => 'Votación',
                'slug' => 'poll',
                'description' => 'Votación rápida de 1 a 3 preguntas. Ideal para embeber en posts o actividades.',
                'icon' => 'chart-bar',
                'color' => '#8b5cf6',
                'is_gradable' => false,
                'order' => 7,
            ],
            [
                'name' => 'Retroalimentación',
                'slug' => 'feedback',
                'description' => 'Formulario de retroalimentación estructurada. Típicamente post-evento, post-curso o post-actividad.',
                'icon' => 'chat-bubble-left-right',
                'color' => '#10b981',
                'is_gradable' => false,
                'order' => 8,
            ],
            [
                'name' => 'Investigación',
                'slug' => 'research',
                'description' => 'Instrumento de investigación académica con múltiples escalas y variables.',
                'icon' => 'document-magnifying-glass',
                'color' => '#7c3aed',
                'is_gradable' => false,
                'order' => 9,
            ],
            [
                'name' => 'Registro',
                'slug' => 'registration',
                'description' => 'Registro a evento o actividad con campos personalizados (talla de playera, equipo, restricciones alimentarias, etc.).',
                'icon' => 'identification',
                'color' => '#f59e0b',
                'is_gradable' => false,
                'order' => 10,
            ],
            [
                'name' => 'Contacto',
                'slug' => 'contact',
                'description' => 'Formulario de contacto general para la plataforma o un proyecto.',
                'icon' => 'envelope',
                'color' => '#64748b',
                'is_gradable' => false,
                'order' => 11,
            ],
            [
                'name' => 'Personalizado',
                'slug' => 'custom',
                'description' => 'Formulario sin tipo predefinido. El admin configura el comportamiento manualmente.',
                'icon' => 'squares-2x2',
                'color' => '#94a3b8',
                'is_gradable' => false,
                'order' => 12,
            ],
        ];

        foreach ($types as $type) {
            FormType::updateOrCreate(['slug' => $type['slug']], $type);
        }
    }
}
