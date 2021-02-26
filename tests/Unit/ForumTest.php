<?php

namespace Tests\Unit;
use App\Models\User;
use App\Models\Role;

use App\Models\Forum;
use App\Models\Post;
use App\Models\Bookmark;
use Laravel\Passport\Passport;

use Tests\TestCase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class ForumTest extends TestCase
{

    use WithFaker;
    
    /**
     * Test if forum has many posts 
     *
     * @return void
     */
    public function test_a_forum_has_many_posts()
    {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
   
        // A post exists in a forum's post collections.
        $this->assertTrue($forum->posts->contains($post));

        // Posts are related to forum and is a collection instance.
        $this->assertInstanceOf('Illuminate\Database\Eloquent\Collection', $forum->posts);
    }


}
