<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\User;
use App\Models\PostVote;
use Validator;

class PostVoteController extends Controller
{
  /** GET ALL VOTED POSTS OF USER **/
  public function index($id)
    {
        $user = User::where('id', $id)->first();
        $posts = $user->post_votes()->with('post')->get();
        return $posts;
    }

  /** CREATE POST VOTE **/
  public function store(Request $request, $id){
    $validator = Validator::make($request->all(), [
        'vote' => 'required|integer',
        'user_id' => 'required|integer',
        'post_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    //checks if user have voted or not
    $pVote = PostVote::where('user_id', $request->user_id)
                      ->where('post_id', $request->post_id)->first();

    if($pVote === null){
      $post = PostVote::create([
          'vote' => $request->vote,
          'user_id' => $request->user_id,
          'post_id' => $id
      ]);

      return response()->json(['message' => 'Vote created', 'data' => $post], 200);
    } else {
      //if user have voted already, update vote
      if($pVote['vote'] !== '0'){
        //call update function -- passing the request datas and post_vote id
        return $this->update($request, $pVote['id']);
      }
      // return response()->json(['message' => 'User have already voted'], 422);
    }

  }

  /** CHANGE POST VOTE **/
  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'vote' => 'required|integer',
          'user_id' => 'required|integer',
          'post_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $vote = PostVote::find($id);
        $vote->vote = $request->input('vote');
        $vote->user_id = $request->input('user_id');
        $vote->post_id = $request->input('post_id');
        $vote->save();

        return $vote;
    }

    public function count($id){
      //get post
      $post = Post::where('id', $id)->first();
      $countUpvote = $post->post_vote()->where('upvote', true)->count();
      $countDownvote = $post->post_vote()->where('downvote', true)->count();

      return response()->json(['message' => 'Vote counted', 'upvote' => $countUpvote, 'downvote' => $countDownvote], 200);
    }


}
