<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('purchases', function (Blueprint $table) {
            $table->id();

            $table->string('user_id')->index();

            $table->string('event_id')->index();
            $table->string('event_title')->nullable();

            $table->unsignedInteger('quantity')->default(1);
            $table->decimal('price', 10, 2)->unsigned();
            $table->decimal('total', 12, 2)->unsigned();

            $table->enum('status', ['pendiente', 'pagado', 'cancelado'])->default('pendiente');


            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('purchases');
    }
};
