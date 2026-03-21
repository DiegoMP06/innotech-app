import '@measured/puck/puck.css';

import { ComponentProps, puckConfig } from '@/lib/puck';
import { Data, Puck } from '@puckeditor/core';
import { Save } from 'lucide-react';
import { cn } from '@/lib/utils';

type PuckInputProps = {
    initialData: Partial<Data | Data<ComponentProps>>;
    onChange: (data: Data<ComponentProps>) => void;
    processing: boolean;
    handleSaveChangesToServer: () => void;
    handlePublish?: () => void;
    isPublished?: boolean;
};

export default function PuckInput({
    initialData,
    onChange,
    processing,
    handleSaveChangesToServer,
    handlePublish,
    isPublished,
}: PuckInputProps) {
    return (
        <Puck
            config={puckConfig}
            data={initialData}
            onChange={(data) =>
                onChange(data as Data<ComponentProps>)}
            overrides={{
                headerActions: () => (
                    <div className="flex items-center gap-2">
                        {processing && (
                            <span className="text-xs text-muted-foreground animate-pulse">
                                Guardando…
                            </span>
                        )}

                        <button
                            onClick={handleSaveChangesToServer}
                            disabled={processing}
                            type="button"
                            className="bg-inn-200 text-inn-800 rounded px-3 py-1.5 hover:bg-inn-300 text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                        >
                            <Save className="size-6" />
                            Guardar borrador
                        </button>

                        {handlePublish && (
                            <button
                                onClick={handlePublish}
                                disabled={processing}
                                type="button"
                                className={cn(
                                    'rounded px-3 py-1.5 text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors',
                                    isPublished
                                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                                        : 'bg-inn-700 text-white hover:bg-inn-800',
                                )}
                            >
                                {isPublished ? 'Ocultar' : 'Publicar'}
                            </button>
                        )}
                    </div>
                ),
            }}
        />
    );
}
