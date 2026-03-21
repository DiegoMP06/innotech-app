import InputSearch from "@/components/app/input-search";
import Pagination from "@/components/app/pagination";
import { Button } from "@/components/ui/button";
import ProjectItem from "@/components/projects/ProjectItem";
import AppLayout from "@/layouts/app-layout";
import { create, index } from "@/routes/projects"
import { BreadcrumbItem, PaginationType } from "@/types"
import { Head, router } from "@inertiajs/react";
import { Plus } from "lucide-react";
import { Project } from "@/types/projects";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proyectos',
        href: index().url,
    }
]

type ProjectsProps = {
    page: number;
    search: string;
    projects: PaginationType<Project>
}

export default function Projects({ page, search, projects }: ProjectsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Proyectos" />

            <InputSearch
                search={search}
                queryParams={{ page }}
            />

            <div className="mb-15">
                <Button onClick={() => router.visit(create())}>
                    <Plus />
                    Crear Proyecto
                </Button>
            </div>

            {projects.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.data.map((project) =>
                        <ProjectItem key={project.id} project={project} />
                    )}
                </div>
            ) : (
                <p className="text-center my-20 text-accent-foreground">
                    No Hay Proyectos
                </p>
            )}

            <Pagination
                pagination={projects}
                queryParams={{ search }}
            />
        </AppLayout>
    )
}
