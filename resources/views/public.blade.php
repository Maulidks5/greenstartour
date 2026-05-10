<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title inertia>Green Star Island Tour & Safari</title>
        <meta name="description" content="Book Zanzibar tours, Tanzania safari packages, hotels, transportation, and local experiences with Green Star Island Tour & Safari.">
        <meta name="robots" content="index, follow">
        <link rel="canonical" href="{{ url()->current() }}">
        <link rel="icon" type="image/png" href="{{ asset('favicon.png') }}">
        <link rel="apple-touch-icon" href="{{ asset('apple-touch-icon.png') }}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="Green Star Island Tour & Safari">
        <meta property="og:title" content="Green Star Island Tour & Safari">
        <meta property="og:description" content="Zanzibar tours, Tanzania safaris, hotel booking, transport, and local travel experiences made simple.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ asset('favicon.png') }}">
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="Green Star Island Tour & Safari">
        <meta name="twitter:description" content="Zanzibar tours, Tanzania safaris, hotels, transport, and local experiences.">
        <meta name="twitter:image" content="{{ asset('favicon.png') }}">
        @vite('resources/js/public.tsx')
        @inertiaHead
    </head>
    <body>
        @inertia
    </body>
</html>
