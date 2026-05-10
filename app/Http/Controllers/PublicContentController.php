<?php

namespace App\Http\Controllers;

use App\Support\PublicContent;
use Illuminate\Http\JsonResponse;

class PublicContentController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json(PublicContent::payload());
    }
}
