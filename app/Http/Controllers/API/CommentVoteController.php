<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;

use Validator;
class CommentVoteController extends Controller
{
  public function index($id)
    {
        // dd($id);
        $votes = Post::where('id', $id)->first();
        return $votes;
    }

  //create post
  public function store(Request $request, $id){
    $validator = Validator::make($request->all(), [
        'upvote' => 'required|integer',
        'downvote' => 'required|integer',
        'user_id' => 'required|integer',
        'comment_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $comment = CommentVote::create([
        'upvote' => $request->upvote,
        'downvote' => $request->downvote,
        'user_id' => $request->user_id,
        'comment_id' => $id
    ]);

    return response()->json(['message' => 'Post created', 'data' => $post], 200);
  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'upvote' => 'required|integer',
          'downvote' => 'required|integer',
          'user_id' => 'required|integer',
          'comment_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $vote = Comment::find($id);
        $vote->upvote = $request->input('upvote');
        $vote->downvote = $request->input('downvote');
        $vote->user_id = $request->input('user_id');
        $vote->comment_id = $request->$id;
        $vote->save();

        return $vote;
    }

  //view post
  public function show($id)
  {
    $comment = Comment::findOrFail($id);
    $vote = $comment->votes;

    if ($vote === null) {
      $statusMsg = 'votes not found!';
      $statusCode = 404;
    }
    else {
      return response()->json(
        [
            'data' => $vote
        ],
        200);
    }
  }
}
