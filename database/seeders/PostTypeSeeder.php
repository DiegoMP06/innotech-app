<?php

namespace Database\Seeders;

use App\Models\PostType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PostTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $postTypes = [
            [
                'name' => 'Noticia',
                'slug' => 'news',
            ],
            [
                'name' => 'Artículo',
                'slug' => 'article',
            ],
            [
                'name' => 'Anuncio',
                'slug' => 'announcement',
            ],
        ];

        PostType::insert($postTypes);
    }
}
