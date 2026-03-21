<?php

namespace App\Console\Commands;

use App\Models\Events\Event;
use App\Models\Events\EventActivity;
use App\Models\Events\EventStatus;
use Carbon\Carbon;
use Illuminate\Console\Command;

class UpdateEventStatuses extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-event-statuses';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Actualiza el estado de los eventos según la fecha actual';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $now = Carbon::now();

        $statuses = EventStatus::whereIn('slug', ['upcoming', 'open', 'closed', 'ongoing', 'finished'])
            ->get()
            ->pluck('id', 'slug');

        Event::where('event_status_id', $statuses['ongoing'])
            ->where('registration_started_at', '<=', $now)
            ->where('registration_ended_at', '>=', $now)
            ->update(['event_status_id' => $statuses['open']]);

        Event::where('event_status_id', $statuses['open'])
            ->where('registration_ended_at', '<=', $now)
            ->update(['event_status_id' => $statuses['closed']]);

        Event::where('event_status_id', $statuses['closed'])
            ->whereDate('start_date', '<=', $now)
            ->whereDate('end_date', '>=', $now)
            ->update(['event_status_id' => $statuses['ongoing']]);

        Event::where('event_status_id', '!=', $statuses['finished'])
            ->whereDate('end_date', '<', $now)
            ->update(['event_status_id' => $statuses['finished']]);

        EventActivity::where('event_status_id', $statuses['ongoing'])
            ->where('started_at', '<=', $now)
            ->where('ended_at', '>=', $now)
            ->update(['event_status_id' => $statuses['ongoing']]);

        EventActivity::where('event_status_id', $statuses['ongoing'])
            ->where('ended_at', '<=', $now)
            ->update(['event_status_id' => $statuses['finished']]);

        $this->info('Estados de eventos actualizados correctamente.');
    }
}
