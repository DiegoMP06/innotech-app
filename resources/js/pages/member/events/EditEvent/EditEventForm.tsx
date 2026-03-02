import EventForm from "@/components/member/events/EventForm"
import { Button } from "@/components/ui/button"
import events from "@/routes/events"
import { Event, EventFormData } from "@/types"
import { router } from "@inertiajs/react"
import { LatLng } from "leaflet"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

type EditEventFormProps = {
    event: Event
}

export default function EditEventForm({ event }: EditEventFormProps) {
    const [processing, setProcessing] = useState(false)

    const initialValues: EventFormData = {
        name: event.name,
        logo: [],
        is_free: event.is_free,
        price: event.price,
        percent_off: event.percent_off,
        summary: event.summary,
        latLng: new LatLng(Number(event.lat), Number(event.lng)),
        location: event.location,
        start_date: new Date(event.start_date),
        end_date: new Date(event.end_date),
        registration_ended_at: new Date(event.registration_ended_at),
        registration_started_at: new Date(event.registration_started_at),
    }

    const { control, register, handleSubmit, formState: { errors }, watch, setValue } = useForm({
        defaultValues: initialValues
    });

    const handleEditEvent: SubmitHandler<EventFormData> = ({ latLng, start_date, end_date, ...data }) => {
        const formData = {
            ...data,
            logo: data.logo.length > 0 ? data.logo[0] : null,
            lat: latLng.lat,
            lng: latLng.lng,
            start_date: start_date.toISOString().split('T')[0],
            end_date: end_date.toISOString().split('T')[0],
        }

        setProcessing(true);
        router.post(events.update(event.id, {
            query: {
                _method: 'PUT',
            }
        }), formData, {
            forceFormData: true,
            preserveScroll: true,
            showProgress: true,
            onSuccess: (data) => {
                toast.success(data.props.message as string)
            },
            onFinish() {
                setProcessing(false)
            },
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(handleEditEvent)}
            className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full"
        >
            <EventForm
                {...{
                    control,
                    errors,
                    register,
                    setValue,
                    watch,
                }}
                activities={event.activities}
                defaultImage={event.media.at(0)?.urls.thumbnail}
                edit
            />

            <Button type="submit" disabled={processing}>
                Guardar Cambios
            </Button>
        </form>
    )
}

