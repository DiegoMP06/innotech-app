import { cn } from "@/lib/utils";
import { ComponentConfig } from "@measured/puck";
import { PropsWithChildren } from "react";

type ParagraphProps = {
    align: "left" | "center" | "right" | "justify"; size?: "sm" | "base" | "lg";
    color: "default" | "muted";
    children: string;
};

const SIZE = { sm: "text-sm", base: "text-base", lg: "text-lg" };
const ALIGN = { left: "text-left", center: "text-center", right: "text-right", justify: "text-justify" };

export default function Paragraph({ children, align = "justify", size = "base", color = "default" }: PropsWithChildren<ParagraphProps>) {
    return (
        <p className={cn("leading-relaxed my-4 whitespace-pre-wrap", SIZE[size], ALIGN[align],
            color === "muted" ? "text-muted-foreground" : "text-accent-foreground")}>
            {children}
        </p>
    );
}

export const ParagraphConfig: ComponentConfig<ParagraphProps> = {
    label: 'Párrafo',
    fields: {
        children: {
            type: "textarea",
            label: "Contenido",
            placeholder: 'Escribe aquí el contenido de tu párrafo...'
        },
        align: {
            label: "Alineación",
            type: "select",
            options: [
                { label: "Izquierda", value: "left" },
                { label: "Centro", value: "center" },
                { label: "Derecha", value: "right" },
                { label: "Justificado", value: "justify" },
            ],
        },
        color: {
            label: "Color",
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Muted", value: "muted" },
            ],
        }
    },
    defaultProps: { children: "Párrafo", align: "justify", color: "default" },
    render: Paragraph,
}
