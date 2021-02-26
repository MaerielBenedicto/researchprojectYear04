<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bookmark;
use App\Models\Post;
use App\Models\Forum;
use App\Models\User;

use Auth;
use Validator;

class BookmarkController extends Controller
{

  public function index()
    {
      $forums = Auth::user()->bookmarks_forums()->get();
      $posts = Auth::user()->bookmarks_posts()->get();

      return response()->json(
          [
              'forums' => $forums,
              'posts' => $posts
          ],
          200);
    }

     //bookmark post
     public function add_post_bookmark($id){
      $post = Post::where('id', $id)->first();
      Auth::user()->bookmarks_posts()->syncWithoutDetaching([$post->id]);
      return $post;
    } 


    //remove post bookmark
    public function remove_post_bookmark($id){
      $post = Post::where('id', $id)->first();
      Auth::user()->bookmarks_posts()->detach($post->id);
      return $post;
    }
    

    //add bookmark
    public function add_forum_bookmark($id){
      $forum = Forum::where('id', $id)->first();
      Auth::user()->bookmarks_forums()->syncWithoutDetaching([$forum->id]);
      return $forum;
    } 


    //remove bookmark
    public function remove_forum_bookmark($id){
      $forum = Forum::where('id', $id)->first();
      Auth::user()->bookmarks_forums()->detach($forum->id);
      return $forum;
    }

}
