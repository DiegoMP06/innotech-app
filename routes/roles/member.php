<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Member\Event\EventController;
use App\Http\Controllers\Member\Event\EventStatusController;
use App\Http\Controllers\Member\Event\EventContentController;

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
