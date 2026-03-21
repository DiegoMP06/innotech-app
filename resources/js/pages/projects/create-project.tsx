import InputError from '@/components/app/input-error';
import DropzoneInput from '@/components/dropzone/DropzoneInput';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import ProjectForm from '@/components/projects/ProjectForm';
import AppLayout from '@/layouts/app-layout';
import projects from '@/routes/projects';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProjectCategory, ProjectFormData, ProjectStatus } from '@/types/projects';

type CreateProjectProps = {
    categories: ProjectCategory[]
    statuses: ProjectStatus[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Proyectos',
        href: projects.index().url,
    },
    {
        title: 'Crear Proyecto',
        href: projects.create().url,
    },
];

export default function CreateProject({ categories, statuses }: CreateProjectProps) {
    const [processing, setProcessing] = useState(false);

    const initialValues: ProjectFormData = {
        name: '',
        summary: '',
        repository_url: '',
        demo_url: '',
        tech_stack: [],
        version: '1.0.0',
        license: 'MIT',
        images: [],
        categories: [],
        project_status_id: 1,
    };

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = useForm({
        defaultValues: initialValues,
    });

    const handleCreateProject: SubmitHandler<ProjectFormData> = (data) => {
        setProcessing(true);
        router.post(projects.store(), data, {
            preserveScroll: true,
            showProgress: true,
            forceFormData: true,
            onSuccess: (data) => {
                toast.success(data.props.message as string);
            },
            onFinish: () => setProcessing(false),
            onError: (error) => {
                Object.values(error).forEach((value) => toast.error(value));
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Proyecto" />

            <div className="mb-15">
                <Button onClick={() => router.visit(projects.index())}>
                    <ChevronLeft />
                    Volver
                </Button>
            </div>

            <form
                className="mx-auto grid w-full max-w-2xl grid-cols-1 gap-6"
                onSubmit={handleSubmit(handleCreateProject)}
            >
                <ProjectForm
                    categories={categories}
                    statuses={statuses}
                    control={control}
                    register={register}
                    errors={errors}
                />

                <div className="grid gap-2">
                    <Label htmlFor="images">Imágenes: </Label>

                    <Controller
                        name="images"
                        control={control}
                        rules={{
                            validate: (value) =>
                                value!.length > 0 ||
                                'Debe seleccionar al menos una imagen',
                        }}
                        render={({ field: { value, onChange } }) => (
                            <DropzoneInput
                                value={value || []}
                                onChange={onChange}
                                multipleFiles
                            />
                        )}
                    />

                    <InputError message={errors.images?.message} />
                </div>

                <Button type="submit" disabled={processing}>
                    Crear Proyecto
                </Button>
            </form>
        </AppLayout>
    );
}
