<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\CourseController;
use App\Http\Controllers\API\RoutineController;
use App\Http\Controllers\API\TeachersController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware('auth:sanctum')->group(function () {

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('teachers', [TeachersController::class, 'index']);
    Route::post('teachers', [TeachersController::class, 'store']);
    Route::get('teachers/{id}/edit', [TeachersController::class, 'edit']);
    Route::post('teachers/{id}', [TeachersController::class, 'update']);
    Route::delete('teachers/{id}', [TeachersController::class, 'destroy']);

    Route::get('courses', [CourseController::class, 'index']);
    Route::post('courses', [CourseController::class, 'store']);
    Route::put('courses/{id}', [CourseController::class, 'update']);
    Route::delete('courses/{id}', [CourseController::class, 'destroy']);

    Route::get('routines_xi', [RoutineController::class, 'index_xi']);
    Route::get('routines_xii', [RoutineController::class, 'index_xii']);
    Route::put('routines/{id}/{cls}', [RoutineController::class, 'update']);
});
