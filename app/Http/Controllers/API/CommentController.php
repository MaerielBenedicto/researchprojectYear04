<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Post;
use Google\Cloud\Core\ServiceBuilder;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document\Type;
use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Entity\Type as EntityType;
use Validator;

class CommentController extends Controller
{
  public function index($id)
    {
        $post = Post::where('id', $id)->first();
        $tempComments = $post->comments()->with('user')->get();

        $comments = array();
        foreach ($tempComments as $comment) {
          $countUpvote = $comment->comment_vote()->where('vote', '1')->count();
          $countDownvote = $comment->comment_vote()->where('vote', '-1')->count();
          $comment['upvote'] = $countUpvote;
          $comment['downvote'] = $countDownvote;
          
          $comments[] = $comment;
        }
        return response()->json(['message' => 'Comment created', 'data' => $comments], 200);
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

    $body = $request->body;

    // $sentimentValues = $this->sentiment($body);


    $comment = Comment::create([
        'body' => $request->body,
        'user_id' => $request->user_id,
        'post_id' => $id,
        // 's_score' => $sentimentValues['score'],
        // 's_magnitude' => $sentimentValues['magnitude']
        's_score' => '0',
        's_magnitude' => '0'
    ]);

    $user = $comment->user()->first();
    return response()->json(['message' => 'Comment created', 'data' => $comment,'user'=> $user], 200);
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

        $body = $request->input('body');
        $sentimentValues = $this->sentiment($body);

        $comment = Comment::find($id);
        $comment->body = $request->input('body');
        $comment->user_id = $request->input('user_id');
        $comment->post_id = $request->input('post_id');
        $comment->s_score = $sentimentValues['score'];
        $comment->s_magnitude = $sentimentValues['magnitude'];
        $comment->save();

        return $comment;
    }

  //view comment
  public function show($id)
  {
    $comment = Comment::with('user')->findOrFail($id);
    $countUpvote = $comment->comment_vote()->where('vote', '1')->count();
    $countDownvote = $comment->comment_vote()->where('vote', '-1')->count();

    $comment['upvote'] = $countUpvote;
    $comment['downvote'] = $countDownvote;

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

  public function sentiment($body){
    //create an instance of the serviceBuilder /**
    //to specify project ID and JSON credentials

    $cloud = new ServiceBuilder([
      //specify location of the JSON file with 'keyFilePath'
      //base_path helper to refer to the fully qualified app root path
      'keyFilePath' => base_path('Practice01-f057879454bc.json'),

      //GCP
      'projectId' => 'practice01-292723'
    ]);

    //create instance of LanguageClient class
    //ServiceBuilder Class makes it easy by exposing various factory methods which
    //grants access to services in the API
    $language = $cloud->language();

    //text to analyse
    $text = $body;

    //Detect the sentiment of the text
    $annotation = $language->analyzeSentiment($text);
    // dd($annotation);
    $sentiment = $annotation->sentiment();
    // dd($sentiment);
    return $sentiment;
  }
}
