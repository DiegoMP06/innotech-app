
import EventContentForm from "@/components/member/events/EventContentForm";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import events from "@/routes/events";
import { BreadcrumbItem, Event } from "@/types";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

type EventContentProps = {
    event: Event;
    edit: boolean;
}

const breadcrumbs: (event: Event) => BreadcrumbItem[] = (event: Event) => [
    {
        title: 'Eventos',
        href: events.index().url,
    },
    {
        title: `${event.name}`,
        href: events.show(event.id).url,
    },
    {
        title: `Contenido`,
        href: events.content.edit(event.id).url,
    }
]

export default function EventContent({ event, edit }: EventContentProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs(event)}>
            <Head title={`Contenido del Evento ${event.name}`} />

            {edit ? (
                <div className="mb-15">
                    <Button onClick={() => router.visit(events.edit(event.id))}>
                        <ChevronLeft />
                        Volver
                    </Button>
                </div>
            ) : null}

            <EventContentForm
                event={event}
                edit={edit}
            />
        </AppLayout>
    )
}
