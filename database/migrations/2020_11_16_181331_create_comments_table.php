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
          $table->double('s_score');
          $table->double('s_magnitude');
          $table->set('status', ['approved', 'denied', 'pending']);
          $table->set('action', ['under review', 'reviewed', 'null']);

          $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('restrict');
          $table->foreign('post_id')->references('id')->on('posts')->onUpdate('cascade')->onDelete('cascade');
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
