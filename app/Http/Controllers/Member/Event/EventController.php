<?php

namespace App\Http\Controllers\Member\Event;

use App\Http\Controllers\Controller;
use App\Http\Resources\EventCollection;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $search = $request->string('search', '');
        $page = $request->integer('page', 1);

        $events = $request->user()
            ->events()
            ->when(
                $search,
                fn($query, $search) =>
                $query->where('name', 'like', "%{$search}%")
            )
            ->orderBy('id', 'desc')
            ->paginate(20);

        return Inertia::render('member/events/events', [
            'events' => new EventCollection($events),
            'search' => $search,
            'page' => $page,
            'message' => $request->session()->get('message'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('member/events/create-event');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['required', 'image', 'mimes:jpg,png,jpeg,webp'],
            'summary' => ['required', 'string', 'min:100'],
            'is_free' => ['required', 'boolean'],
            'price' => ['required_if_declined:is_free', 'numeric', 'min:0'],
            'percent_off' => ['required_if_declined:is_free', 'numeric', 'min:0', 'max:100'],
            'location' => ['required', 'string', 'max:255'],
            'lat' => ['required', 'numeric', 'min:-90', 'max:90'],
            'lng' => ['required', 'numeric', 'min:-180', 'max:180'],
            'registration_started_at' => ['required', 'date', 'after:now'],
            'registration_ended_at' => ['required', 'date', 'after:registration_started_at', 'before:start_date'],
            'start_date' => ['required', 'date', 'after:registration_ended_at', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        $event = $request->user()->events()->create([
            'name' => $data['name'],
            'summary' => $data['summary'],
            'content' => [],
            'is_free' => $data['is_free'],
            'price' => $data['is_free'] ? 0 : $data['price'],
            'percent_off' => $data['is_free'] ? 0 : $data['percent_off'],
            'location' => $data['location'],
            'lat' => $data['lat'],
            'lng' => $data['lng'],
            'registration_started_at' => $data['registration_started_at'],
            'registration_ended_at' => $data['registration_ended_at'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
            'event_status_id' => 1,
        ]);

        $event->addMediaFromRequest('logo')
            ->toMediaCollection('logo');

        return redirect()->intended(route(
            'events.content.edit',
            ['event' => $event, 'edit' => false],
            false
        ));
    }

    /**
     * Display the specified resource.
     */
    public function show(Event $event, Request $request)
    {
        return Inertia::render('member/events/show-event', [
            'event' => (new EventCollection([$event->load(['activities', 'author', 'media'])]))->first(),
            'message' => $request->session()->get('message'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, Event $event)
    {
        return Inertia::render('member/events/edit-event', [
            'event' => (new EventCollection([$event->load(['activities', 'media'])]))->first(),
            'message' => $request->session()->get('message'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Event $event)
    {

        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'image', 'mimes:jpg,png,jpeg,webp'],
            'summary' => ['required', 'string', 'min:100'],
            'is_free' => ['required', 'boolean'],
            'price' => ['required_if_declined:is_free', 'numeric', 'min:0'],
            'percent_off' => ['required_if_declined:is_free', 'numeric', 'min:0', 'max:100'],
            'location' => ['required', 'string', 'max:255'],
            'lat' => ['required', 'numeric', 'min:-90', 'max:90'],
            'lng' => ['required', 'numeric', 'min:-180', 'max:180'],
            'registration_started_at' => ['required', 'date'],
            'registration_ended_at' => ['required', 'date', 'after:registration_started_at', 'before:start_date'],
            'start_date' => ['required', 'date', 'after:registration_ended_at'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ]);

        
        $activitiesOutOfRange = $event->activities()
            ->where('started_at', '<', $data['start_date'])
            ->orWhere('ended_at', '>', $data['end_date'])
            ->exists();

        if ($activitiesOutOfRange) {
            throw ValidationException::withMessages([
                'start_date' => 'Las fachas del evento no pueden estar fuera del rango de fechas de las actividades.',
            ]);
        }

        $event->name = $data['name'];
        $event->summary = $data['summary'];
        $event->is_free = $data['is_free'];
        $event->price = $data['is_free'] ? 0 : $data['price'];
        $event->percent_off = $data['is_free'] ? 0 : $data['percent_off'];
        $event->location = $data['location'];
        $event->lat = $data['lat'];
        $event->lng = $data['lng'];
        $event->registration_started_at = $data['registration_started_at'];
        $event->registration_ended_at = $data['registration_ended_at'];
        $event->start_date = $data['start_date'];
        $event->end_date = $data['end_date'];
        $event->save();

        if ($request->hasFile('logo')) {
            $event->clearMediaCollection('logo');
            $event->addMediaFromRequest('logo')
                ->toMediaCollection('logo');
        }

        return back()->with('message', 'Evento actualizado correctamente');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Event $event)
    {
        $event->clearMediaCollection('logo');
        $event->delete();

        return back()->with('message', 'Evento eliminado correctamente.');
    }
}
