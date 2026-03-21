import { ROLE_COLLABORATORS } from "@/consts/projects";
import projectCollaborators from "@/routes/project-collaborators";
import { UserData } from "@/types";
import { Project, RoleCollaborators } from "@/types/projects";
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputError from "../app/input-error";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

type AddCollaboratorModalProps = {
    userId: UserData['id'];
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>
    projectId: Project['id'];
};

type AddCollaboratorFormData = {
    role: RoleCollaborators;
}

export default function AddCollaboratorModal({ isModalActive, projectId, userId, setIsModalActive }: AddCollaboratorModalProps) {
    const [processing, setProcessing] = useState(false);
    const initialValues: AddCollaboratorFormData = {
        role: "collaborator"
    }

    const { control, formState: { errors }, handleSubmit } = useForm({
        defaultValues: initialValues
    })

    const onSubmit = (data: AddCollaboratorFormData) => {
        const formData = {
            user_id: userId,
            ...data
        }

        router.post(projectCollaborators.store(projectId), formData, {
            preserveScroll: true,
            forceFormData: false,
            showProgress: true,
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            },
            onSuccess(data) {
                toast.success(data.props.message as string)
                setIsModalActive(false);
            },
            onFinish() {
                setProcessing(false);
            }
        })
    }


    return (
        <Dialog open={isModalActive} onOpenChange={setIsModalActive}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Agregar Colaborador</DialogTitle>
                    <DialogDescription>
                        Aquí puedes agregar un nuevo colaborador a tu proyecto
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="grid grid-cols-1 gap-6"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="role">Rol: </Label>

                        <Controller
                            name="role"
                            control={control}
                            rules={{ required: 'El rol es requerido' }}
                            render={({ field: { value, onChange } }) => (
                                <Select value={value?.toString()} onValueChange={onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona un rol" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.entries(ROLE_COLLABORATORS).map(([key, role]) =>
                                            <SelectItem
                                                key={key}
                                                value={key.toString()}
                                            >{role}</SelectItem>
                                        )}
                                    </SelectContent>
                                </Select>
                            )}
                        />

                        <InputError message={errors.role?.message} />
                    </div>

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button disabled={processing} variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={processing}>
                            Confirmar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
