<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transport_bookings', function (Blueprint $table) {
            $table->id();
            $table->string('service_type');
            $table->string('full_name');
            $table->string('email')->nullable();
            $table->string('whatsapp_number');
            $table->string('pickup_location');
            $table->string('dropoff_location');
            $table->date('travel_date')->nullable();
            $table->string('travel_time')->nullable();
            $table->unsignedInteger('number_of_passengers')->default(1);
            $table->text('message')->nullable();
            $table->enum('status', ['pending', 'confirmed', 'cancelled'])->default('pending');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transport_bookings');
    }
};
