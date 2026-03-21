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
        // Permisos por módulo
        $permissions = [
            'posts',      // Blog
            'projects',   // Projects
            'events',     // Events
            'classroom',  // Classroom (cursos, lecciones, tareas)
            'forms',      // Forms (crear/editar formularios)
            'payments',   // Payments (validar pagos)
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm, 'guard_name' => 'web']);
        }

        // Roles y sus permisos
        $roles = [
            'guest' => [],
            'student' => ['projects', 'classroom', 'forms'],
            'teacher' => ['posts', 'projects', 'classroom', 'forms'],
            'member' => ['posts', 'events', 'projects', 'classroom', 'forms'],
            'admin' => $permissions,
        ];

        foreach ($roles as $roleName => $rolePerms) {
            $role = Role::firstOrCreate(['name' => $roleName, 'guard_name' => 'web']);
            $role->syncPermissions($rolePerms);
        }
    }
}
