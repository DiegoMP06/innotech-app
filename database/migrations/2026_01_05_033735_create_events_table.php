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
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('summary');
            $table->json('content');
            $table->boolean('is_free')->default(false);
            $table->decimal('price', 10, 2)->default(0);
            $table->decimal('percent_off', 5, 2)->default(0);
            $table->string('location');
            $table->decimal('lat', 10, 8);
            $table->decimal('lng', 11, 8);
            $table->dateTime('registration_started_at')->index();
            $table->dateTime('registration_ended_at');
            $table->date('start_date')->index();
            $table->date('end_date');
            $table->boolean('is_published')->default(false);
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};
