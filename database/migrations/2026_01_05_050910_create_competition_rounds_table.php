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
            $table->unsignedSmallInteger('round_number')->default(1)->index();
            $table->boolean('starting_from_scratch')->default(false);
            $table->unsignedInteger('qualified_participants')->default(1);
            $table->unsignedInteger('winners_count')->default(1);
            $table->boolean('is_the_final')->default(false);
            $table->dateTime('started_at');
            $table->dateTime('ended_at');
            $table->foreignId('event_activity_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('competition_rounds');
    }
};
