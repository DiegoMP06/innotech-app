<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;

class AdminUsersController extends Controller
{
    public function __invoke(Request $request)
    {
        $search = $request->string('search', '');
        $page = $request->integer('page', 1);

        $users = User::whereNot('id', '=', $request->user()->id)
            ->when(
                $search,
                fn($query, $search) =>
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('father_last_name', 'like', "%{$search}%")
                        ->orWhere('mother_last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
            )
            ->with('roles')
            ->orderBy('id', 'desc')
            ->paginate(20);

        $roles = Role::all();

        return Inertia::render('admin/users', [
            'users' => $users,
            'roles' => $roles,
            'page' => $page,
            'search' => $search,
            'message' => $request->session()->get('message'),
        ]);
    }
}
