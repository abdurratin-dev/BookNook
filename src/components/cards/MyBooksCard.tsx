
const MyBooksCard = () => {
  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex items-center justify-between gap-4">

        {/* Book Information */}
        <div className="flex min-w-0 items-center gap-4">
          <img
            src="/book-cover.png"
            alt="Book cover"
            className="h-12 w-9 rounded-sm object-cover"
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold text-teal-900">
              Atomic Habits
            </h3>
            <p className="text-xs text-gray-500">
              James Clear
            </p>
          </div>
        </div>

        {/* Category */}
        <div className="hidden text-sm text-gray-500 sm:block">
          Self Help
        </div>

        {/* Date */}
        <div className="hidden text-sm text-gray-500 md:block">
          May 10, 2025
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            className="rounded-md border border-teal-500 px-3 py-1.5 text-xs font-medium text-teal-700 transition hover:bg-teal-50"
          >
            <span className="mr-1">✎</span>
            Edit
          </button>

          <button
            className="rounded-md border border-red-300 px-3 py-1.5 text-xs font-medium text-red-500 transition hover:bg-red-50"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
};

export default MyBooksCard;
