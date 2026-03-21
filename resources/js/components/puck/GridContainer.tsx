import { ComponentConfig, SlotComponent } from '@measured/puck';

type GridContainerProps = {
    columns: number;         // 1-12, configurable en Puck
    gap: number;             // pixels
    items: { content: SlotComponent }[];
    stackOnMobile: boolean;  // colapsar a 1 col en pantallas pequeñas
}

export default function GridContainer({ columns, gap, items, stackOnMobile }: GridContainerProps) {
    return (
        <div
            className={stackOnMobile ? "grid grid-cols-1 md:grid" : "grid"}
            style={{
                gap,
                gridTemplateColumns: stackOnMobile
                    ? undefined                               // en mobile lo controla grid-cols-1
                    : `repeat(${columns}, minmax(0, 1fr))`,
            }}
        >
            <style>{`
                @media (min-width: 768px) {
                    .grid-container-${columns} {
                        grid-template-columns: repeat(${columns}, minmax(0, 1fr));
                    }
                }
            `}</style>
            {items.map((item, i) => (
                <div key={i}>
                    {item.content()}
                </div>
            ))}
        </div>
    );
}

export const GridContainerConfig: ComponentConfig<GridContainerProps> = {
    label: 'Contenedor de elementos',
    fields: {
        columns: {
            min: 1,
            max: 12,
            type: "number",
            label: "Columnas",
            placeholder: 'Escribe aqui las columnas...',
        },
        items: {
            type: "array",
            max: 20,
            getItemSummary: (item, i) => `Elemento ${(Number(i)) + 1}`,
            arrayFields: {
                content: { type: "slot" },
            },
            defaultItemProps: ({} as { content: SlotComponent }),
        },
        gap: {
            min: 0,
            type: "number",
            label: "Espaciado",
            placeholder: 'Escribe aquí el espaciado...',
        },
        stackOnMobile: {
            type: "radio",
            label: "Colapsar en mobile",
            options: [
                { label: "Sí", value: true },
                { label: "No", value: false },
            ]
        },
    },
    defaultProps: {
        gap: 0,
        columns: 2,
        items: [],
        stackOnMobile: false,
    },
    render: GridContainer
}
