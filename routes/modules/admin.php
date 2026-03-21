<?php

use App\Http\Controllers\Admin\AdminUserRoleController;
use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\Admin\AdminUserStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth',
    'verified',
    'active',
    'role:admin'
])->group(function () {
    Route::get('admin/users', AdminUsersController::class)->name('admin.users.index');
    Route::patch('admin/users/{user}/status', AdminUserStatusController::class)->name('admin.users.status');
    Route::patch('admin/users/{user}/role', AdminUserRoleController::class)->name('admin.users.role');
});
