import { type ComponentConfig } from '@measured/puck';

type CalloutBoxProps = {
    type: 'info' | 'warning' | 'danger' | 'success' | 'tip';
    title?: string;
    content: string;
    showIcon: boolean;
};

const STYLES = {
    info: {
        wrapper: 'bg-blue-50 border-blue-400 dark:bg-blue-950/40 dark:border-blue-700',
        title:   'text-blue-800 dark:text-blue-200',
        text:    'text-blue-700 dark:text-blue-300',
        icon:    'ℹ️',
    },
    warning: {
        wrapper: 'bg-amber-50 border-amber-400 dark:bg-amber-950/40 dark:border-amber-700',
        title:   'text-amber-800 dark:text-amber-200',
        text:    'text-amber-700 dark:text-amber-300',
        icon:    '⚠️',
    },
    danger: {
        wrapper: 'bg-red-50 border-red-400 dark:bg-red-950/40 dark:border-red-700',
        title:   'text-red-800 dark:text-red-200',
        text:    'text-red-700 dark:text-red-300',
        icon:    '🚨',
    },
    success: {
        wrapper: 'bg-green-50 border-green-400 dark:bg-green-950/40 dark:border-green-700',
        title:   'text-green-800 dark:text-green-200',
        text:    'text-green-700 dark:text-green-300',
        icon:    '✅',
    },
    tip: {
        wrapper: 'bg-purple-50 border-purple-400 dark:bg-purple-950/40 dark:border-purple-700',
        title:   'text-purple-800 dark:text-purple-200',
        text:    'text-purple-700 dark:text-purple-300',
        icon:    '💡',
    },
};

const LABEL: Record<string, string> = {
    info: 'Información', warning: 'Atención', danger: 'Peligro', success: 'Éxito', tip: 'Consejo',
};

export default function CalloutBox({ type, title, content, showIcon }: CalloutBoxProps) {
    const s = STYLES[type];
    return (
        <div className={`border-l-4 rounded-r-lg px-4 py-3 my-6 mx-4 ${s.wrapper}`}>
            {(title || showIcon) && (
                <div className="flex items-center gap-2 mb-1">
                    {showIcon && <span className="text-base leading-none">{s.icon}</span>}
                    <p className={`text-sm font-bold ${s.title}`}>
                        {title ?? LABEL[type]}
                    </p>
                </div>
            )}
            <p className={`text-sm leading-relaxed whitespace-pre-wrap ${s.text}`}>
                {content}
            </p>
        </div>
    );
}

export const CalloutBoxConfig: ComponentConfig<CalloutBoxProps> = {
    label: 'Callout / Alerta',
    fields: {
        type: {
            type: 'select',
            label: 'Tipo',
            options: [
                { label: 'ℹ️ Información', value: 'info' },
                { label: '⚠️ Atención', value: 'warning' },
                { label: '🚨 Peligro', value: 'danger' },
                { label: '✅ Éxito', value: 'success' },
                { label: '💡 Consejo', value: 'tip' },
            ],
        },
        title: { type: 'text', label: 'Título (vacío = default del tipo)' },
        content: { type: 'textarea', label: 'Contenido' },
        showIcon: {
            type: 'radio',
            label: 'Mostrar ícono',
            options: [
                { label: 'Sí', value: true },
                { label: 'No', value: false },
            ],
        },
    },
    defaultProps: {
        type: 'info',
        title: '',
        content: 'Escribe aquí el contenido del callout.',
        showIcon: true,
    },
    render: CalloutBox,
};
