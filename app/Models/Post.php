<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title', 'body','forum_id', 'user_id'
    ];

    public function forum()
    {
        return $this->belongsTo('App\Models\Forum');
    }

    public function user()
    {
        return $this->belongsTo('App\Models\User');
    }

    public function comments(){
      return $this->hasMany('App\Models\Comment');
    }

    public function post_vote(){
      return $this->hasMany('App\Models\PostVote');
    }


}
