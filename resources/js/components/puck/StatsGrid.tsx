import { type ComponentConfig } from '@measured/puck';

type StatItem = {
    value: string;
    label: string;
    description?: string;
    icon?: string;
};

type StatsGridProps = {
    items: StatItem[];
    columns: 2 | 3 | 4;
    variant: 'default' | 'card' | 'minimal';
    align: 'left' | 'center';
};

const COLS: Record<number, string> = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
};

const VARIANT = {
    default: {
        wrap:  'grid gap-4 my-6',
        item:  'flex flex-col gap-1 py-4 border-b-2 border-inn-200',
        value: 'text-3xl font-black text-inn-700',
        label: 'text-sm font-semibold text-foreground',
        desc:  'text-xs text-muted-foreground',
    },
    card: {
        wrap:  'grid gap-4 my-6',
        item:  'flex flex-col gap-1 p-4 rounded-lg border border-border bg-card shadow-sm',
        value: 'text-3xl font-black text-inn-700',
        label: 'text-sm font-semibold text-foreground',
        desc:  'text-xs text-muted-foreground',
    },
    minimal: {
        wrap:  'grid gap-6 my-6',
        item:  'flex flex-col gap-0.5',
        value: 'text-4xl font-black text-foreground',
        label: 'text-xs uppercase tracking-widest text-muted-foreground font-semibold',
        desc:  'text-xs text-muted-foreground/70',
    },
};

export default function StatsGrid({ items, columns, variant, align }: StatsGridProps) {
    const v = VARIANT[variant];
    const textAlign = align === 'center' ? 'text-center items-center' : 'text-left items-start';

    return (
        <div className={`${v.wrap} ${COLS[columns]} mx-4`}>
            {items.map((item, i) => (
                <div key={i} className={`${v.item} flex flex-col ${textAlign}`}>
                    {item.icon && (
                        <span className="text-2xl mb-1 leading-none">{item.icon}</span>
                    )}
                    <span className={v.value}>{item.value}</span>
                    <span className={v.label}>{item.label}</span>
                    {item.description && (
                        <span className={v.desc}>{item.description}</span>
                    )}
                </div>
            ))}
        </div>
    );
}

export const StatsGridConfig: ComponentConfig<StatsGridProps> = {
    label: 'Estadísticas / Métricas',
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
        variant: {
            type: 'radio',
            label: 'Estilo',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Card', value: 'card' },
                { label: 'Minimal', value: 'minimal' },
            ],
        },
        align: {
            type: 'radio',
            label: 'Alineación',
            options: [
                { label: 'Izquierda', value: 'left' },
                { label: 'Centrado', value: 'center' },
            ],
        },
        items: {
            type: 'array',
            label: 'Métricas',
            arrayFields: {
                icon:        { type: 'text', label: 'Ícono (emoji)' },
                value:       { type: 'text', label: 'Valor (ej: 120+)' },
                label:       { type: 'text', label: 'Etiqueta' },
                description: { type: 'text', label: 'Descripción (opcional)' },
            },
            getItemSummary: (item) => (item as StatItem).label || 'Métrica',
        },
    },
    defaultProps: {
        columns: 3,
        variant: 'card',
        align: 'center',
        items: [
            { icon: '👥', value: '120+', label: 'Participantes', description: 'Ediciones anteriores' },
            { icon: '🏆', value: '24', label: 'Proyectos', description: 'Presentados' },
            { icon: '⏱️', value: '48h', label: 'Duración', description: 'Del evento' },
        ],
    },
    render: StatsGrid,
};
