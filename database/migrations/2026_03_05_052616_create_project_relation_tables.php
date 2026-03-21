<?php

use App\Enums\Projects\RolesOfProjectCollaborators;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('project_collaborators', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('role', array_column(RolesOfProjectCollaborators::cases(), 'value'))
                ->default(RolesOfProjectCollaborators::COLLABORATOR->value);
            $table->timestamps();
            $table->unique(['project_id', 'user_id']);
            $table->index(['project_id', 'role']);
        });

        Schema::create('project_category', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained()->cascadeOnDelete();
            $table->foreignId('project_category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->unique(['project_id', 'project_category_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project_category');
        Schema::dropIfExists('project_collaborators');
    }
};
