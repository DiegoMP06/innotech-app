<?php

namespace App\Http\Controllers\Events;

use Inertia\Inertia;
use App\Models\Events\Event;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EventContentController extends Controller
{
    public function edit(Event $event, Request $request)
    {
        $edit = $request->boolean('edit', false);
        return Inertia::render('events/event-content', [
            'event' => $event,
            'edit' => $edit,
            'message' => $request->session()->get('message'),
        ]);
    }

    public function update(Request $request, Event $event)
    {
        $edit = $request->boolean('edit', false);
        $data = $request->validate([
            'content' => ['required', 'array'],
            'content.*.props' => ['required', 'array'],
            'content.*.type' => ['required', 'string'],
        ]);

        $event->content = $data['content'];
        $event->save();

        $route = $edit ?
            back() :
            redirect()->intended(route(
                'events.show',
                ['event' => $event],
                absolute: false
            ));

        return $route->with('message', 'Contenido guardado correctamente.');
    }
}
