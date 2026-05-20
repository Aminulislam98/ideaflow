export default function AddIdeaPageSkeleton() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-7">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-10">
        {/* Page Header */}
        <div className="mb-8 flex flex-col gap-2">
          <div className="h-[32px] w-[180px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
          <div className="h-[13px] w-[240px] bg-black/[0.04] dark:bg-white/[0.06] rounded-full animate-pulse" />
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col gap-5">
          {/* Title */}
          <div className="flex flex-col gap-1.5">
            <div className="h-[13px] w-[80px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
            <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
          </div>

          {/* Short Description */}
          <div className="flex flex-col gap-1.5">
            <div className="h-[13px] w-[130px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
            <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
            <div className="h-[11px] w-[160px] bg-black/[0.03] dark:bg-white/[0.04] rounded-full animate-pulse" />
          </div>

          {/* Detailed Description */}
          <div className="flex flex-col gap-1.5">
            <div className="h-[13px] w-[150px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
            <div className="h-[120px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
          </div>

          {/* Problem Statement */}
          <div className="flex flex-col gap-1.5">
            <div className="h-[13px] w-[140px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
            <div className="h-[100px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
          </div>

          {/* Proposed Solution */}
          <div className="flex flex-col gap-1.5">
            <div className="h-[13px] w-[140px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
            <div className="h-[100px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
          </div>

          {/* Category + Target Audience */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="h-[13px] w-[70px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
              <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-[13px] w-[110px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
              <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Image URL + Estimated Budget */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <div className="h-[13px] w-[80px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
              <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
              <div className="h-[11px] w-[120px] bg-black/[0.03] dark:bg-white/[0.04] rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="h-[13px] w-[130px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
              <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
              <div className="h-[11px] w-[60px] bg-black/[0.03] dark:bg-white/[0.04] rounded-full animate-pulse" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-1.5">
            <div className="h-[13px] w-[40px] bg-black/[0.06] dark:bg-white/[0.08] rounded-full animate-pulse" />
            <div className="h-[36px] w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-lg animate-pulse" />
            <div className="h-[11px] w-[200px] bg-black/[0.03] dark:bg-white/[0.04] rounded-full animate-pulse" />
          </div>

          {/* Divider */}
          <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />

          {/* Submit button */}
          <div className="h-[38px] w-full bg-black/[0.08] dark:bg-white/[0.08] rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
}
