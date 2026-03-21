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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->json('instructions');
            $table->text('summary')->nullable();
            $table->decimal('max_score', 8, 2)->default(100);
            $table->decimal('passing_score', 8, 2)->default(60);
            $table->boolean('allow_late_submissions')->default(false);
            $table->unsignedTinyInteger('max_attempts')->default(1);
            $table->enum('submission_type', ['file', 'text', 'url', 'form', 'mixed'])
                ->default('file');
            $table->boolean('is_published')->default(false);
            $table->dateTime('due_date')->nullable()->index();
            $table->dateTime('available_from')->nullable();
            $table->foreignId('course_id')->constrained()->cascadeOnDelete();
            $table->foreignId('course_lesson_id')->nullable()
                ->constrained()->nullOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['course_id', 'is_published']);
            $table->index(['course_id', 'due_date']);
        });

        Schema::create('assignment_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('assignment_id')->constrained()->cascadeOnDelete();
            $table->text('text_content')->nullable();
            $table->string('url_content')->nullable();
            $table->foreignId('form_response_id')->nullable()
                ->constrained('form_responses')->nullOnDelete();
            $table->unsignedTinyInteger('attempt_number')->default(1);
            $table->foreignId('submission_status_id')->constrained()->restrictOnDelete();
            $table->boolean('is_late')->default(false);
            $table->decimal('score', 8, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->foreignId('graded_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->timestamp('graded_at')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'assignment_id', 'attempt_number']);
            $table->index(['assignment_id', 'submission_status_id']);
            $table->index(['user_id', 'assignment_id']);
        });

        Schema::create('submission_comments', function (Blueprint $table) {
            $table->id();
            $table->text('content');
            $table->foreignId('assignment_submission_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->index(['assignment_submission_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('submission_comments');
        Schema::dropIfExists('assignment_submissions');
        Schema::dropIfExists('assignments');
    }
};
