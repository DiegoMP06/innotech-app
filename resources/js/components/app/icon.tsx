import { cn } from '@/lib/utils';

type IconProps = {
    iconName: string;
    className?: string;
}

export const Icon = ({ iconName, className }: IconProps) => {
    return (
        <span
            className={cn('w-6 h-6 ', className)}
            style={{
                backgroundColor: 'currentColor',
                maskImage: `url(/icons/${iconName}.svg)`,
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                maskSize: 'contain',
                WebkitMaskImage: `url(/icons/${iconName}.svg)`,
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                WebkitMaskSize: 'contain',
            }}
        />
    );
};