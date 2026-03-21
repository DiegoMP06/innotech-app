import InputError from '@/components/app/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Item, ItemContent, ItemMedia, ItemTitle } from '@/components/ui/item';
import { Code, Plus } from 'lucide-react';
import { useEffect, useState, type FC } from 'react';

interface TechStackInputProps {
    onChange: (value: string[]) => void;
    value: string[];
}

const TechStackInput: FC<TechStackInputProps> = ({ onChange, value }) => {
    const [items, setItems] = useState<
        {
            id: number;
            value: string;
        }[]
    >([]);
    const [item, setItem] = useState('');
    const [error, setError] = useState<undefined | string>(undefined);

    const handleAddItem = () => {
        if (item.trim() !== '') {
            setItems([...items, { id: Date.now(), value: item.trim() }]);
            setItem('');
            setError(undefined);
        } else {
            setError('El campo no puede estar vacío');
        }
    };

    const handleRemoveItem = (id: number) => {
        setItems(items.filter((item) => item.id !== id));
    };

    useEffect(() => {
        setItems(
            value.map((item) => ({
                id: Date.now() * Math.random(),
                value: item,
            })),
        );
    }, []);

    useEffect(() => {
        onChange(items.map((item) => item.value));
    }, [items]);

    return (
        <div className="grid grid-cols-1 gap-4">
            <div className="grid gap-2">
                <div className="flex gap-2">
                    <Input
                        placeholder="Ingresa una tecnología"
                        className="flex-1"
                        value={item}
                        onChange={(e) => setItem(e.target.value)}
                    />

                    <Button
                        className="flex-0"
                        variant="secondary"
                        type="button"
                        onClick={handleAddItem}
                    >
                        <Plus />
                    </Button>
                </div>

                <InputError message={error} />
            </div>

            {items.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {items.map((item) => (
                        <Item
                            variant="muted"
                            className="gap-1 p-0"
                            key={item.id}
                            onDoubleClick={() => handleRemoveItem(item.id)}
                        >
                            <ItemMedia variant="icon">
                                <Code />
                            </ItemMedia>
                            <ItemContent className="p-2">
                                <ItemTitle>{item.value}</ItemTitle>
                            </ItemContent>
                        </Item>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TechStackInput;
