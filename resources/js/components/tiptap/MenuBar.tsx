import { ICONS as Icons } from "@/consts/tiptap";
import { Editor, useEditorState } from "@tiptap/react";
import AlignOptions from "./MenuBar/AlignOptions";
import ColorOptions from "./MenuBar/ColorOptions";
import HistoryButtons from "./MenuBar/HistoryButtons";
import LinkOptions from "./MenuBar/LinkOptions";
import ListOptions from "./MenuBar/ListOptions";
import MediaOptions from "./MenuBar/MediaOptions";
import MenuButton from "./MenuBar/MenuButton";
import MenuGroup from "./MenuBar/MenuGroup";
import MenuSeparator from "./MenuBar/MenuSeparator";
import SelectBlockType from "./MenuBar/SelectBlockType";
import TextOptions from "./MenuBar/TextOptions";
import TableOptions from "./MenuBar/TableOptions";

type MenuBarProps = {
    editor: Editor | null;
}

export type EditorConfig = {
    isBold: boolean;
    isItalic: boolean;
    isStrike: boolean;
    isUnderline: boolean;
    isCode: boolean;
    isLink: boolean;
    isHighlight: boolean;
    isParagraph: boolean;
    isH1: boolean;
    isH2: boolean;
    isH3: boolean;
    isH4: boolean;
    isBulletList: boolean;
    isOrderedList: boolean;
    isTaskList: boolean;
    isCodeBlock: boolean;
    isBlockquote: boolean;
    isAlignLeft: boolean;
    isAlignCenter: boolean;
    isAlignRight: boolean;
    isAlignJustify: boolean;
    isInTable: boolean;
    isSuperscript: boolean;
    isSubscript: boolean;
    canUndo: boolean;
    canRedo: boolean;
    charCount: number;
    wordCount: number;
    textColor: string | undefined;
} | null

export default function MenuBar({ editor }: MenuBarProps) {
    const config: EditorConfig = useEditorState({
        editor,
        selector: ctx => {
            if (!ctx.editor) return null;
            const e = ctx.editor;
            return {
                isBold: e.isActive("bold"),
                isItalic: e.isActive("italic"),
                isStrike: e.isActive("strike"),
                isUnderline: e.isActive("underline"),
                isCode: e.isActive("code"),
                isLink: e.isActive("link"),
                isHighlight: e.isActive("highlight"),
                isParagraph: e.isActive("paragraph"),
                isH1: e.isActive("heading", { level: 1 }),
                isH2: e.isActive("heading", { level: 2 }),
                isH3: e.isActive("heading", { level: 3 }),
                isH4: e.isActive("heading", { level: 4 }),
                isBulletList: e.isActive("bulletList"),
                isOrderedList: e.isActive("orderedList"),
                isTaskList: e.isActive("taskList"),
                isCodeBlock: e.isActive("codeBlock"),
                isBlockquote: e.isActive("blockquote"),
                isAlignLeft: e.isActive({ textAlign: "left" }),
                isAlignCenter: e.isActive({ textAlign: "center" }),
                isAlignRight: e.isActive({ textAlign: "right" }),
                isAlignJustify: e.isActive({ textAlign: "justify" }),
                isInTable: e.isActive("table"),
                isSuperscript: e.isActive("superscript"),
                isSubscript: e.isActive("subscript"),
                canUndo: e.can().chain().undo().run(),
                canRedo: e.can().chain().redo().run(),
                charCount: (e.storage.characterCount?.characters?.() as number) ?? 0,
                wordCount: (e.storage.characterCount?.words?.() as number) ?? 0,
                textColor: e.getAttributes("textStyle").color as string | undefined,
            };
        },
    });

    if (!editor || !config) {
        return <div className="p-2 bg-neutral-50 border-b border-neutral-200 h-11 animate-pulse rounded-t" />;
    }

    return (
        <div className="bg-neutral-50 border-b border-neutral-200 rounded-t select-none">
            <div className="p-1.5 flex flex-wrap gap-1 items-center">
                <HistoryButtons
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <SelectBlockType
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <TextOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <ColorOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <AlignOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <ListOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <LinkOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <MediaOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <TableOptions
                    editor={editor}
                    config={config}
                />

                <MenuSeparator />

                <MenuGroup label="Misc">
                    <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={config.isBlockquote} tooltip="Cita"><Icons.Quote /></MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={config.isCodeBlock} tooltip="Bloque de código"><Icons.CodeBlock /></MenuButton>
                    <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} tooltip="Línea horizontal"><Icons.HRule /></MenuButton>
                </MenuGroup>
            </div>

            <div className="px-2 pb-1.5 flex items-center gap-3 text-xs text-inn-700 border-t border-neutral-100">
                <span>{config.charCount.toLocaleString("es-MX")} caracteres</span>
                <span>·</span>
                <span>{config.wordCount.toLocaleString("es-MX")} palabras</span>
            </div>
        </div>
    );
}
