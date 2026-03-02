import InputError from "@/components/app/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PostFormData, PostType } from "@/types";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";

type PostFormProps = {
    types: PostType[];
    register: UseFormRegister<PostFormData>
    control: Control<PostFormData, unknown, PostFormData>
    errors: FieldErrors<PostFormData>
}

export default function PostForm({ types, register, control, errors }: PostFormProps) {
    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">
                    Título:
                </Label>

                <Input
                    {...register('name', {
                        required: 'El título es requerido',
                        minLength: { value: 3, message: 'El título debe tener al menos 3 caracteres' }
                    })}
                    id="name"
                    type="text"
                    placeholder="Titulo del Post"
                />

                <InputError message={errors.name?.message} />
            </div>


            <div className="grid gap-2">
                <Label htmlFor="summary">
                    Resumen:
                </Label>

                <Textarea
                    {...register('summary', {
                        required: 'El resumen es requerido',
                        minLength: { value: 100, message: 'El resumen debe tener al menos 100 caracteres' }
                    })}
                    id="summary"
                    placeholder="Resumen del Post"
                    className="h-60"
                />

                <InputError message={errors.summary?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="post_type_id">Tipo: </Label>

                <Controller
                    name="post_type_id"
                    control={control}
                    rules={{ required: 'El tipo es requerido' }}
                    render={({ field: { value, onChange } }) => (
                        <Select value={value?.toString()} onValueChange={onChange}>
                            <SelectTrigger>
                                <SelectValue placeholder="Tipo de Post" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((type) =>
                                    <SelectItem
                                        key={type.id}
                                        value={type.id.toString()}
                                    >{type.name}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    )}
                />

                <InputError message={errors.post_type_id?.message} />
            </div>
        </>
    )
}
