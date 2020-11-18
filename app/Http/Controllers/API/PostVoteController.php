<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\PostVote;
use Validator;

class PostVoteController extends Controller
{
  public function index($id)
    {
        //get all upvoted posts
        $user = User::where('id', $id)->first();
        $posts = $user->post_votes()->where('upvote', true)->with('post')->get();
        return $posts;
    }

  //create post_vote
  public function store(Request $request, $id){
    $validator = Validator::make($request->all(), [
        'upvote' => 'nullable',
        'downvote' => 'nullable',
        'user_id' => 'required|integer',
        'post_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    //checks if user have voted or not
    $vote = PostVote::where('user_id', $request->user_id)
                      ->where('post_id', $request->post_id)->first();


    if($vote === null){
      $post = PostVote::create([
          'upvote' => $request->upvote,
          'downvote' => $request->downvote,
          'user_id' => $request->user_id,
          'post_id' => $id
      ]);

      return response()->json(['message' => 'Post created', 'data' => $post], 200);

    } else {
      return response()->json(['message' => 'User have already voted'], 422);
    }

  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'upvote' => 'nullable',
          'downvote' => 'nullable',
          'user_id' => 'required|integer',
          'post_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $vote = PostVote::find($id);
        $vote->upvote = $request->input('upvote');
        $vote->downvote = $request->input('downvote');
        $vote->user_id = $request->input('user_id');
        $vote->post_id = $request->input('post_id');
        $vote->save();

        return $vote;
    }

}
