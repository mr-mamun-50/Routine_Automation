<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\RoutineXI;
use App\Models\RoutineXII;
use App\Models\Teacher;
use Illuminate\Http\Request;

class GenerateRoutineController extends Controller
{
    public function index($clas)
    {
        $obj = new GenerateRoutineController();

        $weeklyCourse = $obj->weeklyCourse($clas);

        $courses = Course::where('clas', $clas)->get();

        foreach ($courses as $key => $course) {
            $count[$course->name] = 0;
        }

        foreach ($weeklyCourse as $key => $value) {
            foreach ($value as $key => $course) {
                $count[$course]++;
            }
        }

        foreach ($count as $key => $value) {
            if ($value < 1) {
                $obj->index($clas);
            }
        }

        foreach ($weeklyCourse as $key => $value) {
            $routine = $clas === 'XI' ? RoutineXI::where('day', $key)->first() : RoutineXII::where('day', $key)->first();
            $routine->Update($value);
        }

        // return [$count, $weeklyCourse];
        return response()->json([
            'message' => 'Routine generated successfully'
        ], 200);
    }


    function weeklyCourse($clas)
    {
        $obj = new GenerateRoutineController();
        return [
            'Saturday' => $obj->generate($clas),
            'Sunday' => $obj->generate($clas),
            'Monday' => $obj->generate($clas),
            'Tuesday' => $obj->generate($clas),
            'Wednesday' => $obj->generate($clas),
            'Thursday' => $obj->generate($clas),
        ];
    }


    function generate($clas)
    {
        $obj = new GenerateRoutineController();

        $perDayCourse = $obj->perDayCourse($clas);

        foreach ($perDayCourse as $key => $value) {
            $perDayCourseName[$key] = $value->name;
        }
        foreach ($perDayCourse as $key => $value) {
            $teacher_id = $value->teacher_id;
            $perDayTeacherName[$key] = Teacher::find($teacher_id)->name;
        }
        $countCourse = array_count_values($perDayCourseName);
        $countTeacher = array_count_values($perDayTeacherName);


        while (count($countCourse) < 5 || count($countTeacher) < 5) {
            $perDayCourse = $obj->perDayCourse($clas);

            foreach ($perDayCourse as $key => $value) {
                $perDayCourseName[$key] = $value->name;
            }

            foreach ($perDayCourse as $key => $value) {
                $teacher_id = $value->teacher_id;
                $perDayTeacherName[$key] = Teacher::find($teacher_id)->name;
            }

            $countCourse = array_count_values($perDayCourseName);
            $countTeacher = array_count_values($perDayTeacherName);
        }


        return $perDayCourseName;
    }

    function perDayCourse($clas)
    {
        $obj = new GenerateRoutineController();
        $cls = $clas === 'XI' ? 'xi' : 'xii';

        $perDay = [
            $cls . '10_30' => $obj->randCourse($clas),
            $cls . '11_15' => $obj->randCourse($clas),
            $cls . '12_00' => $obj->randCourse($clas),
            $cls . '12_45' => $obj->randCourse($clas),
            $cls . '01_30' => $obj->randCourse($clas),
        ];

        return $perDay;
    }

    function randCourse($clas)
    {
        $randCourse = Course::all()->where('clas', $clas)->random();

        return $randCourse;
    }
}
