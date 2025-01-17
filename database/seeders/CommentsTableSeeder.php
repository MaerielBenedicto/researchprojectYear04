<?php

namespace Database\Seeders;
use DB;
use Illuminate\Database\Seeder;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;


class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      // $comment = new Comment();
      // $comment->body = "I believe that all the safeguards of the U.S. political system will stop anyone, including Trump from becoming the dictator. He can keep playing theatrics all he wants but the time doesn't stop, the transition process is being carried out and soon, he will have no choice but to accept his defeat. It is clear in The U.S. Constitution, which is the supreme rule of the land, that by noon on Jan 20th, the time for the current president is over and a new president, chosen by the American people through the election process, is sworn in.";
      // $comment->user_id = 1;
      // $comment->post_id = 2;
      // $comment->s_score = 1;
      // $comment->s_magnitude = 1;
      // $comment->save();

      // $comment = new Comment();
      // $comment->body = "Trump will use all legal {NOTE: To a psychopath like Donald Trump legal means whatever he can get away with} means to prevent Biden from being sworn in. The growing pandemic and worsening deaths from Covid is what Trump wants - Chaos will aid his complete takeover and turning the US into a Trump controlled dictatorship. Putin did it in Russia. Trump is doing it here. Most Republicans are scared of Trump and the loyalists are being incorporated into the Trump cabal.";
      // $comment->user_id = 1;
      // $comment->post_id = 2;
      // $comment->s_score = 1;
      // $comment->s_magnitude = 1;
      // $comment->save();


      // $this->amntOfUsers = User::all()->count();
      // $this->amntOfPosts = Post::all()->count();

      // Comment::factory()
      //         ->count(50)
      //         ->create([
      //           //assign random integer to user_id (amount of users)
      //           'user_id' => function(){
      //             return mt_rand(1, $this->amntOfUsers);
      //           },
      //           //assign random integer to post_id (amount of posts)
      //           'post_id' => function(){
      //             return mt_rand(1, $this->amntOfPosts);
      //           }
      //         ]);

      $path = 'database/data/comments.sql';
      DB::unprepared(file_get_contents($path));
      $this->command->info('Comment table seeded!');
    }
}
