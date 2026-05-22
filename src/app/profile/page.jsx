import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  HiThumbUp,
  HiChat,
  HiBadgeCheck,
  HiCalendar,
  HiLightBulb,
  HiPencil,
  HiDotsHorizontal,
} from "react-icons/hi";

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

export async function generateMetadata() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return { title: "Profile | IdeaVault" };
  return {
    title: `${user.name} | IdeaVault`,
    description: `View ${user.name}'s startup ideas and activity on IdeaVault.`,
  };
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const user = session.user;
  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${user.id}`,
    { headers: { authorization: `Bearer ${token}` }, cache: "no-store" },
  );

  const myIdeas = res.ok ? await res.json() : [];
  const safeIdeas = Array.isArray(myIdeas) ? myIdeas : [];
  const totalLikes = safeIdeas.reduce((a, b) => a + (b.likeCount || 0), 0);
  const totalComments = safeIdeas.reduce(
    (a, b) => a + (b.commentCount || 0),
    0,
  );
  const joinedDate = new Date(user.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-14">
      {/* ── PROFILE HEADER ── */}
      <div className="bg-white dark:bg-zinc-900 border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5">
          <div className="flex items-center justify-between gap-4">
            {/* Left — avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative shrink-0 ring-2 ring-black/[0.06] dark:ring-white/[0.08]">
                {user.image ? (
                  <Image
                    fill
                    src={user.image}
                    alt={user.name}
                    sizes="80px"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-black dark:bg-white flex items-center justify-center text-[24px] font-black text-white dark:text-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[18px] sm:text-[20px] font-black text-black dark:text-white tracking-[-0.4px] leading-tight">
                    {user.name}
                  </h1>
                  {user.emailVerified && (
                    <HiBadgeCheck className="text-blue-500 text-[16px] shrink-0" />
                  )}
                </div>
                <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5 tracking-[-0.1px]">
                  {safeIdeas.length} ideas · ♥ {totalLikes} · 💬 {totalComments}
                </p>
                <p className="text-[11px] text-black/30 dark:text-white/30 mt-0.5 tracking-[-0.1px] hidden sm:block">
                  Joined {joinedDate}
                </p>
              </div>
            </div>

            {/* Edit Profile button */}
            <Link
              href="/settings"
              className="flex items-center gap-1.5 shrink-0 text-[13px] font-black text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/[0.12] px-4 py-2 rounded-xl transition-colors duration-150 tracking-[-0.1px]"
            >
              <HiPencil className="text-[13px]" />
              <span className="hidden sm:inline">Edit Profile</span>
              <span className="sm:hidden">Edit</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto sm:px-8 sm:py-5">
        <div className="flex flex-col lg:flex-row gap-0 sm:gap-5 items-start">
          {/* ── LEFT: Ideas feed ── */}
          <div className="flex-1 min-w-0 flex flex-col order-2 lg:order-1 w-full">
            {safeIdeas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white dark:bg-zinc-900 sm:rounded-2xl sm:border border-black/[0.06] dark:border-white/[0.06] h-[calc(100vh-180px)] sm:h-auto">
                <div className="w-16 h-16 rounded-full bg-[#f0f2f5] dark:bg-zinc-800 flex items-center justify-center">
                  <HiLightBulb className="text-[30px] text-black/20 dark:text-white/20" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-black text-black dark:text-white tracking-[-0.2px]">
                    No ideas yet
                  </p>
                  <p className="text-[13px] text-black/40 dark:text-white/40 mt-1 tracking-[-0.1px]">
                    You haven't shared any ideas yet.
                  </p>
                </div>
                <Link
                  href="/add-idea"
                  className="mt-1 text-[13px] font-black text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 px-5 py-2.5 rounded-xl transition-colors duration-150"
                >
                  Share your first idea
                </Link>
              </div>
            ) : (
              <div className="flex flex-col divide-y divide-black/[0.06] dark:divide-white/[0.05] sm:divide-y-0 sm:gap-3">
                {safeIdeas.map((idea) => {
                  const color = categoryColors[idea.category] || {
                    bg: "bg-gray-50 dark:bg-gray-500/10",
                    text: "text-gray-600 dark:text-gray-400",
                  };
                  return (
                    <div
                      key={idea._id}
                      className="bg-white dark:bg-zinc-900 sm:rounded-2xl sm:border border-black/[0.06] dark:border-white/[0.06] overflow-hidden"
                    >
                      {/* Post header */}
                      <div className="flex items-center justify-between px-4 pt-4 pb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-9 h-9 rounded-full relative shrink-0">
                            {user.image ? (
                              <Image
                                fill
                                src={user.image}
                                alt={user.name}
                                sizes="36px"
                                className="rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full rounded-full bg-black dark:bg-white flex items-center justify-center text-[12px] font-black text-white dark:text-black">
                                {user.name?.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1">
                              <p className="text-[15px] font-black text-black dark:text-white tracking-[-0.2px] leading-none">
                                {user.name}
                              </p>
                              {user.emailVerified && (
                                <HiBadgeCheck className="text-blue-500 text-[12px] shrink-0" />
                              )}
                            </div>
                            <p className="text-[12px] text-black/50 dark:text-white/50 mt-0.5 tracking-[-0.1px]">
                              {new Date(idea.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )}
                            </p>
                          </div>
                        </div>

                        {/* 3 dot menu */}
                        <div className="relative group">
                          <button className="w-8 h-8 flex items-center justify-center rounded-full text-black/40 dark:text-white/40 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors duration-150">
                            <HiDotsHorizontal className="text-[18px]" />
                          </button>
                          <div className="absolute right-0 top-full mt-1 w-[160px] bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.1)] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-10">
                            <Link
                              href={`/my-ideas/${idea._id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                            >
                              ✏️ Edit idea
                            </Link>
                            <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                            <Link
                              href={`/ideas/${idea._id}`}
                              className="flex items-center gap-2 px-4 py-2.5 text-[13px] font-bold text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-colors"
                            >
                              👁️ View idea
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Title + description */}
                      <div className="px-4 pb-2">
                        <div className="flex items-start gap-2 mb-1">
                          <h3 className="text-[16px] font-black text-black dark:text-white tracking-[-0.3px] leading-snug flex-1">
                            {idea.title}
                          </h3>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${color.bg} ${color.text}`}
                          >
                            {idea.category}
                          </span>
                        </div>
                        <p className="text-[14px] text-black/70 dark:text-white/60 leading-relaxed line-clamp-2 tracking-[-0.1px]">
                          {idea.shortDescription}
                        </p>
                      </div>

                      {/* Banner */}
                      {idea.imageURL && (
                        <div className="relative w-full h-[220px] sm:h-[260px] mt-2">
                          <Image
                            fill
                            src={idea.imageURL}
                            alt={idea.title}
                            sizes="800px"
                            className="object-cover"
                          />
                        </div>
                      )}

                      {/* Like/comment count — text only like Facebook */}
                      <div className="flex items-center justify-between px-4 py-2">
                        <span className="text-[12px] text-black/40 dark:text-white/40 tracking-[-0.1px]">
                          {idea.likeCount > 0 && `♥ ${idea.likeCount}`}
                        </span>
                        <span className="text-[12px] text-black/40 dark:text-white/40 tracking-[-0.1px]">
                          {idea.commentCount > 0 &&
                            `${idea.commentCount} comments`}
                        </span>
                      </div>

                      {/* Action row — like Facebook */}
                      <div className="flex items-center border-t border-black/[0.05] dark:border-white/[0.05] mx-4">
                        <button className="flex-1 flex items-center justify-center gap-1.5 text-[14px] font-black text-black/60 dark:text-white/60 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 py-3 transition-colors duration-150 tracking-[-0.1px]">
                          <HiThumbUp className="text-[18px]" />
                          Like
                        </button>
                        <div className="w-px h-5 bg-black/[0.06] dark:bg-white/[0.06]" />
                        <button className="flex-1 flex items-center justify-center gap-1.5 text-[14px] font-black text-black/60 dark:text-white/60 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 py-3 transition-colors duration-150 tracking-[-0.1px]">
                          <HiChat className="text-[18px]" />
                          Comment
                        </button>
                        <div className="w-px h-5 bg-black/[0.06] dark:bg-white/[0.06]" />
                        <Link
                          href={`/ideas/${idea._id}`}
                          className="flex-1 flex items-center justify-center gap-1.5 text-[14px] font-black text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] py-3 transition-colors duration-150 tracking-[-0.1px]"
                        >
                          View
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── RIGHT: Sticky sidebar ── */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-3 order-1 lg:order-2 lg:sticky lg:top-[72px] px-4 sm:px-0 py-4 sm:py-0">
            {/* About */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] p-4">
              <p className="text-[12px] font-black text-black/30 dark:text-white/30 tracking-[0.8px] uppercase mb-3">
                About
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <HiCalendar className="text-[14px] text-black/30 dark:text-white/30 shrink-0" />
                  <span className="text-[13px] text-black/60 dark:text-white/60 tracking-[-0.1px]">
                    Joined {joinedDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-black/30 dark:text-white/30">
                    ✉
                  </span>
                  <span className="text-[13px] text-black/60 dark:text-white/60 tracking-[-0.1px] truncate">
                    {user.email}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] p-4">
              <p className="text-[12px] font-black text-black/30 dark:text-white/30 tracking-[0.8px] uppercase mb-3">
                Activity
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-black/70 dark:text-white/60">
                    Ideas posted
                  </span>
                  <span className="text-[13px] font-black text-black dark:text-white">
                    {safeIdeas.length}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-black/70 dark:text-white/60">
                    Total likes
                  </span>
                  <span className="text-[13px] font-black text-rose-500">
                    ♥ {totalLikes}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-semibold text-black/70 dark:text-white/60">
                    Total comments
                  </span>
                  <span className="text-[13px] font-black text-blue-500">
                    💬 {totalComments}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-black/[0.06] dark:border-white/[0.06] p-4">
              <p className="text-[12px] font-black text-black/30 dark:text-white/30 tracking-[0.8px] uppercase mb-2">
                Links
              </p>
              <div className="flex flex-col gap-0.5">
                {[
                  { href: "/my-ideas", label: "Manage My Ideas" },
                  { href: "/my-interactions", label: "My Interactions" },
                  { href: "/add-idea", label: "Share New Idea" },
                  { href: "/settings", label: "Edit Profile" },
                ].map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="text-[13px] font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.04] px-3 py-2 rounded-xl transition-colors duration-150 tracking-[-0.1px]"
                  >
                    → {l.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
