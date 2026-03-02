<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminUserStatusController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, User $user)
    {
        $user->is_active = !$user->is_active;
        $user->save();

        return back()->with(
            'message',
            'Usuario actualizado correctamente.'
        );
    }
}
