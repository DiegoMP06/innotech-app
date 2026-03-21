import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemHeader, ItemTitle } from "@/components/ui/item";
import { cn } from "@/lib/utils";
import posts from "@/routes/posts";
import { Post } from "@/types/blog";
import { getIdealResponsiveMediaLink } from "@/utils";
import { Link, router } from "@inertiajs/react";
import { Check, MoreHorizontalIcon, Pencil, Trash, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Icon } from "../app/icon";

type PostItemProps = {
    post: Post;
}

export default function PostItem({ post }: PostItemProps) {
    const [processing, setProcessing] = useState(false);

    const handlePostStatus = () => {
        setProcessing(true)
        router.patch(posts.status(post.id), {}, {
            preserveScroll: true,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onFinish() {
                setProcessing(false)
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
            },
        })
    }

    const deletePost = () => {
        setProcessing(true)
        router.delete(posts.destroy(post.id), {
            preserveScroll: true,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onFinish() {
                setProcessing(false)
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
            },
        })
    }

    const handleDeletePost = () => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este post?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deletePost();
            }
        })
    }

    return (
        <Item variant="outline" className="p-0 gap-0 items-start">
            <ItemHeader>
                <img
                    src={getIdealResponsiveMediaLink(post.media.at(0))}
                    alt={post.name}
                    className="block h-auto w-full rounded-t-md rounded-b-none object-cover"
                    width={post.media.at(0)?.dimensions.main.width}
                    height={post.media.at(0)?.dimensions.main.height}
                />
            </ItemHeader>

            <ItemContent className="p-4">
                <ItemTitle>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Link href={posts.show(post.id)} className='hover:underline text-base'>
                                {post.name}
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="grid gap-3">
                                <h4 className="flex gap-2 items-center flex-wrap text-lg font-semibold">
                                    {post.name}

                                    <Badge className={cn(
                                        post.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    )}>
                                        {post.is_published ? 'Publicado' : 'Oculto'}
                                    </Badge>
                                </h4>

                                <p className="flex gap-2 items-center flex-wrap text-sm font-semibold">
                                    Tipo de Post:
                                    <Badge variant="outline">
                                        <Icon
                                            iconName={post.type.icon || ''}
                                            className="size-4"
                                        />
                                        {post.type.name}
                                    </Badge>
                                </p>

                                <p className="flex gap-2 items-center flex-wrap text-sm font-semibold">
                                    Categorías:
                                    {post.categories.map((category) => (
                                        <Badge variant="secondary" key={category.id}>
                                            {category.name}
                                        </Badge>
                                    ))}
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </ItemTitle>

                <ItemDescription>
                    {post.summary.substring(0, 100)}...
                </ItemDescription>
            </ItemContent>

            <ItemActions className="p-4">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" aria-label="Open menu" size="icon">
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuLabel>Opciones del post</DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <Link
                                href={posts.edit(post.id)}
                                disabled={processing}
                            >
                                <DropdownMenuItem>
                                    <Pencil />
                                    Editar
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                onClick={handlePostStatus}
                                disabled={processing}
                                variant={post.is_published ? 'destructive' : 'default'}
                            >
                                {post.is_published ? (<>
                                    <XIcon />
                                    Ocultar
                                </>) : (<>
                                    <Check />
                                    Publicar
                                </>)}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={handleDeletePost}
                                disabled={processing}
                                variant="destructive"
                            >
                                <Trash />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ItemActions>
        </Item>
    )
}
