import "@measured/puck/puck.css";

import { ComponentProps, puckConfig } from '@/lib/puck';
import { Data, Puck } from '@measured/puck';

type PuckInputProps = {
    initialData: Partial<Data | Data<ComponentProps>>;
    onChange: (data: Data<ComponentProps>) => void
    processing: boolean
    handleSaveChangesToServer: () => void
}

export default function PuckInput({ initialData, onChange, processing, handleSaveChangesToServer }: PuckInputProps) {
    return (
        <div>
            <Puck
                config={puckConfig}
                data={initialData}
                onChange={onChange}
                overrides={{
                    headerActions: () => (
                        <div>
                            <button
                                onClick={handleSaveChangesToServer}
                                disabled={processing}
                                type="button"
                                className="bg-inn-900 text-white rounded px-4 py-2 hover:bg-inn-800 text-sm font-bold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Guardar Cambios"
                            >
                                Guardar
                            </button>
                        </div>
                    ),
                }}
            />
        </div>
    )
}

