import { Editor, useEditorState } from "@tiptap/react"
import MenuButton from "./MenuButton"

export default function MenuBar({ editor }: { editor: Editor }) {
    const editorState = useEditorState({
        editor,
        selector: ctx => {
            return {
                isBold: ctx.editor.isActive('bold') ?? false,
                canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
                isItalic: ctx.editor.isActive('italic') ?? false,
                canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
                isStrike: ctx.editor.isActive('strike') ?? false,
                canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
                isCode: ctx.editor.isActive('code') ?? false,
                canCode: ctx.editor.can().chain().toggleCode().run() ?? false,
                canClearMarks: ctx.editor.can().chain().unsetAllMarks().run() ?? false,
                isParagraph: ctx.editor.isActive('paragraph') ?? false,
                isLink: ctx.editor.isActive('link') ?? false,
                canLink: ctx.editor.can().chain().toggleLink().run() ?? false,
                isHeading1: ctx.editor.isActive('heading', { level: 1 }) ?? false,
                isHeading2: ctx.editor.isActive('heading', { level: 2 }) ?? false,
                isHeading3: ctx.editor.isActive('heading', { level: 3 }) ?? false,
                isHeading4: ctx.editor.isActive('heading', { level: 4 }) ?? false,
                isHeading5: ctx.editor.isActive('heading', { level: 5 }) ?? false,
                isHeading6: ctx.editor.isActive('heading', { level: 6 }) ?? false,
                isBulletList: ctx.editor.isActive('bulletList') ?? false,
                isOrderedList: ctx.editor.isActive('orderedList') ?? false,
                isCodeBlock: ctx.editor.isActive('codeBlock') ?? false,
                isBlockquote: ctx.editor.isActive('blockquote') ?? false,
                canUndo: ctx.editor.can().chain().undo().run() ?? false,
                canRedo: ctx.editor.can().chain().redo().run() ?? false,
            }
        },
    })

    return (
        <div className="p-2 bg-neutral-50 flex flex-wrap gap-1 w-full">
            <MenuButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editorState.canBold}
                isActive={editorState.isBold}
            >
                Bold
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editorState.canItalic}
                isActive={editorState.isItalic}
            >
                Italic
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editorState.canStrike}
                isActive={editorState.isStrike}
            >
                Strike
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={!editorState.canCode}
                isActive={editorState.isCode}
            >
                Código
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().unsetAllMarks().run()}
            >
                Limpiar estilos
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().clearNodes().run()}
            >
                Limpiar todo
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setParagraph().run()}
                isActive={editorState.isParagraph}
            >
                Párrafo
            </MenuButton>
            <MenuButton
                onClick={() => {
                    const url = window.prompt('URL del enlace:');
                    if (url) editor.chain().focus().setLink({ href: url }).run();
                }}
                isActive={editorState.isLink}
                disabled={!editorState.canLink}
            >
                Enlace
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                isActive={editorState.isHeading1}
            >
                H1
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                isActive={editorState.isHeading2}
            >
                H2
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                isActive={editorState.isHeading3}
            >
                H3
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                isActive={editorState.isHeading4}
            >
                H4
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                isActive={editorState.isHeading5}
            >
                H5
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                isActive={editorState.isHeading6}
            >
                H6
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editorState.isBulletList}
            >
                Lista desordenada
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editorState.isOrderedList}
            >
                Lista ordenada
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                isActive={editorState.isCodeBlock}
            >
                Bloque de Código
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editorState.isBlockquote}
            >
                Cita
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
                Linea horizontal
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().setHardBreak().run()}
            >
                Salto de linea
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().undo().run()} disabled={!editorState.canUndo}
            >
                Deshacer
            </MenuButton>
            <MenuButton
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editorState.canRedo}
            >
                Rehacer
            </MenuButton>
        </div>
    )
}
