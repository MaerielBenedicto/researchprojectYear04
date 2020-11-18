<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Forum extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'topic', 'description', 'user_id'
    ];

    public function user(){
      return $this->belongsTo('App\Models\User');
    }

    public function posts(){
      return $this->hasMany('App\Models\Post');
    }
}
