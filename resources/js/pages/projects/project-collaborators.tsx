import InputSearch from '@/components/app/input-search';
import Pagination from '@/components/app/pagination';
import { Button } from '@/components/ui/button';
import ProjectCollaboratorsModal from '@/components/projects/ProjectCollaboratorsModal';
import UserCollaboratorItem from '@/components/projects/UserCollaboratorItem';
import AppLayout from '@/layouts/app-layout';
import projectCollaborators from '@/routes/project-collaborators';
import projects from '@/routes/projects';
import { BreadcrumbItem, PaginationType, UserData } from '@/types';
import { Head, router } from '@inertiajs/react';
import { Check, ChevronLeft, Eye } from 'lucide-react';
import { useState } from 'react';
import { Project } from '@/types/projects';

type ProjectCollaboratorsProps = {
    users: PaginationType<UserData>;
    project: Project;
    page: number;
    search: string;
    message?: string;
    edit: boolean;
};

const breadcrumbs: (project: Project) => BreadcrumbItem[] = (
    project: Project,
) => [
        {
            title: 'Proyectos',
            href: projects.index().url,
        },
        {
            title: project.name,
            href: projects.show(project.id).url,
        },
        {
            title: `Colaboradores`,
            href: projectCollaborators.index(project.id).url,
        },
    ];

export default function ProjectCollaborators({
    users,
    project,
    edit,
    search,
    page,
}: ProjectCollaboratorsProps) {
    const [isModalActive, setIsModalActive] = useState(false);

    return (
        <AppLayout breadcrumbs={breadcrumbs(project)}>
            <Head title={`Colaboradores de ${project.name}`} />

            <div className="flex h-screen flex-col gap-6 overflow-hidden">
                <div className="flex-1 overflow-y-auto p-4">
                    <InputSearch
                        search={search}
                        queryParams={{ page, edit: Number(edit) }}
                    />

                    <div className="mb-15 flex gap-4">
                        {edit ? (
                            <Button
                                onClick={() =>
                                    router.visit(projects.edit(project))
                                }
                            >
                                <ChevronLeft />
                                Volver
                            </Button>
                        ) : null}
                        <Button
                            onClick={() => setIsModalActive(true)}
                            variant="outline"
                        >
                            <Eye />
                            Ver Colaboradores
                        </Button>
                    </div>

                    {users.data.length > 0 ? (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            {users.data.map((user) => (
                                <UserCollaboratorItem
                                    user={user}
                                    key={user.id}
                                    collaborators={project.collaborators}
                                    projectId={project.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="my-20 text-center text-accent-foreground">
                            No Hay Usuarios
                        </p>
                    )}

                    <Pagination
                        pagination={users}
                        queryParams={{
                            search,
                            edit,
                        }}
                    />
                </div>

                <nav className="flex flex-0 justify-end">
                    <Button
                        variant="secondary"
                        onClick={() =>
                            router.visit(
                                edit
                                    ? projects.edit(project)
                                    : projects.index(),
                            )
                        }
                    >
                        <Check />
                        Aceptar
                    </Button>
                </nav>
            </div>

            <ProjectCollaboratorsModal
                projectId={project.id}
                collaborators={project.collaborators}
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
            />
        </AppLayout>
    );
}
