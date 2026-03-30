'use client';

import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';
import { TPagination } from '@/types/event.types';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';

const LIMIT_OPTIONS = [5, 10, 20, 50, 100];

const PaginationPage = ({ pagination }: { pagination: TPagination }) => {
  const {
    total = 0,
    totalpage = 0,
    page: rawPage = 1,
    limit: rawLimit = 10,
  } = pagination || {};

  const page = Math.max(1, Math.min(rawPage, totalpage || 1));
  const limit = rawLimit;

  const searchParams = useSearchParams();
  const router = useRouter();

  const onGotoPage = (target: number) => {
    if (target < 1 || target > (totalpage || 1)) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', target.toString());
    router.push(`?${params.toString()}`);
  };

  const onLimitChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('limit', e.target.value);
    params.set('page', '1');
    router.push(`?${params.toString()}`);
  };

  // How many numbered pages to show at once
  const PAGE_WINDOW = 4;

  const getPageNumbersToShow = () => {
    if (totalpage < 1) return [];
    const windowIdx = Math.floor((page - 1) / PAGE_WINDOW);
    const start = windowIdx * PAGE_WINDOW + 1;
    const end = Math.min(start + PAGE_WINDOW - 1, totalpage);
    return Array.from({ length: end - start + 1 }, (_, idx) => start + idx);
  };

  if (totalpage === 0) {
    return (
      <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mt-6">
        <Pagination className="flex flex-col items-center justify-center space-y-4 w-full">
          <span className="text-sm text-muted-foreground font-medium text-center">
            No items to display.
          </span>
        </Pagination>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4 mt-6">
      {/* Limit selector */}
      <div className="flex items-center gap-2 mb-2 md:mb-0">
        <span className="text-sm text-muted-foreground">Items per page:</span>
        <select
          className="border bg-white dark:bg-gray-900 rounded px-2 py-1 text-sm focus:outline-none transition-colors"
          value={limit}
          onChange={onLimitChange}
        >
          {LIMIT_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <Pagination className="flex flex-col items-center justify-center space-y-4 w-full">
        <PaginationContent className="flex items-center gap-2 flex-wrap justify-center">
          {/* Previous */}
          <PaginationItem>
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => onGotoPage(page - 1)}
              className="disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Go to previous page"
            >
              Previous
            </Button>
          </PaginationItem>

          {/* First page + dots */}
          {page > PAGE_WINDOW && (
            <PaginationItem className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onGotoPage(1)}
                className="hover:bg-blue-200 dark:hover:bg-blue-900"
                aria-label="Go to first page"
              >
                1
              </Button>
              {page > PAGE_WINDOW + 1 && (
                <span className="text-muted-foreground text-sm">…</span>
              )}
            </PaginationItem>
          )}

          {/* Numbered pages */}
          {getPageNumbersToShow().map((pNum) => {
            const isActive = page === pNum;
            return (
              <PaginationItem key={pNum}>
                <Button
                  size="sm"
                  onClick={() => onGotoPage(pNum)}
                  className={[
                    'min-w-[36px] transition-all duration-200',
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105'
                      : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-blue-100 dark:hover:bg-blue-900'
                  ].join(' ')}
                  aria-current={isActive ? "page" : undefined}
                >
                  {pNum}
                </Button>
              </PaginationItem>
            );
          })}

          {/* Last page + dots */}
          {page + PAGE_WINDOW - 1 < totalpage && (
            <PaginationItem className="flex items-center gap-2">
              {page + PAGE_WINDOW < totalpage && (
                <span className="text-muted-foreground text-sm">…</span>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={() => onGotoPage(totalpage)}
                className="hover:bg-blue-100 dark:hover:bg-blue-900"
                aria-label="Go to last page"
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
              onClick={() => onGotoPage(page + 1)}
              className="disabled:opacity-60 disabled:cursor-not-allowed"
              aria-label="Go to next page"
            >
              Next
            </Button>
          </PaginationItem>
        </PaginationContent>

        {/* Page Info */}
        <span className="text-sm text-muted-foreground font-medium text-center">
          Page <span className="font-semibold text-foreground">{page}</span> of{" "}
          <span className="font-semibold text-foreground">{totalpage}</span>{" "}
          ({total} item{total === 1 ? "" : "s"})
        </span>
      </Pagination>
    </div>
  );
};

export default PaginationPage;