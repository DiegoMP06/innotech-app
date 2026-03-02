import { PropsWithChildren } from "react";

type QuoteProps = {
    author?: string
}

export default function Quote({ children, author }: PropsWithChildren<QuoteProps>) {
    return (
        <blockquote className="border-l-4 mx-4 rounded border-muted-foreground my-6 pl-6 pr-2 py-2 text-muted-foreground text-lg bg-accent">
            <p className="leading-normal text-justify">
                {children}
            </p>
            {author && (
                <cite className="block mt-4 font-bold">
                    — {author}
                </cite>
            )}
        </blockquote>
    )
}
