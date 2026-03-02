import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/app/input-error';
import TextLink from '@/components/app/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { register as registerRoute } from '@/routes';
import { request } from '@/routes/password';
import { LoginAuthForm } from '@/types';
import { Head, router } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const [processing, setProcessing] = useState(false)
    const initialValues: LoginAuthForm = {
        email: '',
        password: '',
        remember: false
    }

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: initialValues
    });

    const handleLogin: SubmitHandler<LoginAuthForm> = (data) => {
        setProcessing(true)
        router.post(AuthenticatedSessionController.store(), data, {
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
            title="Iniciar Sesión"
            description="Ingresa tu correo y contraseña para acceder a tu cuenta."
        >
            <Head title="Iniciar Sesión" />
            <div className="flex flex-col gap-10">
                <form
                    className="grid gap-6"
                    onSubmit={handleSubmit(handleLogin)}
                >
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo: </Label>
                        <Input
                            id="email"
                            type="email"
                            autoFocus
                            tabIndex={1}
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
                        <div className="flex items-center">
                            <Label htmlFor="password">Contraseña: </Label>
                            {canResetPassword && (
                                <TextLink
                                    href={request()}
                                    className="ml-auto text-sm"
                                    tabIndex={5}
                                >
                                    ¿Olvidaste tu contraseña?
                                </TextLink>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            tabIndex={2}
                            autoComplete="current-password"
                            placeholder="Password"
                            {...register('password', { required: 'La contraseña es requerida' })}
                        />
                        <InputError message={errors.password?.message} />
                    </div>

                    <div className="flex items-center space-x-3">
                        <Controller
                            name="remember"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <Checkbox
                                    id="remember"
                                    tabIndex={3}
                                    checked={value}
                                    onCheckedChange={onChange}
                                />
                            )}
                        />
                        <Label htmlFor="remember">Recordarme</Label>
                    </div>

                    <Button
                        type="submit"
                        className="mt-4 w-full"
                        tabIndex={4}
                        disabled={processing}
                    >
                        {processing && (
                            <LoaderCircle className="size-6 animate-spin" />
                        )}
                        Iniciar Sesión
                    </Button>
                </form>

                <div className="text-center text-muted-foreground">
                    ¿No tienes una cuenta?{' '}
                    <TextLink href={registerRoute()} tabIndex={5}>
                        Regístrate
                    </TextLink>
                </div>

                {status && (
                    <div className="mb-4 bg-green-200 text-green-700 py-2 pl-8 pr-4 border-l-8 border-green-700 text-sm rounded uppercase font-bold">
                        {status}
                    </div>
                )}
            </div>
        </AuthLayout>
    );
}
