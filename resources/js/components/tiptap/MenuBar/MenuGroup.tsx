import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type MenuGroupProps = PropsWithChildren<{
    label: string
    className?: string;
}>;

export default function MenuGroup({ label, children, className }: MenuGroupProps) {
    return (
        <div
            role="group"
            aria-label={label}
            className={cn('flex items-center gap-0.5', className)}
        >
            {children}
        </div>
    );
}
