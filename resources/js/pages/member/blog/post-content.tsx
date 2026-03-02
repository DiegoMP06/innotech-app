import PostContentForm from "@/components/member/blog/PostContentForm";
import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import posts from "@/routes/posts";
import { BreadcrumbItem, Post } from "@/types";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";

type PostContentProps = {
    post: Post;
    edit: boolean;
}

const breadcrumbs: (post: Post) => BreadcrumbItem[] = (post: Post) => [
    {
        title: 'Blog',
        href: posts.index().url,
    },
    {
        title: post.name,
        href: posts.show(post.id).url,
    },
    {
        title: `Contenido`,
        href: posts.content.edit(post.id).url,
    }
]

export default function PostContent({ post, edit }: PostContentProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs(post)}>
            <Head title={`Contenido del Post ${post.name}`} />

            {edit ? (
                <div className="mb-15">
                    <Button onClick={() => router.visit(posts.edit(post.id))}>
                        <ChevronLeft />
                        Volver
                    </Button>
                </div>
            ) : null}

            <PostContentForm
                post={post}
                edit={edit}
            />
        </AppLayout>
    )
}
