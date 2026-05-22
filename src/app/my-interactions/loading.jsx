export default function MyInteractionsPageSkeleton() {
  return (
    <div className="min-h-screen w-full sm:bg-[#f0f2f5] dark:bg-zinc-950 pt-13">
      <div className="max-w-2xl mx-auto sm:px-5 sm:py-6 flex flex-col gap-4">
        {/* Section title skeleton */}
        <div className="flex flex-col gap-0.5 sm:gap-2 py-2">
          <div className="h-7 w-48 bg-black/[0.06] dark:bg-white/[0.06] rounded-xl mx-3 mb-2 animate-pulse" />

          {/* Card 1 */}
          {[1, 2].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 border-b-2 sm:border border-black/20 dark:border-white/[0.06] sm:rounded-2xl overflow-hidden"
            >
              {/* Label row */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50/60 dark:bg-white/[0.03] border-b border-black/[0.04] dark:border-white/[0.04]">
                <div className="w-5 h-5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] animate-pulse" />
                <div className="h-4 w-28 bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
              </div>

              {/* Title */}
              <div className="px-4 pt-3 pb-2">
                <div className="h-4 w-3/4 bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
              </div>

              {/* Comment bubble */}
              <div className="px-4 pb-3">
                <div className="bg-[#f0f2f5] dark:bg-zinc-800 rounded-xl px-4 py-3 flex flex-col gap-2">
                  <div className="h-3 w-24 bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
                  <div className="h-4 w-full bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
                  <div className="h-4 w-2/3 bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
                </div>
              </div>

              {/* View button */}
              <div className="px-4 pb-3 flex justify-end">
                <div className="h-8 w-24 bg-black/[0.06] dark:bg-white/[0.08] rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>

        {/* Liked Ideas section */}
        <div className="flex flex-col gap-0.5 sm:gap-2">
          <div className="h-7 w-36 bg-black/[0.06] dark:bg-white/[0.06] rounded-xl mx-3 mb-2 animate-pulse" />

          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 border-b-2 sm:border border-black/20 dark:border-white/[0.06] sm:rounded-2xl overflow-hidden"
            >
              {/* Label row */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50/60 dark:bg-white/[0.03] border-b border-black/[0.04] dark:border-white/[0.04]">
                <div className="w-5 h-5 rounded-full bg-black/[0.06] dark:bg-white/[0.08] animate-pulse" />
                <div className="h-4 w-24 bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
              </div>

              {/* Title */}
              <div className="px-4 py-3">
                <div className="h-4 w-2/3 bg-black/[0.06] dark:bg-white/[0.08] rounded-lg animate-pulse" />
              </div>

              {/* View button */}
              <div className="px-4 pb-3 flex justify-end">
                <div className="h-8 w-24 bg-black/[0.06] dark:bg-white/[0.08] rounded-xl animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
