<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        foreach (['bookings', 'hotel_bookings', 'transport_bookings'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->text('admin_note')->nullable()->after('message');
            });
        }
    }

    public function down(): void
    {
        foreach (['bookings', 'hotel_bookings', 'transport_bookings'] as $table) {
            Schema::table($table, function (Blueprint $table) {
                $table->dropColumn('admin_note');
            });
        }
    }
};
