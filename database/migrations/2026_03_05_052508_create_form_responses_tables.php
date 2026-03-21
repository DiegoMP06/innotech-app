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
        // ── Respuestas (sesiones de llenado) ──────────────────────────
        Schema::create('form_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()
                ->constrained()->nullOnDelete();
            $table->string('respondent_email')->nullable();
            $table->unsignedTinyInteger('attempt_number')->default(1);
            $table->enum('status', ['in_progress', 'submitted', 'graded'])
                ->default('in_progress');
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->decimal('score', 8, 2)->nullable();
            $table->decimal('max_score', 8, 2)->nullable();
            $table->decimal('percentage', 5, 2)->nullable();
            $table->boolean('passed')->nullable();
            $table->foreignId('graded_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->timestamp('graded_at')->nullable();
            $table->timestamp('started_at')->useCurrent();
            $table->timestamp('submitted_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'form_id', 'attempt_number']);
            $table->index(['form_id', 'status']);
            $table->index(['form_id', 'submitted_at']);
        });

        // ── Respuestas individuales por pregunta ──────────────────────
        Schema::create('form_response_answers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_response_id')->constrained()->cascadeOnDelete();
            $table->foreignId('form_question_id')->constrained()->cascadeOnDelete();
            $table->text('text_answer')->nullable();
            $table->decimal('number_answer', 10, 4)->nullable();
            $table->date('date_answer')->nullable();
            $table->time('time_answer')->nullable();
            $table->dateTime('datetime_answer')->nullable();
            $table->json('selected_option_ids')->nullable();
            $table->json('structured_answer')->nullable();
            $table->boolean('is_correct')->nullable();
            $table->decimal('score_awarded', 8, 2)->nullable();
            $table->text('feedback')->nullable();
            $table->boolean('was_skipped')->default(false);
            $table->timestamps();
            $table->unique(['form_response_id', 'form_question_id']);
            $table->index(['form_question_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_response_answers');
        Schema::dropIfExists('form_responses');
    }
};
