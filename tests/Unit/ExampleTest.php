<?php

namespace Tests\Unit;
use App\Models\User;
use App\Models\Forum;
use App\Models\Post;
use App\Models\Bookmark;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Foundation\Testing\DatabaseMigrations;

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

      $post = Post::findOrfail(2);
      $comments = $post->comments();
      $this->assertTrue($post->id === $comments->first()->post->id);
    }





    
}
