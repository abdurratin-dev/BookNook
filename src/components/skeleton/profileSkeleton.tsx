
export default function ProfileSkeleton() {
  return (
    <div className="mx-auto min-h-screen max-w-7xl animate-pulse bg-[#fcfcfa] px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Heading */}
      <div className="mb-7 space-y-3">
        <div className="h-8 w-40 rounded-lg bg-gray-200" />
        <div className="h-4 w-72 max-w-full rounded bg-gray-200" />
      </div>

      {/* Profile Header */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="h-32 bg-gray-200 sm:h-40" />

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar & User Info */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
              <div className="h-24 w-24 shrink-0 rounded-2xl border-4 border-white bg-gray-200 shadow-sm sm:h-28 sm:w-28" />

              <div className="space-y-3 pb-1">
                <div className="h-6 w-40 rounded bg-gray-200" />
                <div className="h-4 w-48 max-w-full rounded bg-gray-200" />
                <div className="h-6 w-20 rounded-full bg-gray-200" />
              </div>
            </div>

            {/* Edit Button */}
            <div className="h-11 w-32 rounded-xl bg-gray-200" />
          </div>

          {/* Bio */}
          <div className="mt-6 max-w-2xl space-y-2">
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
          </div>
        </div>
      </div>

      {/* Reading Statistics */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="h-12 w-12 shrink-0 rounded-xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-7 w-12 rounded bg-gray-200" />
              <div className="h-3 w-24 rounded bg-gray-200" />
            </div>
          </div>
        ))}
      </div>

      {/* Personal Information */}
      <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-6 w-48 rounded bg-gray-200" />
            <div className="h-3 w-64 max-w-full rounded bg-gray-200" />
          </div>

          <div className="h-10 w-10 rounded-xl bg-gray-200" />
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="space-y-3">
              <div className="h-3 w-24 rounded bg-gray-200" />
              <div className="h-4 w-48 max-w-full rounded bg-gray-200" />
              <div className="h-px w-full bg-gray-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Account Settings */}
      <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
        <div className="space-y-2">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="h-3 w-64 max-w-full rounded bg-gray-200" />
        </div>

        <div className="mt-6 divide-y divide-gray-100">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between gap-3 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-gray-200" />

                <div className="space-y-2">
                  <div className="h-4 w-36 rounded bg-gray-200" />
                  <div className="h-3 w-48 max-w-full rounded bg-gray-200" />
                </div>
              </div>

              <div className="h-5 w-5 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
