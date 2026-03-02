import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type MenuButtonProps = {
    isActive?: boolean;
} & ComponentProps<"button">

export default function MenuButton({ isActive, className, children, ...props }: MenuButtonProps) {
    return (
        <button className={cn("flex-1 text-xs px-2 py-1 rounded font-bold disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-colors", isActive ? 'bg-inn-700 text-white hover:bg-inn-800' : "bg-inn-200 text-inn-700 hover:bg-inn-300", className)} {...props}>
            {children}
        </button>
    )
}
