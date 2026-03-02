import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useInitials } from "@/hooks/use-initials";
import AppLayout from "@/layouts/app-layout";
import { puckConfig } from "@/lib/puck";
import events from "@/routes/events";
import { BreadcrumbItem, Event } from "@/types";
import { getIdealResponsiveMediaLink } from "@/utils";
import { Head, router } from "@inertiajs/react";
import { Render } from "@measured/puck";
import { ChevronLeft } from "lucide-react";

type ShowEventProps = {
    event: Event
}

const breadcrumbs = (event: Event): BreadcrumbItem[] => ([
    {
        title: 'Eventos',
        href: events.index().url,
    },
    {
        title: event.name,
        href: events.show(event.id).url,
    }
])

export default function ShowEvent({ event }: ShowEventProps) {
    const getInitials = useInitials();
    return (
        <AppLayout breadcrumbs={breadcrumbs(event)}>
            <Head title={event.name} />

            <div className="mb-15">
                <Button onClick={() => router.visit(events.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <main className="max-w-4xl mx-auto">
                <div className="mx-auto">
                    <img
                        src={event.media.at(0)?.is_processed ? getIdealResponsiveMediaLink(event.media.at(0)!) : event.media.at(0)?.urls.original}
                        alt={event.name}
                        className="block max-w-40 w-full mx-auto rounded-full shadow-md aspect-square"
                        width={800}
                        height={800}
                    />
                </div>

                <h1 className="leading-normal text-foreground mt-6 mb-4 text-pretty font-bold text-center text-3xl">
                    {event.name}
                </h1>

                <div className="flex flex-col items-center mb-15 gap-4">
                    <div className="flex gap-4 flex-wrap justify-center items-center">
                        <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                <AvatarFallback className="rounded-lg bg-inn-200 text-inn-700 dark:bg-neutral-700 dark:text-white">
                                    {getInitials(event.author?.name + ' ' + event.author?.father_last_name + ' ' + event.author?.mother_last_name)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-medium">
                                    {event.author?.name} {event.author?.father_last_name} {event.author?.mother_last_name}
                                </span>
                                <span className="truncate text-xs text-accent-foreground">
                                    {event.author?.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <p className="my-6 text-justify leading-normal whitespace-pre-wrap text-muted-foreground">
                    {event.summary}
                </p>

                <div className="mt-10">
                    <Render config={puckConfig} data={{ content: event.content }} />
                </div>
            </main>
        </AppLayout>
    )
}

