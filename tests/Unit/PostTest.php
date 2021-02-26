<?php

namespace Tests\Unit;
use App\Models\User;
use App\Models\Role;

use App\Models\Forum;
use App\Models\Post;
use App\Models\PostVote;
use App\Models\Comment;
use App\Models\Bookmark;
use Laravel\Passport\Passport;

use Tests\TestCase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class PostTest extends TestCase
{

    use WithFaker;
    
    /**
     * Test if post belongs to a forum
     *
     * @return void
     */
    public function test_a_post_belongs_to_a_forum()
    {

        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);

        //post is an instance of Post class
        $this->assertInstanceOf(Forum::class, $post->forum);
    }

    /**
     * Test posts has many comments
     *
     * @return void
     */
    public function test_a_post_has_many_comments()
    {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
        $comment = Comment::factory()->create(['user_id' => $user->id,
                                               'post_id' => $post->id]);

        
        // A comment exists in a post's comment collections
        $this->assertTrue($post->comments()->contains($comment));

        // Comments are related to post and is a collection instance.
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $post->comments());
    }

    /**
     * Test post has many votes
     *
     * @return void
     */
    public function test_a_post_has_many_votes()
    {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
        $vote = PostVote::factory()->create(['user_id' => $user->id,
                                             'post_id' => $post->id]);
        

        // A comment exists in a post's comment collections
        $this->assertTrue($post->post_vote->contains($vote));

        // Comment Votes are related to comment and is a collection instance.
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $post->post_vote);
    }

    






}
