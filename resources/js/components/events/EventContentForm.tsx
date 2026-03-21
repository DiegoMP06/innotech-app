import PuckInput from "@/components/puck/PuckInput";
import usePuckContent from "@/hooks/custom/usePuckContent";
import { db } from "@/lib/dexie";
import events from "@/routes/events";
import { Event } from "@/types";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

type ContentFormProps = {
    event: Event;
    edit: boolean;
}

export default function EventContentForm({ event, edit }: ContentFormProps) {
    const {
        setProcessing,
        initialData,
        content,
        DBId,
        debouncedSaveDB,
        processing
    } = usePuckContent({
        contentType: 'events',
        itemId: event.id,
        title: event.name,
        serverContent: event.content,
    })

    const handleSaveChangesToServer = async () => {
        setProcessing(true)

        const formData = {
            content,
            edit,
        }

        router.patch(events.content.update(event.id), formData, {
            preserveScroll: true,
            showProgress: true,
            forceFormData: false,
            onSuccess: async (data) => {
                await db.contents.delete(DBId);
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

    return initialData && (
        <PuckInput
            initialData={initialData}
            onChange={(data) => debouncedSaveDB(data.content)}
            processing={processing}
            handleSaveChangesToServer={handleSaveChangesToServer}
        />
    )
}

