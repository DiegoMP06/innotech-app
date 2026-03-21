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
        Schema::create('course_announcements', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->json('content');
            $table->boolean('is_pinned')->default(false);
            $table->boolean('notify_students')->default(true);
            $table->timestamp('published_at')->nullable();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['course_id', 'is_pinned', 'published_at']);
        });

        Schema::create('course_discussions', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->json('content');
            $table->boolean('is_pinned')->default(false);
            $table->boolean('is_closed')->default(false);
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_lesson_id')->nullable()
                ->constrained()->nullOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['course_id', 'is_closed', 'created_at']);
        });

        Schema::create('course_discussion_replies', function (Blueprint $table) {
            $table->id();
            $table->json('content');
            $table->boolean('is_solution')->default(false);
            $table->foreignId('parent_id')->nullable()
                ->constrained('course_discussion_replies')->nullOnDelete();
            $table->foreignId('course_discussion_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();

            $table->index(['course_discussion_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course_discussion_replies');
        Schema::dropIfExists('course_discussions');
        Schema::dropIfExists('course_announcements');
    }
};
