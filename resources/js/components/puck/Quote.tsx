import { ComponentConfig } from "@measured/puck";
import { PropsWithChildren } from "react";

type QuoteVariant = "default" | "info" | "warning" | "success";
type QuoteProps = {
    author?: string;
    source?: string;
    variant: QuoteVariant;
    children: string;
};

const STYLES: Record<QuoteVariant, string> = {
    default: "border-muted-foreground bg-accent text-muted-foreground",
    info: "border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950 dark:text-sky-200",
    warning: "border-amber-500 bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200",
    success: "border-emerald-500 bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
};

export default function Quote({ children, author, source, variant = "default" }: PropsWithChildren<QuoteProps>) {
    return (
        <blockquote className={`border-l-4 mx-4 rounded my-6 pl-6 pr-4 py-3 text-lg ${STYLES[variant]}`}>
            <p className="leading-normal text-justify">{children}</p>
            {(author || source) && (
                <footer className="mt-3 text-sm font-semibold">
                    {author && <cite className="not-italic">— {author}</cite>}
                    {source && <span className="ml-2 font-normal opacity-70">{source}</span>}
                </footer>
            )}
        </blockquote>
    );
}

export const QuoteConfig: ComponentConfig<QuoteProps> = {
    label: 'Cita',
    fields: {
        children: { type: "textarea", label: "Cita", placeholder: 'Escribe aquí tu cita...' },
        variant: {
            label: "Estilo",
            type: "select",
            options: [
                { label: "Default", value: "default" },
                { label: "Info", value: "info" },
                { label: "Warning", value: "warning" },
                { label: "Success", value: "success" },
            ],
        },
        author: { type: "text", label: "Autor/Fuente (Opcional)", placeholder: 'Escribe aquí el autor...' },
        source: { type: "text", label: "Fuente (Opcional)", placeholder: 'Escribe aquí la fuente...' },
    },
    defaultProps: { children: "Cita", variant: "default" },
    render: Quote,
}
