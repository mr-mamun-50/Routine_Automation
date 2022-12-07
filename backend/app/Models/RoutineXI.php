<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoutineXI extends Model
{
    use HasFactory;

    protected $fillable = [
        'day',
        'xi10_30',
        'xi11_15',
        'xi12_00',
        'xi12_45',
        'xi01_30',
    ];
}
