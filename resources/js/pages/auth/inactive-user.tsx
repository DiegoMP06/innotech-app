import TextLink from "@/components/app/text-link";
import AuthLayout from "@/layouts/auth-layout";
import { logout } from "@/routes";
import { Head } from "@inertiajs/react";

export default function InactiveUser() {
    return (
        <AuthLayout
            title="Cuenta Suspendida"
            description="Tu cuenta ha sido suspendida. Por favor, contacta con el administrador de la plataforma para resolver el problema. Gracias."
        >
            <Head title="Cuenta Suspendida" />

            <div className="space-y-6 text-center">
                <TextLink
                    href={logout()}
                    className="mx-auto block"
                >
                    Cerrar Sesión
                </TextLink>
            </div>
        </AuthLayout>
    )
}
