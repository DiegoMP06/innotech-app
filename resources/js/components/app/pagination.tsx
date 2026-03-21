import { PaginationType } from "@/types"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { PaginationContent, PaginationItem, PaginationLink, Pagination as PaginationUI } from "../ui/pagination"

type PaginationProps = {
    pagination: PaginationType
    queryParams: { [key: string]: unknown }
}

export default function Pagination({ pagination, queryParams }: PaginationProps) {
    const pages = Array.from({ length: pagination.meta.last_page }, (_, i) => i + 1)

    const getUrl = (page: number) => {
        const queryString = Object.entries({ ...queryParams, page })
            .map(([key, value]) => `filter[${key}]=${value}`)
            .join('&');

        return `?${queryString}`
    }

    const isLastPage = pagination.meta.current_page === pagination.meta.last_page
    const isFirstPage = pagination.meta.current_page === 1
    const isCurrentPage = (page: number) => page === pagination.meta.current_page

    return pagination.meta.last_page > 1 ? (
        <div className="flex flex-col md:flex-row gap-4 items-center mt-16 justify-between">
            <p className="text-xs text-accent-foreground font-bold flex-1">
                Pagina {pagination.meta.current_page} de {pagination.meta.last_page} - {pagination.meta.per_page} por página
            </p>

            <PaginationUI className="mx-0 md:mx-auto flex-0">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationLink only={['posts']} href={getUrl(1)} isActive={isFirstPage}>
                            <ChevronsLeft />
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink only={['posts']} href={getUrl(pagination.meta.current_page - 1)} isActive={isFirstPage}>
                            <ChevronLeft />
                        </PaginationLink>
                    </PaginationItem>

                    {pages.map((page) => (
                        <PaginationItem key={page} className="hidden md:block">
                            <PaginationLink only={['posts']} href={getUrl(page)} isActive={isCurrentPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    <PaginationItem>
                        <PaginationLink only={['posts']} href={getUrl(pagination.meta.current_page + 1)} isActive={isLastPage}>
                            <ChevronRight />
                        </PaginationLink>
                    </PaginationItem>

                    <PaginationItem>
                        <PaginationLink only={['posts']} href={getUrl(pagination.meta.last_page)} isActive={isLastPage}>
                            <ChevronsRight />
                        </PaginationLink>
                    </PaginationItem>
                </PaginationContent>
            </PaginationUI>
        </div>
    ) : null;
}
