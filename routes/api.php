<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PassportController;
use App\Http\Controllers\API\ForumController;
use App\Http\Controllers\API\PostController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('login', [PassportController::class, 'login']);
Route::post('register', [PassportController::class, 'register']);


Route::middleware('auth:api')->group(function () {
  Route::get('user', [PassportController::class, 'user']);
  Route::post('logout', [PassportController::class, 'logout']);

  Route::get('forums', [ForumController::class, 'index']);
  Route::post('forums', [ForumController::class, 'store']);
  Route::put('forums/{forum}', [ForumController::class, 'update']);
  Route::get('forums/{forum}', [ForumController::class, 'show']);
  Route::delete('forums/{forum}', [ForumController::class, 'destroy']);

  Route::get('forums/{forum}/posts', [PostController::class, 'index']);
  Route::post('forums/{forum}/posts', [PostController::class, 'store']);
  Route::put('posts/{post}', [PostController::class, 'update']);
  Route::get('posts/{post}', [PostController::class, 'show']);
  Route::delete('posts/{post}', [PostController::class, 'destroy']);
});
