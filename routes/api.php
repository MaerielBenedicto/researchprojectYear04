<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PassportController;
use App\Http\Controllers\API\ForumController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostVoteController;
use App\Http\Controllers\API\CommentVoteController;

use App\Http\Controllers\API\Admin\AdminController;

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

Route::group(['middleware' => 'guest:api'], function() {

  Route::post('login', [PassportController::class, 'login']);
  Route::post('register', [PassportController::class, 'register']);

  Route::get('forums', [ForumController::class, 'index']);
  Route::get('forums/{forum}', [ForumController::class, 'show']);

  Route::get('forums/{forum}/posts', [PostController::class, 'index']);
  Route::get('posts/{post}', [PostController::class, 'show']);

  Route::get('posts/{post}/comments', [CommentController::class, 'index']);

  Route::get('posts/vote/{user}', [PostVoteController::class, 'index']);
  Route::get('comments/vote/{user}', [CommentVoteController::class, 'index']);

  // Route::get('post/{post_vote}', [PostVoteController::class, 'count']);
  // Route::get('posts', [AdminController::class, 'posts']);


});

Route::middleware('auth:api')->group(function () {
  Route::get('user', [PassportController::class, 'user']);
  Route::get('logout', [PassportController::class, 'logout']);

  
  Route::post('forums', [ForumController::class, 'store']);
  Route::put('forums/{forum}', [ForumController::class, 'update']);
  Route::delete('forums/{forum}', [ForumController::class, 'destroy']);
  //List of user's created forums
  Route::get('profile/{user_id}/forums', [ForumController::class, 'user_forums']);


  Route::post('forums/{forum}/posts', [PostController::class, 'store']);
  Route::put('posts/{post}', [PostController::class, 'update']);
  Route::delete('posts/{post}', [PostController::class, 'destroy']);
  Route::get('profile/{user_id}/posts', [PostController::class, 'user_posts']);

  Route::post('posts/{post}/comments', [CommentController::class, 'store']);
  Route::put('comments/{comment}', [CommentController::class, 'update']);
  Route::get('comments/{comment}', [CommentController::class, 'show']);
  Route::delete('comments/{comment}', [CommentController::class, 'destroy']);

  Route::post('posts/{post}/vote', [PostVoteController::class, 'store']);
  Route::put('post/{post_vote}/vote', [PostVoteController::class, 'update']);

  Route::post('comments/{comment}/vote', [CommentVoteController::class, 'store']);
  Route::put('comment/{post_vote}/vote', [CommentVoteController::class, 'update']);


  //ADMIN 
  Route::get('posts', [AdminController::class, 'posts']);
  Route::put('review/{post}', [AdminController::class, 'review_post']);

});
