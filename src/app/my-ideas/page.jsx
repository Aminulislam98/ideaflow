import { DeleteIdeaAlert } from "@/components/buttons/DeleteIdeaAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiBadgeCheck, HiLightBulb } from "react-icons/hi";

export async function generateMetadata() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user?.name;

  return {
    title: userName ? `${userName}'s Ideas | IdeaFlow` : "My Ideas | IdeaFlow",
    description:
      "Manage, edit, and track the performance of your shared ideas.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

const categoryColors = {
  FinTech: {
    bg: "bg-blue-50 dark:bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
  },
  EdTech: {
    bg: "bg-violet-50 dark:bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
  },
  HealthTech: {
    bg: "bg-green-50 dark:bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
  },
  GreenTech: {
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    text: "text-emerald-600 dark:text-emerald-400",
  },
  SaaS: {
    bg: "bg-orange-50 dark:bg-orange-500/10",
    text: "text-orange-600 dark:text-orange-400",
  },
  AgriTech: {
    bg: "bg-lime-50 dark:bg-lime-500/10",
    text: "text-lime-600 dark:text-lime-400",
  },
};

export default async function MyIdeasPage() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  const userId = session?.user.id;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${userId}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    },
  );
  const myIdeas = await res.json();

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full relative shrink-0">
              <Image
                fill
                src={user?.image}
                alt={user?.name}
                sizes="40px"
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-[15px] font-semibold text-black dark:text-white tracking-[-0.02em]">
                  {user?.name}
                </h1>
                {user?.verified && (
                  <HiBadgeCheck className="text-blue-500 text-[15px] shrink-0" />
                )}
              </div>
              <p className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                {myIdeas.length} ideas posted
              </p>
            </div>
          </div>

          {/* Stats Cards Row */}
          <div className="flex items-center gap-3">
            {[
              {
                value: myIdeas.reduce((a, b) => a + (b.likeCount || 0), 0),
                label: "Total likes",
              },
              {
                value: myIdeas.reduce((a, b) => a + (b.commentCount || 0), 0),
                label: "Total comments",
              },
              { value: myIdeas.length, label: "Ideas" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-xl px-4 py-2.5 text-center min-w-[90px]"
              >
                <p className="text-[18px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                  {stat.value}
                </p>
                <p className="text-[11px] font-normal text-black/30 dark:text-white/30 tracking-[-0.1px]">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Label */}
        <p className="text-[13px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] mb-4">
          My Ideas
        </p>

        {/* Main Grid Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myIdeas.map((idea) => {
            const color = categoryColors[idea.category] || {
              bg: "bg-gray-50 dark:bg-zinc-800",
              text: "text-gray-600 dark:text-zinc-400",
            };
            return (
              <div
                key={idea._id}
                className="flex flex-col bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200"
              >
                {/* Banner wrapper block */}
                <div className="relative w-full h-40 shrink-0">
                  <Image
                    fill
                    src={idea.imageURL}
                    alt={idea.title}
                    sizes="400px"
                    className="object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-medium tracking-[-0.1px] px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}
                  >
                    {idea.category}
                  </span>
                </div>

                {/* Card Body content */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em] leading-snug mb-1.5">
                    {idea.title}
                  </h3>
                  <p className="text-[12.5px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px] leading-relaxed line-clamp-2 flex-1">
                    {idea.shortDescription}
                  </p>

                  {/* Feed Interaction data layer */}
                  <div className="flex items-center gap-3 mt-3 mb-3">
                    <span className="text-[12px] font-normal text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 px-2 py-0.5 rounded-full">
                      ♥ {idea.likeCount}
                    </span>
                    <span className="text-[12px] font-normal text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-0.5 rounded-full">
                      💬 {idea.commentCount}
                    </span>
                    <span className="text-[11px] font-normal text-black/30 dark:text-white/30 tracking-[-0.1px] ml-auto">
                      {new Date(idea.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mb-3" />

                  {/* Actions wrapper row */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/my-ideas/${idea._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiPencil className="text-[13px]" />
                      Edit
                    </Link>

                    <DeleteIdeaAlert idea={idea} />

                    <Link
                      href={`/ideas/${idea._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Adaptive empty state box wrapper */}
        {myIdeas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3   mt-6">
            <div className="w-16 h-16 rounded-full bg-black/[0.03] dark:bg-zinc-800 flex items-center justify-center">
              <HiLightBulb className="text-[32px] text-black/30 dark:text-white/30" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center px-4">
              <p className="text-[15px] font-bold text-black dark:text-white tracking-[-0.02em]">
                No ideas yet
              </p>
              <p className="text-[13px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] max-w-[220px] leading-relaxed">
                You haven't shared any ideas yet. Your first one could change
                everything.
              </p>
            </div>
            <Link
              href="/add-idea"
              className="mt-1 text-[13px] font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 px-5 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
            >
              Share your first idea
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
