<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Forum;
use Validator;


class ForumController extends Controller
{

  public function index()
    {
        $forums = Forum::all();

        return $forums;
    }

  //create forum
  public function store(Request $request){
    $validator = Validator::make($request->all(), [
        'name' => 'required|string',
        'description' => 'nullable|string'
    ]);

    if ($validator->fails()) {
        return response()->json($validator->errors(), 422);
    }

    $forum = Forum::create([
        'name' => $request->name,
        'description' => $request->description
    ]);

    return response()->json(['message' => 'Added to forums', 'data' => $forum], 200);
  }

  public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
          'name' => 'required|string',
          'description' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $forum = Forum::find($id);
        $forum->name = $request->input('name');
        $forum->description = $request->input('description');
        $forum->save();

        return $forum;
    }

  //view forum
  public function show($id)
  {
    $forum = Forum::findOrFail($id);

    if ($forum === null) {
      $statusMsg = 'forum not found!';
      $statusCode = 404;
    }
    else {
      return response()->json(
        [
            'data' => $forum
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
}
