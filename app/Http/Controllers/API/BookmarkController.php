<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Bookmark;
use App\Models\Post;
use App\Models\User;

use Validator;

class BookmarkController extends Controller
{

  public function index($id)
    {
        $bookmarks = Bookmark::where('user_id', $id)
                 ->with('post','user')->get();

        if ($bookmarks === null) {
        $statusMsg = 'Bookmark not found!';
        $statusCode = 404;
        }
        else {
        return response()->json(
            [
                'data' => $bookmarks
            ],
            200);
        }
    }

  //create post
  public function store(Request $request){
    $validator = Validator::make($request->all(), [
        'user_id' => 'required|integer',
        'post_id' => 'nullable|integer'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $bookmark = Bookmark::create([
        'user_id' => $request->user_id,
        'post_id' => $request->post_id
    ]);

    $bookmark->load('post','user');

    return response()->json(['message' => 'Added to bookmarks', 'data' => $bookmark], 200);
  }

  //delete post
  public function destroy($id){
    $bookmark = Bookmark::findOrFail($id);
    $bookmark->delete();

    return response()->json(['message' => 'Bookmark deleted!'], 200);
  }

}
