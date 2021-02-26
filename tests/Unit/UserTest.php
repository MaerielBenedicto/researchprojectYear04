<?php

namespace Tests\Unit;
use App\Models\User;
use App\Models\Role;

use App\Models\Forum;
use App\Models\Post;
use App\Models\Bookmark;
use Laravel\Passport\Passport;

use Google\Cloud\Core\ServiceBuilder;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document\Type;
use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Entity\Type as EntityType;

use Tests\TestCase;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

class UserTest extends TestCase
{
    
    /**
     * Test user has a role
     *
     * @return void
     */
    public function test_user_has_a_role()
    {
        $user = User::factory()->create();
        $role = Role::first();

        $user->roles()->attach($role);
        $this->assertTrue($user->hasRole($role->name));

        $user->roles()->detach($role);
        $this->assertFalse($user->hasRole($role->name));
    }


    /**
     * Test user can bookmark post
     *
     * @return void
     */
    public function test_a_user_can_bookmark_post()
    {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        $post = Post::factory()->create(['user_id' => $user->id,
                                         'forum_id' => $forum->id]);
        
        $user->bookmarks_posts()->syncWithoutDetaching([$post->id]);
        
        // A comment exists in a post's comment collections
        $this->assertTrue($user->bookmarks_posts->contains($post));
    }

    /**
     * Test user can bookmark forums
     *
     * @return void
     */
    public function test_a_user_can_bookmark_forums()
    {
        $user = User::factory()->create(); 
        $forum = Forum::factory()->create(['user_id' => $user->id]);
        
        $user->bookmarks_forums()->syncWithoutDetaching([$forum->id]);
        
        // A comment exists in a post's comment collections
        $this->assertTrue($user->bookmarks_forums->contains($forum));
    }





    



}
