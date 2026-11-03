
export default function BorrowListSkeleton() {
  return (
    <div className="mt-8 animate-pulse overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">

      {/* Desktop Table Skeleton */}
      <table className="hidden w-full md:table">
        <thead>
          <tr className="border-b border-slate-100 text-left">
            {[
              "Book",
              "Borrowed On",
              "Return Date",
              "Status",
              "Actions",
            ].map((item) => (
              <th key={item} className="px-6 py-4">
                <div className="h-3 w-20 rounded bg-slate-200" />
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: 5 }).map((_, index) => (
            <tr
              key={index}
              className="border-b border-slate-50 last:border-0"
            >
              {/* Book */}
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="h-[65px] w-[48px] shrink-0 rounded-md bg-slate-200" />

                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-slate-200" />
                    <div className="h-3 w-24 rounded bg-slate-100" />
                    <div className="h-3 w-20 rounded bg-slate-100" />
                  </div>
                </div>
              </td>

              {/* Borrowed On */}
              <td className="px-6 py-4">
                <div className="h-3 w-28 rounded bg-slate-200" />
              </td>

              {/* Return Date */}
              <td className="px-6 py-4">
                <div className="h-3 w-24 rounded bg-slate-200" />
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="h-7 w-20 rounded-full bg-slate-200" />
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="ml-auto h-9 w-24 rounded-lg bg-slate-200" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Card Skeleton */}
      <ul className="divide-y divide-slate-100 md:hidden">
        {Array.from({ length: 4 }).map((_, index) => (
          <li key={index} className="p-4">
            <div className="flex items-start gap-3">

              {/* Cover */}
              <div className="h-[85px] w-[60px] shrink-0 rounded-md bg-slate-200" />

              <div className="min-w-0 flex-1">

                {/* Book Identity */}
                <div className="space-y-2">
                  <div className="h-4 w-3/4 rounded bg-slate-200" />
                  <div className="h-3 w-1/2 rounded bg-slate-100" />
                  <div className="h-3 w-2/3 rounded bg-slate-100" />
                </div>

                {/* Borrowing Details */}
                <div className="mt-4 grid grid-cols-2 gap-y-3">
                  <div className="h-3 w-20 rounded bg-slate-100" />
                  <div className="ml-auto h-3 w-24 rounded bg-slate-200" />

                  <div className="h-3 w-20 rounded bg-slate-100" />
                  <div className="ml-auto h-3 w-20 rounded bg-slate-200" />
                </div>

                {/* Status and Button */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="h-7 w-20 rounded-full bg-slate-200" />
                  <div className="h-9 w-24 rounded-lg bg-slate-200" />
                </div>

              </div>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
