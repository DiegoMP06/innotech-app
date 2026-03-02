import InputSearch from "@/components/app/input-search";
import EventItem from "@/components/member/events/EventItem";
import Pagination from "@/components/app/pagination";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { create, index } from "@/routes/events";
import { BreadcrumbItem, Event, PaginationType } from "@/types";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

type EventsProps = {
    page: number;
    search: string;
    events: PaginationType<Event>
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventos',
        href: index().url,
    }
]

export default function Events({ events, page, search }: EventsProps) {
    console.log(events)

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Eventos" />

            <InputSearch
                search={search}
                queryParams={{ page }}
            />

            <div className="mb-15">
                <Button onClick={() => router.visit(create())}>
                    <Plus />
                    Crear Evento
                </Button>
            </div>

            {events.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {events.data.map((event) =>
                        <EventItem
                            key={event.id}
                            event={event}
                        />
                    )}
                </div>
            ) : (
                <p className="text-center my-20 text-accent-foreground">
                    No Hay Eventos
                </p>
            )}

            <Pagination
                pagination={events}
                queryParams={{ search }}
            />
        </AppLayout>
    )
}
