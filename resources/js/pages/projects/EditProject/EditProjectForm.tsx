import { Button } from "@/components/ui/button";
import ProjectForm from "@/components/projects/ProjectForm";
import projects from "@/routes/projects";
import { Project, ProjectCategory, ProjectFormData, ProjectStatus } from "@/types/projects";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

type EditProjectFormProps = {
    project: Project;
    statuses: ProjectStatus[]
    categories: ProjectCategory[]
}

export default function EditProjectForm({ project, statuses, categories }: EditProjectFormProps) {
    console.log(project)

    const [processing, setProcessing] = useState(false)
    const initialValues: ProjectFormData = {
        name: project.name,
        summary: project.summary,
        repository_url: project.repository_url,
        demo_url: project.demo_url,
        tech_stack: project.tech_stack,
        version: project.version,
        license: project.license,
        project_status_id: project.project_status_id,
        categories: project.categories.map(category => category.id),
    }

    const { handleSubmit, control, register, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    const handleEditProject: SubmitHandler<ProjectFormData> = (data) => {
        router.post(projects.update(project.id, {
            query: {
                _method: 'PUT',
            }
        }), data, {
            forceFormData: true,
            preserveScroll: true,
            showProgress: true,
            onSuccess: (data) => {
                toast.success(data.props.message as string)
            },
            onFinish: () => setProcessing(false),
            onError: (error) => {
                Object.values(error).forEach(value =>
                    toast.error(value))
            }
        })
    }

    return (
        <form
            onSubmit={handleSubmit(handleEditProject)}
            className="grid grid-cols-1 gap-6 max-w-2xl mx-auto w-full"
        >
            <ProjectForm
                categories={categories}
                statuses={statuses}
                control={control}
                errors={errors}
                register={register}
            />

            <Button type="submit" disabled={processing}>
                Guardar Cambios
            </Button>
        </form>
    )
}
