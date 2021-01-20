<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;
use App\Models\User;
use App\Models\Forum;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // $post = new Post();
      // $post->title = "Joe Biden's Popular Vote Lead Over Donald Trump Passes 5 Million";
      // $post->body = "https://www.newsweek.com/joe-biden-donald-trump-popular-vote-election-2020-1546565";
      // $post->user_id = 1;
      // $post->forum_id = 1;
      // $post->s_score = -.72;
      // $post->s_magnitude = 5.0;
      // $post->status = 'pending';
      // $post->action = 'under review';
      // $post->save();

      // $post = new Post();
      // $post->title = "Trump greets thousands of supporters gathered in D.C. to Falsely claim he won election";
      // $post->body = "November 14, 2020 at 10:50 a.m. PST 'A week after the election was called for Joe Biden, thousands of President Trump’s supporters gathered in the nation’s capital Saturday to falsely claim that the race had been stolen from the man they adore — who soon decided to welcome them in person.' https://www.washingtonpost.com/dc-md-va/2020/11/14/million-maga-march-dc-protests/";
      // $post->user_id = 1;
      // $post->forum_id = 1;
      // $post->s_score = 1.00;
      // $post->s_magnitude = 1;
      // $post->status = 'approved';
      // $post->action = 'null';
      // $post->save();

      $this->amntOfUsers = User::all()->count();
      $this->amntOfForums = Forum::all()->count();

      Post::factory()
              ->count(200)
              ->create([
                //assign random integer to user_id (amount of users)
                'user_id' => function(){
                  return mt_rand(1, $this->amntOfUsers);
                },
                //assign random integer to forum_id (amount of forums)
                'forum_id' => function(){
                  return mt_rand(1, $this->amntOfForums);
                }
              ]);

    }
}
