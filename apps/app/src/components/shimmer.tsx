

export default function ShimmerHome() {
  return (
    <div className="min-h-screen bg-[#f8f9ff] p-4 md:p-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
        Find your dream job
      </h1>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="h-12 bg-white rounded-lg shadow animate-pulse"></div>
        </div>
        <div className="flex-1">
          <div className="h-12 bg-white rounded-lg shadow animate-pulse"></div>
        </div>
        <div className="w-32">
          <div className="h-12 bg-emerald-500 rounded-lg animate-pulse"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow">
            <h2 className="font-semibold mb-4">Filter</h2>

            {/* Date Posted */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>

            {/* Job Type */}
            <div className="space-y-2 mb-6">
              <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-5 bg-gray-200 rounded animate-pulse"
                  ></div>
                ))}
              </div>
            </div>

            {/* Salary Range */}
            <div className="space-y-2">
              <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-4">
                <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 flex-1 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="flex-1 space-y-4">
          <div className="h-10 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg p-6 shadow relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="h-6 w-48 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex gap-4">
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-8 w-20 bg-blue-100 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Shimmer Effect */}
              <div className="absolute -inset-x-full top-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite] z-10"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
