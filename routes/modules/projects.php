<?php

use App\Http\Controllers\Projects\ProjectCollaboratorsController;
use App\Http\Controllers\Projects\ProjectContentController;
use App\Http\Controllers\Projects\ProjectController;
use App\Http\Controllers\Projects\ProjectScreenshotsController;
use App\Http\Controllers\Projects\ProjectStatusController;
use Illuminate\Support\Facades\Route;

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
