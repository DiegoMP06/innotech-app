import { ICONS as Icons } from '@/consts/tiptap';
import { Editor } from '@tiptap/react';
import { useState } from 'react';
import { EditorConfig } from '../MenuBar';
import LinkDialog from './LinkDialog';
import MenuButton from './MenuButton';
import MenuGroup from './MenuGroup';

type LinkOptionsProps = {
    editor: Editor;
    config: EditorConfig;
}

export default function LinkOptions({ editor, config }: LinkOptionsProps) {
    const [linkOpen, setLinkOpen] = useState(false);

    return (
        <MenuGroup label="Enlaces" className="relative">
            <MenuButton onClick={() => setLinkOpen(p => !p)} isActive={config?.isLink} tooltip="Insertar enlace (Ctrl+K)">
                <Icons.Link />
            </MenuButton>
            <LinkDialog
                editor={editor}
                isOpen={linkOpen}
                onClose={() => setLinkOpen(false)}
            />
        </MenuGroup>

    )
}
