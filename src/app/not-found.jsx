"use client";

import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center px-5 bg-white">
      {/* 404 Number */}
      <p className="text-[clamp(6rem,20vw,14rem)] font-semibold text-black/[0.04] leading-none tracking-[-0.04em] select-none">
        404
      </p>

      {/* Content */}
      <div className="flex flex-col items-center gap-3 -mt-4 sm:-mt-8">
        <h1 className="text-[clamp(1.25rem,3vw,1.75rem)] font-semibold text-black tracking-[-0.03em] leading-tight text-center">
          Page not found
        </h1>
        <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] text-center max-w-[280px] leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 mt-8">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] font-normal text-white bg-black hover:bg-black/80 px-5 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
        >
          <HiArrowLeft className="text-[12px]" />
          Back to home
        </Link>
        <Link
          href="/ideas"
          className="text-[13px] font-normal text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] px-5 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
        >
          Explore ideas
        </Link>
      </div>
    </div>
  );
}
