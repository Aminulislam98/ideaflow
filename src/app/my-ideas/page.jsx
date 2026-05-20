import { DeleteIdeaAlert } from "@/components/buttons/DeleteIdeaAlert";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { HiPencil, HiTrash, HiBadgeCheck } from "react-icons/hi";
import { HiLightBulb } from "react-icons/hi";
const categoryColors = {
  FinTech: { bg: "bg-blue-50", text: "text-blue-600" },
  EdTech: { bg: "bg-violet-50", text: "text-violet-600" },
  HealthTech: { bg: "bg-green-50", text: "text-green-600" },
  GreenTech: { bg: "bg-emerald-50", text: "text-emerald-600" },
  SaaS: { bg: "bg-orange-50", text: "text-orange-600" },
  AgriTech: { bg: "bg-lime-50", text: "text-lime-600" },
};

export default async function MyIdeasPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;
  const userId = session?.user.id;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${userId}`,
  );
  const myIdeas = await res.json();
  console.log("this is my ideas page:", myIdeas);

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-16">
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
                <h1 className="text-[15px] font-semibold text-black tracking-[-0.02em]">
                  {user?.name}
                </h1>
                {user?.verified && (
                  <HiBadgeCheck className="text-blue-500 text-[15px] shrink-0" />
                )}
              </div>
              <p className="text-[12px] font-normal text-black/40 tracking-[-0.1px]">
                {myIdeas.length} ideas posted
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3">
            <div className="bg-white border border-black/[0.06] rounded-xl px-4 py-2.5 text-center">
              <p className="text-[18px] font-semibold text-black tracking-[-0.03em]">
                {myIdeas.reduce((a, b) => a + (b.likeCount || 0), 0)}
              </p>
              <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px]">
                Total likes
              </p>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-xl px-4 py-2.5 text-center">
              <p className="text-[18px] font-semibold text-black tracking-[-0.03em]">
                {myIdeas.reduce((a, b) => a + (b.commentCount || 0), 0)}
              </p>
              <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px]">
                Total comments
              </p>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-xl px-4 py-2.5 text-center">
              <p className="text-[18px] font-semibold text-black tracking-[-0.03em]">
                {myIdeas.length}
              </p>
              <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px]">
                Ideas
              </p>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mb-4">
          My Ideas
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {myIdeas.map((idea) => {
            const color = categoryColors[idea.category] || {
              bg: "bg-gray-50",
              text: "text-gray-600",
            };
            return (
              <div
                key={idea._id}
                className="flex flex-col bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200"
              >
                {/* Banner */}
                <div className="relative w-full h-40 shrink-0">
                  <Image
                    fill
                    src={idea.imageURL}
                    alt={idea.title}
                    sizes="400px"
                    className="object-cover"
                  />
                  {/* Category badge */}
                  <span
                    className={`absolute top-3 left-3 text-[10px] font-medium tracking-[-0.1px] px-2 py-0.5 rounded-full ${color.bg} ${color.text}`}
                  >
                    {idea.category}
                  </span>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-4">
                  <h3 className="text-[14px] font-semibold text-black tracking-[-0.02em] leading-snug mb-1.5">
                    {idea.title}
                  </h3>
                  <p className="text-[12.5px] font-normal text-black/50 tracking-[-0.1px] leading-relaxed line-clamp-2 flex-1">
                    {idea.shortDescription}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mt-3 mb-3">
                    <span className="text-[12px] font-normal text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                      ♥ {idea.likeCount}
                    </span>
                    <span className="text-[12px] font-normal text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">
                      💬 {idea.commentCount}
                    </span>
                    <span className="text-[11px] font-normal text-black/30 tracking-[-0.1px] ml-auto">
                      {new Date(idea.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-black/[0.06] mb-3" />

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/my-ideas/${idea._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-black/60 hover:text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiPencil className="text-[13px]" />
                      Edit
                    </Link>
                    {/* <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-red-400 hover:text-red-500 border border-red-100 hover:border-red-200 hover:bg-red-50 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]">
                      <HiTrash className="text-[13px]" />
                      Delete
                    </button> */}
                    <DeleteIdeaAlert idea={idea}></DeleteIdeaAlert>
                    <Link
                      href={`/ideas/${idea._id}`}
                      className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-black/60 hover:text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {myIdeas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <div className="w-20 h-20 rounded-full bg-[#f0f2f5] flex items-center justify-center">
              <HiLightBulb className="text-[36px] text-black/20" />
            </div>
            <div className="flex flex-col items-center gap-1 text-center">
              <p className="text-[15px] font-bold text-black tracking-[-0.02em]">
                No ideas yet
              </p>
              <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] max-w-[220px] leading-relaxed">
                You haven't shared any ideas yet. Your first one could change
                everything.
              </p>
            </div>
            <Link
              href="/add-idea"
              className="mt-1 text-[13px] font-medium text-white bg-black hover:bg-black/80 px-5 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
            >
              Share your first idea
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
