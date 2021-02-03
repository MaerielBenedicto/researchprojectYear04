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
        $post->status =  $request->input('status');
        $post->action = $action;
        $post->save();

        $nextPost = Post::with('user')->where('action', 'under review')->where('id', '>', $id)->get()->first();
        return $nextPost;
    }


  
}
