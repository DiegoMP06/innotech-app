import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import InputError from '@/components/app/input-error';
import TextLink from '@/components/app/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { RegisterAuthForm } from '@/types';
import { Head, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function Register() {
    const initialValues: RegisterAuthForm = {
        name: '',
        father_last_name: '',
        mother_last_name: '',
        email: '',
        role: 1,
        password: '',
        password_confirmation: '',
    }

    const { handleSubmit, register, formState: { errors }, watch, control } = useForm({
        defaultValues: initialValues
    })

    const [processing, setProcessing] = useState(false)

    const password = watch('password')

    const handleRegister: SubmitHandler<RegisterAuthForm> = (data) => {
        setProcessing(true)
        router.post(RegisteredUserController.store(), data, {
            forceFormData: false,
            preserveScroll: true,
            showProgress: true,
            onFinish() {
                setProcessing(false)
            },
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            }
        })
    }

    return (
        <AuthLayout
            title="Crear Cuenta"
            description="Ingresa tus datos para crear una cuenta y disfrutar de la plataforma."
        >
            <Head title="Crear Cuenta" />

            <div className="flex flex-col gap-10">
                <form
                    onSubmit={handleSubmit(handleRegister)}
                    className="grid gap-6"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nombre: </Label>

                        <Input
                            id="name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            placeholder="Tu Nombre"
                            {...register('name', {
                                required: 'El nombre es requerido',
                            })}
                        />

                        <InputError
                            message={errors.name?.message}
                            className="mt-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="father_last_name">Apellido Paterno: </Label>

                        <Input
                            id="father_last_name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="father_last_name"
                            placeholder="Tu Apellido Paterno"
                            {...register('father_last_name', {
                                required: 'El apellido paterno es requerido',
                            })}
                        />

                        <InputError
                            message={errors.father_last_name?.message}
                            className="mt-2"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="mother_last_name">Apellido Materno: </Label>

                        <Input
                            id="mother_last_name"
                            type="text"
                            autoFocus
                            tabIndex={1}
                            autoComplete="mother_last_name"
                            placeholder="Tu Apellido Materno"
                            {...register('mother_last_name', {
                                required: 'El apellido materno es requerido',
                            })}
                        />

                        <InputError
                            message={errors.mother_last_name?.message}
                            className="mt-2"
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo: </Label>

                        <Input
                            id="email"
                            type="email"
                            tabIndex={2}
                            autoComplete="email"
                            placeholder="Tu Correo"
                            {...register('email', {
                                required: 'El correo es requerido',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'El correo no es valido',
                                }
                            })}
                        />

                        <InputError message={errors.email?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="role">Rol: </Label>

                        <Controller
                            name="role"
                            rules={{ required: 'El rol es requerido' }}
                            control={control}
                            render={({ field: { onChange, value } }) => (
                                <Select value={value?.toString()} onValueChange={onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Rol de Usuario" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Invitado</SelectItem>
                                        <SelectItem value="2">Estudiante</SelectItem>
                                        <SelectItem value="3">Profesor</SelectItem>
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <InputError message={errors.role?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña: </Label>

                        <Input
                            id="password"
                            type="password"
                            tabIndex={3}
                            autoComplete="new-password"
                            placeholder="Tu Contraseña"
                            {...register('password', {
                                minLength: {
                                    value: 8,
                                    message: 'La contraseña debe tener al menos 8 caracteres',
                                },
                                required: 'La contraseña es requerida',
                            })}
                        />

                        <InputError message={errors.password?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">
                            Confirmar Contraseña:
                        </Label>

                        <Input
                            id="password_confirmation"
                            type="password"
                            tabIndex={4}
                            autoComplete="new-password"
                            placeholder="Confirma tu Contraseña"
                            {...register('password_confirmation', {
                                required: 'La confirmación de la contraseña es requerida',
                                validate: (value) => value === password || 'Las contraseñas no coinciden',
                            })}
                        />

                        <InputError
                            message={errors.password_confirmation?.message}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        tabIndex={5}
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="size-6 animate-spin" />
                        )}
                        Crear Cuenta
                    </Button>
                </form>

                <div className="text-center text-muted-foreground">
                    ¿Ya tienes una cuenta?{' '}
                    <TextLink href={login()} tabIndex={6}>
                        Inicia Sesión
                    </TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
