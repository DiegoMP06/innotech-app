import type { Config } from '@puckeditor/core';

import Accordion, { AccordionConfig } from '@/components/puck/Accordion';
import BlogImage, { BlogImageConfig } from '@/components/puck/BlogImage';
import ButtonLink, { ButtonLinkConfig } from '@/components/puck/ButtonLink';
import CalloutBox, { CalloutBoxConfig } from '@/components/puck/CalloutBox';
import CodeBlock, { CodeBlockConfig } from '@/components/puck/CodeBlock';
import Divider, { DividerConfig } from '@/components/puck/Divider';
import Gallery, { GalleryConfig } from '@/components/puck/Gallery';
import GridContainer, {
    GridContainerConfig,
} from '@/components/puck/GridContainer';
import Heading, { HeadingConfig } from '@/components/puck/Heading';
import Paragraph, { ParagraphConfig } from '@/components/puck/Paragraph';
import Quote, { QuoteConfig } from '@/components/puck/Quote';
import RichTextBlock, {
    RichTextBlockConfig,
} from '@/components/puck/RichTextBlock';
import StatsGrid, { StatsGridConfig } from '@/components/puck/StatsGrid';
import Timeline, { TimelineConfig } from '@/components/puck/Timeline';
import VideoEmbed, { VideoEmbedConfig } from '@/components/puck/VideoEmbed';

export type ComponentProps = {
    Heading: React.ComponentProps<typeof Heading>
    Paragraph: React.ComponentProps<typeof Paragraph>
    Quote: React.ComponentProps<typeof Quote>
    BlogImage: React.ComponentProps<typeof BlogImage>
    CodeBlock: React.ComponentProps<typeof CodeBlock>
    VideoEmbed: React.ComponentProps<typeof VideoEmbed>
    GridContainer: React.ComponentProps<typeof GridContainer>
    Divider: React.ComponentProps<typeof Divider>
    CalloutBox: React.ComponentProps<typeof CalloutBox>
    ButtonLink: React.ComponentProps<typeof ButtonLink>
    RichTextBlock: React.ComponentProps<typeof RichTextBlock>
    Gallery: React.ComponentProps<typeof Gallery>
    Accordion: React.ComponentProps<typeof Accordion>
    StatsGrid: React.ComponentProps<typeof StatsGrid>
    Timeline: React.ComponentProps<typeof Timeline>;
}

const allComponents: Config['components'] = {
    Heading: HeadingConfig,
    Paragraph: ParagraphConfig,
    Quote: QuoteConfig,
    BlogImage: BlogImageConfig,
    CodeBlock: CodeBlockConfig,
    VideoEmbed: VideoEmbedConfig,
    GridContainer: GridContainerConfig,
    Divider: DividerConfig,
    CalloutBox: CalloutBoxConfig,
    ButtonLink: ButtonLinkConfig,
    RichTextBlock: RichTextBlockConfig,
    Gallery: GalleryConfig,
    Accordion: AccordionConfig,
    StatsGrid: StatsGridConfig,
    Timeline: TimelineConfig,
};

const rootConfig: Config['root'] = {
    fields: {},
    render: ({ children }: { children: React.ReactNode }) => (
        <div className="bg-background w-full h-full">
            <article className="max-w-4xl mx-auto px-4 py-10">
                {children}
            </article>
        </div>
    ),
}

export const puckConfig: Config = {
    root: rootConfig,
    components: allComponents,
};

export const blogPuckConfig: Config = {
    root: rootConfig,
    components: {
        Heading: HeadingConfig,
        Paragraph: ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        Quote: QuoteConfig,
        BlogImage: BlogImageConfig,
        VideoEmbed: VideoEmbedConfig,
        CodeBlock: CodeBlockConfig,
        CalloutBox: CalloutBoxConfig,
        Divider: DividerConfig,
        ButtonLink: ButtonLinkConfig,
        GridContainer: GridContainerConfig,
    },
};

export const projectPuckConfig: Config = {
    root: rootConfig,
    components: {
        Heading: HeadingConfig,
        Paragraph: ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        Gallery: GalleryConfig,
        VideoEmbed: VideoEmbedConfig,
        CodeBlock: CodeBlockConfig,
        StatsGrid: StatsGridConfig,
        Timeline: TimelineConfig,
        CalloutBox: CalloutBoxConfig,
        ButtonLink: ButtonLinkConfig,
        Divider: DividerConfig,
        GridContainer: GridContainerConfig,
    },
};

export const eventPuckConfig: Config = {
    root: rootConfig,
    components: {
        Heading: HeadingConfig,
        Paragraph: ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        Timeline: TimelineConfig,
        StatsGrid: StatsGridConfig,
        Accordion: AccordionConfig,
        Gallery: GalleryConfig,
        VideoEmbed: VideoEmbedConfig,
        CalloutBox: CalloutBoxConfig,
        ButtonLink: ButtonLinkConfig,
        Divider: DividerConfig,
        GridContainer: GridContainerConfig,
    },
};

export const classroomPuckConfig: Config = {
    root: rootConfig,
    components: {
        Heading: HeadingConfig,
        Paragraph: ParagraphConfig,
        RichTextBlock: RichTextBlockConfig,
        VideoEmbed: VideoEmbedConfig,
        CodeBlock: CodeBlockConfig,
        Accordion: AccordionConfig,
        CalloutBox: CalloutBoxConfig,
        BlogImage: BlogImageConfig,
        ButtonLink: ButtonLinkConfig,
        Divider: DividerConfig,
        GridContainer: GridContainerConfig,
    },
};
