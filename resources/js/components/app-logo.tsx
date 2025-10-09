import AppLogoIcon from './app-logo-icon';
import { useSidebar } from './ui/sidebar';

export default function AppLogo() {
    const { isMobile, open } = useSidebar();

    return (
        <>
            {isMobile || open ? (
                <div className="flex w-full items-center justify-center rounded-md h-10">
                    <img className="w-auto h-full block" src="/logo.webp" width={500} height={150} />
                </div>
            ) : (
                <div className="flex aspect-square size-8 items-center justify-center rounded">
                    <AppLogoIcon className="size-8" />
                </div>
            )}
        </>
    );
}
