import { PropsWithChildren } from "react";

type CodeBlockProps = {
    lang: string;
}

export default function CodeBlock({ lang, children }: PropsWithChildren<CodeBlockProps>) {
    return (
        <div className="bg-purple-950 mx-4 rounded my-6 border border-purple-500 overflow-x-hidden w-full">
            <span className="bg-purple-800 rounded-t px-2 py-1 text-xs text-purple-950 font-bold block">
                {lang}
            </span>
            <div className="overflow-x-auto p-4">
                <pre>
                    <code className="text-cyan-300 font-mono">
                        {children}
                    </code>
                </pre>
            </div>
        </div>
    )
}
