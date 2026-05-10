<?php

use Illuminate\Foundation\Application;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

/*
|--------------------------------------------------------------------------
| cPanel Addon Domain Front Controller
|--------------------------------------------------------------------------
|
| Use this file only when your addon domain document root cannot point
| directly to this project's public/ directory.
|
| Example structure:
|   /home/CPANEL_USER/greenstar-app          Laravel core files
|   /home/CPANEL_USER/public_html/addon.com  contents of Laravel public/
|
| Set $laravelRoot to the absolute path where the Laravel core files live.
|
*/

$laravelRoot = '/home/CPANEL_USER/greenstar-app';

if (file_exists($maintenance = $laravelRoot.'/storage/framework/maintenance.php')) {
    require $maintenance;
}

require $laravelRoot.'/vendor/autoload.php';

/** @var Application $app */
$app = require_once $laravelRoot.'/bootstrap/app.php';

$app->handleRequest(Request::capture());
