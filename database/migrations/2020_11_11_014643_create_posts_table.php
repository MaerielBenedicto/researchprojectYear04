<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
          $table->bigIncrements('id');
          $table->string('title');
          $table->text('body');
          $table->bigInteger('user_id')->unsigned();
          $table->bigInteger('forum_id')->unsigned();
          $table->int('s_score');
          $table->int('s_magnitude');

          $table->timestamps();

          $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('restrict');
          $table->foreign('forum_id')->references('id')->on('forums')->onUpdate('cascade')->onDelete('restrict');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('posts');
    }
}
