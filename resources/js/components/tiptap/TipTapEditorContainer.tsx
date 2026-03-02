import { cn } from '@/lib/utils'
import { ComponentProps } from 'react'

export default function TipTapEditorContainer({ children, className, ...props }: ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                "p-2 bg-background text-foreground",
                "[&_ul,ol]:px-4 [&_ul,ol]:my-5 [&_ul,ol]:ml-[0.4rem]",
                "[&_ul]:list-disc",
                "[&_ol]:list-decimal",
                "[&_li_p]:my-[0.25em]",
                "[&_h1,h2,h3,h4,h5,h6]:leading-normal [&_h1,h2,h3,h4,h5,h6]:mt-6 [&_h1,h2,h3,h4,h5,h6]:mb-4 [&_h1,h2,h3,h4,h5,h6]:text-pretty [&_h1,h2,h3,h4,h5,h6]:font-bold [&_h1,h2,h3,h4,h5,h6]:text-foreground",
                "[&_h1]:text-3xl",
                "[&_h2]:text-2xl",
                "[&_h3]:text-xl",
                "[&_h4]:text-lg",
                "[&_h5]:text-base",
                "[&_h6]:text-sm",
                "[&_p]:text-base [&_p]:text-accent-foreground [&_p]:text-justify [&_p]:my-6 [&_p]:leading-relaxed",
                "[&_a]:text-base [&_a]:text-sky-400 [&_a]:text-justify [&_a]:leading-relaxed [&_a]:underline [&_a]:hover:text-sky-500 [&_a]:transition-colors [&_a]:cursor-pointer",
                "[&_code]:bg-purple-950 [&_code]:rounded [&_code]:text-cyan-300 [&_code]:text-sm [&_code]:px-[0.3em] [&_code]:py-[0.25em] [&_code]:font-mono [&_code]:border [&_code]:border-purple-500",
                "[&_pre]:bg-purple-950 [&_pre]:mx-4 [&_pre]:rounded [&_pre]:text-cyan-300 [&_pre]:font-mono [&_pre]:my-6 [&_pre]:p-4 [&_pre]:border [&_pre]:border-purple-500",
                "[&_pre_code]:bg-none [&_pre_code]:text-inherit [&_pre_code]:text-sm [&_pre_code]:p-0 [&_pre_code]:bg-transparent [&_pre_code]:border-0 [&_pre_code]:rounded-none",
                "[&_blockquote]:border-l-4 [&_blockquote]:mx-4 [&_blockquote]:rounded [&_blockquote]:border-muted-foreground [&_blockquote]:my-6 [&_blockquote]:pl-6 [&_blockquote]:pr-2 [&_blockquote]:py-2 [&_blockquote]:text-muted-foreground [&_blockquote]:text-lg [&_blockquote]:bg-accent",
                "[&_blockquote_p]:m-0 [&_blockquote_p]:leading-normal",
                "[&_hr]:border-t-2 [&_hr]:border-muted-foreground [&_hr]:my-6 [&_hr]:mx-4",
                "[&>*:first-child]:mt-0",
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
