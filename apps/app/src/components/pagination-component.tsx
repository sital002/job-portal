"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface SimplePaginationProps {
  currentPage: number;
  totalPages: number | undefined;
  onPageChange: (page: number) => void;
}

export default function SimplePagination({
  currentPage,
  totalPages,
  onPageChange,
}: SimplePaginationProps) {
  return (
    <div className="flex items-center justify-center space-x-4">
      <button
        className="flex items-center justify-center bg-gray-200 rounded-full h-8 w-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous page</span>
      </button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="flex items-center justify-center bg-gray-200 rounded-full h-8 w-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next page</span>
      </button>
    </div>
  );
}
