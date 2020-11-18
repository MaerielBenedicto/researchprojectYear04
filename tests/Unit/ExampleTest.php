<?php

namespace Tests\Unit;
use App\Models\User;
use App\Models\Forum;

use Tests\TestCase;
// use PHPUnit\Framework\TestCase;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
      $user = User::where('id', 1)->first();
      $posts = $user->posts;
      $this->assertTrue($user->id === $posts->first()->user->id);

      $forum = Forum::where('id', 1)->first();
      $postsInForum = $forum->posts;
      $this->assertTrue($forum->id === $postsInForum->first()->forum->id);

      
    }
}
