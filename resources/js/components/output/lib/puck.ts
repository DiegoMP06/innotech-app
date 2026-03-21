/**
 * lib/puck.ts  (o resources/js/lib/puck.ts en Laravel)
 *
 * Configuración central de Puck.
 * Importa todos los componentes y sus configs para registrarlos.
 *
 * USO:
 *   import { puckConfig } from '@/lib/puck';
 *   <Puck config={puckConfig} ... />
 *
 * VARIANTES POR MÓDULO:
 *   Exporta configs específicas para cada módulo del admin.
 *   Así, el editor de un Event no muestra bloques irrelevantes (ej: Gallery de código).
 */

import type { Config } from '@measured/puck';

// ── Componentes ────────────────────────────────────────────────────────────
import Heading,      { HeadingConfig }      from '@/components/puck/Heading';
import Paragraph,    { ParagraphConfig }    from '@/components/puck/Paragraph';
import Quote,        { QuoteConfig }        from '@/components/puck/Quote';
import BlogImage,    { BlogImageConfig }    from '@/components/puck/BlogImage';
import CodeBlock,    { CodeBlockConfig }    from '@/components/puck/CodeBlock';
import VideoEmbed,   { VideoEmbedConfig }   from '@/components/puck/VideoEmbed';
import GridContainer,{ GridContainerConfig } from '@/components/puck/GridContainer';
import Divider,      { DividerConfig }      from '@/components/puck/Divider';
import CalloutBox,   { CalloutBoxConfig }   from '@/components/puck/CalloutBox';
import ButtonLink,   { ButtonLinkConfig }   from '@/components/puck/ButtonLink';
import RichTextBlock,{ RichTextBlockConfig }from '@/components/puck/RichTextBlock';
import Gallery,      { GalleryConfig }      from '@/components/puck/Gallery';
import Accordion,    { AccordionConfig }    from '@/components/puck/Accordion';
import StatsGrid,    { StatsGridConfig }    from '@/components/puck/StatsGrid';
import Timeline,     { TimelineConfig }     from '@/components/puck/Timeline';

// ── Tipo de props (exportado para PuckInput) ───────────────────────────────
export type ComponentProps =
    | React.ComponentProps<typeof Heading>
    | React.ComponentProps<typeof Paragraph>
    | React.ComponentProps<typeof Quote>
    | React.ComponentProps<typeof BlogImage>
    | React.ComponentProps<typeof CodeBlock>
    | React.ComponentProps<typeof VideoEmbed>
    | React.ComponentProps<typeof GridContainer>
    | React.ComponentProps<typeof Divider>
    | React.ComponentProps<typeof CalloutBox>
    | React.ComponentProps<typeof ButtonLink>
    | React.ComponentProps<typeof RichTextBlock>
    | React.ComponentProps<typeof Gallery>
    | React.ComponentProps<typeof Accordion>
    | React.ComponentProps<typeof StatsGrid>
    | React.ComponentProps<typeof Timeline>;

// ── Todos los componentes ──────────────────────────────────────────────────
const allComponents: Config['components'] = {
    Heading:       HeadingConfig,
    Paragraph:     ParagraphConfig,
    Quote:         QuoteConfig,
    BlogImage:     BlogImageConfig,
    CodeBlock:     CodeBlockConfig,
    VideoEmbed:    VideoEmbedConfig,
    GridContainer: GridContainerConfig,
    Divider:       DividerConfig,
    CalloutBox:    CalloutBoxConfig,
    ButtonLink:    ButtonLinkConfig,
    RichTextBlock: RichTextBlockConfig,
    Gallery:       GalleryConfig,
    Accordion:     AccordionConfig,
    StatsGrid:     StatsGridConfig,
    Timeline:      TimelineConfig,
};

// ── Config base completa ───────────────────────────────────────────────────
export const puckConfig: Config = {
    components: allComponents,
};

// ── Variante: Blog / Posts ─────────────────────────────────────────────────
// Posts usan principalmente texto, imágenes y código.
export const blogPuckConfig: Config = {
    components: {
        Heading:       HeadingConfig,
        Paragraph:     ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        Quote:         QuoteConfig,
        BlogImage:     BlogImageConfig,
        VideoEmbed:    VideoEmbedConfig,
        CodeBlock:     CodeBlockConfig,
        CalloutBox:    CalloutBoxConfig,
        Divider:       DividerConfig,
        ButtonLink:    ButtonLinkConfig,
        GridContainer: GridContainerConfig,
    },
};

// ── Variante: Projects ────────────────────────────────────────────────────
// Proyectos añaden Gallery, Stats y Timeline de hitos.
export const projectPuckConfig: Config = {
    components: {
        Heading:       HeadingConfig,
        Paragraph:     ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        Gallery:       GalleryConfig,
        VideoEmbed:    VideoEmbedConfig,
        CodeBlock:     CodeBlockConfig,
        StatsGrid:     StatsGridConfig,
        Timeline:      TimelineConfig,
        CalloutBox:    CalloutBoxConfig,
        ButtonLink:    ButtonLinkConfig,
        Divider:       DividerConfig,
        GridContainer: GridContainerConfig,
    },
};

// ── Variante: Events ──────────────────────────────────────────────────────
// Eventos usan Timeline (cronograma), Stats (capacidad, precio) y FAQ.
export const eventPuckConfig: Config = {
    components: {
        Heading:       HeadingConfig,
        Paragraph:     ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        Timeline:      TimelineConfig,
        StatsGrid:     StatsGridConfig,
        Accordion:     AccordionConfig,
        Gallery:       GalleryConfig,
        VideoEmbed:    VideoEmbedConfig,
        CalloutBox:    CalloutBoxConfig,
        ButtonLink:    ButtonLinkConfig,
        Divider:       DividerConfig,
        GridContainer: GridContainerConfig,
    },
};

// ── Variante: Classroom / Lecciones ───────────────────────────────────────
// Aulas usan mucho contenido enriquecido, videos y acordeones de ejercicios.
export const classroomPuckConfig: Config = {
    components: {
        Heading:       HeadingConfig,
        Paragraph:     ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        VideoEmbed:    VideoEmbedConfig,
        CodeBlock:     CodeBlockConfig,
        Accordion:     AccordionConfig,
        CalloutBox:    CalloutBoxConfig,
        BlogImage:     BlogImageConfig,
        ButtonLink:    ButtonLinkConfig,
        Divider:       DividerConfig,
        GridContainer: GridContainerConfig,
    },
};
