import { ROLES } from '@/consts/roles';
import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export type Roles = keyof typeof ROLES
export type RolesValues = typeof ROLES[Roles]

export type Role = {
    id: number;
    name: Roles;
    guard_name: string;
    created_at: string;
    updated_at: string;
};

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    name: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export type PivotType<T = unknown, P = unknown> = T & {
    pivot: { id: number } & P;
};

export type DropzoneFile = File & {
    preview: string;
};

export interface User {
    id: number;
    name: string;
    father_last_name: string;
    mother_last_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    is_active: boolean;
    created_at: string;
    updated_at: string;
    roles: Role[];
    [key: string]: unknown; // This allows for additional properties...
}

export type AuthForm = {
    name: string;
    father_last_name: string;
    mother_last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    remember: boolean;
    role: number;
};

export type RegisterAuthForm = Pick<
    AuthForm,
    | 'name'
    | 'father_last_name'
    | 'mother_last_name'
    | 'email'
    | 'password'
    | 'password_confirmation'
    | 'role'
>;

export type LoginAuthForm = Pick<AuthForm, 'email' | 'password' | 'remember'>;

export type ChangeRoleForm = {
    role: Role['name'];
};

export type UserData = Pick<
    User,
    | 'id'
    | 'name'
    | 'father_last_name'
    | 'mother_last_name'
    | 'email'
    | 'created_at'
    | 'updated_at'
    | 'is_active'
    | 'roles'
>;

type LinkPagination = {
    url: null | string;
    label: string;
    page: null | number;
    active: boolean;
};

export type PaginationType<T = unknown> = {
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: LinkPagination[];
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
    data: T[];
};

export type ResponsiveImages = {
    xl?: string;
    lg?: string;
    base?: string;
    md?: string;
    sm?: string;
    xs?: string;
};

export type ImageDimensions = {
    width: number;
    height: number;
};

export type Media = {
    id: number;
    urls: {
        [key: string]: string;
        original: string;
    };
    dimensions: {
        [key: string]: ImageDimensions;
    };
    responsive: ResponsiveImages;
    is_processed: boolean;
    custom_properties: string[];
};
