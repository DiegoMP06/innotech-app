<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'father_last_name' => fake()->lastName(),
            'mother_last_name' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'is_active' => true,
            'remember_token' => Str::random(10),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    public function admin(): static
    {
        return $this->afterCreating(fn (User $user) => $user->assignRole('admin'));
    }

    public function teacher(): static
    {
        return $this->afterCreating(fn (User $user) => $user->assignRole('teacher'));
    }

    public function student(): static
    {
        return $this->afterCreating(fn (User $user) => $user->assignRole('student'));
    }

    public function member(): static
    {
        return $this->afterCreating(fn (User $user) => $user->assignRole('member'));
    }

    public function guest(): static
    {
        return $this->afterCreating(fn (User $user) => $user->assignRole('guest'));
    }
}
