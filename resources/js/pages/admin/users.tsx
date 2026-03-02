import UserItem from "@/components/admin/users/UserItem";
import InputSearch from "@/components/app/input-search";
import Pagination from "@/components/app/pagination";
import AppLayout from "@/layouts/app-layout";
import users from "@/routes/admin/users";
import { BreadcrumbItem, PaginationType, Role, UserData } from "@/types";
import { Head } from "@inertiajs/react";

type UsersProps = {
    users: PaginationType<UserData>
    roles: Role[]
    message: string;
    page: number;
    search: string
};

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Usuarios',
        href: users.index().url,
    }
]

export default function Users({ users, search, roles, page }: UsersProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />

            <InputSearch search={search} queryParams={{ page }} />

            {users.data.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {users.data.map((user) =>
                        <UserItem key={user.id} user={user} roles={roles} />
                    )}
                </div>
            ) : (
                <p className="text-center my-20 text-accent-foreground">
                    No Hay Usuarios
                </p>
            )}

            <Pagination pagination={users} queryParams={{ search }} />
        </AppLayout>
    )
}
