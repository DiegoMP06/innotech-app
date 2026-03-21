import { cn } from "@/lib/utils";
import { ComponentConfig } from "@measured/puck";
import { PropsWithChildren } from "react";

type HeadingProps = {
    children: string;
    Tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    align: "left" | "center" | "right";
    color: "default" | "muted" | "primary" | "accent";
};

const SIZE = { h1: "text-4xl", h2: "text-3xl", h3: "text-2xl", h4: "text-xl", h5: "text-lg", h6: "text-base" };
const COLOR = { default: "text-foreground", muted: "text-muted-foreground", primary: "text-inn-700", accent: "text-sky-600" };

export default function Heading({ children, Tag, align = "left", color = "default" }: PropsWithChildren<HeadingProps>) {
    return (
        <Tag className={cn("leading-tight font-bold mt-6 mb-3 text-pretty", SIZE[Tag], COLOR[color],
            align === "center" && "text-center", align === "right" && "text-right")}>
            {children}
        </Tag>
    );
}

export const HeadingConfig: ComponentConfig<HeadingProps> = {
    label: 'Encabezado',
    fields: {
        children: {
            type: "text",
            label: "Texto del Encabezado",
            placeholder: "Escribe aquí el texto del encabezado..."
        },
        Tag: {
            label: "Nivel",
            type: "select",
            options: [
                { label: "H1", value: "h1" },
                { label: "H2", value: "h2" },
                { label: "H3", value: "h3" },
                { label: "H4", value: "h4" },
                { label: "H5", value: "h5" },
                { label: "H6", value: "h6" },
            ],
        },
        align: {
            label: "Alineación",
            type: "select",
            options: [
                { label: "Izquierda", value: "left" },
                { label: "Centro", value: "center" },
                { label: "Derecha", value: "right" },
            ],
        },
        color: {
            label: "Color",
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Muted", value: "muted" },
                { label: "Primary", value: "primary" },
                { label: "Accent", value: "accent" },
            ],
        },
    },
    defaultProps: { children: "Encabezado", Tag: "h2", align: "left", color: "default" },
    render: Heading,
}
