import { db, TableContent } from '@/lib/dexie';
import { ComponentProps } from '@/lib/puck';
import { Content, Data } from '@measured/puck';
import { useEffect, useMemo, useState } from 'react';
import Swal from 'sweetalert2';
import { useDebouncedCallback } from 'use-debounce';

type ContentTypes = 'posts' | 'projects' | 'events';

type UsePuckContentProps = {
    contentType: ContentTypes;
    itemId: number;
    title: string;
    serverContent: Content<ComponentProps>;
};

export default function usePuckContent({
    contentType,
    itemId,
    title,
    serverContent,
}: UsePuckContentProps) {
    const [initialData, setInitialData] = useState<Partial<
        Data<ComponentProps>
    > | null>(null);
    const [content, setContent] = useState<Content<ComponentProps>>([]);
    const [processing, setProcessing] = useState(false);

    const DBId = useMemo(
        () => `${contentType}_${itemId}`,
        [contentType, itemId],
    );

    const handleSaveToIndexDB = async (data: Content<ComponentProps>) => {
        await db.contents.put({
            id: DBId,
            content: data,
            updatedAt: Date.now(),
        });
        setContent(data);
    };

    const loadLocalContent = async (localContent: TableContent) => {
        setInitialData({
            root: {
                props: {
                    title,
                },
            },
            content: localContent.content,
        });
        setContent(localContent.content);
    };

    const loadServerContent = () => {
        setInitialData({
            root: {
                props: {
                    title,
                },
            },
            content: serverContent,
        });
        setContent(serverContent);
    };

    const debouncedSaveDB = useDebouncedCallback(handleSaveToIndexDB, 1000);

    useEffect(() => {
        return () => {
            debouncedSaveDB.flush();
        };
    }, [debouncedSaveDB]);

    useEffect(() => {
        (async () => {
            const localPost = await db.contents.get(DBId);

            if (localPost && localPost.content.length > 0) {
                Swal.fire({
                    title: 'Tiene contenido sin guardar localmente',
                    text: '¿Desea continuar con el contenido local, si no se perderá?',
                    showDenyButton: true,
                    confirmButtonText: 'Si',
                    denyButtonText: `No`,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        loadLocalContent(localPost);
                    } else {
                        await db.contents.delete(DBId);
                        loadServerContent();
                    }
                });
            } else {
                loadServerContent();
            }
        })();
    }, []);

    return {
        DBId,
        initialData,
        content,
        processing,
        setProcessing,
        debouncedSaveDB,
    };
}
