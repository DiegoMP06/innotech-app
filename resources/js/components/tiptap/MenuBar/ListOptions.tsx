import { Editor } from "@tiptap/react"
import { EditorConfig } from "../MenuBar"
import MenuButton from "./MenuButton"
import { ICONS as Icons } from '@/consts/tiptap';
import MenuGroup from "./MenuGroup";

type ListOptionsProps = {
    config: EditorConfig
    editor: Editor
}

export default function ListOptions({ editor, config }: ListOptionsProps) {
    return (
        <MenuGroup label="Listas">
            <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={config?.isBulletList}
                tooltip="Lista con viñetas"
            >
                <Icons.BulletList />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={config?.isOrderedList}
                tooltip="Lista numerada"
            >
                <Icons.OrderedList />
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleTaskList().run()}
                isActive={config?.isTaskList}
                tooltip="Lista de tareas"
            >
                <Icons.TaskList />
            </MenuButton>
        </MenuGroup>
    )
}

