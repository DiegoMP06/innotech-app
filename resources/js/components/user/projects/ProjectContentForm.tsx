import PuckInput from "@/components/puck/PuckInput";
import usePuckContent from "@/hooks/custom/usePuckContent";
import { db } from "@/lib/dexie";
import projects from "@/routes/projects";
import { Project } from "@/types";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

type ProjectContentFormProps = {
    project: Project;
    edit: boolean;
}

export default function ProjectContentForm({ project, edit }: ProjectContentFormProps) {
    const {
        setProcessing,
        initialData,
        content,
        DBId,
        debouncedSaveDB,
        processing
    } = usePuckContent({
        contentType: 'projects',
        itemId: project.id,
        title: project.title,
        serverContent: project.content,
    })

    const handleSaveChangesToServer = async () => {
        setProcessing(true)

        const formData = {
            content,
            edit,
        }

        router.patch(projects.content.update(project.id), formData, {
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
