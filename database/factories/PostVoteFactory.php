<?php

namespace Database\Factories;

use App\Models\PostVote;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class PostVoteFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = PostVote::class;

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