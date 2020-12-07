<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Post;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      $post = new Post();
      $post->title = "Joe Biden's Popular Vote Lead Over Donald Trump Passes 5 Million";
      $post->body = "https://www.newsweek.com/joe-biden-donald-trump-popular-vote-election-2020-1546565";
      $post->user_id = 1;
      $post->forum_id = 1;
      $post->s_score = 1;
      $post->s_magnitude = 1;
      $post->save();

      $post = new Post();
      $post->title = "Trump greets thousands of supporters gathered in D.C. to Falsely claim he won election";
      $post->body = "November 14, 2020 at 10:50 a.m. PST 'A week after the election was called for Joe Biden, thousands of President Trump’s supporters gathered in the nation’s capital Saturday to falsely claim that the race had been stolen from the man they adore — who soon decided to welcome them in person.' https://www.washingtonpost.com/dc-md-va/2020/11/14/million-maga-march-dc-protests/";
      $post->user_id = 1;
      $post->forum_id = 1;
      $post->s_score = 1;
      $post->s_magnitude = 1;
      $post->save();

    }
}
