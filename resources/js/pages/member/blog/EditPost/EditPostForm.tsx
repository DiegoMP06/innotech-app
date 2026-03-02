import PostForm from "@/components/member/blog/PostForm";
import { Button } from "@/components/ui/button";
import posts from "@/routes/posts";
import { PostFormData, Post, PostType } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type EditPostFormProps = {
    post: Post;
    types: PostType[]
}

export default function EditPostForm({ post, types }: EditPostFormProps) {
    const [processing, setProcessing] = useState(false)
    const initialValues: PostFormData = {
        name: post.name,
        summary: post.summary,
        post_type_id: post.post_type_id,
    }

    const { control, register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialValues,
    });

    const handleUpdatePost: SubmitHandler<PostFormData> = (data) => {
        setProcessing(true)
        router.patch(posts.update(post.id), data, {
            forceFormData: false,
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
        });
    }

    return (
        <form
            className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full"
            onSubmit={handleSubmit(handleUpdatePost)}
        >
            <PostForm
                types={types}
                register={register}
                control={control}
                errors={errors}
            />

            <Button type="submit" disabled={processing}>
                Guardar Cambios
            </Button>
        </form>
    )
}
