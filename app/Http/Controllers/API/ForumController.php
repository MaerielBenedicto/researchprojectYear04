<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Forum;
use App\Models\Post;
use App\Models\User;

use Validator;


class ForumController extends Controller
{

  public function index()
    {
        $tempForums = Forum::with('user')->get();
        $forums = array();
        foreach ($tempForums as $forum) {
          $postCount = $forum->posts()->where('action', 'null')->count();
          $forum['postsCount'] = $postCount;
  
          $forums[] = $forum;
        }
        return $forums;
    }

  //create forum
  public function store(Request $request){
    $validator = Validator::make($request->all(), [
        'topic' => 'required|string',
        'description' => 'nullable|string',
        'user_id' => 'required|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $forum = Forum::create([
        'topic' => $request->topic,
        'description' => $request->description,
        'user_id' => $request->user_id

    ]);

    return response()->json(['message' => 'Added to forums', 'data' => $forum], 200);
  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'topic' => 'required|string',
          'description' => 'nullable|string',
          'user_id' => 'required|integer'

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $forum = Forum::find($id);
        $forum->topic = $request->input('topic');
        $forum->description = $request->input('description');
        $forum->user_id = $request->input('user_id');
        $forum->save();

        return $forum;
    }

  //view forum
  public function show($id)
  {
    $forum = Forum::where('id', $id)->first();
    $tempPosts = Post::where('forum_id', $id)->where('action', 'null')->with('user')->get(); 

    $posts = array();
    foreach ($tempPosts as $post) {
      $countUpvote = $post->post_vote()->where('vote', '1')->count();
      $countDownvote = $post->post_vote()->where('vote', '-1')->count();      
      $post['upvote'] = $countUpvote;
      $post['downvote'] = $countDownvote;
      
      $posts[] = $post;
    }

    $postCount = $forum->posts()->where('action', 'null')->count();      
    $forum['postsCount'] = $postCount;


    if ($forum === null) {
      $statusMsg = 'forum not found!';
      $statusCode = 404;
    }
    else {
      return response()->json(
        [
            'data' => $posts,
            'forum' => $forum
        ],
        200);
    }
  }

  //delete forum
  public function destroy($id){
    $forum = Forum::findOrFail($id);
    $forum->delete();

    return response()->json(['message' => 'Forum deleted!'], 200);
  }

  public function user_forums($id)
    {
        $tempForums = Forum::where('user_id', $id)->with('user')->get();
        $forums = array();
        foreach ($tempForums as $forum) {
          $postCount = $forum->posts()->count();
          $forum['postsCount'] = $postCount;
  
          $forums[] = $forum;
        }
        return $forums;
    }
}
