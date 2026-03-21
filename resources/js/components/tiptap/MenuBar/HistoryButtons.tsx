
import {Editor} from '@tiptap/react'
import { ICONS as Icons } from "@/consts/tiptap";
import MenuButton from "./MenuButton";
import { EditorConfig } from '../MenuBar';
import MenuGroup from './MenuGroup';

type HistoryButtonsProps = {
    editor: Editor;
    config: EditorConfig;
}

export default function HistoryButtons({config, editor}: HistoryButtonsProps) {
    return (
        <MenuGroup label="Historial">
            <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!config?.canUndo} tooltip="Deshacer (Ctrl+Z)"><Icons.Undo /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!config?.canRedo} tooltip="Rehacer (Ctrl+Y)"><Icons.Redo /></MenuButton>
        </MenuGroup>
    )
}
