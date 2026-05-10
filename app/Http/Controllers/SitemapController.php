<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SitemapController extends Controller
{
    public function __invoke(): Response
    {
        $urls = collect([
            '/',
            '/tours',
            '/safari-packages',
            '/hotels',
            '/transport',
            '/gallery',
            '/about',
            '/contact',
            '/partnership',
        ])->map(fn (string $path) => [
            'loc' => url($path),
            'lastmod' => now()->toDateString(),
        ]);

        return response()
            ->view('sitemap', ['urls' => $urls])
            ->header('Content-Type', 'application/xml');
    }
}
