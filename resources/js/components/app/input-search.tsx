import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { ComponentProps } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

type InputSearchProps = {
    queryParams: { [key: string]: unknown }
    search: string;
    placeholder?: string
} & ComponentProps<"input">

export default function InputSearch({ placeholder, queryParams, search, children, ...props }: InputSearchProps) {
    return (
        <div>
            <form
                method="get"
                className={cn('flex gap-2 w-full mb-10 items-start md:items-stretch', children ? 'max-w-4xl' : 'max-w-xl')}
            >
                <div className="flex flex-1 flex-col md:flex-row gap-2">
                    <Input
                        placeholder={placeholder || 'Buscar...'}
                        type="search"
                        name="search"
                        defaultValue={search}
                        {...props}
                    />

                    {children}
                </div>

                {Object.entries(queryParams).map(([key, value]) => (
                    <input
                        key={key}
                        type="hidden"
                        name={key}
                        value={`${value}`}
                    />
                ))}

                <Button type="submit" variant="default" className="size-10">
                    <Search />
                </Button>
            </form>
        </div>
    )
}
