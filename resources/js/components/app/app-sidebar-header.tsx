import { Breadcrumbs } from '@/components/app/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import SpotlightSearch from '../ui/spotlight-search';

export function AppSidebarHeader({
    breadcrumbs = [],
    isSearch,
}: {
    breadcrumbs?: BreadcrumbItemType[];
    isSearch?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex flex-1 items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    <SidebarTrigger className="-ml-1" />
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>

                {isSearch && (
                    <div className="p-2">
                        <Button variant='ghost' onClick={() => setIsOpen(true)}>
                            <Search />
                            Buscar
                        </Button>

                        <SpotlightSearch
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </div>
                )}
            </div>
        </header>
    );
}
