<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tours', function (Blueprint $table) {
            $table->decimal('adult_price', 10, 2)->nullable()->after('price');
            $table->decimal('child_price', 10, 2)->nullable()->after('adult_price');
            $table->string('pricing_note')->nullable()->after('child_price');
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->decimal('price_per_night', 10, 2)->nullable()->after('price_from');
            $table->string('child_policy')->nullable()->after('price_per_night');
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->unsignedInteger('number_of_adults')->default(1)->after('travel_date');
            $table->unsignedInteger('number_of_children')->default(0)->after('number_of_adults');
            $table->string('pickup_location')->nullable()->after('number_of_children');
            $table->decimal('estimated_total', 10, 2)->nullable()->after('number_of_guests');
        });

        Schema::table('hotel_bookings', function (Blueprint $table) {
            $table->unsignedInteger('number_of_adults')->default(1)->after('check_out');
            $table->unsignedInteger('number_of_children')->default(0)->after('number_of_adults');
            $table->decimal('estimated_total', 10, 2)->nullable()->after('number_of_guests');
        });

        Schema::table('transport_bookings', function (Blueprint $table) {
            $table->unsignedInteger('number_of_adults')->default(1)->after('travel_time');
            $table->unsignedInteger('number_of_children')->default(0)->after('number_of_adults');
            $table->decimal('estimated_total', 10, 2)->nullable()->after('number_of_passengers');
        });
    }

    public function down(): void
    {
        Schema::table('transport_bookings', function (Blueprint $table) {
            $table->dropColumn(['number_of_adults', 'number_of_children', 'estimated_total']);
        });

        Schema::table('hotel_bookings', function (Blueprint $table) {
            $table->dropColumn(['number_of_adults', 'number_of_children', 'estimated_total']);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['number_of_adults', 'number_of_children', 'pickup_location', 'estimated_total']);
        });

        Schema::table('hotels', function (Blueprint $table) {
            $table->dropColumn(['price_per_night', 'child_policy']);
        });

        Schema::table('tours', function (Blueprint $table) {
            $table->dropColumn(['adult_price', 'child_price', 'pricing_note']);
        });
    }
};
