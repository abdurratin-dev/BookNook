export default function MyBooksSkeleton() {
  return (
    <div className="animate-pulse">
      {/* Search and Add Book Skeleton */}
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
          <div className="h-5 w-5 rounded-full bg-gray-200" />
          <div className="h-4 w-40 rounded bg-gray-200" />
        </div>

        <div className="flex h-12 shrink-0 items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 shadow-sm">
          <div className="h-5 w-5 rounded bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-200" />
        </div>
      </div>

      {/* Books Table Skeleton */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        {/* Desktop Header */}
        <div className="hidden grid-cols-[2fr_1.1fr_1fr_1.2fr] gap-4 border-b border-gray-100 bg-[#fcfcfa] px-6 py-4 md:grid">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="h-4 w-20 rounded bg-gray-200" />
          ))}
        </div>

        {/* Skeleton Rows */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="grid grid-cols-1 gap-4 border-b border-gray-100 px-4 py-4 last:border-0 sm:px-6 md:grid-cols-[2fr_1.1fr_1fr_1.2fr] md:items-center"
          >
            {/* Book Information */}
            <div className="flex items-center gap-4">
              <div className="h-[65px] w-[48px] shrink-0 rounded-md bg-gray-200" />

              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-1/3 rounded bg-gray-200" />
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-16 rounded bg-gray-100 md:hidden" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>

            {/* Date */}
            <div className="flex items-center gap-2">
              <div className="h-3 w-12 rounded bg-gray-100 md:hidden" />
              <div className="h-4 w-24 rounded bg-gray-200" />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:justify-center">
              <div className="h-8 w-16 rounded-lg bg-gray-200" />
              <div className="h-8 w-16 rounded-lg bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
