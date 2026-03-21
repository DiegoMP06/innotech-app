import { Editor } from "@tiptap/react";
import { EditorConfig } from "../MenuBar";
import MenuButton from "./MenuButton";
import { ICONS as Icons } from "@/consts/tiptap";
import MenuGroup from "./MenuGroup";

type TextOptionsProps = {
    config: EditorConfig,
    editor: Editor
}

export default function TextOptions({ editor, config }: TextOptionsProps) {
    return (
        <MenuGroup label="Formato de texto">
            <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={config?.isBold} tooltip="Negrita (Ctrl+B)"><Icons.Bold /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={config?.isItalic} tooltip="Cursiva (Ctrl+I)"><Icons.Italic /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={config?.isUnderline} tooltip="Subrayado (Ctrl+U)"><Icons.Underline /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={config?.isStrike} tooltip="Tachado"><Icons.Strike /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={config?.isCode} tooltip="Código inline"><Icons.Code /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleSuperscript().run()} isActive={config?.isSuperscript} tooltip="Superíndice"><Icons.Superscript /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleSubscript().run()} isActive={config?.isSubscript} tooltip="Subíndice"><Icons.Subscript /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().unsetAllMarks().run()} tooltip="Limpiar formato"><Icons.ClearFormat /></MenuButton>
        </MenuGroup>
    )
}

