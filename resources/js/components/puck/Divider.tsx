import { ComponentConfig } from "@measured/puck";

type DividerProps = {
    label: string;
    style: "solid" | "dashed" | "dotted" | "gradient";
    spacing: "sm" | "md" | "lg";
};

const SPACING = { sm: "my-4", md: "my-8", lg: "my-16" };

export default function Divider({ label, style: ls = "solid", spacing = "md" }: DividerProps) {
    const borderClass = ls !== "gradient" ? `border-${ls}` : "";
    const gradStyle = ls === "gradient"
        ? { border: "none", height: "1px", background: "linear-gradient(to right, transparent, hsl(var(--muted-foreground)/0.3), transparent)" }
        : undefined;
    if (label) {
        return (
            <div className={`flex items-center gap-4 mx-4 ${SPACING[spacing]}`}>
                <div className={`flex-1 border-t border-muted-foreground/30 ${borderClass}`} style={gradStyle} />
                <span className="shrink-0 text-xs font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
                <div className={`flex-1 border-t border-muted-foreground/30 ${borderClass}`} style={gradStyle} />
            </div>
        );
    }
    return <hr className={`mx-4 border-muted-foreground/30 ${SPACING[spacing]} ${borderClass}`} style={gradStyle} />;
}

export const DividerConfig: ComponentConfig<DividerProps> = {
    label: 'Divisor',
    fields: {
        label: {
            type: 'text',
            label: 'Etiqueta',
            placeholder: 'Escribe aquí la etiqueta...'
        },
        style: {
            type: 'radio',
            label: 'Estilo',
            options: [
                { label: 'Solido', value: 'solid' },
                { label: 'Punteado', value: 'dashed' },
                { label: 'Puntillado', value: 'dotted' },
                { label: 'Gradiente', value: 'gradient' }
            ]
        },
        spacing: {
            type: 'radio',
            label: 'Espaciado',
            options: [
                { label: 'Chico', value: 'sm' },
                { label: 'Normal', value: 'md' },
                { label: 'Grande', value: 'lg' },
            ]
        }
    },
    defaultProps: { label: 'Escribe aquí la etiqueta...', style: 'solid', spacing: 'md' },
    render: Divider
}
