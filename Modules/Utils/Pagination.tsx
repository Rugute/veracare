import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  pages: number;
  page: number;
  onPageChange: (page: number) => void;
}

const PagePagination = ({ onPageChange, page, pages }: Props) => {
  const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.max(1, page - 1));
            }}
            className={page === 1 ? "pointer-events-none opacity-50" : ""}
            href="#"
          />
        </PaginationItem>

        {pageNumbers.map((n) => (
          <PaginationItem key={n}>
            <PaginationLink
              href="#"
              isActive={n === page}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(n); // ✅ important
              }}
            >
              {n}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault();
              onPageChange(Math.min(pages, page + 1));
            }}
            className={page === pages ? "pointer-events-none opacity-50" : ""}
            href="#"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PagePagination;
