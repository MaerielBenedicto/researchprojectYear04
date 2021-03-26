<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PostVote;
use App\Models\User;
use App\Models\Post;


class PostVoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $this->amntOfUsers = User::all()->count();
      $this->amntOfPosts = Post::all()->count();

      PostVote::factory()
              ->count(50)
              ->create([
                //assign random integer to user_id (amount of users)
                'user_id' => function(){
                  return mt_rand(1, $this->amntOfUsers);
                },
                'post_id' => function(){
                    return mt_rand(1, $this->amntOfPosts);
                  },
              ]);

    }
}
