<?php

namespace App\Services\Auth;

use App\Models\User;
use Illuminate\Auth\Events\Registered;

class RegisterService
{
    public function __invoke(array $validatedData): array
    {
        $user = User::create($validatedData);
        event(new Registered($user));

        $token = auth('api')->login($user);

        return [
            'user' => $user,
            'token' => $token
        ];
    }
}
