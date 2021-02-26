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
     * User can create new forum 
     *
     * @return void
     */
    public function test_can_create_forum() {
        
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
