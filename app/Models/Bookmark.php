<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bookmark extends Pivot
{
    use HasFactory;
    protected $table='bookmarks';  
    
    // public function user() {
    //   return $this->belongsTo('App\Models\User','user_id');
    // }
  
    // public function post() {
    //   return $this->belongsTo('App\Models\Post','post_id');
    // }

    // public function forum() {
    //   return $this->belongsTo('App\Models\Forum','forum_id');
    // }
}
