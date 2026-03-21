<?php

use App\Http\Controllers\Blog\BlogController;
use App\Http\Controllers\Blog\PostContentController;
use App\Http\Controllers\Blog\PostGalleryController;
use App\Http\Controllers\Blog\PostStatusController;
use Illuminate\Support\Facades\Route;

Route::middleware([
    'auth',
    'verified',
    'active',
    'role:teacher|admin|member'
])->group(function () {
    Route::resource('posts', BlogController::class);

    Route::get('posts/{post}/content/edit', [PostContentController::class, 'edit'])->name('posts.content.edit');
    Route::patch('posts/{post}/status', PostStatusController::class)->name('posts.status');
    Route::patch('posts/{post}/content', [PostContentController::class, 'update'])->name('posts.content.update');
    Route::post('posts/{post}/medias', [PostGalleryController::class, 'store'])->name('posts.medias.store');
    Route::delete('posts/{post}/medias/{media}', [PostGalleryController::class, 'destroy'])->name('posts.medias.destroy');
});
