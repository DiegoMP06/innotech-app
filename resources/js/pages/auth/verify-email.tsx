// Components
import EmailVerificationNotificationController from '@/actions/App/Http/Controllers/Auth/EmailVerificationNotificationController';
import { logout } from '@/routes';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <AuthLayout
            title="Verificar Correo Electrónico"
            description="Por favor, verifica tu dirección de correo electrónico haciendo clic en el enlace que te acabamos de enviar. Si no has recibido el correo electrónico, te enviaremos otro con mucho gusto."
        >
            <Head title="Verificar Correo" />

            {status === 'verification-link-sent' && (
                <div className="mb-4 bg-green-200 text-green-700 py-2 pl-8 pr-4 border-l-8 border-green-700 text-sm rounded uppercase font-bold">
                    Se ha enviado un nuevo enlace de verificación a la dirección
                    de correo electrónico que proporcionaste durante el registro.
                </div>
            )}

            <Form
                {...EmailVerificationNotificationController.store.form()}
                className="space-y-6 text-center"
            >
                {({ processing }) => (
                    <>
                        <Button disabled={processing} variant="secondary">
                            {processing && (
                                <LoaderCircle className="size-6 animate-spin" />
                            )}
                            Reenviar correo de verificación
                        </Button>

                        <TextLink
                            href={logout()}
                            className="mx-auto block"
                        >
                            Cerrar Sesión
                        </TextLink>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
