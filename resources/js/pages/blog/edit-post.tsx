import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import posts from "@/routes/posts";
import { BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import EditPostForm from "./EditPost/EditPostForm";
import PostOptions from "./EditPost/PostOptions";
import EditPostGallery from "./EditPost/EditPostGallery";
import { Post, PostCategory, PostType } from "@/types/blog";

const breadcrumbs = (post: Post): BreadcrumbItem[] => ([
    {
        title: 'Blog',
        href: posts.index().url,
    },
    {
        title: post.name,
        href: posts.show(post.id).url,
    },
    {
        title: `Editar`,
        href: posts.edit(post.id).url,
    }
])

type EditPostProps = {
    post: Post;
    types: PostType[];
    categories: PostCategory[];
}

export default function EditPost({ post, types, categories }: EditPostProps) {
    return (
        <AppLayout
            breadcrumbs={breadcrumbs(post)}
        >
            <Head title={`Editar ${post.name}`} />

            <div className="mb-15">
                <Button onClick={() => router.visit(posts.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-10 lg:items-start">
                <EditPostForm
                    post={post}
                    types={types}
                    categories={categories}
                />

                <aside className="w-full flex flex-col gap-6 max-w-2xl mx-auto">
                    <PostOptions
                        isPublished={post.is_published}
                        postId={post.id}
                    />
                </aside>
            </div>
            
            <EditPostGallery
                postId={post.id}
                gallery={post.media}
            />
        </AppLayout >
    )
}

