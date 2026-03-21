import 'photoswipe/dist/photoswipe.css';

import EditPostGalleryItem from '@/components/blog/EditPostGalleryItem';
import { Button } from '@/components/ui/button';
import { Post } from '@/types/blog';
import { useEcho } from '@laravel/echo-react';
import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Gallery } from 'react-photoswipe-gallery';
import NewPostImageModal from './NewPostImageModal';
import { router } from '@inertiajs/react';

type EditPostGalleryProps = {
    gallery: Post['media'];
    postId: Post['id'];
}

export default function EditPostGallery({ gallery, postId }: EditPostGalleryProps) {
    const [isModalActive, setIsModalActive] = useState(false);
    const [processing, setProcessing] = useState(false);
    const echo = useEcho(`post.${postId}`, 'MediaProcessed', () => {
        router.reload({ only: ['post'] });
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
                            <EditPostGalleryItem
                                key={image.id}
                                processing={processing}
                                setProcessing={setProcessing}
                                image={image}
                                postId={postId}
                            />
                        ))}
                    </Gallery>
                </div>
            </div>

            <NewPostImageModal
                postId={postId}
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
            />
        </>
    )
}

