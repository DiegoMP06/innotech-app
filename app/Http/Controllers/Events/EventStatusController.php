<?php

namespace App\Http\Controllers\Events;

use App\Http\Controllers\Controller;
use App\Models\Events\Event;

class EventStatusController extends Controller
{
    public function __invoke(Event $event)
    {
        $event->is_published = !$event->is_published;
        $event->save();

        return back()->with('message', "El estado del evento ha sido actualizado.");
    }
}
