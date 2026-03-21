import { ComponentProps } from '@/lib/puck';
import { Content } from '@measured/puck';
import { Media, PivotType, UserData } from '.';

export type PostType = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    icon?: string;
    order: number;
};

export type PostCategory = {
    id: number;
    name: string;
    slug: string;
    description?: string;
    color?: string;
    order: number;
};

export type Post = {
    id: number;
    name: string;
    slug: string;
    summary: string;
    content: Content<ComponentProps>;
    views_count: number;
    reading_time_minutes: number;
    is_featured: boolean;
    is_published: boolean;
    published_at: null | string;
    post_type_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    categories: PivotType<PostCategory>[];
    type: PostType;
    media: Media[];
    author?: UserData;
};

export type PostFormData = Pick<Post, 'name' | 'summary' | 'post_type_id'> & {
    categories: number[];
    images?: File[];
};
