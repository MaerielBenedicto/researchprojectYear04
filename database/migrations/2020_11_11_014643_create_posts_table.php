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
          $table->double('s_score');
          $table->double('s_magnitude');
          $table->set('status', ['approved', 'denied', 'pending']);
          $table->set('action', ['under review', 'reviewed', 'null']);

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
