import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Project } from '@/types/projects';
import { Dispatch, SetStateAction } from 'react';
import UserCollaboratorItem from './UserCollaboratorItem';

type ProjectCollaboratorsModalProps = {
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
    collaborators: Project['collaborators'];
    projectId: Project['id'];
};

export default function ProjectCollaboratorsModal({
    isModalActive,
    setIsModalActive,
    collaborators,
    projectId,
}: ProjectCollaboratorsModalProps) {
    return (
        <Dialog open={isModalActive} onOpenChange={setIsModalActive}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Colaboradores</DialogTitle>
                    <DialogDescription>
                        Aquí puedes gestionar los colaboradores de tu proyecto
                    </DialogDescription>
                </DialogHeader>

                {collaborators.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                        {collaborators.map((collaborator) => (
                            <UserCollaboratorItem
                                key={collaborator.id}
                                user={collaborator}
                                collaborators={collaborators}
                                projectId={projectId}
                                variant="default"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="my-20 text-center text-accent-foreground">
                        No hay colaboradores en este proyecto
                    </p>
                )}

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cerrar</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
