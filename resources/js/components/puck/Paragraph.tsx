import { PropsWithChildren } from "react";

export default function Paragraph({ children }: PropsWithChildren) {
    return (
        <p className="text-base text-accent-foreground leading-relaxed my-6 text-justify whitespace-pre-wrap">
            {children}
        </p>
    )
}
