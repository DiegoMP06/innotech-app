<?php

use App\Http\Controllers\API\ApiBlogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/blog', ApiBlogController::class)->name('api.blog');
