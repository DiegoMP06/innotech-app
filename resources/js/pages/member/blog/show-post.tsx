import GalleryContent from '@/components/app/gallery-content';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useInitials } from '@/hooks/use-initials';
import AppLayout from '@/layouts/app-layout';
import { puckConfig } from '@/lib/puck';
import posts from '@/routes/posts';
import { BreadcrumbItem, Post } from '@/types';
import { formatDatetimeToLocale } from '@/utils';
import { Head, router } from '@inertiajs/react';
import { Render } from '@measured/puck';
import { ChevronLeft } from 'lucide-react';

type ShowPostProps = {
    post: Post;
};

const breadcrumbs = (post: Post): BreadcrumbItem[] => [
    {
        title: 'Blog',
        href: posts.index().url,
    },
    {
        title: post.name,
        href: posts.show(post.id).url,
    },
];

export default function ShowPost({ post }: ShowPostProps) {
    const getInitials = useInitials();

    return (
        <AppLayout breadcrumbs={breadcrumbs(post)}>
            <Head title={post.name} />

            <div className="mb-15">
                <Button onClick={() => router.visit(posts.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                    <main className="mb-10">
                        <h1 className="mt-6 mb-4 text-center text-3xl leading-normal font-bold text-pretty text-foreground">
                            {post.name}
                        </h1>

                        <p className="my-6 text-justify leading-normal whitespace-pre-wrap text-muted-foreground">
                            {post.summary}
                        </p>
                    </main>

                    <GalleryContent
                        media={post.media}
                        alt={post.name}
                        imageKey="main"
                    />

                    <section className="my-10">
                        <Render
                            config={puckConfig}
                            data={{ content: post.content }}
                        />
                    </section>
                </div>


                <aside className="flex flex-col items-center md:items-stretch justify-start gap-6">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                            <AvatarFallback className="rounded-lg bg-inn-200 text-inn-700 dark:bg-neutral-700 dark:text-white">
                                {getInitials(
                                    post.author?.name +
                                    ' ' +
                                    post.author?.father_last_name +
                                    ' ' +
                                    post.author?.mother_last_name,
                                )}
                            </AvatarFallback>
                        </Avatar>

                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {post.author?.name}{' '}
                                {post.author?.father_last_name}{' '}
                                {post.author?.mother_last_name}
                            </span>
                            <span className="truncate text-xs text-accent-foreground">
                                {post.author?.email}
                            </span>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Tipo de Publicación:
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            {post.type.name}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Categorías:
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {post.categories.map((cat) => (
                                <Badge
                                    variant="secondary"
                                    key={cat.id}
                                >
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {post.published_at && (
                        <p className="text-accent-foreground text-xs">
                            Publicado el {formatDatetimeToLocale(post.published_at)}
                        </p>
                    )}
                </aside>
            </div>

        </AppLayout>
    );
}
