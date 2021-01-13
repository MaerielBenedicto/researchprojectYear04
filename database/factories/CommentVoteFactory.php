<?php

namespace Database\Factories;

use App\Models\CommentVote;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CommentVoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CommentVote::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'vote' => $this->faker->randomElement($array = array ('-1','0','1'))
        ];
    }
}