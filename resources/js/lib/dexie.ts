import { Content } from '@puckeditor/core';
import Dexie, { Table } from 'dexie';
import { type ComponentProps } from './puck';

export type TableContent = {
    id: string;
    content: Content<ComponentProps>;
    updatedAt: number;
};

export class AppDatabase extends Dexie {
    contents!: Table<TableContent>;

    constructor() {
        super('AppDatabase');
        this.version(1).stores({
            contents: 'id, updatedAt',
        });
    }
}

export const db = new AppDatabase();
