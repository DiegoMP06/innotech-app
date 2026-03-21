<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Http\Resources\Events\EventCollection;
use App\Models\Events\Event;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class EventController extends Controller
{
    private function rules(bool $isStore = true): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'logo' => [$isStore ? 'required' : 'nullable', 'image', 'mimes:jpg,png,jpeg,webp'],
            'summary' => ['required', 'string', 'min:100'],
            'price' => ['required', 'numeric', 'min:0'],
            'percent_off' => ['required', 'numeric', 'min:0', 'max:100'],
            'capacity' => ['nullable', 'numeric', 'min:0'],
            'is_online' => ['required', 'boolean'],
            'online_link' => ['required_if:is_online,true', 'url', 'max:255'],
            'location' => ['required_if_declined:is_online', 'string', 'max:255'],
            'lat' => ['required_if_declined:is_online', 'numeric', 'min:-90', 'max:90'],
            'lng' => ['required_if_declined:is_online', 'numeric', 'min:-180', 'max:180'],
            'registration_started_at' => ['required', 'date', ...($isStore ? ['after:now'] : [])],
            'registration_ended_at' => ['required', 'date', 'after:registration_started_at', 'before:start_date'],
            'start_date' => ['required', 'date', 'after:registration_ended_at', 'before:end_date'],
            'end_date' => ['required', 'date', 'after:start_date'],
        ];
    }

    public function index(Request $request)
    {
        $events = $request->user()
            ->events()
            ->when(
                $request->search,
                fn($q, $search) =>
                $q->whereLike('name', "%{$search}%")
            )
            ->orderByDesc('id')
            ->paginate(20);

        return Inertia::render('events/events', [
            'events' => new EventCollection($events),
            'search' => $request->string('search', ''),
            'message' => $request->session()->get('message'),
        ]);
    }

    public function create()
    {
        return Inertia::render('events/create-event');
    }

    public function store(Request $request)
    {
        $data = $request->validate($this->rules(isStore: true));

        $event = $request->user()->events()->create([
            ...$data,
            'content' => [],
            'event_status_id' => 1,
        ]);

        $event->addMediaFromRequest('logo')->toMediaCollection('logo');

        return redirect()->intended(
            route('events.content.edit', ['event' => $event, 'edit' => false], false)
        );
    }

    public function show(Event $event, Request $request)
    {
        return Inertia::render('events/show-event', [
            'event' => (new EventCollection([$event->load(['activities', 'author', 'media'])]))->first(),
            'message' => $request->session()->get('message'),
        ]);
    }

    public function edit(Request $request, Event $event)
    {
        return Inertia::render('events/edit-event', [
            'event' => (new EventCollection([$event->load(['activities', 'media'])]))->first(),
            'message' => $request->session()->get('message'),
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $data = $request->validate($this->rules(isStore: false));

        if (
            $event->activities()->where(
                fn($q) =>
                $q->where('started_at', '<', $data['start_date'])
                    ->orWhere('ended_at', '>', $data['end_date'])
            )->exists()
        ) {
            throw ValidationException::withMessages([
                'start_date' => 'Las fechas del evento no pueden estar fuera del rango de fechas de las actividades.',
            ]);
        }

        $event->update($data);

        if ($request->hasFile('logo')) {
            $event->clearMediaCollection('logo');
            $event->addMediaFromRequest('logo')->toMediaCollection('logo');
        }

        return back()->with('message', 'Evento actualizado correctamente.');
    }

    public function destroy(Event $event)
    {
        $event->delete();

        return back()->with('message', 'Evento eliminado correctamente.');
    }
}
