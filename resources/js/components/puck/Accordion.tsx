'use client';

import { type ComponentConfig } from '@measured/puck';
import { useState } from 'react';

type AccordionItem = {
    question: string;
    answer: string;
};

type AccordionProps = {
    title?: string;
    items: AccordionItem[];
    /** Permitir múltiples abiertos a la vez */
    multiple: boolean;
    variant: 'default' | 'separated' | 'bordered';
};

const VARIANTS = {
    default:   { wrap: 'divide-y divide-border border border-border rounded-lg overflow-hidden', item: '' },
    separated: { wrap: 'flex flex-col gap-2', item: 'border border-border rounded-lg overflow-hidden' },
    bordered:  { wrap: 'divide-y-2 divide-inn-200', item: '' },
};

export default function Accordion({ title, items, multiple, variant }: AccordionProps) {
    const [openSet, setOpenSet] = useState<Set<number>>(new Set());

    const toggle = (i: number) => {
        setOpenSet(prev => {
            const next = new Set(prev);
            if (next.has(i)) {
                next.delete(i);
            } else {
                if (!multiple) next.clear();
                next.add(i);
            }
            return next;
        });
    };

    const v = VARIANTS[variant];

    return (
        <div className="my-6 mx-4">
            {title && (
                <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
            )}
            <div className={v.wrap}>
                {items.map((item, i) => {
                    const isOpen = openSet.has(i);
                    return (
                        <div key={i} className={v.item}>
                            <button
                                type="button"
                                onClick={() => toggle(i)}
                                aria-expanded={isOpen}
                                className="flex w-full items-center justify-between px-4 py-3 text-left font-semibold text-foreground hover:bg-accent transition-colors"
                            >
                                <span>{item.question}</span>
                                <span
                                    className={`shrink-0 ml-2 text-lg leading-none transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                                    aria-hidden="true"
                                >
                                    +
                                </span>
                            </button>

                            {isOpen && (
                                <div className="px-4 pb-4 pt-1">
                                    <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
                                        {item.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export const AccordionConfig: ComponentConfig<AccordionProps> = {
    label: 'Preguntas frecuentes (Accordion)',
    fields: {
        title: { type: 'text', label: 'Título de la sección (opcional)' },
        multiple: {
            type: 'radio',
            label: 'Varios abiertos a la vez',
            options: [
                { label: 'No', value: false },
                { label: 'Sí', value: true },
            ],
        },
        variant: {
            type: 'radio',
            label: 'Estilo',
            options: [
                { label: 'Default', value: 'default' },
                { label: 'Separado', value: 'separated' },
                { label: 'Bordeado', value: 'bordered' },
            ],
        },
        items: {
            type: 'array',
            label: 'Preguntas',
            arrayFields: {
                question: { type: 'text', label: 'Pregunta' },
                answer:   { type: 'textarea', label: 'Respuesta' },
            },
            getItemSummary: (item) => (item as AccordionItem).question || 'Nueva pregunta',
        },
    },
    defaultProps: {
        title: 'Preguntas frecuentes',
        multiple: false,
        variant: 'default',
        items: [
            { question: '¿Cuáles son los requisitos?', answer: 'Escribe la respuesta aquí.' },
            { question: '¿Cómo me registro?', answer: 'Escribe la respuesta aquí.' },
        ],
    },
    render: Accordion,
};
