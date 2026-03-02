import { PaginationType } from "@/types"
import { router } from "@inertiajs/react"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { Button } from "../ui/button"

type PaginationProps = {
    pagination: PaginationType
    queryParams: { [key: string]: unknown }
}

export default function Pagination({ pagination, queryParams }: PaginationProps) {
    const pages = Array.from({ length: pagination.last_page }, (_, i) => i + 1)

    const handleChangePage = (page: number) => {
        const queryString = Object.entries({ ...queryParams, page })
            .map(([key, value]) => `${key}=${value}`)
            .join('&');

        router.visit(`?${queryString}`, {
            preserveScroll: true,
        })
    }

    const isLastPage = pagination.current_page === pagination.last_page
    const isFirstPage = pagination.current_page === 1
    const isCurrentPage = (page: number) => page === pagination.current_page

    return pagination.last_page > 1 ? (
        <div className="flex flex-col md:flex-row gap-4 items-center mt-10 justify-between">
            <p className="">
                Pagina {pagination.current_page} de {pagination.last_page} - {pagination.per_page} por página
            </p>

            <nav className="flex gap-2">
                <Button variant="secondary" onClick={() => handleChangePage(1)} disabled={isFirstPage}>
                    <ChevronsLeft />
                </Button>
                <Button variant="secondary" onClick={() => handleChangePage(pagination.current_page - 1)} disabled={isFirstPage}>
                    <ChevronLeft />
                </Button>

                {pages.map((page) => (
                    <Button variant="secondary" className="hidden md:block" key={page} onClick={() => handleChangePage(page)} disabled={isCurrentPage(page)}>
                        {page}
                    </Button>
                ))}

                <Button variant="secondary" onClick={() => handleChangePage(pagination.current_page + 1)} disabled={isLastPage}>
                    <ChevronRight />
                </Button>
                <Button variant="secondary" onClick={() => handleChangePage(pagination.last_page)} disabled={isLastPage}>
                    <ChevronsRight />
                </Button>
            </nav>
        </div>
    ) : null;
}
