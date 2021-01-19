<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Validator;

class AdminController extends Controller
{
  public function posts()
    {
         $posts = Post::with('user')->where('action', 'under review')->get();
         return $posts;
    }

    public function review_post(Request $request, $id)
    {
        //set post as reviewed
        $action = 'reviewed';

        $post = Post::find($id);
        $post->title = $post->title;
        $post->body = $post->body;
        $post->user_id = $post->user_id;
        $post->forum_id = $post->forum_id;
        $post->s_score = $post->s_score;
        $post->s_magnitude = $post->s_magnitude;
        $post->status =  $request->input('status');
        $post->action = $action;
        $post->save();

        return $post;
    }


  
}
