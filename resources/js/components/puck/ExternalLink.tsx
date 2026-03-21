import { cn } from "@/lib/utils";
import { ComponentConfig } from "@measured/puck";

type ExternalLinkProps = {
    children: string;
    href: string;
}

export default function ExternalLink({ children, href }: ExternalLinkProps) {
    return (
        <a target="_blank" rel="noopener noreferrer" className={cn("text-base text-sky-400 text-justify leading-relaxed underline hover:text-sky-500 transition-colors cursor-pointer")} href={href}>
            {children}
        </a>
    );
}

export const ExternalLinkConfig: ComponentConfig<ExternalLinkProps> = {
    label: 'Enlace externo',
    fields: {
        children: { type: "text", label: "Texto del enlace", placeholder: 'Escribe aquí el texto del enlace...' },
        href: { type: "text", label: "URL (https://...)", placeholder: 'Escribe aquí la URL del enlace...' },
    },
    defaultProps: { children: "Enlace externo", href: "https://example.com" },
    render: ExternalLink,
}
