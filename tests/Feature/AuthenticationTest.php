<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Database\Eloquent\Factories\Factory;
use Tests\TestCase;
use App\Models\User;
use Laravel\Passport\Passport;
use Illuminate\Foundation\Testing\DatabaseMigrations;

use Auth;

class AuthenticationTest extends TestCase
{

    use WithFaker;

    /**
     * User can log in
     *
     * @return void
     */

    public function test_user_can_login_with_correct_credentials()
    {
        $credential = [
            'email' => 'adminmaeriel@test.ie',
            'password' => 'secret'
        ];

        $this->json('POST','/api/login', $credential)
             ->assertStatus(200);
    }

     /**
     * User cannot log in with wrong credentials
     *
     * @return void
     */

    public function test_user_cannot_login_with_incorrect_credentials()
    {
        $credential = [
            'email' => 'adminmaeriel@test.ie',
            'password' => 'laraveltest'
        ];

        $this->json('POST','/api/login', $credential)
             ->assertStatus(401);
    }

    /**
     * User cannot log in if no account
     *
     * @return void
     */

    public function test_user_cannot_login_with_no_account()
    {
        $credential = [
            'email' => 'jay@test.ie',
            'password' => 'laraveltest'
        ];

        $this->json('POST','/api/login', $credential)
             ->assertStatus(422);
    }


    /**
     * User can register 
     *
     * @return void
     */

    public function test_register()
    {
        $this->setUpFaker();

        $user = [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'password' => 'secret',
            'password_confirmation' => 'secret'
        ];

        $response = $this->json('POST','/api/register', $user)
                    ->assertStatus(200);
    }

    
    public function testGetForum()
    {
        $response = $this->get('api/forums');
        $array = $response;
        $firstRecord = $response[0];
        $result = false;

        if($firstRecord['id'] == 1)
        {
            $result = true;
        }
        $this->assertEquals(true, $result);
    }
}
