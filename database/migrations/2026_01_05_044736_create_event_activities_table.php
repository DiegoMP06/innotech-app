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
        Schema::create('event_activities', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->json('content');
            $table->text('requirements')->nullable();
            $table->boolean('is_online')->default(false);
            $table->string('online_link')->nullable();
            $table->string('location')->nullable();
            $table->decimal('lat', 10, 8)->nullable();
            $table->decimal('lng', 11, 8)->nullable();
            $table->boolean('is_a_team_event')->default(false);
            $table->boolean('is_a_full_team_event')->default(false);
            $table->unsignedSmallInteger('min_team_size')->default(1);
            $table->unsignedSmallInteger('max_team_size')->nullable();
            $table->unsignedInteger('max_participants')->nullable();
            $table->boolean('only_students')->default(true);
            $table->boolean('is_competition')->default(false);
            $table->unsignedSmallInteger('participants_per_round')->nullable();
            $table->boolean('is_published')->default(false);
            $table->dateTime('started_at')->index();
            $table->dateTime('ended_at');
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_activity_type_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_activities');
    }
};
