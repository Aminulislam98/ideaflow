export default function IdeasPageSkeleton() {
  return (
    <div className="min-h-screen w-full">
      {/* Filter Bar Skeleton */}
      <div className="sticky top-[52px] z-40 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search skeleton */}
          <div className="flex-1 h-[36px] bg-[#f0f2f5] rounded-full animate-pulse" />
          {/* Dropdowns skeleton */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="h-[36px] w-[140px] bg-[#f0f2f5] rounded-full animate-pulse" />
            <div className="h-[36px] w-[100px] bg-[#f0f2f5] rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {/* Section Label skeleton */}
        <div className="h-[13px] w-[60px] bg-black/[0.06] rounded-full animate-pulse mb-6" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white border border-black/[0.06] rounded-none sm:rounded-2xl overflow-hidden"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full bg-black/[0.06] animate-pulse shrink-0" />
                  <div className="flex flex-col gap-1.5">
                    {/* Name */}
                    <div className="h-[13px] w-[100px] bg-black/[0.06] rounded-full animate-pulse" />
                    {/* Date */}
                    <div className="h-[11px] w-[70px] bg-black/[0.04] rounded-full animate-pulse" />
                  </div>
                </div>
                {/* Category badge */}
                <div className="h-[22px] w-[56px] bg-black/[0.04] rounded-full animate-pulse" />
              </div>

              {/* Title + Description */}
              <div className="px-4 pb-3 flex flex-col gap-2">
                <div className="h-[14px] w-full bg-black/[0.06] rounded-full animate-pulse" />
                <div className="h-[12px] w-[80%] bg-black/[0.04] rounded-full animate-pulse" />
              </div>

              {/* Banner */}
              <div className="w-full h-44 bg-black/[0.06] animate-pulse shrink-0" />

              {/* Divider */}
              <div className="h-px bg-black/[0.06] mx-4 mt-3" />

              {/* Actions */}
              <div className="flex items-center px-2 py-1 gap-1">
                <div className="flex-1 h-[36px] rounded-xl bg-black/[0.04] animate-pulse" />
                <div className="flex-1 h-[36px] rounded-xl bg-black/[0.04] animate-pulse" />
                <div className="flex-1 h-[36px] rounded-xl bg-black/[0.04] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
