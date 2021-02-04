<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Comment;

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
        // return $nextPost;

        return response()->json(
            [
                'post' => $post,
                'nextPost' => $nextPost
            ],
            200);
    }

    public function comments()
    {
         $comments = Comment::with('user')->where('action', 'under review')->get();
         return $comments;
    }

    public function review_comment(Request $request, $id)
    {
        //set comment as reviewed
        $action = 'reviewed';

        $comment = Comment::find($id);
        $comment->status =  $request->input('status');
        $comment->action = $action;
        $comment->save();

        $nextComment = Comment::with('user')->where('action', 'under review')->where('id', '>', $id)->get()->first();
        // return $nextComment;
        return response()->json(
            [
                'comment' => $comment,
                'nextComment' => $nextComment
            ],
        200);

        
    }


  
}
