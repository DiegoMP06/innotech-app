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
        Schema::create('form_logic_rules', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->enum('action_type', [
                'show_question',    // Mostrar una pregunta oculta
                'hide_question',    // Ocultar una pregunta visible
                'require_question', // Hacer obligatoria una pregunta opcional
                'skip_question',    // Marcar pregunta como omitida
                'jump_to_section',  // Ir directamente a otra sección
                'end_form',         // Terminar el formulario aquí
            ]);
            $table->foreignId('target_question_id')->nullable()
                ->constrained('form_questions')->cascadeOnDelete();
            $table->foreignId('target_section_id')->nullable()
                ->constrained('form_sections')->cascadeOnDelete();
            $table->enum('condition_operator', ['and', 'or'])->default('and');
            $table->unsignedSmallInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->foreignId('form_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->index(['form_id', 'is_active', 'order']);
        });

        Schema::create('form_logic_conditions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('source_question_id')
                ->constrained('form_questions')->cascadeOnDelete();
            $table->enum('operator', [
                'equals',
                'not_equals',
                'contains',
                'not_contains',
                'starts_with',
                'ends_with',
                'greater_than',
                'greater_or_equal',
                'less_than',
                'less_or_equal',
                'is_answered',
                'is_empty',
                'includes_option',
                'excludes_option',
            ]);
            $table->json('comparison_value')->nullable();
            $table->foreignId('comparison_option_id')->nullable()
                ->constrained('form_question_options')->nullOnDelete();
            $table->foreignId('form_logic_rule_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->index(['form_logic_rule_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('form_logic_conditions');
        Schema::dropIfExists('form_logic_rules');
    }
};
