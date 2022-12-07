<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoutineXII extends Model
{
    use HasFactory;

    protected $fillable = [
        'day',
        'xii10_30',
        'xii11_15',
        'xii12_00',
        'xii12_45',
        'xii01_30',
    ];
}
