"use client";
import { ComponentConfig } from "@measured/puck";
import { Check, Copy } from "lucide-react";
import { PropsWithChildren, useState } from "react";

type CodeBlockProps = {
    lang: string;
    showCopyButton: boolean
    children: string;
}

export default function CodeBlock({ lang = "code", children, showCopyButton = true }: PropsWithChildren<CodeBlockProps>) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        const text = typeof children === "string" ? children : "";
        if (!text) return;
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <div className="bg-purple-950 mx-4 rounded my-6 border border-purple-500 overflow-hidden w-full">
            <div className="flex items-center justify-between bg-purple-800 px-3 py-1.5">
                <span className="text-xs text-purple-200 font-mono font-semibold">{lang}</span>
                {showCopyButton && (
                    <button type="button" onClick={handleCopy}
                        className="flex items-center gap-1 rounded px-2 py-0.5 text-xs text-purple-200 hover:bg-purple-700 transition-colors">
                        {copied ? <><Check size={11} /><span>Copiado</span></> : <><Copy size={11} /><span>Copiar</span></>}
                    </button>
                )}
            </div>
            <div className="overflow-x-auto p-4">
                <pre><code className="text-cyan-300 font-mono text-sm">{children}</code></pre>
            </div>
        </div>
    );
}

export const CodeBlockConfig: ComponentConfig<CodeBlockProps> = {
    label: 'Bloque de Código',
    fields: {
        children: {
            type: "textarea",
            label: "Código",
            placeholder: 'Escribe aquí tu código...'
        },
        lang: {
            type: 'text',
            label: 'Lenguaje de programación',
            placeholder: 'Escribe aquí el lenguaje de programación...'
        },
        showCopyButton: {
            type: 'radio',
            label: 'Mostrar botón de copiar',
            options: [
                { label: 'Sí', value: true },
                { label: 'No', value: false }
            ]
        },
    },
    defaultProps: { children: "console.log('Hello, world!')", lang: 'JS', showCopyButton: false },
    render: CodeBlock,
}
