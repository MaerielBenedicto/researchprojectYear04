<?php

namespace Database\Factories;

use App\Models\Comment;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CommentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Comment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'body' => $this->faker->paragraph($nbSentences = 5, $variableNbSentences = true),
            's_score' => $this->faker->randomFloat($nbMaxDecimals = 1, $min = -1.0, $max = 1.0),
            's_magnitude' => $this->faker->randomFloat($nbMaxDecimals = 1, $min = 1, $max = 20)
        ];
    }
}