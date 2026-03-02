import { SlotComponent } from '@measured/puck';

const GRID_COLS_CLASSES: { [key: number]: string } = {
    1: 'md:grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
    5: 'md:grid-cols-5',
    6: 'md:grid-cols-6',
    7: 'md:grid-cols-7',
    8: 'md:grid-cols-8',
    9: 'md:grid-cols-9',
    10: 'md:grid-cols-10',
    11: 'md:grid-cols-11',
    12: 'md:grid-cols-12',
    13: 'md:grid-cols-13',
    14: 'md:grid-cols-14',
    15: 'md:grid-cols-15',
    16: 'md:grid-cols-16',
    17: 'md:grid-cols-17',
    18: 'md:grid-cols-18',
    19: 'md:grid-cols-19',
    20: 'md:grid-cols-20',
}

const GRID_ROWS_CLASSES: { [key: number]: string } = {
    1: 'md:grid-rows-1',
    2: 'md:grid-rows-2',
    3: 'md:grid-rows-3',
    4: 'md:grid-rows-4',
    5: 'md:grid-rows-5',
    6: 'md:grid-rows-6',
    7: 'md:grid-rows-7',
    8: 'md:grid-rows-8',
    9: 'md:grid-rows-9',
    10: 'md:grid-rows-10',
    11: 'md:grid-rows-11',
    12: 'md:grid-rows-12',
    13: 'md:grid-rows-13',
    14: 'md:grid-rows-14',
    15: 'md:grid-rows-15',
    16: 'md:grid-rows-16',
    17: 'md:grid-rows-17',
    18: 'md:grid-rows-18',
    19: 'md:grid-rows-19',
    20: 'md:grid-rows-20',
}

type GridContainerProps = {
    items: { content: SlotComponent }[];
    direction: 'row' | 'column';
    gap: number;
}

export default function GridContainer({ gap, direction, items }: GridContainerProps) {
    return (
        <div
            className={`grid grid-cols-1 ${direction === 'column' ? GRID_ROWS_CLASSES[items.length] : GRID_COLS_CLASSES[items.length]}`}
            style={{
                gap,
            }}
        >
            {items.map((column, i) => (
                <div key={i}>
                    {column.content()}
                </div>
            ))}
        </div>
    )
}
