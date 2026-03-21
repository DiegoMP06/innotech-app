import { type ComponentConfig } from '@measured/puck';

type VideoEmbedProps = {
    url: string;
    caption?: string;
    aspectRatio: '16/9' | '4/3' | '1/1';
    /** Autoplay deshabilitado por defecto (buenas prácticas de accesibilidad) */
    autoplay: boolean;
};

const ASPECT: Record<string, string> = {
    '16/9': 'aspect-video',        // Tailwind aspect-video = 16/9
    '4/3':  'aspect-[4/3]',
    '1/1':  'aspect-square',
};

/**
 * Convierte URLs de YouTube/Vimeo a su URL de embed.
 * Usa youtube-nocookie.com para máxima privacidad.
 */
function toEmbedUrl(raw: string, autoplay: boolean): string | null {
    const url = raw.trim();

    // YouTube: varios formatos
    const ytMatch =
        url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/) ??
        url.match(/youtube\.com\/shorts\/([A-Za-z0-9_-]{11})/);

    if (ytMatch) {
        const params = new URLSearchParams({
            rel: '0',
            modestbranding: '1',
            ...(autoplay ? { autoplay: '1', mute: '1' } : {}),
        });
        return `https://www.youtube-nocookie.com/embed/${ytMatch[1]}?${params}`;
    }

    // Vimeo
    const vimeoMatch = url.match(/(?:vimeo\.com\/)(\d+)/);
    if (vimeoMatch) {
        const params = new URLSearchParams({
            dnt: '1',
            ...(autoplay ? { autoplay: '1', muted: '1' } : {}),
        });
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?${params}`;
    }

    // URL de embed directa (iframe src)
    if (url.startsWith('http') && (url.includes('embed') || url.includes('player'))) {
        return url;
    }

    return null;
}

export default function VideoEmbed({ url, caption, aspectRatio, autoplay }: VideoEmbedProps) {
    const embedUrl = toEmbedUrl(url, autoplay);

    return (
        <figure className="my-6 mx-4">
            {embedUrl ? (
                <div className={`${ASPECT[aspectRatio]} w-full overflow-hidden rounded-lg border border-border shadow-sm`}>
                    <iframe
                        src={embedUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        loading="lazy"
                        title={caption ?? 'Video embebido'}
                    />
                </div>
            ) : (
                <div className={`${ASPECT[aspectRatio]} w-full flex items-center justify-center bg-muted rounded-lg border border-dashed border-border`}>
                    <p className="text-sm text-muted-foreground text-center px-4">
                        URL inválida. Usa un enlace de YouTube o Vimeo.<br />
                        <span className="text-xs opacity-70">{url || '(vacío)'}</span>
                    </p>
                </div>
            )}
            {caption && (
                <figcaption className="text-xs text-muted-foreground text-center mt-2">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}

export const VideoEmbedConfig: ComponentConfig<VideoEmbedProps> = {
    label: 'Video (YouTube / Vimeo)',
    fields: {
        url: { type: 'text', label: 'URL del video (YouTube o Vimeo)' },
        caption: { type: 'text', label: 'Pie de video (opcional)' },
        aspectRatio: {
            type: 'radio',
            label: 'Proporción',
            options: [
                { label: '16:9 (widescreen)', value: '16/9' },
                { label: '4:3 (clásico)', value: '4/3' },
                { label: '1:1 (cuadrado)', value: '1/1' },
            ],
        },
        autoplay: {
            type: 'radio',
            label: 'Autoplay (silenciado)',
            options: [
                { label: 'No', value: false },
                { label: 'Sí', value: true },
            ],
        },
    },
    defaultProps: {
        url: '',
        caption: '',
        aspectRatio: '16/9',
        autoplay: false,
    },
    render: VideoEmbed,
};
