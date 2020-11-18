<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\CommentVote;
use App\Models\User;

use Validator;
class CommentVoteController extends Controller
{
  public function index($id)
    {
        //get all upvoted comments
        $user = User::where('id', $id)->first();
        $comments = $user->comment_votes()->where('upvote', true)->with('comment')->get();
        return $comments;
    }

  //create post_vote
  public function store(Request $request, $id){
    $validator = Validator::make($request->all(), [
        'upvote' => 'boolean',
        'downvote' => 'boolean',
        'user_id' => 'required|integer',
        'comment_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    //checks if user have voted or not
    $vote = CommentVote::where('user_id', $request->user_id)
                      ->where('comment_id', $request->comment_id)->first();


    if($vote === null){
      $comment = CommentVote::create([
          'upvote' => $request->upvote,
          'downvote' => $request->downvote,
          'user_id' => $request->user_id,
          'comment_id' => $id
      ]);

      return response()->json(['message' => 'Comment created', 'data' => $comment], 200);

    } else {
      return response()->json(['message' => 'User have already voted'], 422);
    }

  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'upvote' => 'boolean',
          'downvote' => 'boolean',
          'user_id' => 'required|integer',
          'comment_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $vote = CommentVote::find($id);
        $vote->upvote = $request->input('upvote');
        $vote->downvote = $request->input('downvote');
        $vote->user_id = $request->input('user_id');
        $vote->comment_id = $request->input('comment_id');
        $vote->save();

        return $vote;
    }
}
