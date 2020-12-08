<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Validator;

use Google\Cloud\Core\ServiceBuilder;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document\Type;
use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Entity\Type as EntityType;

class PostController extends Controller
{
  public function index($id)
    {
        // dd($id);
        $posts = Post::where('forum_id', $id)->with('user')->get();
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

    $body = $request->body;

    $sentimentValues = $this->sentiment($body);

    // dd($sentimentValues);

    $post = Post::create([
        'title' => $request->title,
        'body' => $request->body,
        'user_id' => $request->user_id,
        'forum_id' => $id,
        's_score' => $sentimentValues['score'],
        's_magnitude' => $sentimentValues['magnitude']
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

        $sentimentValues = $this->sentiment($body);

        $post = Post::find($id);
        $post->title = $request->input('title');
        $post->body = $request->input('body');
        $post->user_id = $request->input('user_id');
        $post->forum_id = $request->input('forum_id');
        $post->s_score = $sentimentValues['score'];
        $post->s_magnitude = $sentimentValues['magnitude'];
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
