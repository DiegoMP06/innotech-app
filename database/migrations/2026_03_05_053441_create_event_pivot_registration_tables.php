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
        Schema::create('event_activity_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_activity_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_activity_category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['event_activity_id', 'event_activity_category_id']);
        });

        Schema::create('event_collaborators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('role', ['organizer', 'judge', 'speaker', 'volunteer', 'collaborator'])
                ->default('collaborator');
            $table->timestamps();

            $table->unique(['event_id', 'user_id']);
        });

        Schema::create('event_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'waitlisted'])
                ->default('pending');
            $table->foreignId('payment_id')->nullable()
                ->constrained('payments')->nullOnDelete()
                ->comment('null si el evento es gratuito');
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
            $table->unique(['event_id', 'user_id']);
            $table->index(['event_id', 'status']);
        });

        Schema::create('event_activity_registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_activity_id')->constrained()->cascadeOnDelete();
            $table->enum('status', ['registered', 'confirmed', 'cancelled', 'disqualified'])
                ->default('registered');
            $table->timestamp('confirmed_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'event_activity_id']);
            $table->index(['event_activity_id', 'status']);
        });

        // Equipos
        Schema::create('event_activity_teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('captain_user_id')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->enum('status', ['forming', 'confirmed', 'disqualified'])
                ->default('forming');
            $table->foreignId('event_activity_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['event_activity_id', 'status']);
        });

        // Miembros de equipos
        Schema::create('event_activity_team_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->foreignId('event_activity_team_id')->constrained()->cascadeOnDelete();
            $table->enum('role', ['captain', 'member'])->default('member');
            $table->timestamp('joined_at')->nullable();
            $table->timestamps();
            $table->unique(['user_id', 'event_activity_team_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_activity_team_members');
        Schema::dropIfExists('event_activity_teams');
        Schema::dropIfExists('event_activity_registrations');
        Schema::dropIfExists('event_registrations');
        Schema::dropIfExists('event_collaborators');
        Schema::dropIfExists('event_activity_category');
    }
};
