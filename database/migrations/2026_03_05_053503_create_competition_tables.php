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
        Schema::create('competition_rounds', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('content');
            $table->unsignedSmallInteger('round_number')->default(1);
            $table->unsignedInteger('participants_per_round')->nullable();
            $table->boolean('starting_from_scratch')->default(false);
            $table->unsignedInteger('qualified_participants')->default(1);
            $table->unsignedInteger('winners_count')->default(1);
            $table->boolean('is_the_final')->default(false);
            $table->enum('status', ['pending', 'active', 'completed', 'cancelled'])
                ->default('pending');
            $table->dateTime('started_at');
            $table->dateTime('ended_at');
            $table->foreignId('event_activity_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['event_activity_id', 'round_number']);
            $table->index(['event_activity_id', 'status']);
        });

        Schema::create('competition_round_exercises', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('content');
            $table->decimal('score', 8, 2);
            $table->unsignedSmallInteger('order')->default(0);
            $table->unsignedInteger('time_limit_seconds')->nullable();
            $table->foreignId('difficulty_level_id')->nullable()
                ->constrained()->nullOnDelete();
            $table->foreignId('competition_round_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->index(['competition_round_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_round_exercises');
        Schema::dropIfExists('competition_rounds');
    }
};
