import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

const Pagination = React.forwardRef(
  ({ className, currentPage, totalPages, onPageChange, ...props }, ref) => {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };

    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };

    return (
      <div
        ref={ref}
        className={cn("flex items-center space-x-2", className)}
        {...props}
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="flex items-center justify-center rounded-md border px-3 py-1 text-sm font-medium disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  }
);
Pagination.displayName = "Pagination";

export { Pagination };