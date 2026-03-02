import Link from '@tiptap/extension-link';
import { TextStyleKit } from '@tiptap/extension-text-style';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import MenuBar from './MenuBar';
import TipTapEditorContainer from './TipTapEditorContainer';

const extensions = [TextStyleKit, StarterKit, Link]


type TipTapEditorProps = {
    value: string;
    onChange: (val: string) => void
}

export default ({ value, onChange }: TipTapEditorProps) => {
    const editor = useEditor({
        extensions,
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        }
    })
    return (
        <div className="rounded border border-neutral-400 grid grid-cols-1">
            <MenuBar editor={editor} />
            <TipTapEditorContainer>
                <EditorContent editor={editor} />
            </TipTapEditorContainer>
        </div>
    )
}
