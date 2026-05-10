<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ResourceController;
use App\Http\Controllers\PublicContentController;
use App\Http\Controllers\PublicPageController;
use App\Http\Controllers\PublicSubmissionController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

Route::redirect('/login', '/admin/login')->name('login');

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthController::class, 'create'])->name('admin.login');
    Route::post('/admin/login', [AuthController::class, 'store'])->middleware('throttle:admin-login')->name('admin.login.store');
});

Route::middleware('throttle:public-forms')->group(function () {
    Route::post('/booking-inquiries', [PublicSubmissionController::class, 'booking'])->name('public.booking');
    Route::post('/hotel-booking-inquiries', [PublicSubmissionController::class, 'hotelBooking'])->name('public.hotel-booking');
    Route::post('/transport-booking-inquiries', [PublicSubmissionController::class, 'transportBooking'])->name('public.transport-booking');
    Route::post('/contact-inquiries', [PublicSubmissionController::class, 'inquiry'])->name('public.inquiry');
    Route::post('/partnership-inquiries', [PublicSubmissionController::class, 'partnership'])->name('public.partnership');
    Route::post('/testimonials', [PublicSubmissionController::class, 'testimonial'])->name('public.testimonial');
});
Route::get('/api/public-content', PublicContentController::class)->name('api.public-content');

Route::get('/sitemap.xml', SitemapController::class)->name('sitemap');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin', 'throttle:admin-actions'])->group(function () {
    Route::get('/dashboard', DashboardController::class)->name('dashboard');
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');

    Route::middleware('full-admin')->group(function () {
        Route::get('/categories', [ResourceController::class, 'categories'])->name('categories.index');
        Route::post('/categories', [ResourceController::class, 'storeCategory'])->name('categories.store');
        Route::put('/categories/{category}', [ResourceController::class, 'updateCategory'])->name('categories.update');
        Route::delete('/categories/{category}', [ResourceController::class, 'deleteCategory'])->name('categories.destroy');

        Route::get('/hero-slides', [ResourceController::class, 'heroSlides'])->name('hero-slides.index');
        Route::post('/hero-slides', [ResourceController::class, 'storeHeroSlide'])->name('hero-slides.store');
        Route::put('/hero-slides/{heroSlide}', [ResourceController::class, 'updateHeroSlide'])->name('hero-slides.update');
        Route::delete('/hero-slides/{heroSlide}', [ResourceController::class, 'deleteHeroSlide'])->name('hero-slides.destroy');

        Route::get('/users', [ResourceController::class, 'users'])->name('users.index');
        Route::post('/users', [ResourceController::class, 'storeUser'])->name('users.store');
        Route::put('/users/{user}', [ResourceController::class, 'updateUser'])->name('users.update');
        Route::delete('/users/{user}', [ResourceController::class, 'deleteUser'])->name('users.destroy');

        Route::get('/site-settings', [ResourceController::class, 'siteSettings'])->name('site-settings.index');
        Route::post('/site-settings', [ResourceController::class, 'storeSiteSetting'])->name('site-settings.store');
        Route::put('/site-settings/{siteSetting}', [ResourceController::class, 'updateSiteSetting'])->name('site-settings.update');
        Route::delete('/site-settings/{siteSetting}', [ResourceController::class, 'deleteSiteSetting'])->name('site-settings.destroy');

        Route::get('/tours', [ResourceController::class, 'tours'])->name('tours.index');
        Route::post('/tours', [ResourceController::class, 'storeTour'])->name('tours.store');
        Route::put('/tours/{tour}', [ResourceController::class, 'updateTour'])->name('tours.update');
        Route::delete('/tours/{tour}', [ResourceController::class, 'deleteTour'])->name('tours.destroy');

        Route::get('/hotels', [ResourceController::class, 'hotels'])->name('hotels.index');
        Route::post('/hotels', [ResourceController::class, 'storeHotel'])->name('hotels.store');
        Route::put('/hotels/{hotel}', [ResourceController::class, 'updateHotel'])->name('hotels.update');
        Route::delete('/hotels/{hotel}', [ResourceController::class, 'deleteHotel'])->name('hotels.destroy');

        Route::get('/transport-services', [ResourceController::class, 'transportServices'])->name('transport-services.index');
        Route::post('/transport-services', [ResourceController::class, 'storeTransportService'])->name('transport-services.store');
        Route::put('/transport-services/{transportService}', [ResourceController::class, 'updateTransportService'])->name('transport-services.update');
        Route::delete('/transport-services/{transportService}', [ResourceController::class, 'deleteTransportService'])->name('transport-services.destroy');

        Route::get('/transport-routes', [ResourceController::class, 'transportRoutes'])->name('transport-routes.index');
        Route::post('/transport-routes', [ResourceController::class, 'storeTransportRoute'])->name('transport-routes.store');
        Route::put('/transport-routes/{transportRoute}', [ResourceController::class, 'updateTransportRoute'])->name('transport-routes.update');
        Route::delete('/transport-routes/{transportRoute}', [ResourceController::class, 'deleteTransportRoute'])->name('transport-routes.destroy');

        Route::get('/gallery', [ResourceController::class, 'gallery'])->name('gallery.index');
        Route::post('/gallery', [ResourceController::class, 'storeGallery'])->name('gallery.store');
        Route::put('/gallery/{gallery}', [ResourceController::class, 'updateGallery'])->name('gallery.update');
        Route::delete('/gallery/{gallery}', [ResourceController::class, 'deleteGallery'])->name('gallery.destroy');

    });

    Route::get('/testimonials', [ResourceController::class, 'testimonials'])->name('testimonials.index');
    Route::post('/testimonials', [ResourceController::class, 'storeTestimonial'])->name('testimonials.store');
    Route::put('/testimonials/{testimonial}', [ResourceController::class, 'updateTestimonial'])->name('testimonials.update');
    Route::delete('/testimonials/{testimonial}', [ResourceController::class, 'deleteTestimonial'])->name('testimonials.destroy');

    Route::get('/bookings', [ResourceController::class, 'bookings'])->name('bookings.index');
    Route::put('/bookings/{booking}', [ResourceController::class, 'updateBooking'])->name('bookings.update');
    Route::delete('/bookings/{booking}', [ResourceController::class, 'deleteBooking'])->name('bookings.destroy');

    Route::get('/hotel-bookings', [ResourceController::class, 'hotelBookings'])->name('hotel-bookings.index');
    Route::put('/hotel-bookings/{hotelBooking}', [ResourceController::class, 'updateHotelBooking'])->name('hotel-bookings.update');
    Route::delete('/hotel-bookings/{hotelBooking}', [ResourceController::class, 'deleteHotelBooking'])->name('hotel-bookings.destroy');

    Route::get('/transport-bookings', [ResourceController::class, 'transportBookings'])->name('transport-bookings.index');
    Route::put('/transport-bookings/{transportBooking}', [ResourceController::class, 'updateTransportBooking'])->name('transport-bookings.update');
    Route::delete('/transport-bookings/{transportBooking}', [ResourceController::class, 'deleteTransportBooking'])->name('transport-bookings.destroy');

    Route::get('/inquiries', [ResourceController::class, 'inquiries'])->name('inquiries.index');
    Route::put('/inquiries/{inquiry}', [ResourceController::class, 'updateInquiry'])->name('inquiries.update');
    Route::delete('/inquiries/{inquiry}', [ResourceController::class, 'deleteInquiry'])->name('inquiries.destroy');

    Route::get('/partnership-requests', [ResourceController::class, 'partnershipRequests'])->name('partnership-requests.index');
    Route::put('/partnership-requests/{partnershipRequest}', [ResourceController::class, 'updatePartnershipRequest'])->name('partnership-requests.update');
    Route::delete('/partnership-requests/{partnershipRequest}', [ResourceController::class, 'deletePartnershipRequest'])->name('partnership-requests.destroy');
});

Route::redirect('/admin', '/admin/dashboard')->middleware(['auth', 'admin'])->name('admin');

Route::get('/{any?}', PublicPageController::class)
    ->where('any', '^(?!admin).*$')
    ->name('public');
