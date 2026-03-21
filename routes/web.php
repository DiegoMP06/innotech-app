<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');


Route::middleware([
    'auth',
    'verified',
    'active',
])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});


require __DIR__.'/modules/settings.php';
require __DIR__.'/modules/auth.php';
require __DIR__.'/modules/admin.php';
require __DIR__.'/modules/classroom.php';
require __DIR__.'/modules/events.php';
require __DIR__.'/modules/forms.php';
require __DIR__.'/modules/inactive.php';
require __DIR__.'/modules/posts.php';
require __DIR__.'/modules/projects.php';
