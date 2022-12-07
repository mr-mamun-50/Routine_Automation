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
        Schema::create('routine_x_i_i_s', function (Blueprint $table) {
            $table->id();
            $table->string('day');
            $table->string('xii10_30')->nullable();
            $table->string('xii11_15')->nullable();
            $table->string('xii12_00')->nullable();
            $table->string('xii12_45')->nullable();
            $table->string('xii01_30')->nullable();
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
        Schema::dropIfExists('routine_x_i_i_s');
    }
};
