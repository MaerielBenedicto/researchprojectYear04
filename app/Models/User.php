<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function roles() {
      return $this->belongsToMany('App\Models\Role','user_role');
    }

    public function hasRole($role) {
      return null != $this->roles()->where('name', $role)->first();
    }

    public function forums()
    {
        return $this->hasMany('App\Models\Forum');
    }

    public function posts()
    {
        return $this->hasMany('App\Models\Post');
    }

    public function comments()
    {
        return $this->hasMany('App\Models\Comment');
    }

    public function post_votes()
    {
        return $this->hasMany('App\Models\PostVote');
    }

    public function comment_votes()
    {
        return $this->hasMany('App\Models\CommentVote');
    }

    public function bookmarks_posts() {
        return $this->belongsToMany('App\Models\Post', 'bookmarks', 'user_id', 'post_id');
    }

    public function bookmarks_forums() {
        return $this->belongsToMany('App\Models\Forum', 'bookmarks', 'user_id', 'forum_id');
    }
}
