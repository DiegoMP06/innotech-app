import { Editor } from "@tiptap/react";
import { EditorConfig } from "../MenuBar";
import MenuButton from "./MenuButton";
import MenuGroup from "./MenuGroup";
import { ICONS as Icons } from '@/consts/tiptap';
import { useState } from "react";
import Dialog from "./Dialog";
import { Grid, Pencil, Plus, Rows2, Trash, XIcon } from "lucide-react";

type TableOptionsProps = {
    editor: Editor,
    config: EditorConfig,
}

export default function TableOptions({ config, editor }: TableOptionsProps) {
    const [showTableMenu, setShowTableMenu] = useState(false);

    return (
        <MenuGroup label="Tablas" className="relative">
            <MenuButton onClick={() => setShowTableMenu(p => !p)} isActive={config?.isInTable} tooltip="Tabla">
                <Icons.Table />
            </MenuButton>

            <Dialog label="Insertar tabla" isOpen={showTableMenu} onClose={() => setShowTableMenu(false)}>
                <div className="flex flex-col gap-0.5 min-w-44 text-xs">
                    {!config?.isInTable ? (
                        <>
                            <p className="font-semibold text-muted-foreground px-1 pb-1 mb-1 border-b">Insertar tabla</p>
                            {[[2, 2], [3, 3], [4, 4], [3, 2], [4, 3], [5, 4]].map(([c, r]) => (
                                <button key={`${c}x${r}`} type="button"
                                    onClick={() => {
                                        editor.chain().focus().insertTable({ rows: r, cols: c, withHeaderRow: true }).run();
                                        setShowTableMenu(false);
                                    }}
                                    className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                                >{c} columnas × {r} filas</button>
                            ))}
                        </>
                    ) : (
                        <>
                            <p className="font-semibold text-muted-foreground px-1 pb-1 mb-1 border-b flex gap-2 items-center">
                                <Pencil className="size-4" />
                                Editar tabla
                            </p>

                            <button
                                type="button"
                                onClick={() => editor.chain().focus().addColumnBefore().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                            >
                                <Plus className="size-4" />
                                Columna antes
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().addColumnAfter().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                            >
                                <Plus className="size-4" />
                                Columna después
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().deleteColumn().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-red-500"
                            >
                                <XIcon className="size-4" />
                                Eliminar columna
                            </button>
                            <hr className="my-1" />
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().addRowBefore().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                            >
                                <Plus className="size-4" />
                                Fila antes</button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().addRowAfter().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                            >
                                <Plus className="size-4" />
                                Fila después</button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().deleteRow().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-red-500"
                            >
                                <XIcon className="size-4" />
                                Eliminar fila
                            </button>
                            <hr className="my-1" />
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().mergeCells().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                            >
                                <Grid className="size-4" />
                                Combinar celdas
                            </button>
                            <button
                                type="button"
                                onClick={() => editor.chain().focus().splitCell().run()}
                                className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-muted-foreground"
                            >
                                <Rows2 className="size-4" />
                                Separar celda
                            </button>
                            <hr className="my-1" />
                            <button
                                type="button"
                                onClick={() => {
                                    editor.chain().focus().deleteTable().run(); 
                                    setShowTableMenu(false);
                                }} className="text-left px-2 py-1 flex gap-2 items-center rounded hover:bg-muted text-red-500 font-bold"
                            >
                                <Trash className="size-4" />
                                Eliminar tabla
                            </button>
                        </>
                    )}
                </div>
            </Dialog>
        </MenuGroup>
    )
}
