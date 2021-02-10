<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\Forum;

class ExampleTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testBasicTest()
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_user_can_browse_forums()
    {        
        $response = $this->get('/forums');
        $response->assertStatus(200);
    }

    public function test_user_can_browse_posts()
    {
        $response = $this->get('/posts');
        $response->assertStatus(200);
    }

    public function test_user_can_browse_comments()
    {
        $response = $this->get('/comments');
        $response->assertStatus(200);
    }
}
