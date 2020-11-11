<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;

class AuthRole
{
    public function handle($request, Closure $next, String $role)
    {
        if (!$request->user() || !$request->user()->hasRole($role)) {
            return response('Unauthorised.', 401);
        }

        return $next($request);
    }
}
