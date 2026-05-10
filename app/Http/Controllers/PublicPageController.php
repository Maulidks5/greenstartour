<?php

namespace App\Http\Controllers;

use App\Support\PublicContent;
use Inertia\Inertia;
use Inertia\Response;

class PublicPageController extends Controller
{
    public function __invoke(): Response
    {
        Inertia::setRootView('public');

        return Inertia::render('Public/App', [
            'publicContent' => PublicContent::payload(),
        ]);
    }
}
