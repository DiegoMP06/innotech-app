import { type ComponentConfig } from '@measured/puck';
import TipTapEditor from '../tiptap/TipTapEditor';
import TipTapEditorContainer from '../tiptap/TipTapEditorContainer';

type RichTextBlockProps = {
    html: string;
};

export default function RichTextBlock({ html }: RichTextBlockProps) {
    return (
        <TipTapEditorContainer
            className="my-4"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}

function RichTextBlockEdit({
    html,
    onChange,
}: RichTextBlockProps & { onChange: (val: string) => void }) {
    return (
        <div className="my-4">
            <TipTapEditor
                value={html}
                onChange={onChange}
            />
        </div>
    );
}

export const RichTextBlockConfig: ComponentConfig<RichTextBlockProps> = {
    label: 'Texto enriquecido:',
    fields: {
        html: {
            type: 'custom',
            render: ({ value, onChange }) => (
                <RichTextBlockEdit html={value} onChange={onChange} />
            ),
        },
    },
    defaultProps: {
        html: '<p>Escribe aquí tu contenido.</p>',
    },
    render: RichTextBlock,
};
