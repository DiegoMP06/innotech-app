import EventForm from "@/components/member/events/EventForm"
import { Button } from "@/components/ui/button"
import AppLayout from "@/layouts/app-layout"
import events from "@/routes/events"
import { BreadcrumbItem, EventFormData } from "@/types"
import { Head, router } from "@inertiajs/react"
import { LatLng } from "leaflet"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from "react-toastify"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Eventos',
        href: events.index().url,
    },
    {
        title: 'Crear Evento',
        href: events.create().url,
    }
]

export default function CreateEvent() {
    const [processing, setProcessing] = useState(false);

    const initialValues: EventFormData = {
        name: '',
        logo: [],
        summary: '',
        is_free: false,
        price: 0,
        percent_off: 0,
        latLng: new LatLng(0, 0),
        location: '',
        start_date: new Date(),
        end_date: new Date(),
        registration_ended_at: new Date(),
        registration_started_at: new Date(),
    }

    const { handleSubmit, control, watch, register, formState: { errors }, setValue } = useForm({
        defaultValues: initialValues,
    })

    const handleCreateEvent: SubmitHandler<EventFormData> = ({ latLng, start_date, end_date, ...data }) => {
        const formData = {
            ...data,
            logo: data.logo[0],
            lat: latLng.lat,
            lng: latLng.lng,
            start_date: start_date.toISOString().split('T')[0],
            end_date: end_date.toISOString().split('T')[0],
        };

        router.post(events.store(), formData, {
            preserveScroll: true,
            showProgress: true,
            forceFormData: true,
            onSuccess: (data) => {
                toast.success(data.props.message as string)
            },
            onFinish: () => setProcessing(false),
            onError: (error) => {
                Object.values(error).forEach(value =>
                    toast.error(value))
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Proyecto" />

            <div className="mb-15">
                <Button onClick={() => router.visit(events.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <form
                className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full"
                onSubmit={handleSubmit(handleCreateEvent)}
            >
                <EventForm
                    {...{
                        control,
                        errors,
                        register,
                        setValue,
                        watch,
                    }}
                />

                <Button type="submit" disabled={processing}>
                    Crear Evento
                </Button>
            </form>
        </AppLayout>
    )
}

