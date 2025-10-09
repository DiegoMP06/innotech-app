// Components
import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
import { login } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Recuperar contraseña"
            description="Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña."
        >
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 bg-green-200 text-green-700 py-2 pl-8 pr-4 border-l-8 border-green-700 text-sm rounded uppercase font-bold">
                    {status}
                </div>
            )}

            <div className="space-y-6">
                <Form {...PasswordResetLinkController.store.form()}>
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Correo: </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Tu Correo"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <div className="my-6 flex items-center justify-start">
                                <Button
                                    className="w-full"
                                    disabled={processing}
                                    data-test="email-password-reset-link-button"
                                >
                                    {processing && (
                                        <LoaderCircle className="size-6 animate-spin" />
                                    )}
                                    Enviar
                                </Button>
                            </div>
                        </>
                    )}
                </Form>

                <div className="text-center text-muted-foreground">
                    ¿Deseas regresar? {' '}
                    <TextLink href={login()}>Iniciar Sesión</TextLink>
                </div>
            </div>
        </AuthLayout>
    );
}
