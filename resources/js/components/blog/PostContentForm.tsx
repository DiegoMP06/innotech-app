
import PuckInput from "@/components/puck/PuckInput";
import usePuckContent from "@/hooks/custom/usePuckContent";
import { db } from "@/lib/dexie";
import posts from "@/routes/posts";
import { Post } from "@/types/blog";
import { router } from "@inertiajs/react";
import { toast } from "react-toastify";

type ContentFormProps = {
    post: Post;
    edit: boolean;
}

export default function PostContentForm({ post, edit }: ContentFormProps) {
    const {
        setProcessing,
        initialData,
        content,
        DBId,
        debouncedSaveDB,
        processing
    } = usePuckContent({
        contentType: 'posts',
        itemId: post.id,
        title: post.name,
        serverContent: post.content,
    })

    const handleSaveChangesToServer = async () => {
        setProcessing(true)

        const formData = {
            content,
            edit,
        }

        router.patch(posts.content.update(post.id), formData, {
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

