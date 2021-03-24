<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Validator;
use Auth;

use Google\Cloud\Core\ServiceBuilder;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document\Type;
use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Entity\Type as EntityType;

class PostController extends Controller
{

  /** GET ALL APPROVED POSTS **/
  public function index()
    {
        $postsAll = Post::all()->where('status', 'approved')->load('user', 'forum');
        $posts = array();

       foreach ($postsAll as $post){
          $comments = $post->comments();
          $post['comments'] = $comments;
          $countUpvote = $post->post_vote()->where('vote', '1')->count();
          $countDownvote = $post->post_vote()->where('vote', '-1')->count();      
          $post['upvote'] = $countUpvote;
          $post['downvote'] = $countDownvote;
          $post['post_vote'] = $post->post_vote;
          $posts[] = $post;
        }
        
        return response()->json(
          [
              'data' => $posts
          ],
          200);
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

    $body = $request->body;
    // $sentimentValues = $this->sentiment($body);

    //generate random values
    $s_score = mt_rand(-1.0, 1.0);
    $s_magnitude = mt_rand(1, 10);

    //negative sentiment
    if($s_score <= -0.25 && $s_magnitude > .5) {
      $action = 'under review';
      $status = 'pending';
    } else {
        $action = 'null';
        $status = 'approved'; 
    }

    $post = Post::create([
        'title' => $request->title,
        'body' => $request->body,
        'user_id' => $request->user_id,
        'forum_id' => $id,
        // 's_score' => $sentimentValues['score'],
        // 's_magnitude' => $sentimentValues['magnitude']
        's_score' => $s_score,
        's_magnitude' =>  $s_magnitude,
        'status' => $status,
        'action' =>  $action
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

        $body = $request->input('body');
        // $sentimentValues = $this->sentiment($body);

        //generate random values
        $s_score = mt_rand(-1.0, 1.0);
        $s_magnitude = mt_rand(1, 10);
    
        //negative sentiment
        if($s_score <= -0.25 && $s_magnitude > .5) {
          $action = 'under review';
          $status = 'pending';
        } else {
            $action = 'null';
            $status = 'approved'; 
        }

        $post = Post::find($id);
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->user_id = $request->input('user_id');
        $post->forum_id = $request->input('forum_id');
        // $post->s_score = $sentimentValues['score'];
        // $post->s_magnitude = $sentimentValues['magnitude'];
        $post->s_score = $s_score;
        $post->s_magnitude = $s_magnitude;
        $post->status = $status;
        $post->action = $action;
        $post->save();

        return $post;
    }

  /** VIEW POST **/
  public function show($id)
  {
    $post = Post::with('user','forum')->findOrFail($id);
    
    //count votes
    $countUpvote = $post->post_vote()->where('vote', '1')->count();
    $countDownvote = $post->post_vote()->where('vote', '-1')->count();

    //count upvotes and downvotes
    $post['upvote'] = $countUpvote;
    $post['downvote'] = $countDownvote;

    //load comments of the post
    $post['comments'] = $post->comments();
    //load votes of the post
    $post['post_vote'] = $post->post_vote;

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

  /** DELETE POST **/
  public function destroy($id){
    $post = Post::findOrFail($id);
    $post->delete();

    return response()->json(['message' => 'Post deleted!'], 200);
  }


  /** GET ALL POSTS OF USER **/
  public function user_posts($id)
    {
        $posts = Post::where('user_id', $id)->with('user','forum')->get();
        foreach($posts as $post){
          $post['comments'] = $post->comments();
        }

        return $posts;
    }




  public function sentiment($body){

    //create an instance of the serviceBuilder /**
    $cloud = new ServiceBuilder([
      //specify location of the JSON file with 'keyFilePath'
      'keyFilePath' => base_path('Practice01-f057879454bc.json'),

      //GCP
      'projectId' => 'practice01-292723'
    ]);

    //create instance of LanguageClient class
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
