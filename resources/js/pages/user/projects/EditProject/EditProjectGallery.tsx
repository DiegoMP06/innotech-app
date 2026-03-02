import 'photoswipe/dist/photoswipe.css';

import { Button } from "@/components/ui/button";
import EditProjectGalleryItem from "@/components/user/projects/EditProjectGalleryItem";
import { Project } from "@/types";
import { router } from "@inertiajs/react";
import { useEcho } from "@laravel/echo-react";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Gallery } from "react-photoswipe-gallery";
import NewProjectImageModal from "./NewProjectImageModal";

type EditProjectGalleryProps = {
    gallery: Project['media'];
    projectId: Project['id'];
}

export default function EditProjectGallery({ gallery, projectId }: EditProjectGalleryProps) {
    const [isModalActive, setIsModalActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const echo = useEcho(`project.${projectId}`, 'MediaProcessed', () => {
        router.reload({ only: ['project'] });
    });

    useEffect(() => {
        echo.listen()
        return () => echo.leave()
    }, [echo])

    return (
        <>
            <div className="mt-15">
                <h2 className="text-xl font-semibold mb-4">
                    Imágenes:
                </h2>

                <div className="mt-10">
                    <Button onClick={() => setIsModalActive(true)}>
                        <Plus />
                        Agregar Imagen
                    </Button>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    <Gallery>
                        {gallery.map((image) => (
                            <EditProjectGalleryItem
                                key={image.id}
                                processing={processing}
                                setProcessing={setProcessing}
                                image={image}
                                projectId={projectId}
                            />
                        ))}
                    </Gallery>
                </div>
            </div>

            <NewProjectImageModal
                projectId={projectId}
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
            />
        </>
    )
}
