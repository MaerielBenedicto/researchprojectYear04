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
        $body = $this->faker->paragraph($nbSentences = 5, $variableNbSentences = true);
        $s_score = $this->faker->randomFloat($nbMaxDecimals = 2, $min = -1.00, $max = 1.00);
        $s_magnitude = $this->faker->randomFloat($nbMaxDecimals = 1, $min = 1, $max = 10);
        //negative sentiment
        if($s_score <= -0.25 && $s_magnitude > .5) {
            $action = 'under review';
            $status = 'pending';
        } else {
            $action = 'null';
            $status = 'approved'; 
        }

        return [
            'body' => $body,
            's_score' => $s_score,
            's_magnitude' => $s_magnitude,
            'action' => $action,
            'status' => $status
        ];
    }
}