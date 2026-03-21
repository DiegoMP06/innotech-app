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
        Schema::create('form_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->boolean('is_visible')->default(true);
            $table->foreignId('form_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->index(['form_id', 'order']);
        });

        Schema::create('form_questions', function (Blueprint $table) {
            $table->id();
            $table->text('title');
            $table->text('description')->nullable();
            $table->enum('question_type', [
                'short_text',
                'long_text',
                'email',
                'phone',
                'url',
                'number',
                'single_choice',
                'multiple_choice',
                'dropdown',
                'yes_no',
                'image_choice',
                'linear_scale',
                'rating',
                'nps',
                'likert_scale',
                'semantic_diff',
                'matrix',
                'checkbox_grid',
                'ranking',
                'date',
                'time',
                'datetime',
                'fill_in_blank',
                'matching',
                'ordering',
                'code',
                'file_upload',
                'signature',
                'section_break',
                'statement',
            ])->default('short_text');
            $table->boolean('is_required')->default(false);
            $table->boolean('is_visible')->default(true);
            $table->unsignedSmallInteger('order')->default(0);
            $table->json('settings')->nullable();
            $table->boolean('has_correct_answer')->default(false);
            $table->decimal('score', 8, 2)->default(1);
            $table->text('explanation')->nullable();
            $table->foreignId('form_id')->constrained()->cascadeOnDelete();
            $table->foreignId('form_section_id')->nullable()
                ->constrained()->nullOnDelete();
            $table->timestamps();
            $table->index(['form_id', 'order']);
            $table->index(['form_id', 'form_section_id', 'order']);
        });

        Schema::create('form_question_options', function (Blueprint $table) {
            $table->id();
            $table->text('text');
            $table->string('value')->nullable();
            $table->string('image_url')->nullable();
            $table->unsignedSmallInteger('order')->default(0);
            $table->boolean('is_row')->default(false);
            $table->unsignedSmallInteger('correct_order')->nullable();
            $table->foreignId('match_option_id')->nullable()
                ->constrained('form_question_options')->nullOnDelete();
            $table->boolean('is_correct')->default(false);
            $table->text('feedback')->nullable();
            $table->foreignId('form_question_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->index(['form_question_id', 'order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_question_options');
        Schema::dropIfExists('form_questions');
        Schema::dropIfExists('form_sections');
    }
};
