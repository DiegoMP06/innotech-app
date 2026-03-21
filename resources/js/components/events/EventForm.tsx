import "react-datepicker/dist/react-datepicker.css";

import InputError from '@/components/app/input-error';
import DropzoneInput from '@/components/dropzone/DropzoneInput';
import LocationMap from '@/components/leaflet/LocationMap';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { EventActivity, EventFormData } from '@/types/events';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import {
    Control,
    Controller,
    FieldErrors,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from 'react-hook-form';

type EventFormProps = {
    control: Control<EventFormData, unknown, EventFormData>;
    register: UseFormRegister<EventFormData>;
    errors: FieldErrors<EventFormData>;
    watch: UseFormWatch<EventFormData>;
    setValue: UseFormSetValue<EventFormData>;
    edit?: boolean;
    defaultImage?: string | null;
    activities?: EventActivity[];
};

export default function EventForm({
    control,
    register,
    errors,
    defaultImage,
    setValue,
    watch,
    edit,
}: EventFormProps) {
    const [isFree, setIsFree] = useState(false);
    const is_online = watch('is_online');

    useEffect(() => {
        if (isFree) {
            setValue('price', 0);
            setValue('percent_off', 0);
        }
    }, [isFree]);

    return (
        <>
            <div className="grid gap-2">
                <Label htmlFor="name">Nombre:</Label>

                <Input
                    {...register('name', {
                        required: 'El nombre es requerido',
                        minLength: {
                            value: 3,
                            message:
                                'El título debe tener al menos 3 caracteres',
                        },
                    })}
                    id="name"
                    type="text"
                    placeholder="Nombre del Evento"
                />

                <InputError message={errors.name?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="summary">Resumen:</Label>

                <Textarea
                    {...register('summary', {
                        required: 'El resumen es requerido',
                        minLength: {
                            value: 100,
                            message:
                                'El resumen debe tener al menos 100 caracteres',
                        },
                    })}
                    id="summary"
                    placeholder="Resumen del Evento"
                    className="h-60"
                />

                <InputError message={errors.summary?.message} />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="logo">Logotipo: </Label>

                <Controller
                    name="logo"
                    control={control}
                    rules={edit ? {} : { required: 'La imagen es requerida' }}
                    render={({ field: { value, onChange } }) => (
                        <DropzoneInput
                            value={value}
                            onChange={onChange}
                            defaultImage={defaultImage}
                        />
                    )}
                />

                <InputError message={errors.logo?.message} />
            </div>

            <div className="grid flex-1 gap-2">
                <Label htmlFor="registration_started_at">Fecha de inicio del Registro: </Label>

                <Controller
                    name="registration_started_at"
                    control={control}
                    rules={{ required: 'La Fecha es requerida' }}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            selected={value}
                            onChange={onChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    )}
                />

                <InputError message={errors.start_date?.message} />
            </div>

            <div className="grid flex-1 gap-2">
                <Label htmlFor="registration_ended_at">Fecha de fin del Registro: </Label>

                <Controller
                    name="registration_ended_at"
                    control={control}
                    rules={{ required: 'La Fecha es requerida' }}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            selected={value}
                            onChange={onChange}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    )}
                />

                <InputError message={errors.end_date?.message} />
            </div>

            <div className="grid flex-1 gap-2">
                <Label htmlFor="start_date">Fecha de inicio: </Label>

                <Controller
                    name="start_date"
                    control={control}
                    rules={{ required: 'La Fecha es requerida' }}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            selected={value}
                            onChange={onChange}
                        />
                    )}
                />

                <InputError message={errors.start_date?.message} />
            </div>

            <div className="grid flex-1 gap-2">
                <Label htmlFor="end_date">Fecha de fin: </Label>

                <Controller
                    name="end_date"
                    control={control}
                    rules={{ required: 'La Fecha es requerida' }}
                    render={({ field: { value, onChange } }) => (
                        <DatePicker
                            selected={value}
                            onChange={onChange}
                        />
                    )}
                />

                <InputError message={errors.end_date?.message} />
            </div>

            <div className="flex items-center gap-2">
                <Switch
                    id="is_free"
                    checked={isFree}
                    onCheckedChange={setIsFree}
                />

                <Label htmlFor="is_free">Evento Gratis</Label>
            </div>

            {!isFree && (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="price">Precio:</Label>

                        <Input
                            {...register('price', {
                                required: 'El precio es requerido',
                                min: {
                                    value: 1,
                                    message: 'El precio debe ser mayor a 1',
                                },
                            })}
                            id="price"
                            type="number"
                            step={0.01}
                            min={1}
                            placeholder="Precio del Evento"
                        />

                        <InputError message={errors.price?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="percent_off">Descuento (%):</Label>

                        <Input
                            {...register('percent_off', {
                                required: 'El descuento es requerido',
                                min: {
                                    value: 0,
                                    message: 'El descuento debe ser mayor a 0',
                                },
                                max: {
                                    value: 100,
                                    message:
                                        'El descuento debe ser menor a 100',
                                },
                            })}
                            id="percent_off"
                            type="number"
                            step={0.01}
                            min={0}
                            max={100}
                            placeholder="Precio del Evento"
                        />

                        <InputError message={errors.percent_off?.message} />
                    </div>
                </>
            )}

            <div className="flex items-center gap-2">
                <Controller
                    name="is_online"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Switch
                            id="is_online"
                            checked={value}
                            onCheckedChange={onChange}
                        />
                    )}
                />

                <Label htmlFor="is_online">Evento En Linea</Label>
            </div>

            {is_online ? (<></>) : (
                <>
                    <div className="grid gap-2">
                        <Label htmlFor="location">Ubicación:</Label>

                        <Input
                            {...register('location', {
                                required: 'La ubicación es requerida',
                                minLength: {
                                    value: 3,
                                    message:
                                        'La ubicación debe tener al menos 3 caracteres',
                                },
                            })}
                            id="location"
                            type="text"
                            placeholder="Ubicación del Evento"
                        />

                        <InputError message={errors.location?.message} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="latLng">
                            Ubicación en el mapa (Mueve el Pin):{' '}
                        </Label>

                        <Controller
                            name="latLng"
                            control={control}
                            render={({ field: { value, onChange } }) => (
                                <LocationMap value={value} onChange={onChange} />
                            )}
                        />
                    </div>
                </>
            )}

        </>
    );
}
