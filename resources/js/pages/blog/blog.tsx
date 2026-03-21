import Pagination from "@/components/app/pagination";
import PostItem from "@/components/blog/PostItem";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import { create, index } from "@/routes/posts";
import { BreadcrumbItem, PaginationType } from "@/types";
import { Post } from "@/types/blog";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: index().url,
    }
]

type BlogProps = {
    page: number;
    posts: PaginationType<Post>;
    filters: { [key: string]: string; }
}

export default function Blog({ posts, filters }: BlogProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} isSearch>
            <Head title="Blog" />

            <div className="mb-15">
                <Button onClick={() => router.visit(create())}>
                    <Plus />
                    Crear Post
                </Button>
            </div>

            {posts.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {posts.data.map((post) =>
                        <PostItem key={post.id} post={post} />
                    )}
                </div>
            ) : (
                <p className="text-center my-20 text-accent-foreground">
                    No Hay Posts
                </p>
            )}

            <Pagination pagination={posts} queryParams={{
                ...filters,
            }} />
        </AppLayout>
    )
}
