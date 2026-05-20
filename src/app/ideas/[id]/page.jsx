import Image from "next/image";
import {
  HiThumbUp,
  HiBadgeCheck,
  HiCalendar,
  HiTag,
  HiUsers,
  HiCurrencyDollar,
  HiLightBulb,
  HiShare,
} from "react-icons/hi";
import NewCommentOnPost from "@/components/comment/Comment";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function generateMetadata({ params }) {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const idea = await res.json();

  return {
    title: idea?.title,
    description: idea.shortDescription,
  };
}

// ─── MAIN PAGE
export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  const user = session?.user;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const idea = await res.json();

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        {/* Banner */}
        <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-2xl mb-4">
          <Image
            fill
            src={idea.imageURL}
            alt={idea.title}
            className="object-cover scale-110 blur-2xl brightness-50"
            aria-hidden="true"
          />
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image
              fill
              src={idea.imageURL}
              alt={idea.title}
              sizes="(max-width: 768px) 40px, 44px"
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Title + Meta */}
        <div className="bg-white border border-black/[0.08] rounded-2xl px-5 py-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="inline-block text-[11px] font-medium tracking-[0.5px] uppercase text-black/40 mb-2">
                {idea.category}
              </span>
              <h1 className="text-[20px] sm:text-[24px] font-bold text-black tracking-[-0.03em] leading-tight">
                {idea.title}
              </h1>
              <p className="text-[13px] font-normal text-black/50 tracking-[-0.1px] mt-1.5 leading-relaxed">
                {idea.shortDescription}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-black hover:text-blue-600 hover:bg-blue-50 border border-black/10 hover:border-blue-200 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]">
                <HiThumbUp className="text-[15px]" />
                Like
                <span className="text-[12px] font-normal">
                  {idea.likeCount}
                </span>
              </button>
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-black hover:bg-black/[0.05] border border-black/10 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]">
                <HiShare className="text-[15px]" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Author */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full relative shrink-0">
                  <Image
                    src={idea?.author.photo}
                    alt={idea.author.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-[14px] font-bold text-black tracking-[-0.1px]">
                      {idea.author.name}
                    </p>
                    <HiBadgeCheck className="text-blue-500 text-[15px]" />
                  </div>
                  <p className="text-[12px] font-normal text-black/50 tracking-[-0.1px]">
                    {idea.author.email}
                  </p>
                  <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                    Posted{" "}
                    {new Date(idea.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <h2 className="text-[15px] font-bold text-black tracking-[-0.02em] mb-3">
                About this idea
              </h2>
              <p className="text-[13.5px] font-normal text-black leading-relaxed tracking-[-0.1px]">
                {idea.detailedDescription}
              </p>
            </div>

            {/* Problem + Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-red-500 text-[13px]">⚠</span>
                  </div>
                  <h2 className="text-[14px] font-bold text-black tracking-[-0.02em]">
                    Problem
                  </h2>
                </div>
                <p className="text-[13px] font-normal text-black leading-relaxed tracking-[-0.1px]">
                  {idea.problemStatement}
                </p>
              </div>

              <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <HiLightBulb className="text-green-500 text-[14px]" />
                  </div>
                  <h2 className="text-[14px] font-bold text-black tracking-[-0.02em]">
                    Solution
                  </h2>
                </div>
                <p className="text-[13px] font-normal text-black leading-relaxed tracking-[-0.1px]">
                  {idea.proposedSolution}
                </p>
              </div>
            </div>

            {/* ───── COMMENTS SECTION  */}
            <NewCommentOnPost idea={idea} />
            {/* ───── END COMMENTS SECTION ───── */}
          </div>

          {/* RIGHT — Sticky Sidebar (unchanged) */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-[72px]">
            {/* Stats */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-black tracking-[-0.1px] mb-4">
                Stats
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black tracking-[-0.1px]">
                    Likes
                  </span>
                  <span className="text-[13px] font-bold text-rose-500 tracking-[-0.1px]">
                    ♥ {idea.likeCount}
                  </span>
                </div>
                <div className="h-px bg-black/[0.06]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black tracking-[-0.1px]">
                    Comments
                  </span>
                  <span className="text-[13px] font-bold text-blue-500 tracking-[-0.1px]">
                    💬 {idea.commentCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-black tracking-[-0.1px] mb-4">
                Details
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <HiUsers className="text-[15px] text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                      Target Audience
                    </p>
                    <p className="text-[13px] font-normal text-black tracking-[-0.1px]">
                      {idea.targetAudience}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-black/[0.06]" />
                <div className="flex items-start gap-2.5">
                  <HiCurrencyDollar className="text-[15px] text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                      Estimated Budget
                    </p>
                    <p className="text-[13px] font-normal text-black tracking-[-0.1px]">
                      {idea.estimatedBudget}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-black/[0.06]" />
                <div className="flex items-start gap-2.5">
                  <HiCalendar className="text-[15px] text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                      Posted
                    </p>
                    <p className="text-[13px] font-normal text-black tracking-[-0.1px]">
                      {new Date(idea.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <HiTag className="text-[14px] text-black" />
                <p className="text-[14px] font-bold text-black tracking-[-0.1px]">
                  Tags
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-normal text-black bg-black/[0.05] hover:bg-black/[0.1] px-3 py-1 rounded-full tracking-[-0.1px] cursor-pointer transition-all duration-150"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-black tracking-[-0.1px] mb-4">
                Posted by
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full relative shrink-0">
                  {idea?.author?.photo && (
                    <div className="relative w-11 h-11">
                      <Image
                        fill
                        sizes="44px"
                        src={idea.author.photo}
                        alt={idea.author.name}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-bold text-black tracking-[-0.1px]">
                      {idea.author.name}
                    </p>
                    <HiBadgeCheck className="text-blue-500 text-[13px]" />
                  </div>
                  <p className="text-[11px] font-normal text-black/50 tracking-[-0.1px]">
                    {idea.author.email}
                  </p>
                </div>
              </div>
              <button className="w-full text-[13px] font-medium text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-2 rounded-full transition-all duration-150 tracking-[-0.1px]">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
