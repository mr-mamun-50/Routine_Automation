<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $user->createToken($user->email . '_token')->plainTextToken;

        return response()->json([
            'message' => 'User created successfully!',
            'user' => $user,
            'token' => $token,
        ], 200);
    }


    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials!',
            ], 401);
        }

        $token = $user->createToken($user->email . '_token')->plainTextToken;

        return response()->json([
            'message' => 'User logged in successfully!',
            'user' => $user,
            'token' => $token,
        ], 200);
    }


    public function logout()
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'message' => 'User logged out successfully!',
        ], 200);
    }
}
