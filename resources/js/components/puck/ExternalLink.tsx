import { cn } from "@/lib/utils";
import { ComponentProps } from "react";


export default function ExternalLink({ children, className, ...props }: ComponentProps<'a'>) {
    return (
        <a className={cn('text-base text-sky-400 text-justify leading-relaxed underline hover:text-sky-500 transition-colors cursor-pointer', className)} {...props}>
            {children}
        </a>
    )
}
