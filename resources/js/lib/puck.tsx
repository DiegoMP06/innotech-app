import BlogImage from '@/components/puck/BlogImage';
import CodeBlock from '@/components/puck/CodeBlock';
import ExternalLink from '@/components/puck/ExternalLink';
import GridContainer from '@/components/puck/GridContainer';
import Heading from '@/components/puck/Heading';
import Paragraph from '@/components/puck/Paragraph';
import Quote from '@/components/puck/Quote';
import TipTapEditor from '@/components/tiptap/TipTapEditor';
import TipTapEditorContainer from '@/components/tiptap/TipTapEditorContainer';
import { Config, Slot } from '@measured/puck';


export type ComponentProps = {
    Heading: { title: string; level: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' };
    Paragraph: { text: string };
    Quote: { text: string; author?: string };
    ExternalLink: { label: string; url: string };
    BlogImage: { url: string; alt?: string };
    CodeBlock: { code: string, lang: string };
    CustomContent: { content: string };
    GridContainer: { direction: 'row' | 'column'; items: { content: Slot }[]; gap: number };
};

export const puckConfig: Config<ComponentProps> = {
    root: {
        fields: {},
        render: ({ children }) => (
            <div className="bg-background w-full h-full">
                <article className="max-w-4xl mx-auto px-4 py-10">
                    {children}
                </article>
            </div>
        ),
    },
    components: {
        Heading: {
            label: 'Encabezado',
            fields: {
                title: {
                    type: "text",
                    label: "Texto del Encabezado",
                    placeholder: "Escribe aquí el texto del encabezado..."
                },
                level: {
                    label: "Nivel",
                    type: "select",
                    options: [
                        { label: "H1", value: "h1" },
                        { label: "H2", value: "h2" },
                        { label: "H3", value: "h3" },
                        { label: "H4", value: "h4" },
                        { label: "H5", value: "h5" },
                        { label: "H6", value: "h6" },
                    ],
                },
            },
            defaultProps: { title: "Encabezado", level: "h2" },
            render: ({ title, level: Tag }) => (
                <Heading Tag={Tag}>
                    {title}
                </Heading>
            ),
        },
        Paragraph: {
            label: 'Párrafo',
            fields: {
                text: {
                    type: "textarea",
                    label: "Contenido",
                    placeholder: 'Escribe aquí el contenido de tu párrafo...'
                },
            },
            defaultProps: { text: "Párrafo" },
            render: ({ text }) => (
                <Paragraph>
                    {text}
                </Paragraph>
            ),
        },
        Quote: {
            label: 'Cita',
            fields: {
                text: { type: "textarea", label: "Cita", placeholder: 'Escribe aquí tu cita...' },
                author: { type: "text", label: "Autor/Fuente (Opcional)", placeholder: 'Escribe aquí el autor/fuente...' },
            },
            defaultProps: { text: "Cita" },
            render: ({ text, author }) => (
                <Quote author={author}>
                    {text}
                </Quote>
            ),
        },
        ExternalLink: {
            label: 'Enlace externo',
            fields: {
                label: { type: "text", label: "Texto del enlace", placeholder: 'Escribe aquí el texto del enlace...' },
                url: { type: "text", label: "URL (https://...)", placeholder: 'Escribe aquí la URL del enlace...' },
            },
            defaultProps: { label: "Enlace externo", url: "https://example.com" },
            render: ({ label, url }) => (
                <ExternalLink
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {label || url}
                </ExternalLink>
            ),
        },
        BlogImage: {
            label: 'Imagen Externa',
            fields: {
                url: { type: "text", label: "URL de la imagen", placeholder: 'Escribe aquí la URL de la imagen...' },
                alt: { type: "text", label: "Texto alternativo", placeholder: 'Escribe aquí el texto alternativo...' },
            },
            defaultProps: { url: "https://example.com/image.jpg", alt: "Imagen de ejemplo" },
            render: ({ url, alt }) => (
                <BlogImage
                    url={url}
                    alt={alt}
                />
            ),
        },
        CodeBlock: {
            label: 'Bloque de Código',
            fields: {
                code: { type: "textarea", label: "Código", placeholder: 'Escribe aquí tu código...' },
                lang: { type: 'text', label: 'Lenguaje de programación', placeholder: 'Escribe aquí el lenguaje de programación...' },
            },
            defaultProps: { code: "console.log('Hello, world!')", lang: 'JS' },
            render: ({ code, lang }) => (
                <CodeBlock lang={lang}>
                    {code}
                </CodeBlock>
            ),
        },
        CustomContent: {
            label: 'Contenido personalizado',
            fields: {
                content: {
                    type: 'custom',
                    render: ({ value, onChange }) => (
                        <TipTapEditor
                            value={value}
                            onChange={onChange}
                        />
                    )
                }
            },
            render: ({ content }) => (
                <TipTapEditorContainer
                    dangerouslySetInnerHTML={{ __html: content }}
                />
            )
        },
        GridContainer: {
            label: 'Contenedor de elementos',
            fields: {
                direction: {
                    type: "select",
                    options: [
                        { label: "Horizontal", value: "row" },
                        { label: "Vertical", value: "column" },
                    ]
                },
                items: {
                    type: "array",
                    max: 20,
                    getItemSummary: (item, i) => `Elemento ${(Number(i)) + 1}`,
                    arrayFields: {
                        content: { type: "slot" },
                    },
                    defaultItemProps: {
                        content: [],
                    },
                },
                gap: {
                    min: 0,
                    type: "number",
                    label: "Espaciado",
                    placeholder: 'Escribe aquí el espaciado...',
                },
            },
            defaultProps: {
                direction: "column",
                gap: 0,
                items: [],
            },
            render: ({ items, gap, direction }) => (
                <GridContainer
                    items={items}
                    gap={gap}
                    direction={direction}
                />
            ),
        },

    },
};
