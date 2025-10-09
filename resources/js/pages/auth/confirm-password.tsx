import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/routes/password/confirm';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

export default function ConfirmPassword() {
    return (
        <AuthLayout
            title="Confirmar Contraseña"
            description="Estás a punto de acceder a una zona segura de la aplicación. Por favor, confirma tu contraseña antes de continuar."
        >
            <Head title="Confirmar Contraseña" />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="password">Contraseña: </Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                placeholder="Tu Contraseña"
                                autoComplete="current-password"
                                autoFocus
                            />

                            <InputError message={errors.password} />
                        </div>

                        <div className="flex items-center">
                            <Button
                                className="w-full"
                                disabled={processing}
                                data-test="confirm-password-button"
                            >
                                {processing && (
                                    <LoaderCircle className="size-6 animate-spin" />
                                )}
                                Confirmar
                            </Button>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
