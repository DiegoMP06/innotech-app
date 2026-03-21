import { ICONS as Icons } from '@/consts/tiptap';
import { Editor } from "@tiptap/react";
import { EditorConfig } from "../MenuBar";
import MenuButton from "./MenuButton";
import MenuGroup from './MenuGroup';

type AlignOptionsProps = {
    config: EditorConfig
    editor: Editor
}

export default function AlignOptions({ config, editor }: AlignOptionsProps) {
    return (
        <MenuGroup label="Alineación">
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign("left").run()}
                isActive={config?.isAlignLeft}
                tooltip="Izquierda"
            >
                <Icons.AlignLeft />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign("center").run()}
                isActive={config?.isAlignCenter}
                tooltip="Centrar"
            >
                <Icons.AlignCenter />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign("right").run()}
                isActive={config?.isAlignRight}
                tooltip="Derecha"
            >
                <Icons.AlignRight />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setTextAlign("justify").run()}
                isActive={config?.isAlignJustify}
                tooltip="Justificar"
            >
                <Icons.AlignJustify />
            </MenuButton>
        </MenuGroup>
    )
}
