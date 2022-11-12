<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\URL;

class TeachersController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $teachers = Teacher::all();

        return response()->json([
            'teachers' => $teachers
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:teachers',
            'designation' => 'required',
            'department' => 'required',
            'is_active' => 'required',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'designation' => $request->designation,
            'department' => $request->department,
            'is_active' => $request->is_active == 'true' ? $request->is_active = 1 : $request->is_active = 0,
        ];

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '.png';
            $file->move(public_path('uploads/teachers/'), $filename);
            $url = URL::to('/') . '/uploads/teachers/' . $filename;
            $data['photo'] = $url;
        }

        Teacher::create($data);

        return response()->json([
            'message' => 'Teacher created successfully',
        ], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $teacher = Teacher::find($id);

        return response()->json([
            'teacher' => $teacher
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:teachers,email,' . $id,
            'designation' => 'required',
            'department' => 'required',
            'is_active' => 'required',
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'designation' => $request->designation,
            'department' => $request->department,
            'is_active' => $request->is_active == 'true' ? $request->is_active = 1 : $request->is_active = 0,
        ];

        if ($request->hasFile('photo')) {

            $oldImg = Teacher::find($id)->photo;
            if ($oldImg) {
                $oldImg = substr($oldImg, -14);
                File::delete(public_path('uploads/teachers/' . $oldImg));
            }

            $file = $request->file('photo');
            $filename = time() . '.png';
            $file->move(public_path('uploads/teachers/'), $filename);
            $url = URL::to('/') . '/uploads/teachers/' . $filename;
            $data['photo'] = $url;
        }

        Teacher::find($id)->update($data);

        return response()->json([
            'message' => 'Teacher updated successfully',
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $teacher = Teacher::find($id);

        $oldImg = $teacher->photo;
        if ($oldImg) {
            $oldImg = substr($oldImg, -14);
            File::delete(public_path('uploads/teachers/' . $oldImg));
        }

        $teacher->delete();
        return response()->json([
            'message' => 'Teacher deleted successfully',
        ], 200);
    }
}
