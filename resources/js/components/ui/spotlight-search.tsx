import { useEffect, useState } from "react";
import { CommandDialog, CommandInput } from "./command";
import { router, usePage } from "@inertiajs/react";
import { SharedData } from "@/types";
import { useDebounce } from "use-debounce";

type SpotlightSearchProps = {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}

export default function SpotlightSearch({ isOpen, setIsOpen }: SpotlightSearchProps) {
    const filters = (usePage<SharedData>().props?.filters as { [key: string]: string }) || {}
    const [search, setSearch] = useState(filters.search || '')

    const [query] = useDebounce(search, 500)

    useEffect(() => {
        if (query !== undefined) {
            router.get(`?filter[search]=${query}`, {}, {
                preserveScroll: true,
                preserveState: true,
                replace: true,
                only: ['posts']
            })
        }
    }, [query])

    return (
        <CommandDialog
            onOpenChange={setIsOpen}
            open={isOpen}
            title='Buscar...'
            description='Busca cualquier cosa...'
        >
            <CommandInput
                placeholder='Buscar...'
                onValueChange={setSearch}
                value={search}
            />
        </CommandDialog>
    )
}
