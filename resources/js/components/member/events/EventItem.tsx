import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import events from "@/routes/events";
import { Event } from "@/types";
import { formatDateToLocale, formatCurrency, getIdealResponsiveMediaLink } from "@/utils";
import { Link, router } from "@inertiajs/react";
import { HoverCard } from "@radix-ui/react-hover-card";
import { Check, MoreHorizontalIcon, Pencil, Trash, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type EventItemProps = {
    event: Event;
}

export default function EventItem({ event }: EventItemProps) {
    const [processing, setProcessing] = useState(false);
    const handleEventStatus = () => {
        setProcessing(true)
        router.patch(events.status(event.id), {}, {
            preserveScroll: true,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onFinish() {
                setProcessing(false)
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
            },
        })
    }

    const handleDeleteEvent = () => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este evento?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEvent();
            }
        })
    }

    const deleteEvent = () => {
        setProcessing(true)
        router.delete(events.destroy(event.id), {
            preserveScroll: true,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onFinish() {
                setProcessing(false)
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
            },
        })
    }

    return (
        <Item variant="outline">
            <ItemMedia>
                <Avatar className="size-10">
                    <AvatarImage src={getIdealResponsiveMediaLink(event.media.at(0)!)} />
                    <AvatarFallback>
                        {event.name.substring(0, 1)}
                    </AvatarFallback>
                </Avatar>
            </ItemMedia>

            <ItemContent>
                <ItemTitle>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Link href={events.show(event.id)} className='hover:underline'>
                                {event.name}
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="grid gap-3">
                                <h4 className="flex gap-2 items-center flex-wrap text-lg font-semibold">
                                    {event.name}

                                    <span className={cn(
                                        'text-xs font-bold px-2 py-1 rounded',
                                        event.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    )}>
                                        {event.is_published ? 'Publicado' : 'Oculto'}
                                    </span>
                                </h4>

                                <p className="text-sm">
                                    Del {formatDateToLocale(event.start_date)}  al {formatDateToLocale(event.end_date)}
                                </p>

                                <p className="flex gap-2 items-center flex-wrap text-sm">
                                    Precio:
                                    <span className="text-foreground font-bold">
                                        {event.is_free ? 'Gratis' : formatCurrency(event.price * (1 - (event.percent_off / 100)))}
                                    </span>
                                </p>

                                <p className="flex gap-2 items-center flex-wrap text-sm">
                                    Ubicación:
                                    <span className="text-foreground font-bold">
                                        {event.location}
                                    </span>
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </ItemTitle>

                <ItemDescription>
                    {event.summary.substring(0, 100)}...
                </ItemDescription>
            </ItemContent>

            <ItemActions>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Open menu" size="icon">
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuLabel>Opciones del event</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <Link
                                href={events.edit(event.id)}
                                disabled={processing}
                            >
                                <DropdownMenuItem>
                                    <Pencil />
                                    Editar
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                onClick={handleEventStatus}
                                disabled={processing}
                                className={event.is_published ? 'text-red-300 hover:text-red-400' : 'text-green-300 hover:text-green-400'}
                            >
                                {event.is_published ? (<>
                                    <XIcon className='fill-red-300' />
                                    Ocultar
                                </>) : (<>
                                    <Check className='fill-green-300' />
                                    Publicar
                                </>)}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={handleDeleteEvent}
                                disabled={processing}
                                className='text-red-300 hover:text-red-400'
                            >
                                <Trash />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ItemActions>
        </Item>
    )
}

