<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\CommentVote;
use App\Models\User;
use App\Models\Comment;


class CommentVoteTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

      $this->amntOfUsers = User::all()->count();
      $this->amntOfComments = Comment::all()->count();

      CommentVote::factory()
              ->count(50)
              ->create([
                //assign random integer to user_id (amount of users)
                'user_id' => function(){
                  return mt_rand(1, $this->amntOfUsers);
                },
                'comment_id' => function(){
                    return mt_rand(1, $this->amntOfComments);
                  },
              ]);

    }
}
