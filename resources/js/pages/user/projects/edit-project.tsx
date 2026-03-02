import { Button } from "@/components/ui/button";
import AppLayout from "@/layouts/app-layout";
import projects from "@/routes/projects";
import { BreadcrumbItem, Project } from "@/types";
import { Head, router } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import EditProjectForm from "./EditProject/EditProjectForm";
import ProjectOptions from "./EditProject/ProjectOptions";
import EditProjectGallery from "./EditProject/EditProjectGallery";

type EditProjectProps = {
    project: Project;
}

const breadcrumbs = (project: Project): BreadcrumbItem[] => ([
    {
        title: 'Proyectos',
        href: projects.index().url,
    },
    {
        title: project.name,
        href: projects.show(project.id).url,
    },
    {
        title: `Editar`,
        href: projects.edit(project.id).url,
    }
])

export default function EditProject({ project }: EditProjectProps) {

    return (
        <AppLayout
            breadcrumbs={breadcrumbs(project)}
        >
            <Head title={`Editar ${project.name}`} />

            <div className="mb-15">
                <Button onClick={() => router.visit(projects.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10">
                <EditProjectForm
                    project={project}
                />

                <aside className="w-full flex flex-col gap-6 max-w-2xl mx-auto">
                    <ProjectOptions
                        projectId={project.id}
                        isPublished={project.is_published}
                    />
                </aside>
            </div>

            <EditProjectGallery
                projectId={project.id}
                gallery={project.media}
            />
        </AppLayout >
    )
}

