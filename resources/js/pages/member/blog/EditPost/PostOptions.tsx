import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import posts from "@/routes/posts";
import { Post } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

type PostOptionsProps = {
    isPublished: Post['is_published'];
    postId: Post['id'];
}

export default function PostOptions({ isPublished, postId }: PostOptionsProps) {
    const [processing, setProcessing] = useState(false);

    const handlePostStatus = () => {
        setProcessing(true)
        router.patch(posts.status(postId), {}, {
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

    return (
        <div className="grid gap-2">
            <Card>
                <CardHeader>
                    <CardTitle>
                        Editar Contenido
                    </CardTitle>
                    <CardDescription>
                        Puedes editar el contenido de tu post. Solo haz click en el botón de editar.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        variant='outline'
                        onClick={() => router.visit(posts.content.edit(postId, { query: { edit: true } }))}
                        disabled={processing}
                    >
                        Editar
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Estado del post
                    </CardTitle>
                    <CardDescription>
                        Tu post puede estar en dos estados: Oculto y Publicado.
                        Los posts ocultos son aquellos que no se muestran en la sección de blog.
                        Los posts publicados son aquellos que se muestran en la sección de blog.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Actualmente tu post esta en estado:
                        <strong className={isPublished ? 'text-green-600' : 'text-red-600'}>
                            {isPublished ? ' Publicado' : ' Oculto'}
                        </strong>
                    </p>
                </CardContent>
                <CardFooter>
                    <Button
                        variant={isPublished ? 'destructive' : 'outline'}
                        onClick={handlePostStatus}
                        disabled={processing}
                    >
                        {isPublished ? 'Ocultar Post' : 'Publicar Post'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
