import { cn } from "@/lib/utils";
import { Editor } from "@tiptap/react";
import { useEffect, useRef, useState } from "react";
import Dialog from "./Dialog";

type LinkDialogProps = {
    editor: Editor;
    isOpen: boolean;
    onClose: () => void;
}

export default function LinkDialog({ editor, isOpen, onClose }: LinkDialogProps) {
    const [url, setUrl] = useState("");
    const [openInNewTab, setOpenInNewTab] = useState(true);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen) {
            const existing = editor.getAttributes("link").href ?? "";
            setUrl(existing);
            setOpenInNewTab(editor.getAttributes("link").target === "_blank");
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen, editor]);

    const apply = () => {
        const trimmed = url.trim();
        if (!trimmed) {
            editor.chain().focus().unsetLink().run();
        } else {
            const href = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
            editor.chain().focus().setLink({
                href,
                target: openInNewTab ? "_blank" : undefined,
                rel: openInNewTab ? "noopener noreferrer" : undefined,
            }).run();
        }
        onClose();
    };

    const remove = () => {
        editor.chain().focus().unsetLink().run();
        onClose();
    };

    return (
        <Dialog label="Insertar enlace" isOpen={isOpen} onClose={remove}>
            <label className="text-xs font-semibold text-muted-foreground">URL del enlace</label>
            <input
                ref={inputRef}
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); apply(); } }}
                placeholder="https://ejemplo.com"
                className={cn(
                    "w-full text-sm px-2.5 py-1.5 rounded border border-border",
                    "bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-inn-500 focus:border-transparent"
                )}
            />
            <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer select-none">
                <input
                    type="checkbox"
                    checked={openInNewTab}
                    onChange={e => setOpenInNewTab(e.target.checked)}
                    className="rounded"
                />
                Abrir en nueva pestaña
            </label>
            <div className="flex gap-2 pt-1">
                <button
                    type="button"
                    onClick={apply}
                    className="flex-1 text-xs px-3 py-1.5 rounded bg-inn-700 text-white hover:bg-inn-800 font-bold transition-colors"
                >
                    {url.trim() ? "Aplicar" : "Quitar enlace"}
                </button>
                {editor.isActive("link") && (
                    <button
                        type="button"
                        onClick={remove}
                        className="text-xs px-3 py-1.5 rounded bg-destructive text-destructive-foreground hover:opacity-90 font-bold transition-colors"
                    >
                        Quitar
                    </button>
                )}
                <button
                    type="button"
                    onClick={onClose}
                    className="text-xs px-3 py-1.5 rounded bg-muted text-muted-foreground hover:bg-muted/80 font-bold transition-colors"
                >
                    Cancelar
                </button>
            </div>
        </Dialog>
    );
}
