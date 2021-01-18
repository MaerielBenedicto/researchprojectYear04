<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = $this->faker->sentence;
        $body = $this->faker->paragraph($nbSentences = 5, $variableNbSentences = true);
        $s_score = $this->faker->randomFloat($nbMaxDecimals = 1, $min = -1.0, $max = 1.0);
        $s_magnitude = $this->faker->randomFloat($nbMaxDecimals = 1, $min = 1, $max = 20);
        $type = $this->faker->randomElement($array = array ('high','mid','normal'));
        if($type === 'high' || $type === 'mid'){
            $action = 'under review';
            $status = $this->faker->randomElement($array = array ('approved','denied','null'));
        } else {
            $action = 'null';
            $status = $this->faker->randomElement($array = array ('approved','denied','null'));
        }
        return [
            'title' => $title,
            'body' => $body,
            's_score' => $s_score,
            's_magnitude' => $s_magnitude,
            'type' => $type,
            'action' => $action,
            'status' => $status
        ];
    }
}