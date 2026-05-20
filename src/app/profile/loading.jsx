export default function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-5">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Left — avatar + name + bio */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/[0.06] dark:bg-white/[0.08] animate-pulse shrink-0" />
              <div className="flex flex-col gap-2">
                <div className="h-[17px] w-[140px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
                <div className="h-[12px] w-[240px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                <div className="h-[12px] w-[180px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
              </div>
            </div>

            {/* Right — stats */}
            <div className="flex items-center gap-2 shrink-0">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="text-center px-4 py-2.5 bg-black/[0.02] dark:bg-white/[0.04] rounded-xl min-w-[72px] flex flex-col items-center gap-1.5"
                >
                  <div className="h-[18px] w-[32px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
                  <div className="h-[10px] w-[40px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT — Posts Feed */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 order-2 lg:order-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {/* Post Header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-black/[0.06] dark:bg-white/[0.08] animate-pulse shrink-0" />
                    <div className="flex flex-col gap-1.5">
                      <div className="h-[13px] w-[100px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
                      <div className="h-[11px] w-[70px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>

                {/* Title + Description */}
                <div className="px-4 pb-3 flex flex-col gap-2">
                  <div className="h-[14px] w-full bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
                  <div className="h-[12px] w-[80%] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                </div>

                {/* Banner */}
                <div className="w-full h-[220px] sm:h-[260px] bg-black/[0.06] dark:bg-white/[0.06] animate-pulse" />

                {/* Count row */}
                <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                  <div className="h-[12px] w-[60px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                  <div className="h-[12px] w-[80px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                </div>

                {/* Action buttons */}
                <div className="flex items-center px-2 py-1 gap-1">
                  <div className="flex-1 h-[34px] rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="flex-1 h-[34px] rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                  <div className="flex-1 h-[34px] rounded-xl bg-black/[0.04] dark:bg-white/[0.06] animate-pulse" />
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Sticky Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4 order-1 lg:order-2 lg:sticky lg:top-[72px]">
            {/* About */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
              <div className="h-[13px] w-[50px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse mb-4" />
              <div className="flex flex-col gap-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    <div className="w-[15px] h-[15px] rounded-full bg-black/[0.06] dark:bg-white/[0.08] animate-pulse shrink-0" />
                    <div className="h-[13px] w-[140px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                  </div>
                ))}
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
              <div className="h-[13px] w-[60px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse mb-4" />
              <div className="flex flex-col gap-2.5">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between">
                      <div className="h-[13px] w-[100px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
                      <div className="h-[13px] w-[30px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
                    </div>
                    {i < 3 && (
                      <div className="h-px bg-black/[0.04] dark:bg-white/[0.06] mt-2.5" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
