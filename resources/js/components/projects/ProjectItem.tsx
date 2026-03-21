import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemHeader,
    ItemTitle,
} from '@/components/ui/item';
import { cn } from '@/lib/utils';
import projects from '@/routes/projects';
import { Project } from '@/types/projects';
import { getIdealResponsiveMediaLink } from '@/utils';
import { Link, router } from '@inertiajs/react';
import {
    Check,
    GitBranch,
    Link2,
    MoreHorizontalIcon,
    Pencil,
    Trash,
    XIcon,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

type ProjectItemProps = {
    project: Project;
};

export default function ProjectItem({ project }: ProjectItemProps) {
    const [processing, setProcessing] = useState(false);

    const handleProjectStatus = () => {
        setProcessing(true);
        router.patch(
            projects.status(project.id),
            {},
            {
                preserveScroll: true,
                showProgress: true,
                onError(error) {
                    Object.values(error).forEach((value) => toast.error(value));
                },
                onFinish() {
                    setProcessing(false);
                },
                onSuccess(data) {
                    toast.success(data.props.message as string);
                },
            },
        );
    };

    const deleteProject = () => {
        router.delete(projects.destroy(project.id), {
            preserveScroll: true,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach((value) => toast.error(value));
            },
            onFinish() {
                setProcessing(false);
            },
            onSuccess(data) {
                toast.success(data.props.message as string);
            },
        });
    };

    const handleDeleteProject = () => {
        Swal.fire({
            title: '¿Estás seguro de eliminar este proyecto?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar',
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProject();
            }
        });
    };

    return (
        <Item variant="outline" className="p-0 gap-0 items-start">
            <ItemHeader>
                <img
                    src={getIdealResponsiveMediaLink(project.media.at(0)!)}
                    alt={project.name}
                    className="block h-auto w-full rounded-t-md rounded-b-none object-cover"
                    width={project.media.at(0)!.dimensions.screenshot.width}
                    height={project.media.at(0)!.dimensions.screenshot.height}
                />
            </ItemHeader>

            <ItemContent className="p-4">
                <ItemTitle>
                    <HoverCard>
                        <HoverCardTrigger asChild>
                            <Link
                                href={projects.show(project.id)}
                                className="hover:underline text-base"
                            >
                                {project.name}
                            </Link>
                        </HoverCardTrigger>
                        <HoverCardContent className="w-80">
                            <div className="grid gap-3">
                                <h4 className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                                    {project.name}

                                    <Badge className={cn(
                                        project.is_published ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                    )}>
                                        {project.is_published ? 'Publicado' : 'Oculto'}
                                    </Badge>
                                </h4>

                                <div className="grid gap-1">
                                    <a
                                        href={project.repository_url}
                                        className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`Ir al repositorio de ${project.name}`}
                                    >
                                        <GitBranch />
                                        {project.repository_url}
                                    </a>

                                    <a
                                        href={project.demo_url}
                                        className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={`Ir a ${project.name}`}
                                    >
                                        <Link2 />
                                        {project.demo_url}
                                    </a>
                                </div>

                                <p className="flex gap-2 items-center flex-wrap text-sm font-semibold">
                                    Licencia:
                                    <Badge variant="outline">
                                        {project.license}
                                    </Badge>
                                </p>
                                <p className="flex gap-2 items-center flex-wrap text-sm font-semibold">
                                    Versión:
                                    <Badge variant="outline">
                                        {project.version}
                                    </Badge>
                                </p>
                                <p className="flex gap-2 items-center flex-wrap text-sm font-semibold">
                                    Stack:
                                    {project.tech_stack.map((item, index) => (
                                        <Badge key={index} variant="default">
                                            {item}
                                        </Badge>
                                    ))}
                                </p>
                            </div>
                        </HoverCardContent>
                    </HoverCard>
                </ItemTitle>

                <ItemDescription>
                    {project.summary.substring(0, 100)}...
                </ItemDescription>
            </ItemContent>

            <ItemActions className="p-4">
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            aria-label="Open menu"
                            size="icon"
                        >
                            <MoreHorizontalIcon />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="end">
                        <DropdownMenuLabel>
                            Opciones del project
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <Link href={projects.edit(project.id)}>
                                <DropdownMenuItem>
                                    <Pencil />
                                    Editar
                                </DropdownMenuItem>
                            </Link>

                            <DropdownMenuItem
                                onClick={handleProjectStatus}
                                disabled={processing}
                                variant={project.is_published ? 'destructive' : 'default'}
                            >
                                {project.is_published ? (
                                    <>
                                        <XIcon />
                                        Ocultar
                                    </>
                                ) : (
                                    <>
                                        <Check />
                                        Publicar
                                    </>
                                )}
                            </DropdownMenuItem>

                            <DropdownMenuItem
                                onClick={handleDeleteProject}
                                disabled={processing}
                                className="text-red-300 hover:text-red-400"
                            >
                                <Trash />
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </ItemActions>
        </Item>
    );
}
