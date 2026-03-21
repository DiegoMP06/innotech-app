import NewImageModal, { ImageFormData } from "@/components/app/forms/NewImageModal";
import projects from "@/routes/projects";
import { router } from "@inertiajs/react";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


type NewProjectImageModalProps = {
    projectId: number;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
}

export default function NewProjectImageModal({ projectId, isModalActive, setIsModalActive }: NewProjectImageModalProps) {
    const [processing, setProcessing] = useState(false);

    const initialValues: ImageFormData = {
        images: [],
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const handleAddImage = (data: ImageFormData) => {
        setProcessing(true);
        router.post(projects.medias.store(projectId), data, {
            forceFormData: true,
            preserveScroll: true,
            showProgress: true,
            onSuccess: (data) => {
                toast.success(data.props.message as string);
                setIsModalActive(false);
            },
            onFinish: () => setProcessing(false),
            onError: (error) => {
                Object.values(error).forEach((value) => toast.error(value));
            },
        });
    };

    return (
        <NewImageModal {...{
            isModalActive,
            setIsModalActive,
            processing,
            onSubmit: handleSubmit(handleAddImage),
            control,
            errors,
            multipleFiles: true,
        }} />
    );
}
