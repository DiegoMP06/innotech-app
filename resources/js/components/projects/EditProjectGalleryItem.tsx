import ImageSkeleton from "@/components/app/image-skeleton";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import projects from "@/routes/projects";
import { Media } from "@/types";
import { Project } from "@/types/projects";
import { getIdealResponsiveMediaLink } from "@/utils";
import { router } from "@inertiajs/react";
import { Dispatch, SetStateAction } from "react";
import { Item } from "react-photoswipe-gallery";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

type EditProjectGalleryItemProps = {
    image: Media;
    projectId: Project['id'];
    processing: boolean;
    setProcessing: Dispatch<SetStateAction<boolean>>
}

export default function EditProjectGalleryItem({ image, projectId, processing, setProcessing }: EditProjectGalleryItemProps) {
    const handleDeleteImage = () => {
        Swal.fire({
            title: '¿Estás seguro de eliminar esta imagen?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteImage()
            }
        })
    }

    const deleteImage = () => {
        setProcessing(true);
        router.delete(projects.medias.destroy({
            project: projectId,
            media: image.id,
        }), {
            preserveScroll: true,
            showProgress: true,
            forceFormData: false,
            onSuccess(data) {
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
        <Item
            original={image.urls.screenshot}
            thumbnail={getIdealResponsiveMediaLink(image)}
            width={image.dimensions.screenshot.width}
            height={image.dimensions.screenshot.height}
        >
            {({ ref, open }) =>
                image.is_processed ? (
                    <ContextMenu>
                        <ContextMenuTrigger className="rounded-md border border-dashed block overflow-hidden">
                            <img
                                ref={ref}
                                onClick={open}
                                src={getIdealResponsiveMediaLink(image)}
                                width={image.dimensions.screenshot.width}
                                height={image.dimensions.screenshot.height}
                            />
                        </ContextMenuTrigger>
                        <ContextMenuContent className="w-52">
                            <ContextMenuItem
                                variant='destructive'
                                disabled={processing}
                                onClick={handleDeleteImage}
                            >
                                Eliminar
                            </ContextMenuItem>
                        </ContextMenuContent>
                    </ContextMenu>
                ) : (
                    <ImageSkeleton
                        width={image.dimensions.screenshot.width}
                        height={image.dimensions.screenshot.height}
                    />
                )
            }
        </Item>
    )
}
