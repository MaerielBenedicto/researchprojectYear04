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

class PostTest extends TestCase
{

    use WithFaker;


    /**
	 * A user can browse posts in a forum
     *
     * @return void
     */	
    public function test_a_user_can_browse_posts() {
		$user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
		$post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);

		$response = $this->get('/api/forums/' . $forum->id);
		$response->assertSee($post->title);
		$response->assertStatus(200);
	}
	
    /**
	 * A user can read a single post
     *
     * @return void
     */	
	public function test_a_user_can_read_a_single_post() {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);

		$response = $this->get('/api/posts/' . $post->id);
		$response->assertSee($post->title);
		$response->assertStatus(200);
	}

    /**
	 * A user can create a post
     *
     * @return void
     */	
	public function test_a_user_can_create_a_post() {
        $user = User::findOrfail(3); 
        $forum = Forum::findOrfail(1);

        Passport::actingAs($user);
        
        $data = [
            'title' => 'new title',
            'body' => 'new body', 
            'user_id' => $user->id, 
            'forum_id' => $forum->id
        ];

        $response = $this->json('POST','/api/forums/' . $forum->id . '/posts', $data)
                    ->assertStatus(200);
	}

    
}
