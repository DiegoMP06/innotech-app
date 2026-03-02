import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item';
import { ROLES } from '@/consts/roles';
import users from '@/routes/admin/users';
import { Role, UserData } from '@/types';
import { router } from '@inertiajs/react';
import { MoreHorizontalIcon, User2Icon, UserCheck2Icon, UserX2Icon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import RoleUserModal from './RoleUserModal';

type UserItemProps = {
    user: UserData
    roles: Role[]
}

export default function UserItem({ user, roles }: UserItemProps) {
    const [processing, setProcessing] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    const handleUserStatus = () => {
        setProcessing(true)
        router.patch(users.status(user.id), {}, {
            forceFormData: false,
            preserveScroll: true,
            showProgress: true,
            onFinish() {
                setProcessing(false)
            },
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
                setIsModalActive(false)
            }
        })
    }

    return (
        <>
            <Item variant="outline">
                <ItemContent>
                    <ItemTitle className="flex flex-wrap gap-2 items-center">
                        {user.name} {user.father_last_name} {user.mother_last_name}

                        <span className="text-xs p-1 rounded bg-accent text-accent-foreground">
                            {user.roles.map(role => ROLES[role.name]).join(', ')}
                        </span>
                    </ItemTitle>

                    <ItemDescription>
                        {user.email}
                    </ItemDescription>
                </ItemContent>

                <ItemActions>
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" aria-label="Open menu" size="icon">
                                <MoreHorizontalIcon />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-40" align="end">
                            <DropdownMenuLabel>Opciones del Usuario</DropdownMenuLabel>
                            <DropdownMenuGroup>
                                <DropdownMenuItem
                                    disabled={processing}
                                    onSelect={() => setIsModalActive(!isModalActive)}
                                >
                                    <User2Icon />
                                    Cambiar Rol
                                </DropdownMenuItem>

                                <DropdownMenuItem
                                    disabled={processing}
                                    onSelect={handleUserStatus}
                                    className={user.is_active ? 'text-red-300 hover:text-red-400' : 'text-green-300 hover:text-green-400'}
                                >
                                    {user.is_active ? (<>
                                        <UserX2Icon className='fill-red-300' />
                                        Suspender
                                    </>) : (<>
                                        <UserCheck2Icon className='fill-green-300' />
                                        Activar
                                    </>)}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ItemActions>
            </Item>

            <RoleUserModal
                roles={roles}
                currentRole={user.roles[0].name}
                userId={user.id}
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
            />
        </>
    )
}
