<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\InactiveUserController;

Route::middleware([
    'auth',
    'inactive',
])->group(function () {
    Route::get('inactive', InactiveUserController::class)->name('inactive');
});

