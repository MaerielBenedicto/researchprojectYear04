<?php

namespace Database\Seeders;
use DB;
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

      // $this->amntOfUsers = User::all()->count();
      // $this->amntOfForums = Forum::all()->count();

      // Post::factory()
      //         ->count(50)
      //         ->create([
      //           //assign random integer to user_id (amount of users)
      //           'user_id' => function(){
      //             return mt_rand(1, $this->amntOfUsers);
      //           },
      //           //assign random integer to forum_id (amount of forums)
      //           'forum_id' => function(){
      //             return mt_rand(1, $this->amntOfForums);
      //           }
      //         ]);

    $path = 'database/data/posts.sql';
    DB::unprepared(file_get_contents($path));
    $this->command->info('Post table seeded!');

    }
}
