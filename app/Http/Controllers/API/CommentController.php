<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;

use Validator;

class CommentController extends Controller
{
  public function index($id)
    {
        $post = Post::where('id', $id)->first();
        $comments = $post->comments()->with('user')->get();
        return $comments;
    }

  //create post
  public function store(Request $request, $id){
    $validator = Validator::make($request->all(), [
        'body' => 'required',
        'user_id' => 'required|integer',
        'post_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $comment = Comment::create([
        'body' => $request->body,
        'user_id' => $request->user_id,
        'post_id' => $id
    ]);

    return response()->json(['message' => 'Comment created', 'data' => $comment], 200);
  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'body' => 'required',
          'user_id' => 'required|integer',
          'post_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $comment = Comment::find($id);
        $comment->body = $request->input('body');
        $comment->user_id = $request->input('user_id');
        $comment->post_id = $request->input('post_id');
        $comment->save();

        return $comment;
    }

  //view comment
  public function show($id)
  {
    $comment = Comment::findOrFail($id);

    if ($comment === null) {
      $statusMsg = 'comment not found!';
      $statusCode = 404;
    }
    else {
      return response()->json(
        [
            'data' => $comment
        ],
        200);
    }
  }

  //delete post
  public function destroy($id){
    $comment = Comment::findOrFail($id);
    $comment->delete();

    return response()->json(['message' => 'comment deleted!'], 200);
  }
}
