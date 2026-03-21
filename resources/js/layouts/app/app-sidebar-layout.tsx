import { AppContent } from '@/components/app/app-content';
import { AppShell } from '@/components/app/app-shell';
import { AppSidebar } from '@/components/app/app-sidebar';
import { AppSidebarHeader } from '@/components/app/app-sidebar-header';
import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';

export default function AppSidebarLayout({
    children,
    breadcrumbs = [],
    isSearch,
}: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[], isSearch?: boolean }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar" className="overflow-x-hidden">
                <AppSidebarHeader breadcrumbs={breadcrumbs} isSearch={isSearch} />
                <div className="px-4 mx-auto max-w-7xl w-full py-6">
                    {children}
                </div>
            </AppContent>
        </AppShell>
    );
}
