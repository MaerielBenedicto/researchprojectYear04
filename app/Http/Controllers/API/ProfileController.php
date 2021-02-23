<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Validator;
use App\Bookmark;
use App\User;

use Hash;
use Storage;
use Auth;

use Illuminate\Http\Request;
class ProfileController extends Controller
{

  public function update(Request $request){
    $rules = [
      'name' => 'required|string|min:3|max:191',
      'email' => 'required|email|min:3|max:191',
      'password' => 'nullable|min:6|max:191',
      'image' => 'nullable|image|max:1999'
    ];

    $request->validate($rules);

    $user = auth()->user();
    $user->name = $request->name;
    $user->email = $request->email;

    if($request->hasFile('image')){
      $image = $request->image;
      $ext = $image->getClientOriginalExtension();
      $filename = uniqid().'.'.$ext;
      $image->storeAs('public/images', $filename);
      $path = public_path().'/uploads';
      $upload = $image->move($path, $filename);
      Storage::delete("public/images/{$user->image}");
      $user->image = $filename;
    }

    if($request->password){
      $user->password = Hash::make($request->password);
    }

    $user->save();
    return response()->json(['user' => auth()->user()], 200);
  }

  public function updateAvatar(Request $request){
    $user = auth()->user();
    // dd($request->image);
    if($request->file('image') !=null){
      $image = $request->image;
      $ext = $image->getClientOriginalExtension();
      $filename = uniqid().'.'.$ext;
      $image->storeAs('public/images', $filename);
      $path = public_path().'/uploads';
      $upload = $image->move($path, $filename);
      Storage::delete("public/images/{$user->image}");
      $user->image = $filename;
    }
    $user->save();
    return response()->json(['user' => auth()->user()], 200);
  }


}
