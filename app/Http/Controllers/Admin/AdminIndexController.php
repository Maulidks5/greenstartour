<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class AdminIndexController extends Controller
{
    public function __invoke(string $section): Response
    {
        return Inertia::render('Admin/SectionIndex', [
            'section' => str($section)->headline()->toString(),
        ]);
    }
}
