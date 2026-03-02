import { ComponentProps } from '@/lib/puck';
import { InertiaLinkProps } from '@inertiajs/react';
import { Content } from '@measured/puck';
import { LatLng } from 'leaflet';
import { LucideIcon } from 'lucide-react';

export enum RoleEnum {
    Guest = 'guest',
    Student = 'student',
    Teacher = 'teacher',
    Member = 'member',
    Admin = 'admin',
}

export type Role = {
    id: number;
    name: string;
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

export type PivotType<T = unknown> = T & { pivot: { id: number } };

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
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: LinkPagination[];
    next_page_url: null | string;
    path: string;
    per_page: number;
    prev_page_url: null | string;
    to: number;
    total: number;
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
    }
    responsive: ResponsiveImages;
    is_processed: boolean;
    custom_properties: string[];
};

export type PostType = {
    id: number;
    name: string;
    slug: string;
};

export type PostCategory = {
    id: number;
    name: string;
    slug: string;
};

export type Post = {
    id: number;
    name: string;
    slug: string;
    summary: string;
    content: Content<ComponentProps>;
    is_feaured: boolean;
    is_published: boolean;
    published_at: null | string;
    post_type_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    categories: PivotType<PostCategory>[];
    type: PostType;
    author: UserData;
    media: Media[];
};

export type PostFormData = Pick<Post, 'name' | 'summary' | 'post_type_id'> & {
    images?: File[];
    categories?: number[];
};

export type Project = {
    id: number;
    name: string;
    slug: string;
    summary: string;
    content: Content<ComponentProps>;
    repository_url: string;
    demo_url: string;
    tech_stack: string[];
    version: string;
    license: string;
    is_featured: boolean;
    is_published: boolean;
    published_at: string | null;
    user_id: number;
    created_at: string;
    updated_at: string;
    media: Media[];
    collaborators: PivotType<UserData>[];
    author: UserData;
};

export type ProjectFormData = Pick<
    Project,
    | 'name'
    | 'summary'
    | 'repository_url'
    | 'demo_url'
    | 'tech_stack'
    | 'version'
    | 'license'
> & {
    images?: File[];
};

export type EventActivity = {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    summary: string;
    content: Content<ComponentProps>;
    location: string;
    lat: string;
    lng: string;
    is_online: boolean;
    online_link: string | null;
    is_a_team_event: boolean;
    min_team_size: number | null;
    max_team_size: number | null;
    is_a_full_team_event: boolean;
    max_participants: number | null;
    only_students: boolean;
    is_competition: boolean;
    participants_per_round: number | null;
    is_published: boolean;
    published_at: string | null;
    started_at: string;
    ended_at: string;
    event_id: number;
    event_activity_type_id: number;
    created_at: string;
    updated_at: string;
};

export type Event = {
    id: number;
    name: string;
    slug: string;
    summary: string;
    content: Content<ComponentProps>;
    is_free: boolean;
    price: number;
    percent_off: number;
    location: string;
    lat: string;
    lng: string;
    registration_started_at: string;
    registration_ended_at: string;
    start_date: string;
    end_date: string;
    is_published: boolean;
    user_id: number;
    created_at: string;
    updated_at: string;
    activities: EventActivity[];
    author: UserData;
    event_status_id: 1;
    media: Media[];
};

export type EventFormData = Pick<
    Event,
    'name' | 'summary' | 'is_free' | 'location' | 'price' | 'percent_off'
> & {
    logo: File[];
    latLng: LatLng;
    registration_started_at: Date;
    registration_ended_at: Date;
    start_date: Date;
    end_date: Date;
};
