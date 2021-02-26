<?php

namespace Tests\Unit;
use App\Models\User;
use App\Models\Role;

use App\Models\Forum;
use App\Models\Post;
use App\Models\Comment;
use App\Models\Bookmark;
use Laravel\Passport\Passport;

use Tests\TestCase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class CommentTest extends TestCase
{

    use WithFaker;
    
    /**
     * Test if comment belongs to a post
     *
     * @return void
     */
    public function test_a_comment_belongs_to_a_post()
    {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
        $comment = Comment::factory()->create(['user_id' => $user->id,
                                               'post_id' => $post->id]);

        //post is an instance of Post class
        $this->assertInstanceOf(Post::class, $comment->post);
    }

    
}
