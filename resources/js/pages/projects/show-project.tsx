import GalleryContent from "@/components/app/gallery-content";
import { Avatar, AvatarFallback, AvatarGroup, AvatarGroupCount } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useInitials } from "@/hooks/use-initials";
import AppLayout from "@/layouts/app-layout";
import { puckConfig } from "@/lib/puck";
import projects from "@/routes/projects";
import { BreadcrumbItem } from "@/types";
import { Project } from "@/types/projects";
import { formatDatetimeToLocale } from "@/utils";
import { Head, router } from "@inertiajs/react";
import { Render } from "@measured/puck";
import { ChevronLeft, GitBranch, Link2 } from "lucide-react";

type ShowProjectProps = {
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
    }
])
export default function ShowProject({ project }: ShowProjectProps) {
    const firstFiveCollaborators = project.collaborators.slice(0, 5);
    const remainingCollaborators = project.collaborators.length - firstFiveCollaborators.length;

    const getInitials = useInitials();

    return (
        <AppLayout breadcrumbs={breadcrumbs(project)}>
            <Head title={project.name} />

            <div className="mb-15">
                <Button onClick={() => router.visit(projects.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2">
                    <main className="mb-10">
                        <h1 className="leading-normal text-foreground mt-6 mb-4 text-pretty font-bold text-center text-3xl">
                            {project.name}
                        </h1>

                        <p className="text-justify text-muted-foreground whitespace-pre-wrap leading-normal my-6 ">
                            {project.summary}
                        </p>
                    </main>

                    <GalleryContent
                        media={project.media}
                        alt={project.name}
                        imageKey="screenshot"
                    />

                    <section className="my-10">
                        <Render
                            config={puckConfig}
                            data={{ content: project.content }}
                        />
                    </section>
                </div>

                <aside className="flex flex-col items-center md:items-stretch justify-start gap-6">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                            <AvatarFallback className="rounded-lg bg-inn-200 text-inn-700 dark:bg-neutral-700 dark:text-white">
                                {getInitials(project.author?.name + ' ' + project.author?.father_last_name + ' ' + project.author?.mother_last_name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">
                                {project.author?.name} {project.author?.father_last_name} {project.author?.mother_last_name}
                            </span>
                            <span className="truncate text-xs text-accent-foreground">
                                {project.author?.email}
                            </span>
                        </div>
                    </div>

                    {project.collaborators.length > 0 && (
                        <div>
                            <h3 className="text-lg font-bold">
                                Colaboradores:
                            </h3>

                            <div className="flex gap-2 flex-wrap mt-2">
                                <AvatarGroup className="grayscale">
                                    {firstFiveCollaborators.map((collaborator) => (
                                        <HoverCard>
                                            <HoverCardTrigger asChild>
                                                <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                                    <AvatarFallback className="rounded-lg bg-inn-200 text-inn-700 dark:bg-neutral-700 dark:text-white">
                                                        {getInitials(collaborator?.name + ' ' + collaborator?.father_last_name + ' ' + collaborator?.mother_last_name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                            </HoverCardTrigger>
                                            <HoverCardContent className="w-64">
                                                <div className="flex gap-2 items-center">
                                                    <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                                                        <AvatarFallback className="rounded-lg bg-inn-200 text-inn-700 dark:bg-neutral-700 dark:text-white">
                                                            {getInitials(collaborator.name + ' ' + collaborator.father_last_name + ' ' + collaborator.mother_last_name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                                        <span className="truncate font-medium">
                                                            {collaborator.name} {collaborator.father_last_name} {collaborator.mother_last_name}
                                                        </span>
                                                        <span className="truncate text-xs text-accent-foreground">
                                                            {collaborator.email}
                                                        </span>
                                                    </div>
                                                </div>
                                            </HoverCardContent>
                                        </HoverCard>
                                    ))}

                                    {remainingCollaborators > 0 && (
                                        <AvatarGroupCount>+{remainingCollaborators}</AvatarGroupCount>
                                    )}
                                </AvatarGroup>
                            </div>
                        </div>
                    )}

                    <div>
                        <h3 className="text-lg font-bold">
                            Estado:
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground flex gap-2 items-center">
                            {project.status.name}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Categorías:
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-2">
                            {project.categories.map((cat) => (
                                <Badge
                                    variant="secondary"
                                    key={cat.id}
                                >
                                    {cat.name}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Version:
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {project.version}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Licencia:
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                            {project.license}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Enlaces:
                        </h3>

                        <div className="mt-2">
                            <a
                                href={project.repository_url}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <GitBranch className="flex-shrink-0" />
                                <span className="block">{project.repository_url}</span>
                            </a>

                            <a
                                href={project.demo_url}
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Link2 className="flex-shrink-0" />
                                <span className="block">{project.demo_url}</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold">
                            Tecnologías:
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-2">
                            {project.tech_stack.map((technology) => (
                                <Badge
                                    variant="secondary"
                                    key={technology}
                                >
                                    {technology}
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {project.published_at && (
                        <p className="text-accent-foreground text-xs">
                            Publicado el {formatDatetimeToLocale(project.published_at)}
                        </p>
                    )}
                </aside>
            </div>

        </AppLayout>
    )
}
