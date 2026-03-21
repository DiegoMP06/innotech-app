import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import projectCollaborators from "@/routes/project-collaborators";
import projects from "@/routes/projects";
import { Project } from "@/types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";

type ProjectOptionsProps = {
    isPublished: Project['is_published'],
    projectId: Project['id']
}

export default function ProjectOptions({ isPublished, projectId }: ProjectOptionsProps) {
    const [processing, setProcessing] = useState(false);
    const handleProjectStatus = () => {
        setProcessing(true)
        router.patch(projects.status(projectId), {}, {
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
                        Puedes editar el contenido de tu proyecto. Solo haz click en el botón de editar.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        variant='outline'
                        onClick={() => router.visit(projects.content.edit(projectId, { query: { edit: true } }))}
                        disabled={processing}
                    >
                        Editar
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Gestionar Colaboradores
                    </CardTitle>
                    <CardDescription>
                        Puedes gestionar los colaboradores de tu proyecto. Solo haz click en el botón de gestionar.
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button
                        variant='outline'
                        onClick={() => router.visit(projectCollaborators.index(projectId, { query: { edit: true } }))}
                        disabled={processing}
                    >
                        Gestionar
                    </Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>
                        Estado del proyecto
                    </CardTitle>
                    <CardDescription>
                        Tu proyecto puede estar en dos estados: Oculto y Publicado.
                        Los proyectos ocultos son aquellos que no se muestran en la sección de proyectos.
                        Los proyectos publicados son aquellos que se muestran en la sección de proyectos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Actualmente tu proyecto esta en estado:
                        <strong className={isPublished ? 'text-green-600' : 'text-red-600'}>
                            {isPublished ? ' Publicado' : ' Oculto'}
                        </strong>
                    </p>
                </CardContent>
                <CardFooter>
                    <Button
                        variant={isPublished ? 'destructive' : 'outline'}
                        onClick={handleProjectStatus}
                        disabled={processing}
                    >
                        {isPublished ? 'Ocultar Proyecto' : 'Publicar Proyecto'}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

