"use client";

import Button from "@/components/ui/Button";
import styles from "./Pagination.module.css";
import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";

type PaginationProps = {
  page: number; 
  pageCount: number;
  onPageChange: (page: number) => void;
};

type PaginationItem = number | "ellipsis";

function getPaginationItems(page: number, pageCount: number): PaginationItem[] {
  if (pageCount <= 5) {
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  const firstPage = 1;
  const lastPage = pageCount;

  let startPage = Math.max(2, page - 1);
  let endPage = Math.min(pageCount - 1, page + 1);

  if (page <= 2) {
    startPage = 2;
    endPage = 4;
  } else if (page >= pageCount - 1) {
    startPage = pageCount - 3;
    endPage = pageCount - 1;
  }

  startPage = Math.max(2, startPage);
  endPage = Math.min(pageCount - 1, endPage);

  const items: PaginationItem[] = [firstPage];

  if (startPage > 2) items.push("ellipsis");

  for (let pageNumber = startPage; pageNumber <= endPage; pageNumber += 1) {
    items.push(pageNumber);
  }

  if (endPage < pageCount - 1) items.push("ellipsis");

  items.push(lastPage);

  return items;
}

export default function Pagination({ page, pageCount, onPageChange }: PaginationProps) {
  if (pageCount <= 1) return null;

  const isFirstPage = page <= 1;
  const isLastPage = page >= pageCount;

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), pageCount);
    onPageChange(clamped);
  };

  const paginationItems = getPaginationItems(page, pageCount);

  return (
    <nav className={styles.pagination} aria-label="Paginación">
      <Button
        shape="round"
        size="sm"
        variant="secondary"
        onClick={() => goToPage(page - 1)}
        disabled={isFirstPage}
        aria-label="Página anterior"
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </Button>

      <div className={styles.pages} aria-label={`Página ${page} de ${pageCount}`}>
        {paginationItems.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis} aria-hidden="true">
                <Ellipsis size={20} />
              </span>
            );
          }

          const pageNumber = item;
          const isActive = pageNumber === page;

          return (
            <Button
              key={pageNumber}
              shape="round"
              size="sm"
              variant={isActive ? "primary" : "secondary"}
              onClick={() => goToPage(pageNumber)}
              aria-current={isActive ? "page" : undefined}
              aria-label={`Ir a la página ${pageNumber}`}
            >
              {pageNumber}
            </Button>
          );
        })}
      </div>

      <Button
        shape="round"
        size="sm"
        variant="secondary"
        onClick={() => goToPage(page + 1)}
        disabled={isLastPage}
        aria-label="Página siguiente"
      >
        <ChevronRight size={18} aria-hidden="true" />
      </Button>
    </nav>
  );
}