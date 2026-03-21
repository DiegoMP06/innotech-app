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
        Schema::create('payments', function (Blueprint $table) {
            $table->id();

            $table->string('reference_code', 30)->unique();
            $table->text('qr_payload');
            $table->morphs('payable');
            $table->decimal('amount', 10, 2);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('total', 10, 2);
            $table->string('currency', 3)->default('MXN');
            $table->enum('status', [
                'pending',
                'validating',
                'validated',
                'rejected',
                'expired',
                'refunded',
                'waived',
            ])->default('pending');
            $table->timestamp('expires_at')->nullable();
            $table->foreignId('validated_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->timestamp('validated_at')->nullable();
            $table->foreignId('managed_by')->nullable()
                ->constrained('users')->nullOnDelete();
            $table->text('management_notes')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            $table->softDeletes();
            $table->index(['status', 'expires_at']);
            $table->index(['user_id', 'status']);
        });

        Schema::create('payment_validations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('payment_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->enum('method', ['qr_scan', 'manual', 'auto']);
            $table->string('input_reference');
            $table->enum('result', [
                'success',
                'failed_not_found',
                'failed_expired',
                'failed_already_validated',
                'failed_mismatch',
                'rejected',
            ]);
            $table->text('notes')->nullable();
            $table->string('ip_address', 45)->nullable();
            $table->string('user_agent')->nullable();
            $table->timestamp('attempted_at')->useCurrent();
            $table->timestamps();
            $table->index(['payment_id', 'result']);
            $table->index(['payment_id', 'attempted_at']);
            $table->index(['user_id', 'attempted_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payment_validations');
        Schema::dropIfExists('payments');
    }
};
