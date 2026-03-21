<?php

use App\Http\Controllers\Events\EventContentController;
use App\Http\Controllers\Events\EventController;
use App\Http\Controllers\Events\EventStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth',
    'verified',
    'active',
    'role:member|admin'
])->group(function () {
    Route::resource('events', EventController::class);

    Route::get('events/{event}/content/edit', [EventContentController::class, 'edit'])->name('events.content.edit');
    Route::patch('events/{event}/content', [EventContentController::class, 'update'])->name('events.content.update');
    Route::patch('events/{event}/status', EventStatusController::class)->name('events.status');
});
