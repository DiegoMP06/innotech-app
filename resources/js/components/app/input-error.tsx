import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({
    message,
    className = '',
    ...props
}: HTMLAttributes<HTMLParagraphElement> & { message?: string }) {
    return message ? (
        <p
            {...props}
            className={cn('bg-red-200 text-red-700 py-2 pl-8 pr-4 border-l-8 border-red-700 text-sm rounded uppercase font-bold', className)}
        >
            {message}
        </p>
    ) : null;
}
