<?php

use App\Http\Controllers\Admin\AdminUsersController;
use App\Http\Controllers\Auth\InactiveUserController;
use App\Http\Controllers\Member\Blog\BlogController;
use App\Http\Controllers\Member\Blog\PostCategoryController;
use App\Http\Controllers\Member\Blog\PostContentController;
use App\Http\Controllers\Member\Blog\PostStatusController;
use App\Http\Controllers\Member\Event\EventContentController;
use App\Http\Controllers\Member\Event\EventController;
use App\Http\Controllers\Member\Event\EventStatusController;
use App\Http\Controllers\User\Project\ProjectCollaboratorsController;
use App\Http\Controllers\User\Project\ProjectContentController;
use App\Http\Controllers\User\Project\ProjectController;
use App\Http\Controllers\User\Project\ProjectStatusController;
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


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

require __DIR__.'/roles/student.php';
require __DIR__.'/roles/member.php';
require __DIR__.'/roles/teacher.php';
require __DIR__.'/roles/admin.php';
require __DIR__.'/roles/inactive.php';
