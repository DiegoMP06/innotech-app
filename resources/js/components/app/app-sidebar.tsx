import { NavFooter } from '@/components/app/nav-footer';
import { NavMain } from '@/components/app/nav-main';
import { NavUser } from '@/components/app/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import events from '@/routes/events';
import posts from '@/routes/posts';
import projects from '@/routes/projects';
import users from '@/routes/admin/users';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CalendarDays, FileCode, Folder, LayoutGrid, NotebookPen, Users2 } from 'lucide-react';
import { useMemo } from 'react';
import AppLogo from './app-logo';

const defaultNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
];

const studentNavItems: NavItem[] = [
    {
        title: 'Proyectos',
        href: projects.index(),
        icon: FileCode,
    },
]

const teacherNavItems: NavItem[] = [
    {
        title: 'Blog',
        href: posts.index(),
        icon: NotebookPen,
    },
]

const memberNavItems: NavItem[] = [
    {
        title: 'Eventos',
        href: events.index(),
        icon: CalendarDays,
    },
]

const adminNavItems: NavItem[] = [
    {
        title: 'Usuarios',
        href: users.index(),
        icon: Users2,
    },
]

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/DiegoMP06/innotech-app.git',
        icon: Folder,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;

    const mainNavItems = useMemo(() => {
        if (auth.user.roles.some((role) => role.name === 'admin')) {
            return [...defaultNavItems, ...studentNavItems, ...teacherNavItems, ...memberNavItems, ...adminNavItems]
        }

        if (auth.user.roles.some((role) => role.name === 'member')) {
            return [...defaultNavItems, ...studentNavItems, ...teacherNavItems, ...memberNavItems]
        }

        if (auth.user.roles.some((role) => role.name === 'teacher')) {
            return [...defaultNavItems, ...studentNavItems, ...teacherNavItems]
        }

        if (auth.user.roles.some((role) => role.name === 'student')) {
            return [...defaultNavItems, ...studentNavItems]
        }

        return defaultNavItems
    }, [auth.user])

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="pt-2">
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
