<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Forum;
use App\Models\User;

class ForumsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $forum = new Forum();
      $forum->topic = "Politics 2020 - Ireland";
      $forum->description = "Talk about what happened in Politics 2020";
      $forum->user_id = 1;
      $forum->save();

      $forum = new Forum();
      $forum->topic = "Pandemic 2020";
      $forum->description = "What happened in 2020";
      $forum->user_id = 3;
      $forum->save();

      $this->amntOfUsers = User::all()->count();

      Forum::factory()
              ->count(100)
              ->create([
                //assign random integer to doctor_id (amount of doctors)
                'user_id' => function(){
                  return mt_rand(1, $this->amntOfUsers);
                },
              ]);


    }
}
