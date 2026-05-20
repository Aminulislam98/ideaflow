export default function MyIdeasPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          {/* Left — avatar + name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/[0.06] dark:bg-white/[0.08] animate-pulse shrink-0" />
            <div className="flex flex-col gap-1.5">
              <div className="h-[15px] w-[120px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
              <div className="h-[12px] w-[80px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
            </div>
          </div>

          {/* Right — stats */}
          <div className="flex items-center gap-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-xl px-4 py-2.5 flex flex-col items-center gap-1.5"
              >
                <div className="h-[18px] w-[36px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
                <div className="h-[11px] w-[60px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
              </div>
            ))}
          </div>
        </div>

        {/* Section Label */}
        <div className="h-[13px] w-[60px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse mb-4" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden"
            >
              {/* Banner */}
              <div className="w-full h-40 bg-black/[0.06] dark:bg-white/[0.06] animate-pulse shrink-0" />

              {/* Body */}
              <div className="flex flex-col flex-1 p-4">
                {/* Title */}
                <div className="h-[14px] w-full bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse mb-1.5" />

                {/* Description */}
                <div className="flex flex-col gap-1.5 flex-1">
                  <div className="h-[12px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                  <div className="h-[12px] w-[75%] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-3 mt-3 mb-3">
                  <div className="h-[22px] w-[52px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                  <div className="h-[22px] w-[52px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                  <div className="h-[11px] w-[70px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse ml-auto" />
                </div>

                {/* Divider */}
                <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mb-3" />

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-[30px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="flex-1 h-[30px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="flex-1 h-[30px] rounded-full bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
