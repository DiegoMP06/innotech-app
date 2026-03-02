<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:guest|admin'])->group(function () {
});
