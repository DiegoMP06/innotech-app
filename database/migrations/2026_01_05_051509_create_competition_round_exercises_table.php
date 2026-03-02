<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('competition_round_exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('content');
            $table->decimal('score', 8, 2);
            $table->foreignId('competition_round_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_round_exercises');
    }
};
