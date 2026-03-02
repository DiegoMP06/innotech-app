import { DropzoneFile } from '@/types';
import { useEffect, useState } from 'react';
import { useDropzone, } from 'react-dropzone';
import DropzonePreviewItem from './DropzonePreviewItem';

type DropzoneInputProps = {
    value: File[],
    multipleFiles?: boolean
    defaultImage?: string | null;
    onChange: (file: File[]) => void
}

export default function DropzoneInput({ value, multipleFiles, onChange, defaultImage }: DropzoneInputProps) {
    const [files, setFiles] = useState<DropzoneFile[]>([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': [
                '.png',
                '.jpg',
                '.jpeg',
                '.webp'
            ]
        },
        multiple: multipleFiles,
        onDrop: acceptedFiles => {
            onChange(acceptedFiles);
        },
    });

    useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    useEffect(() => {
        const newFiles = value.map(file => ({
            ...file,
            preview: URL.createObjectURL(file)
        }));
        setFiles(newFiles);
    }, [value]);

    return (
        <section className="flex flex-col">
            <div {...getRootProps({ className: 'flex flex-col items-center justify-center w-full h-32 border border-accent-foreground border-dashed rounded cursor-pointer' })}>
                <input {...getInputProps()} />
                <p className="text-accent-foreground text-center text-xs font-semibold">
                    Arrastra o haz click para subir una imagen
                </p>
            </div>

            <aside className='flex flex-row items-center justify-center gap-2 flex-wrap mt-4'>
                {(!multipleFiles && defaultImage && files.length === 0) && (
                    <DropzonePreviewItem file={defaultImage} />
                )}

                {files.map((file, i) => (
                    <DropzonePreviewItem key={i} file={file} />
                ))}
            </aside>
        </section>
    );
}
