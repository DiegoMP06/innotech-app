<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use Database\Seeders\AdminUserSeeder;
use Database\Seeders\Blog\PostCategorySeeder;
use Database\Seeders\Blog\PostTypeSeeder;
use Database\Seeders\Classroom\CourseCategorySeeder;
use Database\Seeders\Classroom\CourseStatusSeeder;
use Database\Seeders\Classroom\ResourceTypeSeeder;
use Database\Seeders\Classroom\SubmissionStatusSeeder;
use Database\Seeders\Events\DifficultyLevelSeeder;
use Database\Seeders\Events\EventActivityCategorySeeder;
use Database\Seeders\Events\EventActivityTypeSeeder;
use Database\Seeders\Events\EventStatusSeeder;
use Database\Seeders\Forms\FormTypeSeeder;
use Database\Seeders\Projects\ProjectCategorySeeder;
use Database\Seeders\Projects\ProjectStatusSeeder;
use Database\Seeders\RoleSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            PostCategorySeeder::class,
            PostTypeSeeder::class,
            ProjectStatusSeeder::class,
            ProjectCategorySeeder::class,
            EventStatusSeeder::class,
            DifficultyLevelSeeder::class,
            EventActivityTypeSeeder::class,
            EventActivityCategorySeeder::class,
            CourseStatusSeeder::class,
            CourseCategorySeeder::class,
            ResourceTypeSeeder::class,
            SubmissionStatusSeeder::class,
            FormTypeSeeder::class,
            AdminUserSeeder::class,
        ]);

        User::factory(3)->teacher()->create();
        User::factory(5)->member()->create();
        User::factory(6)->student()->create();

        // User::firstOrCreate(
        //     ['email' => 'test@example.com'],
        //     [
        //         'name' => 'Test User',
        //         'password' => Hash::make('password'),
        //         'email_verified_at' => now(),
        //     ]
        // );
    }
}
