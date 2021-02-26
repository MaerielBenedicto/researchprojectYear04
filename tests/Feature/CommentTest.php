<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\Factories\Factory;
use Tests\TestCase;
use App\Models\User;
use App\Models\Forum;
use App\Models\Post;
use App\Models\PostVote;
use App\Models\Comment;
use App\Models\Bookmark;
use Laravel\Passport\Passport;use Illuminate\Foundation\Testing\DatabaseMigrations;

use Auth;

class CommentTest extends TestCase
{

    use WithFaker;


    /**
	 * A user can browse comments in a post
     *
     * @return void
     */	
    public function test_a_user_can_browse_comments() {
		$user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
		$post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
        $comment = Comment::factory()->create(['user_id' => $user->id,
                                         'post_id' => $post->id]);

		$response = $this->get('/api/posts/' . $post->id . '/comments');
		$response->assertSee($comment->body);
		$response->assertStatus(200);
	}


    /**
	 * A user can add comment in a post
     *
     * @return void
     */	
    public function test_a_user_can_add_comment() {
		$user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
		$post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
        
        Passport::actingAs($user);
        $this->setUpFaker();

        $data = [
            'body' => $this->faker->paragraph,
            'user_id' => $user->id,
            'post_id' => $post->id
        ];
        // dd($response->getContent());

        $response = $this->json('POST','/api/posts/'. $post->id . '/comments', $data)
                            ->assertStatus(200);
	}
}
