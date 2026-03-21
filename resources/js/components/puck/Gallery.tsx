'use client';

import { type ComponentConfig } from '@measured/puck';
import { useState } from 'react';

type GalleryImage = {
    url: string;
    alt: string;
    caption?: string;
};

type GalleryProps = {
    images: GalleryImage[];
    columns: 2 | 3 | 4;
    gap: 'sm' | 'md' | 'lg';
    rounded: boolean;
    lightbox: boolean;
};

const GAP: Record<string, string> = {
    sm: 'gap-2', md: 'gap-4', lg: 'gap-6',
};

const COLS: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
};

export default function Gallery({ images, columns, gap, rounded, lightbox }: GalleryProps) {
    const [active, setActive] = useState<number | null>(null);

    if (images.length === 0) {
        return (
            <div className="my-6 mx-4 flex items-center justify-center h-24 rounded border border-dashed border-border bg-muted">
                <p className="text-sm text-muted-foreground">Sin imágenes. Agrega imágenes en el panel.</p>
            </div>
        );
    }

    return (
        <div className="my-6 mx-4">
            <div className={`grid ${COLS[columns]} ${GAP[gap]}`}>
                {images.map((img, i) => (
                    <figure key={i}>
                        <button
                            type="button"
                            onClick={() => lightbox && setActive(i)}
                            className={`block w-full overflow-hidden ${rounded ? 'rounded-lg' : ''} ${lightbox ? 'cursor-zoom-in' : 'cursor-default'}`}
                        >
                            <img
                                src={img.url}
                                alt={img.alt}
                                loading="lazy"
                                decoding="async"
                                className={`w-full aspect-square object-cover transition-transform duration-300 hover:scale-105 ${rounded ? 'rounded-lg' : ''}`}
                            />
                        </button>
                        {img.caption && (
                            <figcaption className="text-xs text-muted-foreground text-center mt-1">
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>

            {/* Lightbox */}
            {lightbox && active !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
                    onClick={() => setActive(null)}
                >
                    {/* Navegación anterior */}
                    {active > 0 && (
                        <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setActive(a => (a ?? 0) - 1); }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-inn-300 z-10"
                            aria-label="Anterior"
                        >
                            ‹
                        </button>
                    )}

                    <div className="max-w-4xl max-h-[90vh] mx-auto px-12" onClick={e => e.stopPropagation()}>
                        <img
                            src={images[active].url}
                            alt={images[active].alt}
                            className="max-h-[80vh] max-w-full object-contain rounded"
                        />
                        {images[active].caption && (
                            <p className="text-center text-sm text-white/70 mt-2">{images[active].caption}</p>
                        )}
                        <p className="text-center text-xs text-white/40 mt-1">
                            {active + 1} / {images.length}
                        </p>
                    </div>

                    {/* Navegación siguiente */}
                    {active < images.length - 1 && (
                        <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setActive(a => (a ?? 0) + 1); }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl font-bold hover:text-inn-300 z-10"
                            aria-label="Siguiente"
                        >
                            ›
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => setActive(null)}
                        className="absolute top-4 right-4 text-white text-2xl hover:text-inn-300"
                        aria-label="Cerrar"
                    >
                        ✕
                    </button>
                </div>
            )}
        </div>
    );
}

export const GalleryConfig: ComponentConfig<GalleryProps> = {
    label: 'Galería de imágenes',
    fields: {
        columns: {
            type: 'radio',
            label: 'Columnas',
            options: [
                { label: '2', value: 2 },
                { label: '3', value: 3 },
                { label: '4', value: 4 },
            ],
        },
        gap: {
            type: 'radio',
            label: 'Espacio entre imágenes',
            options: [
                { label: 'Pequeño', value: 'sm' },
                { label: 'Normal', value: 'md' },
                { label: 'Grande', value: 'lg' },
            ],
        },
        rounded: {
            type: 'radio',
            label: 'Bordes redondeados',
            options: [{ label: 'Sí', value: true }, { label: 'No', value: false }],
        },
        lightbox: {
            type: 'radio',
            label: 'Lightbox al hacer clic',
            options: [{ label: 'Sí', value: true }, { label: 'No', value: false }],
        },
        images: {
            type: 'array',
            label: 'Imágenes',
            arrayFields: {
                url:     { type: 'text',     label: 'URL de la imagen' },
                alt:     { type: 'text',     label: 'Alt text' },
                caption: { type: 'text',     label: 'Pie de imagen (opcional)' },
            },
            getItemSummary: (item, i) => (item as GalleryImage).alt || `Imagen ${(i ?? 0) + 1}`,
        },
    },
    defaultProps: {
        columns: 3,
        gap: 'md',
        rounded: true,
        lightbox: true,
        images: [
            { url: 'https://picsum.photos/seed/a/400/400', alt: 'Imagen 1' },
            { url: 'https://picsum.photos/seed/b/400/400', alt: 'Imagen 2' },
            { url: 'https://picsum.photos/seed/c/400/400', alt: 'Imagen 3' },
        ],
    },
    render: Gallery,
};
