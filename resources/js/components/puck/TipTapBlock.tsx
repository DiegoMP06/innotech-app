// puck/TipTapBlock.tsx
// Bloque Puck que embebe el editor TipTap completo.
// Permite contenido de texto enriquecido dentro de cualquier layout Puck.
import TipTapEditor, { TipTapViewer } from "@/components/tiptap/TipTapEditor";
import { useState } from "react";

type TipTapBlockProps = {
    content: string;
    placeholder?: string;
    minHeight?: string;
}

/**
 * En el panel de Puck este componente muestra el editor interactivo.
 * En la vista de preview/renderizado final muestra el HTML guardado.
 *
 * Uso en puck config:
 *   TipTapBlock: {
 *     fields: {
 *       content: { type: "custom", render: ({ value, onChange }) =>
 *         <TipTapEditor value={value} onChange={onChange} /> },
 *       placeholder: { type: "text", label: "Placeholder" },
 *       minHeight: { type: "text", label: "Altura mínima (px)" },
 *     },
 *     defaultProps: { content: "", placeholder: "Escribe aquí...", minHeight: "150px" },
 *     render: (props) => <TipTapBlock {...props} />,
 *   }
 */
export default function TipTapBlock({ content, placeholder, minHeight = "150px" }: TipTapBlockProps) {
    // En el contexto de Puck preview solo renderizamos el HTML
    return (
        <div className="tiptap-block my-2">
            <TipTapViewer content={content} />
        </div>
    );
}

/**
 * Campo personalizado para usar dentro del panel lateral de Puck.
 * Registrar en fields del bloque como `type: "custom"`.
 */
export function TipTapPuckField({
    value,
    onChange,
    id,
}: {
    value: string;
    onChange: (val: string) => void;
    id?: string;
}) {
    return (
        <div id={id} className="w-full">
            <TipTapEditor
                value={value}
                onChange={onChange}
                placeholder="Escribe el contenido..."
                minHeight="180px"
                maxHeight="400px"
            />
        </div>
    );
}
