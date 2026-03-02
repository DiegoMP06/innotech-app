import 'photoswipe/dist/photoswipe.css';

import { Media } from '@/types';
import type { FC } from 'react';
import { Gallery, Item } from 'react-photoswipe-gallery';
import { getIdealResponsiveMediaLink } from '@/utils';

interface GalleryContentProps {
    media: Media[];
    alt: string;
    imageKey: string;
}

const GalleryContent: FC<GalleryContentProps> = ({ media, alt, imageKey }) => {
    return (
        <>
            {media.length > 1 ? (
                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 my-10">
                    <Gallery>
                        {media.map((image) => (
                            <Item
                                key={image.id}
                                original={image.urls[imageKey]}
                                thumbnail={getIdealResponsiveMediaLink(image)}
                                width={image.dimensions[imageKey].width}
                                height={image.dimensions[imageKey].height}
                            >
                                {({ ref, open }) => (
                                    <div key={image.id}>
                                        <img
                                            ref={ref}
                                            onClick={open}
                                            src={getIdealResponsiveMediaLink(image)}
                                            className="block cursor-pointer object-cover transition duration-300 hover:scale-105 max-w-full h-auto rounded-md border border-dashed mx-auto"
                                            width={image.dimensions[imageKey].width}
                                            height={image.dimensions[imageKey].height}
                                            alt={`${alt} - imagen ${image.id}`}
                                        />
                                    </div>
                                )}
                            </Item>
                        ))}
                    </Gallery>
                </section>
            ) : (
                <section className="my-10">
                    <img
                        src={media.at(0)?.urls[imageKey]}
                        alt={alt}
                        className="mx-auto max-w-full rounded-lg shadow-md"
                        width={media.at(0)?.dimensions[imageKey].width}
                        height={media.at(0)?.dimensions[imageKey].height}
                    />
                </section>
            )}
        </>
    );
};

export default GalleryContent;
