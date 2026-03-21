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
        Schema::create('course_lessons', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('summary')->nullable();
            $table->json('content')->nullable();
            $table->enum('type', ['text', 'video', 'activity', 'live'])
                  ->default('text');
            $table->string('video_url')->nullable();
            $table->unsignedInteger('video_duration_seconds')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->unsignedSmallInteger('estimated_minutes')->default(10);
            $table->boolean('is_published')->default(false);
            $table->boolean('is_preview')->default(false)
                  ->comment('true = visible sin inscripción al curso');
            $table->foreignId('course_section_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['course_section_id', 'order']);
            $table->index(['course_id', 'is_published']);
            $table->index(['course_id', 'type']);
        });

        Schema::create('course_resources', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->string('url')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->foreignId('resource_type_id')->nullable()
                  ->constrained()->nullOnDelete();
            $table->morphs('resourceable');
            $table->timestamps();
            $table->index(['resourceable_type', 'resourceable_id', 'order']);
        });

        Schema::create('lesson_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_lesson_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->timestamp('completed_at')->useCurrent();
            $table->timestamps();
            $table->unique(['user_id', 'course_lesson_id']);
            $table->index(['user_id', 'course_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lesson_completions');
        Schema::dropIfExists('course_resources');
        Schema::dropIfExists('course_lessons');
    }
};
