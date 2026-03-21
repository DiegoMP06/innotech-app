import { Editor } from "@tiptap/react";
import { EditorConfig } from "../MenuBar";
import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import MenuGroup from "./MenuGroup";

type SelectBlockTypeProps = {
    editor: Editor;
    config: EditorConfig;

}

const BLOCK_TYPES = [
    {
        type: 'p',
        label: 'Párrafo',
    },
    {
        type: 'h1',
        label: 'Encabezado 1',
    },
    {
        type: 'h2',
        label: 'Encabezado 2',
    },
    {
        type: 'h3',
        label: 'Encabezado 3',
    },
    {
        type: 'h4',
        label: 'Encabezado 4',
    },
    {
        type: 'code',
        label: 'Código',
    },
    {
        type: 'quote',
        label: 'Cita',
    },
]

export default function SelectBlockType({ config, editor }: SelectBlockTypeProps) {
    const blockValue = useMemo(() => config?.isH1 ? "h1" : config?.isH2 ? "h2" : config?.isH3 ? "h3" : config?.isH4 ? "h4"
        : config?.isCodeBlock ? "code" : config?.isBlockquote ? "quote" : "p", [config]);

    const setBlock = (variant: string) => {
        if (variant === "p") editor.chain().focus().setParagraph().run();
        if (variant === "h1") editor.chain().focus().toggleHeading({ level: 1 }).run();
        if (variant === "h2") editor.chain().focus().toggleHeading({ level: 2 }).run();
        if (variant === "h3") editor.chain().focus().toggleHeading({ level: 3 }).run();
        if (variant === "h4") editor.chain().focus().toggleHeading({ level: 4 }).run();
        if (variant === "code") editor.chain().focus().toggleCodeBlock().run();
        if (variant === "quote") editor.chain().focus().toggleBlockquote().run();
    };

    return (
        <MenuGroup label="Tipo de Bloque">
            <Select
                value={blockValue}
                onValueChange={setBlock}
                aria-label="Tipo de bloque"
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="Tipo de Bloque" />
                </SelectTrigger>
                <SelectContent>
                    {BLOCK_TYPES.map((type) =>
                        <SelectItem
                            key={type.type}
                            value={type.type}
                        >{type.label}</SelectItem>
                    )}
                </SelectContent>
            </Select>
        </MenuGroup>
    )
}

