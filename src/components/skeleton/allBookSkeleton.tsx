
import { Skeleton } from "@heroui/react";

const PER_PAGE = 9;

export default function BooksSkeleton() {
  return (
    <div>
      {/* Search + Category Filter Skeleton */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        
        {/* Result Count */}
        <Skeleton className="h-4 w-28 rounded-lg" />

        {/* Category Select */}
        <Skeleton className="h-11 w-full rounded-xl sm:w-52" />
      </div>

      {/* Book Grid Skeleton */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {Array.from({ length: PER_PAGE }).map((_, index) => (
          <div
            key={index}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
          >
            {/* Book Image */}
            <Skeleton className="h-40 w-full rounded-xl sm:h-56" />

            {/* Book Information */}
            <div className="mt-4 space-y-3">
              <Skeleton className="h-4 w-4/5 rounded-lg" />
              <Skeleton className="h-3 w-2/3 rounded-lg" />

              <div className="flex items-center justify-between pt-2">
                <Skeleton className="h-4 w-16 rounded-lg" />
                <Skeleton className="h-8 w-16 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton
            key={index}
            className="h-9 w-9 rounded-lg"
          />
        ))}
      </div>
    </div>
  );
}
