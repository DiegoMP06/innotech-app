import { cn } from '@/lib/utils';
import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({className, ...props}: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img className={cn('w-full h-auto aspect-square', className)} src="/logo-icon.webp" width={100} height={100} {...props} />
    );
}
