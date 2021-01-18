<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use Validator;

use Google\Cloud\Core\ServiceBuilder;
use Google\Cloud\Language\V1\Document;
use Google\Cloud\Language\V1\Document\Type;
use Google\Cloud\Language\V1\LanguageServiceClient;
use Google\Cloud\Language\V1\Entity\Type as EntityType;

class AdminController extends Controller
{
  public function posts()
    {
         $posts = Post::with('user')->where('action', 'under review')->get();
         return $posts;
    }

  
}
