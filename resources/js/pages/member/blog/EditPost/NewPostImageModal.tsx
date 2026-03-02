import NewImageModal, { ImageFormData } from '@/components/app/forms/NewImageModal';
import posts from '@/routes/posts';
import { router } from '@inertiajs/react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type NewPostImageModalProps = {
    postId: number;
    isModalActive: boolean;
    setIsModalActive: Dispatch<SetStateAction<boolean>>;
};

export default function NewPostImageModal({
    postId,
    isModalActive,
    setIsModalActive,
}: NewPostImageModalProps) {
    const [processing, setProcessing] = useState(false);

    const initialValues: ImageFormData = {
        image: [],
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: initialValues,
    });

    const handleAddImage = (data: ImageFormData) => {
        const formData = {
            image: data.image[0],
        };
        setProcessing(true);
        router.post(posts.medias.store(postId), formData, {
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
            errors
        }} />
    );
}
