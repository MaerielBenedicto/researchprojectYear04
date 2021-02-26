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

    /** UPDATE PROFILE **/
    public function update(Request $request){
        $rules = [
          'name' => 'required|string|min:3|max:191',
          'email' => 'required|email|min:3|max:191',
          'password' => 'required|confirmed',
          'password_confirmation' => 'required'
        ];
    
        $request->validate($rules);
    
        $user = auth()->user();
        $user->name = $request->name;
        $user->email = $request->email;
        if($request->password){
          $user->password = Hash::make($request->password);
        }
        $request->image = $user->image;
        $user->save();
        return response()->json(['user' => auth()->user()], 200);
      }


      /** UPDATE AVATAR **/
    public function updateAvatar(Request $request){


        $user = auth()->user();
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
