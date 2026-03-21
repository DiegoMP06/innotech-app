import AppLayout from "@/layouts/app-layout"
import events from "@/routes/events"
import { BreadcrumbItem, Event } from "@/types"
import { Head, router } from "@inertiajs/react";
import EventOptions from "./EditEvent/EventOptions";
import EditEventForm from "./EditEvent/EditEventForm";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

type EditEventProps = {
    event: Event;
}

const breadcrumbs = (event: Event): BreadcrumbItem[] => ([
    {
        title: 'Eventos',
        href: events.index().url,
    },
    {
        title: event.name,
        href: events.show(event.id).url,
    },
    {
        title: `Editar`,
        href: events.edit(event.id).url,
    }
])

export default function EditEvent({ event }: EditEventProps) {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs(event)}
        >
            <Head title={`Editar ${event.name}`} />

            <div className="mb-15">
                <Button onClick={() => router.visit(events.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
                <EditEventForm
                    event={event}
                />

                <aside className="w-full flex flex-col gap-6 max-w-2xl mx-auto">
                    <EventOptions
                        isPublished={event.is_published}
                        eventId={event.id}
                    />
                </aside>
            </div>
        </AppLayout >
    )
}
