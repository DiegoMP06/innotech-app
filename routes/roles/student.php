<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\Project\ProjectController;
use App\Http\Controllers\User\Project\ProjectStatusController;
use App\Http\Controllers\User\Project\ProjectContentController;
use App\Http\Controllers\User\Project\ProjectCollaboratorsController;
use App\Http\Controllers\User\Project\ProjectScreenshotsController;

Route::middleware([
    'auth',
    'verified',
    'active',
    'role:student|admin|member|teacher'
])->group(function () {
    Route::resource('projects', ProjectController::class);

    Route::get('projects/{project}/content/edit', [ProjectContentController::class, 'edit'])->name('projects.content.edit');
    Route::patch('projects/{project}/content', [ProjectContentController::class, 'update'])->name('projects.content.update');
    Route::resource('projects/{project}/project-collaborators', ProjectCollaboratorsController::class)->only(['index', 'store', 'destroy']);
    Route::patch('projects/{project}/status', ProjectStatusController::class)->name('projects.status');
    Route::post('projects/{project}/medias', [ProjectScreenshotsController::class, 'store'])->name('projects.medias.store');
    Route::delete('projects/{project}/medias/{media}', [ProjectScreenshotsController::class, 'destroy'])->name('projects.medias.destroy');
});
