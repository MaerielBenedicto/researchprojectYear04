<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Validator;

class PostController extends Controller
{
  public function index($id)
    {
        // dd($id);
        $posts = Post::where('forum_id', $id)->get();
        return $posts;
    }

  //create post
  public function store(Request $request, $id){
    $validator = Validator::make($request->all(), [
        'title' => 'required|string',
        'body' => 'required',
        'user_id' => 'required|integer',
        'forum_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $post = Post::create([
        'title' => $request->title,
        'body' => $request->body,
        'user_id' => $request->user_id,
        'forum_id' => $id
    ]);

    return response()->json(['message' => 'Post created', 'data' => $post], 200);
  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'title' => 'required|string',
          'body' => 'required',
          'user_id' => 'required|integer',
          'forum_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $post = Post::find($id);
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->user_id = $request->input('user_id');
        $post->forum_id = $request->input('forum_id');
        $post->save();

        return $post;
    }

  //view post
  public function show($id)
  {
    $post = Post::findOrFail($id);

    if ($post === null) {
      $statusMsg = 'post not found!';
      $statusCode = 404;
    }
    else {
      return response()->json(
        [
            'data' => $post
        ],
        200);
    }
  }

  //delete post
  public function destroy($id){
    $post = Post::findOrFail($id);
    $post->delete();

    return response()->json(['message' => 'Post deleted!'], 200);
  }
}
