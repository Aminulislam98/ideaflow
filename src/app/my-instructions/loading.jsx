export default function MyInteractionsSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-5">
        {/* Page Header */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <div className="h-[17px] w-[160px] bg-gray-200 rounded-full animate-pulse" />
              <div className="h-[12px] w-[220px] bg-gray-100 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="h-[30px] w-[80px] bg-gray-100 rounded-full animate-pulse" />
              <div className="h-[30px] w-[100px] bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Section Label */}
        <div className="h-[13px] w-[100px] bg-gray-200 rounded-full animate-pulse -mb-2" />

        {/* Feed */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden"
          >
            {/* Interaction type label */}
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.04] bg-gray-50">
              <div className="w-[13px] h-[13px] rounded-full bg-gray-200 animate-pulse shrink-0" />
              <div className="h-[12px] w-[160px] bg-gray-200 rounded-full animate-pulse" />
            </div>

            {/* Author row */}
            <div className="flex items-center justify-between px-4 pt-3 pb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse shrink-0" />
                <div className="h-[13px] w-[100px] bg-gray-200 rounded-full animate-pulse" />
              </div>
              <div className="h-[22px] w-[60px] bg-gray-100 rounded-full animate-pulse" />
            </div>

            {/* Title */}
            <div className="px-4 pb-2">
              <div className="h-[14px] w-full bg-gray-200 rounded-full animate-pulse" />
            </div>

            {/* Banner */}
            <div className="w-full h-[180px] sm:h-[220px] bg-gray-100 animate-pulse" />

            {/* Comment bubble — show on alternate items */}
            {i % 2 === 0 && (
              <div className="mx-4 my-3 bg-gray-50 rounded-xl px-4 py-3 flex flex-col gap-1.5">
                <div className="h-[11px] w-[80px] bg-gray-200 rounded-full animate-pulse" />
                <div className="h-[13px] w-full bg-gray-100 rounded-full animate-pulse" />
                <div className="h-[13px] w-[70%] bg-gray-100 rounded-full animate-pulse" />
              </div>
            )}

            {/* Stats + action */}
            <div className="flex items-center justify-between px-4 py-2.5 border-t border-black/[0.04]">
              <div className="flex items-center gap-3">
                <div className="h-[12px] w-[40px] bg-gray-100 rounded-full animate-pulse" />
                <div className="h-[12px] w-[40px] bg-gray-100 rounded-full animate-pulse" />
              </div>
              <div className="h-[30px] w-[80px] bg-gray-100 rounded-full animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
