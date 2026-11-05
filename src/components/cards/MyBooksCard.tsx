
const MyBooksCard = () => {
  return (
    <div className="w-full rounded-2xl border border-black/[0.06] bg-white px-4 py-3.5 shadow-sm transition-colors hover:bg-[#f7f9f4] sm:px-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
        {/* Book Information */}
        <div className="flex min-w-0 items-center gap-4">
          <img
            src="/book-cover.png"
            alt="Book cover"
            className="h-14 w-11 shrink-0 rounded-lg border border-black/[0.06] object-cover shadow-sm"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-[#0d4d33]">
              Atomic Habits
            </h3>
            <p className="truncate text-xs text-slate-500">James Clear</p>
          </div>
        </div>

        {/* Category */}
        <div className="hidden text-sm text-slate-500 sm:block">Self Help</div>

        {/* Date */}
        <div className="hidden text-sm text-slate-500 md:block">
          May 10, 2025
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-xl border border-[#0d4d33]/25 bg-white px-3.5 py-2 text-xs font-bold text-[#0d4d33] transition-colors hover:bg-[#0d4d33]/5">
            <span aria-hidden="true">✎</span>
            Edit
          </button>

          <button className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3.5 py-2 text-xs font-bold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyBooksCard;
