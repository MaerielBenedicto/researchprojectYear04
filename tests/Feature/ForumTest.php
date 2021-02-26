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

class ForumTest extends TestCase
{

    use WithFaker;


    /**
	 * A user can browse forums
     *
     * @return void
     */	
    public function test_a_user_can_browse_forums() {
		$user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
		
		$response = $this->get( '/api/forums' );
		$response->assertSee( $forum->topic);
		$response->assertStatus(200);
	}
	
    /**
	 * A user can read a single forum
     *
     * @return void
     */	
	public function test_a_user_can_read_a_single_forum() {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $forumId = $forum->id;

		$response = $this->get('/api/forums/' . $forumId);
		$response->assertSee($forum->topic);
		$response->assertStatus(200);
	}

    /**
     * User can create new forum 
     *
     * @return void
     */
    public function test_user_can_create_forum() {
        
        $user = User::factory()->create();
        Passport::actingAs($user);

        $response = $this->json('POST', '/api/forums', [
                'topic' => 'new forum topic',
                'description' => 'new description',
                'user_id' => $user->id,
        ]);

        $response->assertStatus(200);
    }     

}
