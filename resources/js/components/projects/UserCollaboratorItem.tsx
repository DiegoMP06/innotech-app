import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from '@/components/ui/item'
import projectCollaborators from '@/routes/project-collaborators'
import { Project } from '@/types/projects'
import { router } from '@inertiajs/react'
import { MoreHorizontalIcon, UserMinus2, UserPlus2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import { Badge } from '../ui/badge'
import AddCollaboratorModal from './AddCollaboratorModal'
import { UserData } from '@/types'
import { ROLE_COLLABORATORS } from '@/consts/projects'

type UserCollaboratorItemProps = {
    user: UserData;
    collaborators: Project['collaborators']
    projectId: Project['id']
    variant?: "default" | "outline" | "muted" | null | undefined
}

export default function UserCollaboratorItem({ user, collaborators, projectId, variant = 'outline' }: UserCollaboratorItemProps) {
    const [processing, setProcessing] = useState(false)
    const [isModalActive, setIsModalActive] = useState(false)

    const isCollaborator = useMemo(() => collaborators.some((collaborator) => collaborator.id === user.id), [collaborators, user])
    const collaboratorIndex = useMemo(() => (collaborators.find((collaborator) => collaborator.id === user.id)?.pivot.id || -1), [collaborators, user])
    const userRole = useMemo(() => collaborators.find((collaborator) => collaborator.id === user.id)?.pivot.role, [collaborators, user])

    const handleCollaborator = () => {
        if (isCollaborator) {
            handleDeleteCollaborator();
        } else {
            setIsModalActive(true);
        }
    }

    const handleDeleteCollaborator = () => {
        setProcessing(true);
        router.delete(projectCollaborators.destroy({
            project: projectId,
            project_collaborator: collaboratorIndex
        }), {
            preserveScroll: true,
            forceFormData: false,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
            },
            onFinish() {
                setProcessing(false);
            }
        })
    }

    return (
        <>
            <Item variant={variant}>
                <ItemContent>
                    <ItemTitle className="flex flex-wrap gap-2 items-center">
                        {user.name} {user.father_last_name} {user.mother_last_name}
                        {isCollaborator && (
                            <Badge variant='secondary'>
                                {ROLE_COLLABORATORS[userRole!]}
                            </Badge>
                        )}
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
                                    onSelect={handleCollaborator}
                                    className={isCollaborator ? 'text-red-300 hover:text-red-400' : 'text-green-300 hover:text-green-400'}
                                >
                                    {isCollaborator ? (<>
                                        <UserMinus2 />
                                        Eliminar como Colaborador
                                    </>) : (<>
                                        <UserPlus2 />
                                        Añadir como Colaborador
                                    </>)}
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </ItemActions>
            </Item>

            <AddCollaboratorModal
                isModalActive={isModalActive}
                setIsModalActive={setIsModalActive}
                projectId={projectId}
                userId={user.id}
            />
        </>
    )
}

