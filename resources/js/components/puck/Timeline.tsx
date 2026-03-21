import { ComponentConfig } from "@measured/puck";

type TimelineItem = {
    date: string;
    title: string;
    description: string;
    tag: string;
    tagColor: string;
};

type TimelineProps = {
    items: TimelineItem[];
    layout: "left" | "alternate";
};

export default function Timeline({ items = [], layout = "left" }: TimelineProps) {
    return (
        <div className="my-6 mx-4 relative">
            {layout === "left" && <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-border" />}
            {layout === "alternate" && <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />}
            <ol className="flex flex-col gap-8">
                {items.map((item, i) => (
                    <li key={i} className={`relative flex gap-4 ${layout === "left" ? "flex-row pl-6" : i % 2 === 1 ? "flex-row-reverse" : "flex-row"}`}>
                        <div className={`absolute ${layout === "left" ? "left-0" : "left-1/2 -translate-x-1/2"} top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-inn-700 bg-background`} />
                        <div className={layout === "alternate" ? "w-1/2 px-4" : ""}>
                            {item.date && <time className="text-xs font-medium text-muted-foreground block mb-1">{item.date}</time>}
                            <div className="flex items-start gap-2 flex-wrap">
                                <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                                {item.tag && (
                                    <span className="shrink-0 rounded-full px-2 py-0.5 text-xs font-medium" style={{ background: item.tagColor ? `${item.tagColor}22` : undefined, color: item.tagColor }}>
                                        {item.tag}
                                    </span>
                                )}
                            </div>
                            {item.description && <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{item.description}</p>}
                        </div>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export const TimelineConfig: ComponentConfig<TimelineProps> = {
    label: 'Linea de tiempo',
    fields: {
        items: {
            type: 'array',
            label: 'Elementos',
            min: 1,
            max: 10,
            arrayFields: {
                date: {
                    type: 'text',
                    label: 'Fecha',
                    placeholder: 'Escribe aquí la fecha...'
                },
                title: {
                    type: 'text',
                    label: 'Título',
                    placeholder: 'Escribe aquí el título...'
                },
                description: {
                    type: 'textarea',
                    label: 'Descripción',
                    placeholder: 'Escribe aquí la descripción...'
                },
                tag: {
                    type: 'text',
                    label: 'Etiqueta',
                    placeholder: 'Escribe aquí la etiqueta...'
                },
                tagColor: {
                    type: 'custom',
                    label: 'Color de la etiqueta',
                    render: ({ onChange, value }) => (
                        <input
                            type="color"
                            onChange={(e) => onChange(e.target.value)}
                            value={value}

                        />
                    )
                }
            }
        },
        layout: {
            type: 'radio',
            label: 'Disposición',
            options: [
                { label: 'Izquierda', value: 'left' },
                { label: 'Alternada', value: 'alternate' },
            ]
        }
    },
    defaultProps: {
        layout: 'left', items: [
            {
                date: 'Escribe aquí la fecha...',
                title: 'Escribe aquí el titulo...',
                description: 'Escribe aquí la descripción...',
                tag: 'Escribe aquí la etiqueta...',
                tagColor: '#000000'
            }
        ]
    },
    render: Timeline
}
