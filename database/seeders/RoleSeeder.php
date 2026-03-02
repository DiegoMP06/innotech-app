<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'events']);
        Permission::create(['name' => 'posts']);
        Permission::create(['name' => 'projects']);
        Permission::create(['name' => 'users']);

        Role::create(['name' => 'guest']);

        $student = Role::create(['name' => 'student']);
        $student->givePermissionTo('projects');

        $teacher = Role::create(['name' => 'teacher']);
        $teacher->givePermissionTo('posts');
        $teacher->givePermissionTo('projects');

        $member = Role::create(['name' => 'member']);
        $member->givePermissionTo('posts');
        $member->givePermissionTo('events');
        $member->givePermissionTo('projects');

        $admin = Role::create(['name' => 'admin']);
        $admin->givePermissionTo(Permission::all());
    }
}
