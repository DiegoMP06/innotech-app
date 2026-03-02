
import { cn } from "@/lib/utils"
import { ComponentProps, useEffect, useRef } from "react";

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
    const ref = useRef<HTMLTextAreaElement>(null!);

    useEffect(() => {
        if (ref.current) {
            ref.current.focus();
        }
    }, []);

    return (
        <textarea
            data-slot="textarea"
            className={cn(
                "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive selection:bg-primary flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none",
                className
            )}
            {...props}
        />
    )
}

export { Textarea }
