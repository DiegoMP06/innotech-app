import InputError from "@/components/app/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PostCategory, PostFormData, PostType } from "@/types/blog";
import { Control, Controller, FieldErrors, UseFormRegister } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

type PostFormProps = {
    types: PostType[];
    categories: PostCategory[];
    register: UseFormRegister<PostFormData>
    control: Control<PostFormData>
    errors: FieldErrors<PostFormData>
}

export default function PostForm({ types, register, control, errors, categories }: PostFormProps) {
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
                        minLength: { value: 50, message: 'El resumen debe tener al menos 50 caracteres' }
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

            <div className="grid gap-2">
                <p
                    className="text-foreground leading-none font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
                >
                    Categorías:
                </p>

                <Controller
                    control={control}
                    name="categories"
                    rules={{
                        validate: (value) => (value!.length > 0) || 'Debe seleccionar al menos una categoría',
                    }}
                    render={({ field: { value, onChange, disabled } }) => (
                        <div className="grid gap-1 grid-cols-1">
                            {categories.map((category) => (
                                <div className="flex gap-2 items-center" key={category.id}>
                                    <Checkbox
                                        onCheckedChange={(checked) =>
                                            checked ?
                                                onChange([...(value || []), category.id]) :
                                                onChange(value?.filter(id => id !== category.id) || [])
                                        }
                                        defaultChecked={value?.some(id => id === category.id)}
                                        id={category.slug}
                                        disabled={disabled}
                                        value={category.id}
                                    />

                                    <Label
                                        className="font-normal text-base"
                                        htmlFor={category.slug}
                                    >
                                        {category.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    )}
                />

                <InputError message={errors.categories?.message} />
            </div>
        </>
    )
}
