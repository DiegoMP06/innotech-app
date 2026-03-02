import InputSearch from "@/components/app/input-search";
import PostItem from "@/components/member/blog/PostItem";
import Pagination from "@/components/app/pagination";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppLayout from "@/layouts/app-layout";
import { create, index } from "@/routes/posts";
import { BreadcrumbItem, PaginationType, Post, PostCategory, PostType } from "@/types";
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Blog',
        href: index().url,
    }
]

type BlogProps = {
    types: PostType[];
    categories: PostCategory[]
    category: PostCategory['id'];
    type: PostType['id'];
    search: string;
    page: number;
    posts: PaginationType<Post>;
}

export default function Blog({ categories, category, types, type, search, page, posts }: BlogProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} >
            <Head title="Blog" />

            <InputSearch search={search} queryParams={{ page }}>
                <Select defaultValue={category.toString()} name="category">
                    <SelectTrigger >
                        <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Categorías</SelectLabel>
                            <SelectItem value="0">Todos</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat.id} value={cat.id.toString()}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <Select defaultValue={type.toString()} name="type">
                    <SelectTrigger >
                        <SelectValue placeholder="Selecciona un tipo de post" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Tipo de Post</SelectLabel>
                            <SelectItem value="0">Todos</SelectItem>
                            {types.map((type) => (
                                <SelectItem key={type.id} value={type.id.toString()}>
                                    {type.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </InputSearch>

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
                category,
                type,
                search,
            }} />
        </AppLayout>
    )
}
