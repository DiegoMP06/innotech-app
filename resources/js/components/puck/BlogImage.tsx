import { ComponentConfig } from "@measured/puck";

type BlogImageProps = {
    url: string;
    alt: string;
    caption?: string;
    alignment: "left" | "center" | "right";
    maxWidth: "sm" | "md" | "lg" | "full";
    rounded: boolean;
    shadow: boolean;
};

const MAX_WIDTH = { sm: "320px", md: "512px", lg: "768px", full: "100%" };
const ALIGN = { left: "mr-auto", center: "mx-auto", right: "ml-auto" };

export default function BlogImage({ url, alt, caption, alignment = "center", maxWidth = "lg", rounded = true, shadow = false }: BlogImageProps) {
    if (!url) return <></>;
    return (
        <figure className="my-6">
            <div className={ALIGN[alignment]} style={{ maxWidth: MAX_WIDTH[maxWidth] }}>
                <img src={url} alt={alt ?? ""} loading="lazy" decoding="async"
                    className={["w-full h-auto block", rounded ? "rounded-lg" : "", shadow ? "shadow-md" : ""].filter(Boolean).join(" ")} />
            </div>
            {(caption ?? alt) && (
                <figcaption className="text-xs text-muted-foreground text-center mt-2 italic">
                    {caption ?? alt}
                </figcaption>
            )}
        </figure>
    );
}

export const BlogImageConfig: ComponentConfig<BlogImageProps> = {
    label: 'Imagen Externa',
    fields: {
        url: {
            type: "text",
            label: "URL de la imagen",
            placeholder: 'Escribe aquí la URL de la imagen...'
        },
        alt: {
            type: "text",
            label: "Texto alternativo",
            placeholder: 'Escribe aquí el texto alternativo...'
        },
        caption: {
            type: "text",
            label: "Texto de la imagen",
            placeholder: 'Escribe aquí el texto de la imagen...'
        },
        alignment: {
            label: "Alineación",
            type: "radio",
            options: [
                { label: "Izquierda", value: "left" },
                { label: "Centro", value: "center" },
                { label: "Derecha", value: "right" },
            ],
        },
        maxWidth: {
            label: "Ancho máximo",
            type: "radio",
            options: [
                { label: "Pequeño", value: "sm" },
                { label: "Normal", value: "md" },
                { label: "Grande", value: "lg" },
                { label: "Ancho completo", value: "full" },
            ],
        },
        rounded: {
            type: 'radio',
            label: 'Bordes redondeados',
            options: [{ label: 'Sí', value: true }, { label: 'No', value: false }],
        },
        shadow: {
            type: 'radio',
            label: 'Sombra',
            options: [{ label: 'Sí', value: true }, { label: 'No', value: false }],
        },
    },
    defaultProps: {
        url: "https://example.com/image.jpg",
        alt: "Imagen de ejemplo",
        alignment: "center",
        maxWidth: "lg",
        rounded: true,
        shadow: false,
    },
    render: BlogImage,

};

