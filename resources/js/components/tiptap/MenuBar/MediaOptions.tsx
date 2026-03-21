import { useState } from "react";
import { Editor } from "@tiptap/react";
import MenuButton from "./MenuButton";
import MenuGroup from "./MenuGroup";
import { EditorConfig } from "../MenuBar";
import { ICONS as Icons } from "@/consts/tiptap";
import Dialog from "./Dialog";

type MediaOptionsProps = {
    editor: Editor,
    config: EditorConfig
}


export default function MediaOptions({ editor }: MediaOptionsProps) {
    const [imageUrl, setImageUrl] = useState("");
    const [showImageInput, setShowImageInput] = useState(false);
    const [videoUrl, setVideoUrl] = useState("");
    const [showVideoInput, setShowVideoInput] = useState(false);

    const insertImage = () => {
        const src = imageUrl.trim();
        if (src) editor.chain().focus().setImage({ src }).run();
        setImageUrl(""); setShowImageInput(false);
    };

    const insertVideo = () => {
        const src = videoUrl.trim();
        if (src) editor.chain().focus().setYoutubeVideo({ src }).run();
        setVideoUrl(""); setShowVideoInput(false);
    };

    return (
        <>
            <MenuGroup label="Imagen" className="relative">
                <MenuButton onClick={() => { setShowImageInput(p => !p); setShowVideoInput(false); }} tooltip="Insertar imagen"><Icons.Image /></MenuButton>
                <Dialog isOpen={showImageInput} onClose={() => setShowImageInput(false)} label="Insertar imagen">
                    <div className="flex gap-1.5 min-w-64">
                        <input
                            autoFocus
                            type="url"
                            value={imageUrl}
                            onChange={e => setImageUrl(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") insertImage();
                                if (e.key === "Escape") setShowImageInput(false);
                            }}
                            placeholder="https://..."
                            className="flex-1 text-xs px-2 py-1 rounded border border-border bg-background focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={insertImage}
                            className="text-xs px-2 py-1 rounded bg-inn-700 text-white font-bold"
                        >↵</button>
                    </div>
                </Dialog>
            </MenuGroup>

            <MenuGroup label="Video" className="relative">
                <MenuButton onClick={() => { setShowVideoInput(p => !p); setShowImageInput(false); }} tooltip="Insertar video YouTube"><Icons.Video /></MenuButton>
                <Dialog isOpen={showVideoInput} onClose={() => setShowVideoInput(false)} label="Insertar video YouTube">
                    <div className="flex gap-1.5 min-w-64">
                        <input
                            autoFocus
                            type="url"
                            value={videoUrl}
                            onChange={e => setVideoUrl(e.target.value)}
                            onKeyDown={e => {
                                if (e.key === "Enter") insertVideo();
                                if (e.key === "Escape") setShowVideoInput(false);
                            }}
                            placeholder="https://youtube.com/watch?v=..."
                            className="flex-1 text-xs px-2 py-1 rounded border border-border bg-background focus:outline-none"
                        />
                        <button
                            type="button"
                            onClick={insertVideo}
                            className="text-xs px-2 py-1 rounded bg-inn-700 text-white font-bold"
                        >↵</button>
                    </div>
                </Dialog>
            </MenuGroup>
        </>
    )
}
