import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlsProps {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
    basePath?: string;
    currentPage: number;
}

export default function PaginationControls({
    hasNextPage,
    hasPreviousPage,
    startCursor,
    endCursor,
    basePath = '/',
    currentPage,
}: PaginationControlsProps) {
    return (
        <Pagination className="mt-12 pb-8">
            <PaginationContent>
                {/* Previous Button */}
                <PaginationItem>
                    {hasPreviousPage && startCursor ? (
                        <PaginationPrevious href={`${basePath}?page=${currentPage - 1}&before=${startCursor}`} />
                    ) : (
                        <PaginationPrevious
                            href="#"
                            className="pointer-events-none opacity-50"
                            aria-disabled="true"
                            tabIndex={-1}
                        />
                    )}
                </PaginationItem>

                {/* Previous Page Number (Current - 1) */}
                {hasPreviousPage && startCursor && (
                    <PaginationItem>
                        <PaginationLink href={`${basePath}?page=${currentPage - 1}&before=${startCursor}`}>
                            {currentPage - 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {/* Current Page Number */}
                <PaginationItem>
                    <PaginationLink href="#" isActive>
                        {currentPage}
                    </PaginationLink>
                </PaginationItem>

                {/* Next Page Number (Current + 1) */}
                {hasNextPage && endCursor && (
                    <PaginationItem>
                        <PaginationLink href={`${basePath}?page=${currentPage + 1}&after=${endCursor}`}>
                            {currentPage + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                {/* Ellipsis if there are potentially more pages */}
                {hasNextPage && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}

                {/* Next Button */}
                <PaginationItem>
                    {hasNextPage && endCursor ? (
                        <PaginationNext href={`${basePath}?page=${currentPage + 1}&after=${endCursor}`} />
                    ) : (
                        <PaginationNext
                            href="#"
                            className="pointer-events-none opacity-50"
                            aria-disabled="true"
                            tabIndex={-1}
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
