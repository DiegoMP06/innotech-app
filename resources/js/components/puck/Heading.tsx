import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type HeadingProps = {
    Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

const HEADING_SIZE = {
    h1: 'text-3xl',
    h2: 'text-2xl',
    h3: 'text-xl',
    h4: 'text-lg',
    h5: 'text-base',
    h6: 'text-sm',
}

export default function Heading({ children, Tag }: PropsWithChildren<HeadingProps>) {
    return (
        <Tag className={cn(
            'leading-normal text-foreground mt-6 mb-4 text-pretty font-bold',
            HEADING_SIZE[Tag])
        }>
            {children}
        </Tag>
    )
}

