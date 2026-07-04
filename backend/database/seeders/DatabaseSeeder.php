<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $sqlPath = database_path('data.sql');

        if (!File::exists($sqlPath)) {
            $this->command->error("Không tìm thấy file SQL tại: {$sqlPath}");
            return;
        }

        $sql = File::get($sqlPath);

        DB::transaction(function () use ($sql) {
            DB::statement('SET FOREIGN_KEY_CHECKS=0;');

            DB::unprepared($sql);

            DB::statement('SET FOREIGN_KEY_CHECKS=1;');
        });
    }
}
