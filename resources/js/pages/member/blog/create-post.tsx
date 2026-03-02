import InputError from "@/components/app/input-error"
import DropzoneInput from "@/components/dropzone/DropzoneInput"
import PostForm from "@/components/member/blog/PostForm"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import AppLayout from "@/layouts/app-layout"
import posts from "@/routes/posts"
import { BreadcrumbItem, PostCategory, PostFormData, PostType } from "@/types"
import { Head, router } from "@inertiajs/react"
import { ChevronLeft } from "lucide-react"
import { useState } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "react-toastify"

type CreatePostProps = {
    types: PostType[]
    categories: PostCategory[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: posts.index().url,
    },
    {
        title: 'Crear Post',
        href: posts.create().url,
    }
]

export default function CreatePost({ types, categories }: CreatePostProps) {
    const [processing, setProcessing] = useState(false);

    const initialValues: PostFormData = {
        name: '',
        summary: '',
        images: [],
        post_type_id: 1,
        categories: [],
    }

    const { control, register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: initialValues
    });

    const handleCreatePost: SubmitHandler<PostFormData> = (data) => {
        router.post(posts.store(), data, {
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
                <Button onClick={() => router.visit(posts.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <form
                className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full"
                onSubmit={handleSubmit(handleCreatePost)}
            >
                <PostForm
                    control={control}
                    errors={errors}
                    register={register}
                    types={types}
                />

                <div className="grid gap-2">
                    <p
                        className="text-foreground leading-none font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                    >
                        Categorías:
                    </p>

                    <Controller
                        control={control}
                        disabled={processing}
                        name="categories"
                        rules={{
                            validate: (value) => (value!.length > 0) || 'Debe seleccionar al menos una categoría',
                        }}
                        render={({ field: { value, onChange, disabled } }) => (
                            <div className="grid gap-1 grid-cols-1">
                                {categories.map((category) => (
                                    <div className="flex gap-2 items-center" key={category.id}>
                                        <Checkbox
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    onChange([...(value || []), category.id])
                                                } else {
                                                    onChange(value?.filter(id => id !== category.id) || [])
                                                }
                                            }}
                                            id={category.slug}
                                            disabled={disabled}
                                            value={category.id}
                                        />

                                        <Label
                                            className="font-normal text-base"
                                            htmlFor={category.slug}
                                        >
                                            {category.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        )}
                    />

                    <InputError message={errors.categories?.message} />
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="images">Imágenes: </Label>

                    <Controller
                        name="images"
                        control={control}
                        rules={{
                            validate: (value) => (value!.length > 0) || 'Debe seleccionar al menos una imagen',
                        }}
                        render={({ field: { value, onChange } }) => (
                            <DropzoneInput
                                value={value || []}
                                onChange={onChange}
                                multipleFiles
                            />
                        )}
                    />

                    <InputError message={errors.images?.message} />
                </div>

                <Button type="submit" disabled={processing}>
                    Crear Post
                </Button>
            </form>
        </AppLayout>
    )
}
