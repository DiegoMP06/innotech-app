import InputError from '@/components/app/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProjectFormData } from '@/types';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
} from 'react-hook-form';
import TechStackInput from './TechStackInput';

type ProjectFormProps = {
    register: UseFormRegister<ProjectFormData>;
    errors: FieldErrors<ProjectFormData>;
    control: Control<ProjectFormData, unknown, ProjectFormData>;
};

export default function ProjectForm({
    register,
    errors,
    control,
}: ProjectFormProps) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="title">Nombre:</Label>

                <Input
                    {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 3,
                            message:
                                'El nombre debe tener al menos 3 caracteres',
                        },
                    })}
                    id="title"
                    type="text"
                    placeholder="Nombre del Proyecto"
                />

                <InputError message={errors.name?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="summary">Resumen:</Label>

                <Textarea
                    {...register('summary', {
                        required: 'El resumen es requerido',
                        minLength: {
                            value: 100,
                            message:
                                'El resumen debe tener al menos 100 caracteres',
                        },
                    })}
                    id="summary"
                    placeholder="Resumen del Proyecto"
                />

                <InputError message={errors.summary?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="repository_url">
                    Repositorio (GitHub, GitLab, etc.):
                </Label>

                <Input
                    {...register('repository_url', {
                        required: 'El repositorio es requerido',
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                            message: 'Ingrese una URL válida',
                        },
                    })}
                    id="repository_url"
                    type="url"
                    placeholder="Repositorio del Proyecto (http://...)"
                />

                <InputError message={errors.repository_url?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="demo_url">URL del Proyecto:</Label>

                <Input
                    {...register('demo_url', {
                        required: 'El repositorio es requerido',
                        pattern: {
                            value: /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)$/,
                            message: 'Ingrese una URL válida',
                        },
                    })}
                    id="demo_url"
                    type="url"
                    placeholder="URL del Proyecto (http://...)"
                />

                <InputError message={errors.demo_url?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="license">Licencia:</Label>

                <Input
                    {...register('license', {
                        required: 'La licencia es requerida',
                    })}
                    id="license"
                    type="text"
                    placeholder="Licencia del Proyecto"
                />

                <InputError message={errors.license?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="version">Versión:</Label>

                <Input
                    {...register('version', {
                        required: 'La versión es requerida',
                        pattern: {
                            value: /^v?\d+\.\d+\.\d+(-[\w.]+)?$/,
                            message: 'Ingrese una versión válida',
                        },
                    })}
                    id="version"
                    type="text"
                    placeholder="Versión del Proyecto"
                />

                <InputError message={errors.version?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="tech_stack">TechStack:</Label>

                <Controller
                    control={control}
                    name="tech_stack"
                    rules={{
                        validate: (value) =>
                            value!.length > 0 ||
                            'Debe seleccionar al menos una tecnología',
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TechStackInput onChange={onChange} value={value} />
                    )}
                />

                <InputError message={errors.tech_stack?.message} />
            </div>
        </>
    );
}
