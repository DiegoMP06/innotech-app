<?php

namespace Database\Seeders\Blog;

use App\Models\Blog\PostType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $types = [
            [
                'name' => 'Noticia',
                'slug' => 'news',
                'description' => 'Novedades y eventos recientes del programa o la industria.',
                'icon' => 'newspaper',
                'order' => 1,
            ],
            [
                'name' => 'Artículo',
                'slug' => 'article',
                'description' => 'Contenido técnico o educativo de profundidad sobre un tema específico.',
                'icon' => 'document-text',
                'order' => 2,
            ],
            [
                'name' => 'Anuncio',
                'slug' => 'announcement',
                'description' => 'Comunicados oficiales del club o la institución.',
                'icon' => 'megaphone',
                'order' => 3,
            ],
        ];

        foreach ($types as $type) {
            PostType::create($type);
        }
    }
}
