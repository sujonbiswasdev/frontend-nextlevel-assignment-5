'use client'

import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { TPagination } from '@/types/event.types';
import { useRouter, useSearchParams } from 'next/navigation';

const PaginationPage = ({ pagination }: { pagination: TPagination }) => {
  const { total, page = 1, totalpage = 1 } = pagination;

  const searchParams = useSearchParams();
  const router = useRouter();

  const navigateToPage = (targetPage: number) => {
    if (targetPage < 1 || targetPage > totalpage) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());
    router.push(`?${params.toString()}`);
  }

  const pageWindow = 4;

  const getPageNumbers = () => {
    const windowIndex = Math.floor((page - 1) / pageWindow);
    const start = windowIndex * pageWindow + 1;
    const end = Math.min(start + pageWindow - 1, totalpage);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  return (
    <div className='flex flex-col md:flex-row items-center justify-between w-full gap-4 mt-6'>

      <Pagination className='flex flex-col items-center justify-center space-y-4 w-full'>
        <PaginationContent className='flex items-center gap-2 flex-wrap justify-center'>

          {/* Previous */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => navigateToPage(page - 1)}
              className="disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Previous
            </Button>
          </PaginationItem>

          {/* First + dots */}
          {page > pageWindow && (
            <PaginationItem className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => navigateToPage(1)}
                className="hover:bg-blue-200 dark:hover:bg-blue-900"
              >
                1
              </Button>

              {page > pageWindow + 1 && (
                <span className="text-muted-foreground text-sm">...</span>
              )}
            </PaginationItem>
          )}

          {/* Page Numbers */}
          {getPageNumbers().map((currentPage) => {
            const isActive = page === currentPage;

            return (
              <PaginationItem key={currentPage}>
                <Button
                  size="sm"
                  onClick={() => navigateToPage(currentPage)}
                  className={`min-w-[36px] transition-all duration-200
                    ${isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900"
                    }
                  `}
                >
                  {currentPage}
                </Button>
              </PaginationItem>
            );
          })}

          {/* Last + dots */}
          {page + pageWindow - 1 < totalpage && (
            <PaginationItem className="flex items-center gap-2">

              {page + pageWindow < totalpage && (
                <span className="text-muted-foreground text-sm">...</span>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={() => navigateToPage(totalpage)}
                className="hover:bg-blue-100 dark:hover:bg-blue-900"
              >
                {totalpage}
              </Button>
            </PaginationItem>
          )}

          {/* Next */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalpage}
              onClick={() => navigateToPage(page + 1)}
              className="disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Next
            </Button>
          </PaginationItem>

        </PaginationContent>

        {/* Page Info */}
        <span className="text-sm text-muted-foreground font-medium text-center">
          Page <span className="font-semibold text-foreground">{page}</span> of{" "}
          <span className="font-semibold text-foreground">{totalpage}</span>{" "}
          ({total} items)
        </span>
      </Pagination>

    </div>
  )
}

export default PaginationPage;