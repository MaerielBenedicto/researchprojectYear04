<?php

namespace Database\Seeders;
use DB;
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
      // $forum = new Forum();
      // $forum->topic = "Politics 2020 - Ireland";
      // $forum->description = "Talk about what happened in Politics 2020";
      // $forum->user_id = 1;
      // $forum->save();

      // $forum = new Forum();
      // $forum->topic = "Pandemic 2020";
      // $forum->description = "What happened in 2020";
      // $forum->user_id = 3;
      // $forum->save();

      $this->amntOfUsers = User::all()->count();

      // Forum::factory()
      //         ->count(50)
      //         ->create([
      //           //assign random integer to user_id (amount of users)
      //           'user_id' => function(){
      //             return mt_rand(1, $this->amntOfUsers);
      //           },
      //         ]);
      $path = 'database/data/forums.sql';
      DB::unprepared(file_get_contents($path));
      $this->command->info('Forum table seeded!');
    }
}
