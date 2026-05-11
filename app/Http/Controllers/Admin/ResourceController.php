<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Gallery;
use App\Models\HeroSlide;
use App\Models\Hotel;
use App\Models\HotelBooking;
use App\Models\Inquiry;
use App\Models\PartnershipRequest;
use App\Models\SiteSetting;
use App\Models\Testimonial;
use App\Models\Tour;
use App\Models\TourCategory;
use App\Models\TransportBooking;
use App\Models\TransportRoute;
use App\Models\TransportService;
use App\Models\User;
use App\Support\BookingNotifier;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ResourceController extends Controller
{
    public function categories(): Response
    {
        return $this->resource('Categories', 'categories', TourCategory::latest()->get(), [
            ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
            ['name' => 'description', 'label' => 'Description', 'type' => 'textarea'],
            ['name' => 'icon', 'label' => 'Icon', 'type' => 'text'],
            ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['pending', 'active', 'inactive']],
        ], ['image', 'name', 'description', 'status']);
    }

    public function users(): Response
    {
        return $this->resource('Users', 'users', User::latest()->get(), [
            ['name' => 'name', 'label' => 'Full Name', 'type' => 'text', 'required' => true],
            ['name' => 'email', 'label' => 'Email Address', 'type' => 'text', 'required' => true],
            [
                'name' => 'password',
                'label' => 'New Password',
                'type' => 'password',
                'help' => 'Use at least 8 characters. Leave blank when editing if you do not want to change the password.',
            ],
            [
                'name' => 'password_confirmation',
                'label' => 'Repeat Password',
                'type' => 'password',
                'help' => 'Repeat the same password to confirm it before saving.',
            ],
            [
                'name' => 'role',
                'label' => 'Role',
                'type' => 'select',
                'options' => [
                    ['id' => 'admin', 'name' => 'Admin - Full Access'],
                    ['id' => 'staff', 'name' => 'Staff - Customer Requests'],
                ],
            ],
            [
                'name' => 'status',
                'label' => 'Status',
                'type' => 'select',
                'options' => [
                    ['id' => 'active', 'name' => 'Active'],
                    ['id' => 'inactive', 'name' => 'Inactive'],
                ],
            ],
        ], ['name', 'email', 'role', 'status', 'created_at']);
    }

    public function storeUser(Request $request): RedirectResponse
    {
        User::create($this->userData($request, true));

        return back()->with('success', 'User account created.');
    }

    public function updateUser(Request $request, User $user): RedirectResponse
    {
        $data = $this->userData($request, false, $user->id);

        if ($request->user()->id === $user->id && ($data['status'] ?? $user->status) !== 'active') {
            return back()->with('error', 'You cannot deactivate your own account.');
        }

        if ($request->user()->id === $user->id && ($data['role'] ?? $user->role) !== 'admin') {
            return back()->with('error', 'You cannot remove admin role from your own account.');
        }

        $user->update($data);

        return back()->with('success', 'User account updated.');
    }

    public function deleteUser(Request $request, User $user): RedirectResponse
    {
        if ($request->user()->id === $user->id) {
            return back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return back()->with('success', 'User account deleted.');
    }

    public function siteSettings(): Response
    {
        SiteSetting::firstOrCreate(
            ['key' => 'currency_symbol'],
            [
                'label' => 'Currency Symbol',
                'value' => '€',
                'group' => 'booking',
                'status' => 'active',
            ]
        );

        return $this->resource('Site Settings', 'site-settings', SiteSetting::orderBy('group')->orderBy('label')->get(), [
            ['name' => 'label', 'label' => 'Label', 'type' => 'text', 'required' => true],
            ['name' => 'key', 'label' => 'Setting Key', 'type' => 'text', 'required' => true],
            ['name' => 'value', 'label' => 'Value', 'type' => 'textarea'],
            ['name' => 'group', 'label' => 'Group', 'type' => 'select', 'options' => ['general', 'contact', 'social', 'booking']],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
        ], ['label', 'key', 'value', 'group', 'status']);
    }

    public function storeSiteSetting(Request $request): RedirectResponse
    {
        SiteSetting::create($this->siteSettingData($request));

        return back()->with('success', 'Site setting created.');
    }

    public function updateSiteSetting(Request $request, SiteSetting $siteSetting): RedirectResponse
    {
        $siteSetting->update($this->siteSettingData($request, $siteSetting->id));

        return back()->with('success', 'Site setting updated.');
    }

    public function deleteSiteSetting(SiteSetting $siteSetting): RedirectResponse
    {
        $siteSetting->delete();

        return back()->with('success', 'Site setting deleted.');
    }

    public function heroSlides(): Response
    {
        return $this->resource('Hero Slides', 'hero-slides', HeroSlide::orderBy('sort_order')->latest()->get(), [
            ['name' => 'label', 'label' => 'Small Label', 'type' => 'text'],
            ['name' => 'title', 'label' => 'Main Title', 'type' => 'text', 'required' => true],
            ['name' => 'subtitle', 'label' => 'Subtitle', 'type' => 'textarea'],
            ['name' => 'image', 'label' => 'Hero Image', 'type' => 'image'],
            ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
        ], ['image', 'label', 'title', 'sort_order', 'status']);
    }

    public function storeHeroSlide(Request $request): RedirectResponse
    {
        HeroSlide::create($this->heroSlideData($request));

        return back()->with('success', 'Hero slide created.');
    }

    public function updateHeroSlide(Request $request, HeroSlide $heroSlide): RedirectResponse
    {
        $heroSlide->update($this->heroSlideData($request, $heroSlide->image));

        return back()->with('success', 'Hero slide updated.');
    }

    public function deleteHeroSlide(HeroSlide $heroSlide): RedirectResponse
    {
        $heroSlide->delete();

        return back()->with('success', 'Hero slide deleted.');
    }

    public function storeCategory(Request $request): RedirectResponse
    {
        $data = $request->validate($this->categoryRules());
        $data['slug'] = Str::slug($data['name']);
        $data['image'] = $this->uploadedImagePath($request, 'image');
        TourCategory::create($data);

        return back()->with('success', 'Category created.');
    }

    public function updateCategory(Request $request, TourCategory $category): RedirectResponse
    {
        $data = $request->validate($this->categoryRules());
        $data['slug'] = Str::slug($data['name']);
        $data['image'] = $this->uploadedImagePath($request, 'image', $category->image);
        $category->update($data);

        return back()->with('success', 'Category updated.');
    }

    public function deleteCategory(TourCategory $category): RedirectResponse
    {
        $category->delete();

        return back()->with('success', 'Category deleted.');
    }

    public function tours(): Response
    {
        return $this->resource('Tours', 'tours', Tour::with('category:id,name')->latest()->get(), [
            ['name' => 'category_id', 'label' => 'Category', 'type' => 'select', 'required' => true, 'options' => TourCategory::where('status', 'active')->orderBy('name')->get(['id', 'name'])],
            ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
            ['name' => 'location', 'label' => 'Location', 'type' => 'text', 'required' => true],
            ['name' => 'duration', 'label' => 'Duration', 'type' => 'text', 'required' => true],
            ['name' => 'price', 'label' => 'Display Price', 'type' => 'number'],
            ['name' => 'adult_price', 'label' => 'Adult Price', 'type' => 'number'],
            ['name' => 'child_price', 'label' => 'Child Price', 'type' => 'number'],
            ['name' => 'pricing_note', 'label' => 'Pricing Note', 'type' => 'text'],
            ['name' => 'short_description', 'label' => 'Short Description', 'type' => 'textarea', 'required' => true],
            ['name' => 'description', 'label' => 'Description', 'type' => 'textarea'],
            ['name' => 'highlights', 'label' => 'Package Highlights / Offers', 'type' => 'textarea', 'help' => 'Write one offer per line. This appears on the tour detail page.'],
            ['name' => 'included', 'label' => 'Included', 'type' => 'textarea', 'help' => 'Write one included item per line.'],
            ['name' => 'itinerary', 'label' => 'Simple Plan', 'type' => 'textarea', 'help' => 'Write one plan step per line.'],
            ['name' => 'main_image', 'label' => 'Main Image', 'type' => 'image'],
            ['name' => 'gallery_images', 'label' => 'Gallery Images', 'type' => 'images'],
            ['name' => 'rating', 'label' => 'Rating', 'type' => 'number'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
            ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'checkbox'],
        ], ['main_image', 'gallery_images', 'title', 'category.name', 'adult_price', 'child_price', 'location', 'status']);
    }

    public function storeTour(Request $request): RedirectResponse
    {
        $data = $this->tourData($request);
        Tour::create($data);

        return back()->with('success', 'Tour created.');
    }

    public function updateTour(Request $request, Tour $tour): RedirectResponse
    {
        $tour->update($this->tourData($request, $tour->main_image, $tour->gallery_images));

        return back()->with('success', 'Tour updated.');
    }

    public function deleteTour(Tour $tour): RedirectResponse
    {
        $tour->delete();

        return back()->with('success', 'Tour deleted.');
    }

    public function bookings(): Response
    {
        return $this->resource('Bookings', 'bookings', Booking::with('tour:id,title')->latest()->get(), [
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['pending', 'confirmed', 'cancelled']],
            ['name' => 'estimated_total', 'label' => 'Agreed Price', 'type' => 'number'],
            ['name' => 'admin_note', 'label' => 'Message to Guest', 'type' => 'textarea'],
        ], ['full_name', 'tour.title', 'whatsapp_number', 'travel_date', 'number_of_adults', 'number_of_children', 'estimated_total', 'status'], true);
    }

    public function hotels(): Response
    {
        $fields = [
            ['name' => 'name', 'label' => 'Hotel Name', 'type' => 'text', 'required' => true],
            ['name' => 'location', 'label' => 'Location', 'type' => 'text', 'required' => true],
            ['name' => 'hotel_type', 'label' => 'Hotel Type', 'type' => 'select', 'options' => ['Beach Resort', 'Boutique Hotel', 'City Hotel', 'Luxury Villa', 'Budget Stay']],
            ['name' => 'price_from', 'label' => 'Manual Price Label', 'type' => 'text', 'help' => 'Optional. Leave empty to use Price Per Night with the website currency symbol.'],
            ['name' => 'price_per_night', 'label' => 'Price Per Night', 'type' => 'number'],
            ['name' => 'child_policy', 'label' => 'Child Policy', 'type' => 'text'],
            ['name' => 'short_description', 'label' => 'Hotel Overview', 'type' => 'textarea', 'help' => 'Short overview shown on the hotel detail page.'],
        ];

        if (Schema::hasColumn('hotels', 'amenities')) {
            $fields[] = ['name' => 'amenities', 'label' => 'Good to Know', 'type' => 'textarea', 'help' => 'Write one item per line. These appear in the Good to Know section.'];
        }

        $fields = [
            ...$fields,
            ['name' => 'main_image', 'label' => 'Image', 'type' => 'image'],
            ['name' => 'gallery_images', 'label' => 'Gallery Images', 'type' => 'images'],
            ['name' => 'rating', 'label' => 'Rating', 'type' => 'number'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
            ['name' => 'is_featured', 'label' => 'Featured', 'type' => 'checkbox'],
        ];

        return $this->resource('Hotels', 'hotels', Hotel::latest()->get(), $fields, ['main_image', 'gallery_images', 'name', 'location', 'hotel_type', 'price_per_night', 'status']);
    }

    public function storeHotel(Request $request): RedirectResponse
    {
        Hotel::create($this->hotelData($request));

        return back()->with('success', 'Hotel created.');
    }

    public function updateHotel(Request $request, Hotel $hotel): RedirectResponse
    {
        $hotel->update($this->hotelData($request, $hotel->main_image, $hotel->gallery_images));

        return back()->with('success', 'Hotel updated.');
    }

    public function deleteHotel(Hotel $hotel): RedirectResponse
    {
        $hotel->delete();

        return back()->with('success', 'Hotel deleted.');
    }

    public function transportServices(): Response
    {
        return $this->resource('Transport Services', 'transport-services', TransportService::orderBy('sort_order')->latest()->get(), [
            ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
            ['name' => 'description', 'label' => 'Description', 'type' => 'textarea'],
            ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
            ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
        ], ['image', 'title', 'description', 'sort_order', 'status']);
    }

    public function storeTransportService(Request $request): RedirectResponse
    {
        TransportService::create($this->transportServiceData($request));

        return back()->with('success', 'Transport service created.');
    }

    public function updateTransportService(Request $request, TransportService $transportService): RedirectResponse
    {
        $transportService->update($this->transportServiceData($request, $transportService->image));

        return back()->with('success', 'Transport service updated.');
    }

    public function deleteTransportService(TransportService $transportService): RedirectResponse
    {
        $transportService->delete();

        return back()->with('success', 'Transport service deleted.');
    }

    public function transportRoutes(): Response
    {
        return $this->resource('Transport Routes', 'transport-routes', TransportRoute::orderBy('sort_order')->latest()->get(), [
            ['name' => 'pickup_location', 'label' => 'Pickup Location', 'type' => 'text', 'required' => true],
            ['name' => 'dropoff_location', 'label' => 'Dropoff Location', 'type' => 'text', 'required' => true],
            ['name' => 'vehicle_type', 'label' => 'Vehicle Type', 'type' => 'text'],
            ['name' => 'base_price', 'label' => 'Base Price', 'type' => 'number', 'required' => true],
            ['name' => 'sort_order', 'label' => 'Sort Order', 'type' => 'number'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
        ], ['pickup_location', 'dropoff_location', 'vehicle_type', 'base_price', 'status']);
    }

    public function storeTransportRoute(Request $request): RedirectResponse
    {
        TransportRoute::create($this->transportRouteData($request));

        return back()->with('success', 'Transport route created.');
    }

    public function updateTransportRoute(Request $request, TransportRoute $transportRoute): RedirectResponse
    {
        $transportRoute->update($this->transportRouteData($request));

        return back()->with('success', 'Transport route updated.');
    }

    public function deleteTransportRoute(TransportRoute $transportRoute): RedirectResponse
    {
        $transportRoute->delete();

        return back()->with('success', 'Transport route deleted.');
    }

    public function hotelBookings(): Response
    {
        return $this->resource('Hotel Bookings', 'hotel-bookings', HotelBooking::with('hotel:id,name')->latest()->get(), [
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['pending', 'confirmed', 'cancelled']],
            ['name' => 'estimated_total', 'label' => 'Agreed Price', 'type' => 'number'],
            ['name' => 'admin_note', 'label' => 'Message to Guest', 'type' => 'textarea'],
        ], ['full_name', 'hotel.name', 'whatsapp_number', 'check_in', 'check_out', 'number_of_adults', 'number_of_children', 'estimated_total', 'status'], true);
    }

    public function updateHotelBooking(Request $request, HotelBooking $hotelBooking): RedirectResponse
    {
        $hotelBooking->update($this->bookingStatusData($request));
        app(BookingNotifier::class)->notify($hotelBooking->fresh('hotel'), 'hotel');

        return back()->with('success', 'Hotel booking status updated and guest notification prepared.');
    }

    public function deleteHotelBooking(HotelBooking $hotelBooking): RedirectResponse
    {
        $hotelBooking->delete();

        return back()->with('success', 'Hotel booking deleted.');
    }

    public function transportBookings(): Response
    {
        return $this->resource('Transport Requests', 'transport-bookings', TransportBooking::latest()->get(), [
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['pending', 'confirmed', 'cancelled']],
            ['name' => 'estimated_total', 'label' => 'Agreed Price', 'type' => 'number'],
            ['name' => 'admin_note', 'label' => 'Message to Guest', 'type' => 'textarea'],
        ], ['full_name', 'service_type', 'pickup_location', 'dropoff_location', 'number_of_adults', 'number_of_children', 'estimated_total', 'status'], true);
    }

    public function updateTransportBooking(Request $request, TransportBooking $transportBooking): RedirectResponse
    {
        $transportBooking->update($this->bookingStatusData($request));
        app(BookingNotifier::class)->notify($transportBooking->fresh(), 'transport');

        return back()->with('success', 'Transport status updated and guest notification prepared.');
    }

    public function deleteTransportBooking(TransportBooking $transportBooking): RedirectResponse
    {
        $transportBooking->delete();

        return back()->with('success', 'Transport request deleted.');
    }

    public function updateBooking(Request $request, Booking $booking): RedirectResponse
    {
        $booking->update($this->bookingStatusData($request));
        app(BookingNotifier::class)->notify($booking->fresh('tour'), 'tour');

        return back()->with('success', 'Booking status updated and guest notification prepared.');
    }

    public function deleteBooking(Booking $booking): RedirectResponse
    {
        $booking->delete();

        return back()->with('success', 'Booking deleted.');
    }

    public function inquiries(): Response
    {
        return $this->resource('Inquiries', 'inquiries', Inquiry::latest()->get(), [
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => [
                ['id' => 'pending', 'name' => 'Pending'],
                ['id' => 'responded', 'name' => 'Replied'],
                ['id' => 'closed', 'name' => 'Closed'],
            ]],
        ], ['full_name', 'email', 'whatsapp_number', 'subject', 'status'], true);
    }

    public function updateInquiry(Request $request, Inquiry $inquiry): RedirectResponse
    {
        $inquiry->update($request->validate(['status' => ['required', 'in:pending,responded,closed']]));

        return back()->with('success', 'Inquiry status updated.');
    }

    public function deleteInquiry(Inquiry $inquiry): RedirectResponse
    {
        $inquiry->delete();

        return back()->with('success', 'Inquiry deleted.');
    }

    public function gallery(): Response
    {
        return $this->resource('Gallery', 'gallery', Gallery::latest()->get(), [
            ['name' => 'title', 'label' => 'Title', 'type' => 'text', 'required' => true],
            ['name' => 'image', 'label' => 'Image', 'type' => 'image', 'required' => true],
            ['name' => 'category', 'label' => 'Category', 'type' => 'text'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
        ], ['image', 'title', 'category', 'status']);
    }

    public function storeGallery(Request $request): RedirectResponse
    {
        $data = $request->validate($this->galleryRules());
        $data['image'] = $this->uploadedImagePath($request, 'image');
        Gallery::create($data);

        return back()->with('success', 'Gallery image created.');
    }

    public function updateGallery(Request $request, Gallery $gallery): RedirectResponse
    {
        $data = $request->validate($this->galleryRules());
        $data['image'] = $this->uploadedImagePath($request, 'image', $gallery->image);
        $gallery->update($data);

        return back()->with('success', 'Gallery image updated.');
    }

    public function deleteGallery(Gallery $gallery): RedirectResponse
    {
        $gallery->delete();

        return back()->with('success', 'Gallery image deleted.');
    }

    public function testimonials(): Response
    {
        return $this->resource('Testimonials', 'testimonials', Testimonial::latest()->get(), [
            ['name' => 'name', 'label' => 'Name', 'type' => 'text', 'required' => true],
            ['name' => 'country', 'label' => 'Country', 'type' => 'text'],
            ['name' => 'rating', 'label' => 'Rating', 'type' => 'number'],
            ['name' => 'review', 'label' => 'Review', 'type' => 'textarea', 'required' => true],
            ['name' => 'image', 'label' => 'Image', 'type' => 'image'],
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['active', 'inactive']],
        ], ['image', 'name', 'country', 'rating', 'status']);
    }

    public function storeTestimonial(Request $request): RedirectResponse
    {
        $data = $request->validate($this->testimonialRules());
        $data['image'] = $this->uploadedImagePath($request, 'image');
        Testimonial::create($data);

        return back()->with('success', 'Testimonial created.');
    }

    public function updateTestimonial(Request $request, Testimonial $testimonial): RedirectResponse
    {
        $data = $request->validate($this->testimonialRules());
        $data['image'] = $this->uploadedImagePath($request, 'image', $testimonial->image);
        $testimonial->update($data);

        return back()->with('success', 'Testimonial updated.');
    }

    public function deleteTestimonial(Testimonial $testimonial): RedirectResponse
    {
        $testimonial->delete();

        return back()->with('success', 'Testimonial deleted.');
    }

    public function partnershipRequests(): Response
    {
        return $this->resource('Partnership Requests', 'partnership-requests', PartnershipRequest::latest()->get(), [
            ['name' => 'status', 'label' => 'Status', 'type' => 'select', 'options' => ['pending', 'contacted', 'approved', 'closed']],
        ], ['full_name', 'company_name', 'partnership_type', 'whatsapp_number', 'status'], true);
    }

    public function updatePartnershipRequest(Request $request, PartnershipRequest $partnershipRequest): RedirectResponse
    {
        $partnershipRequest->update($request->validate(['status' => ['required', 'in:pending,contacted,approved,closed']]));

        return back()->with('success', 'Partnership status updated.');
    }

    public function deletePartnershipRequest(PartnershipRequest $partnershipRequest): RedirectResponse
    {
        $partnershipRequest->delete();

        return back()->with('success', 'Partnership request deleted.');
    }

    private function resource(string $title, string $resource, $records, array $fields, array $columns, bool $statusOnly = false): Response
    {
        return Inertia::render('Admin/ResourceIndex', compact('title', 'resource', 'records', 'fields', 'columns', 'statusOnly'));
    }

    private function bookingStatusData(Request $request): array
    {
        return $request->validate([
            'status' => ['required', 'in:pending,confirmed,cancelled'],
            'estimated_total' => ['nullable', 'numeric', 'min:0'],
            'admin_note' => ['nullable', 'string', 'max:1000'],
        ]);
    }

    private function categoryRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'icon' => ['nullable', 'string', 'max:100'],
            'image' => ['nullable'],
            'status' => ['required', 'in:pending,active,inactive'],
        ];
    }

    private function userData(Request $request, bool $creating, ?int $userId = null): array
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'.($userId ? ','.$userId : '')],
            'password' => [$creating ? 'required' : 'nullable', 'string', 'min:8', 'max:255', 'confirmed'],
            'password_confirmation' => [$creating || $request->filled('password') ? 'required' : 'nullable', 'string', 'max:255'],
            'role' => ['required', 'in:admin,staff'],
            'status' => ['required', 'in:active,inactive'],
        ], [
            'password.required' => 'Password is required when creating a new user account.',
            'password.confirmed' => 'Password and repeat password must match.',
            'password_confirmation.required' => 'Please repeat the password before saving.',
        ]);

        if (blank($data['password'] ?? null)) {
            unset($data['password']);
        }

        unset($data['password_confirmation']);

        return $data;
    }

    private function siteSettingData(Request $request, ?int $settingId = null): array
    {
        return $request->validate([
            'label' => ['required', 'string', 'max:255'],
            'key' => ['required', 'string', 'max:255', 'regex:/^[a-z0-9_]+$/', 'unique:site_settings,key'.($settingId ? ','.$settingId : '')],
            'value' => ['nullable', 'string'],
            'group' => ['required', 'in:general,contact,social,booking'],
            'status' => ['required', 'in:active,inactive'],
        ]);
    }

    private function heroSlideData(Request $request, ?string $existingImage = null): array
    {
        $data = $request->validate([
            'label' => ['nullable', 'string', 'max:255'],
            'title' => ['required', 'string', 'max:255'],
            'subtitle' => ['nullable', 'string'],
            'image' => ['nullable'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        return [
            ...$data,
            'image' => $this->uploadedImagePath($request, 'image', $existingImage),
            'sort_order' => $data['sort_order'] ?? 0,
        ];
    }

    private function tourData(Request $request, ?string $existingMainImage = null, ?array $existingGalleryImages = null): array
    {
        $data = $request->validate([
            'category_id' => ['required', 'exists:tour_categories,id'],
            'title' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'duration' => ['required', 'string', 'max:255'],
            'price' => ['nullable', 'numeric', 'min:0'],
            'adult_price' => ['nullable', 'numeric', 'min:0'],
            'child_price' => ['nullable', 'numeric', 'min:0'],
            'pricing_note' => ['nullable', 'string', 'max:255'],
            'short_description' => ['required', 'string'],
            'description' => ['nullable', 'string'],
            'highlights' => ['nullable'],
            'included' => ['nullable'],
            'itinerary' => ['nullable'],
            'main_image' => ['nullable'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*' => ['nullable'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'status' => ['required', 'in:active,inactive'],
            'is_featured' => ['boolean'],
        ]);

        $mainImage = $this->uploadedImagePath($request, 'main_image', $existingMainImage);
        $galleryImages = $this->uploadedGalleryPaths($request, 'gallery_images', $existingGalleryImages ?: ($mainImage ? [$mainImage] : []));

        return [
            ...$data,
            'slug' => Str::slug($data['title']),
            'description' => $data['description'] ?? $data['short_description'],
            'highlights' => $this->listInput($request, 'highlights'),
            'included' => $this->listInput($request, 'included'),
            'not_included' => $this->listInput($request, 'not_included'),
            'itinerary' => $this->listInput($request, 'itinerary'),
            'what_to_bring' => Arr::wrap($request->input('what_to_bring', ['Comfortable clothes', 'Camera'])),
            'important_information' => Arr::wrap($request->input('important_information', ['Final timing is confirmed by WhatsApp.'])),
            'main_image' => $mainImage,
            'gallery_images' => $galleryImages ?: ($mainImage ? [$mainImage] : []),
            'is_featured' => $request->boolean('is_featured'),
            'rating' => $data['rating'] ?? 4.9,
        ];
    }

    private function hotelData(Request $request, ?string $existingMainImage = null, ?array $existingGalleryImages = null): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255'],
            'location' => ['required', 'string', 'max:255'],
            'hotel_type' => ['nullable', 'string', 'max:255'],
            'price_from' => ['nullable', 'string', 'max:255'],
            'price_per_night' => ['nullable', 'numeric', 'min:0'],
            'child_policy' => ['nullable', 'string', 'max:255'],
            'short_description' => ['nullable', 'string'],
            'main_image' => ['nullable'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*' => ['nullable'],
            'rating' => ['nullable', 'numeric', 'min:0', 'max:5'],
            'status' => ['required', 'in:active,inactive'],
            'is_featured' => ['boolean'],
        ];

        $hasAmenities = Schema::hasColumn('hotels', 'amenities');

        if ($hasAmenities) {
            $rules['amenities'] = ['nullable'];
        }

        $data = $request->validate($rules);

        $mainImage = $this->uploadedImagePath($request, 'main_image', $existingMainImage);
        $galleryImages = $this->uploadedGalleryPaths($request, 'gallery_images', $existingGalleryImages ?: ($mainImage ? [$mainImage] : []));

        return [
            ...$data,
            'slug' => Str::slug($data['name']),
            ...($hasAmenities ? ['amenities' => $this->listInput($request, 'amenities')] : []),
            'main_image' => $mainImage,
            'gallery_images' => $galleryImages ?: ($mainImage ? [$mainImage] : []),
            'rating' => $data['rating'] ?? 4.8,
            'is_featured' => $request->boolean('is_featured'),
        ];
    }

    private function transportServiceData(Request $request, ?string $existingImage = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'image' => ['nullable'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        return [
            ...$data,
            'slug' => Str::slug($data['title']),
            'image' => $this->uploadedImagePath($request, 'image', $existingImage),
            'sort_order' => $data['sort_order'] ?? 0,
        ];
    }

    private function transportRouteData(Request $request): array
    {
        $data = $request->validate([
            'pickup_location' => ['required', 'string', 'max:255'],
            'dropoff_location' => ['required', 'string', 'max:255'],
            'vehicle_type' => ['nullable', 'string', 'max:255'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'sort_order' => ['nullable', 'integer', 'min:0'],
            'status' => ['required', 'in:active,inactive'],
        ]);

        return [
            ...$data,
            'sort_order' => $data['sort_order'] ?? 0,
        ];
    }

    private function galleryRules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'image' => ['nullable'],
            'category' => ['nullable', 'string', 'max:255'],
            'status' => ['required', 'in:pending,active,inactive'],
        ];
    }

    private function testimonialRules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'country' => ['nullable', 'string', 'max:255'],
            'rating' => ['nullable', 'integer', 'min:1', 'max:5'],
            'review' => ['required', 'string'],
            'image' => ['nullable'],
            'status' => ['required', 'in:active,inactive'],
        ];
    }

    private function listInput(Request $request, string $field): array
    {
        $value = $request->input($field);

        if (is_array($value)) {
            return array_values(array_filter(array_map(fn ($item) => trim((string) $item), $value)));
        }

        if (! is_string($value)) {
            return [];
        }

        return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $value) ?: [])));
    }

    private function uploadedImagePath(Request $request, string $field, ?string $existingPath = null): ?string
    {
        if ($request->hasFile($field)) {
            $file = $request->file($field);

            if (! $file->isValid()) {
                if ($existingPath) {
                    return $existingPath;
                }

                throw ValidationException::withMessages([$field => 'Image upload failed. Please use JPG, PNG, or WebP under 2MB.']);
            }

            return $this->storeUploadedFile($file);
        }

        $value = $request->input($field);

        if (is_string($value) && $value !== '') {
            return $value;
        }

        return $existingPath;
    }

    private function uploadedGalleryPaths(Request $request, string $field, array $existingPaths = []): array
    {
        if (! $request->has($field) && ! $request->hasFile($field)) {
            return array_values(array_filter($existingPaths));
        }

        $inputs = Arr::wrap($request->input($field, []));
        $files = Arr::wrap($request->file($field, []));
        $keys = array_unique(array_merge(array_keys($inputs), array_keys($files)));
        sort($keys);

        $paths = [];

        foreach ($keys as $key) {
            $file = $files[$key] ?? null;
            $value = $inputs[$key] ?? null;

            if ($file) {
                if (! $file->isValid()) {
                    continue;
                }

                $paths[] = $this->storeUploadedFile($file);
                continue;
            }

            if (is_string($value) && $value !== '') {
                $paths[] = $value;
            }
        }

        return array_values(array_unique(array_filter($paths)));
    }

    private function storeUploadedFile($file): string
    {
        $filename = Str::uuid().'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs('admin-images', $filename, 'public');

        return Storage::url($path);
    }
}
