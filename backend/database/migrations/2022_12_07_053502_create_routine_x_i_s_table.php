<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('routine_x_i_s', function (Blueprint $table) {
            $table->id();
            $table->string('day');
            $table->string('xi10_30')->nullable();
            $table->string('xi11_15')->nullable();
            $table->string('xi12_00')->nullable();
            $table->string('xi12_45')->nullable();
            $table->string('xi01_30')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('routine_x_i_s');
    }
};
