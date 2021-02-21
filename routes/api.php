<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\PassportController;
use App\Http\Controllers\API\ForumController;
use App\Http\Controllers\API\PostController;
use App\Http\Controllers\API\CommentController;
use App\Http\Controllers\API\PostVoteController;
use App\Http\Controllers\API\CommentVoteController;
use App\Http\Controllers\API\BookmarkController;

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

});

Route::middleware('auth:api')->group(function () {
  //auth
  Route::get('user', [PassportController::class, 'user']);
  Route::get('logout', [PassportController::class, 'logout']);

  //forums
  Route::post('forums', [ForumController::class, 'store']);
  Route::put('forums/{forum}', [ForumController::class, 'update']);
  Route::delete('forums/{forum}', [ForumController::class, 'destroy']);

  Route::get('profile/{user_id}/forums', [ForumController::class, 'user_forums']);

  //posts in a forum
  Route::post('forums/{forum}/posts', [PostController::class, 'store']);
  Route::put('posts/{post}', [PostController::class, 'update']);
  Route::delete('posts/{post}', [PostController::class, 'destroy']);
  Route::get('profile/{user_id}/posts', [PostController::class, 'user_posts']);

  //post
  Route::post('posts/{post}/comments', [CommentController::class, 'store']);
  Route::put('comments/{comment}', [CommentController::class, 'update']);
  Route::get('comments/{comment}', [CommentController::class, 'show']);
  Route::delete('comments/{comment}', [CommentController::class, 'destroy']);

  //vote in a post
  Route::get('posts/vote/{user}', [PostVoteController::class, 'index']);
  Route::post('posts/{post}/vote', [PostVoteController::class, 'store']);
  Route::put('post/{post_vote}/vote', [PostVoteController::class, 'update']);

  //vote in a comment
  Route::get('comments/vote/{user}', [CommentVoteController::class, 'index']);
  Route::post('comments/{comment}/vote', [CommentVoteController::class, 'store']);
  Route::put('comment/{post_vote}/vote', [CommentVoteController::class, 'update']);

  //bookmark post
  Route::post('bookmark/post/{id}', [BookmarkController::class, 'add_post_bookmark']);
  Route::post('unbookmark/post/{id}', [BookmarkController::class, 'remove_post_bookmark']);

  //bookmark forum
  Route::post('bookmark/forum/{id}', [BookmarkController::class, 'add_forum_bookmark']);
  Route::post('unbookmark/forum/{id}', [BookmarkController::class, 'remove_forum_bookmark']);

  Route::get('bookmarks', [BookmarkController::class, 'index']);


  //ADMIN 
  Route::get('posts', [AdminController::class, 'posts']);
  Route::put('review/post/{post}', [AdminController::class, 'review_post']);

  Route::get('comments', [AdminController::class, 'comments']);
  Route::put('review/comment/{comment}', [AdminController::class, 'review_comment']);



});
