<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->text('body');
          $table->bigInteger('post_id')->unsigned();
          $table->bigInteger('user_id')->unsigned();
          $table->timestamps();
          $table->int('s_score');
          $table->int('s_magnitude');

          $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('restrict');
          $table->foreign('post_id')->references('id')->on('posts')->onUpdate('cascade')->onDelete('restrict');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('comments');
    }
}
