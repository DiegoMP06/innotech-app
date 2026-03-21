import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type MenuButtonProps = {
    isActive?: boolean;
    tooltip?: string;
} & ComponentProps<"button">

export default function MenuButton({
    isActive,
    className,
    children,
    tooltip,
    title,
    ...props
}: MenuButtonProps) {
    return (
        <button
            type="button"
            title={tooltip ?? title}
            aria-label={tooltip ?? title}
            aria-pressed={isActive}
            className={cn(
                "inline-flex items-center justify-center min-w-7 h-7 px-1.5 rounded",
                "text-xs font-bold whitespace-nowrap",
                "disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer",
                "transition-colors",
                isActive
                    ? "bg-inn-700 text-white hover:bg-inn-800"
                    : "bg-inn-200 text-inn-700 hover:bg-inn-300",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
