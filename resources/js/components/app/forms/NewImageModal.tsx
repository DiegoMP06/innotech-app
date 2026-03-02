import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Dispatch, FormEventHandler, SetStateAction } from 'react';
import InputError from '../input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import DropzoneInput from '@/components/dropzone/DropzoneInput';

export type ImageFormData = {
    image: File[];
};

type NewImageModalProps = {
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>
    processing?: boolean;
    onSubmit: FormEventHandler<HTMLFormElement>;
    control: Control<ImageFormData>
    errors: FieldErrors<ImageFormData>
}

export default function NewImageModal({
    isModalActive,
    setIsModalActive,
    processing,
    onSubmit,
    control,
    errors
}: NewImageModalProps) {
    return (
        <Dialog open={isModalActive} onOpenChange={setIsModalActive}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Nueva imagen</DialogTitle>
                    <DialogDescription>
                        Agrega una nueva imagen a la publicación.
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={onSubmit}
                    className="grid grid-cols-1 gap-6"
                >
                    <div className="grid gap-2">
                        <Label htmlFor="image">Imágenes: </Label>

                        <Controller
                            name="image"
                            control={control}
                            rules={{
                                validate: (value) =>
                                    value.length > 0 ||
                                    'La imagen es requerida.',
                            }}
                            render={({ field: { value, onChange } }) => (
                                <DropzoneInput
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />

                        <InputError message={errors.image?.message} />
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
