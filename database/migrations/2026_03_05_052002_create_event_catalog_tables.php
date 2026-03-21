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
        Schema::create('event_statuses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('color', 7);
            $table->string('description')->nullable();
            $table->unsignedTinyInteger('order')->default(0)->index();
            $table->timestamps();
        });

        Schema::create('difficulty_levels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('color', 7);
            $table->string('description')->nullable();
            $table->unsignedTinyInteger('order')->default(0)->index();
            $table->timestamps();
        });

        Schema::create('event_activity_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->string('icon')->nullable();
            $table->enum('behavior_type', [
                'competition',
                'bootcamp',
                'workshop',
                'talk',
                'open_source',
                'demo',
                'code_review',
                'default',
            ])->default('default');
            $table->unsignedTinyInteger('order')->default(0)->index();
            $table->timestamps();
        });

        Schema::create('event_activity_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('description')->nullable();
            $table->string('color', 7)->nullable();
            $table->unsignedTinyInteger('order')->default(0)->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_activity_categories');
        Schema::dropIfExists('event_activity_types');
        Schema::dropIfExists('difficulty_levels');
        Schema::dropIfExists('event_statuses');
    }
};
