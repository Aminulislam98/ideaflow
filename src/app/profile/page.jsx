import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  HiDotsHorizontal,
  HiThumbUp,
  HiChat,
  HiBadgeCheck,
  HiMail,
  HiCalendar,
  HiLightBulb,
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

// ✅ Dynamic metadata from session
export async function generateMetadata() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;
  if (!user) return { title: "Profile | IdeaFlow" };
  return {
    title: `${user.name}'s Profile | IdeaFlow`,
    description: `View ${user.name}'s startup ideas and activity on IdeaFlow.`,
    openGraph: {
      title: `${user.name} on IdeaFlow`,
      description: `Explore ideas shared by ${user.name}`,
      images: user.image ? [{ url: user.image }] : [],
    },
  };
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/signin");

  const user = session.user;
  const userId = user.id;

  const { token } = await auth.api.getToken({ headers: await headers() });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/user/${userId}`,
    {
      headers: { authorization: `Bearer ${token}` },
      cache: "no-store",
    },
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
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-5">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Left — avatar + name */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative shrink-0">
                {user.image ? (
                  <Image
                    fill
                    src={user.image}
                    alt={user.name}
                    sizes="80px"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-black dark:bg-white flex items-center justify-center text-[24px] font-bold text-white dark:text-black">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[17px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                    {user.name}
                  </h1>
                  {user.emailVerified && (
                    <HiBadgeCheck className="text-blue-500 text-[16px] shrink-0" />
                  )}
                </div>
                <p className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] mt-0.5">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Right — stats */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-center px-4 py-2.5 bg-[#f0f2f5] dark:bg-zinc-800 rounded-xl min-w-[72px]">
                <p className="text-[18px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                  {safeIdeas.length}
                </p>
                <p className="text-[10px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                  Ideas
                </p>
              </div>
              <div className="text-center px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 rounded-xl min-w-[72px]">
                <p className="text-[18px] font-semibold text-rose-500 tracking-[-0.03em]">
                  {totalLikes}
                </p>
                <p className="text-[10px] font-normal text-rose-300 tracking-[-0.1px]">
                  Likes
                </p>
              </div>
              <div className="text-center px-4 py-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl min-w-[72px]">
                <p className="text-[18px] font-semibold text-blue-500 tracking-[-0.03em]">
                  {totalComments}
                </p>
                <p className="text-[10px] font-normal text-blue-300 tracking-[-0.1px]">
                  Comments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT — Ideas Feed */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 order-2 lg:order-1">
            {safeIdeas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-3 bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl">
                <div className="w-16 h-16 rounded-full bg-[#f0f2f5] dark:bg-zinc-800 flex items-center justify-center">
                  <HiLightBulb className="text-[30px] text-black/20 dark:text-white/20" />
                </div>
                <div className="text-center">
                  <p className="text-[15px] font-bold text-black dark:text-white tracking-[-0.02em]">
                    No ideas yet
                  </p>
                  <p className="text-[13px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] mt-1">
                    You haven't shared any ideas yet.
                  </p>
                </div>
                <Link
                  href="/add-idea"
                  className="mt-1 text-[13px] font-medium text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 px-5 py-2.5 rounded-full transition-all duration-150"
                >
                  Share your first idea
                </Link>
              </div>
            ) : (
              safeIdeas.map((idea) => {
                const color = categoryColors[idea.category] || {
                  bg: "bg-gray-50 dark:bg-gray-500/10",
                  text: "text-gray-600 dark:text-gray-400",
                };
                return (
                  <div
                    key={idea._id}
                    className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)] transition-all duration-200"
                  >
                    {/* Post Header */}
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
                            <div className="w-full h-full rounded-full bg-black dark:bg-white flex items-center justify-center text-[12px] font-bold text-white dark:text-black">
                              {user.name?.charAt(0).toUpperCase()}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <p className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px] leading-none">
                              {user.name}
                            </p>
                            {user.emailVerified && (
                              <HiBadgeCheck className="text-blue-500 text-[13px] shrink-0" />
                            )}
                          </div>
                          <p className="text-[11px] font-normal text-black/30 dark:text-white/30 tracking-[-0.1px] mt-0.5">
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
                        <button className="w-8 h-8 flex items-center justify-center rounded-full text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all duration-150">
                          <HiDotsHorizontal className="text-[18px]" />
                        </button>
                        <div className="absolute right-0 top-full mt-1 w-[160px] bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-10">
                          <Link
                            href={`/my-ideas/${idea._id}`}
                            className="w-full text-left px-4 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] tracking-[-0.1px] transition-all duration-150 flex items-center gap-2"
                          >
                            ✏️ Edit idea
                          </Link>
                          <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                          <Link
                            href={`/ideas/${idea._id}`}
                            className="w-full text-left px-4 py-2.5 text-[13px] font-normal text-black/60 dark:text-white/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] tracking-[-0.1px] transition-all duration-150 flex items-center gap-2"
                          >
                            👁️ View idea
                          </Link>
                        </div>
                      </div>
                    </div>

                    {/* Title + Description */}
                    <div className="px-4 pb-3">
                      <div className="flex items-start gap-2 mb-1.5">
                        <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em] leading-snug flex-1">
                          {idea.title}
                        </h3>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5 ${color.bg} ${color.text}`}
                        >
                          {idea.category}
                        </span>
                      </div>
                      <p className="text-[12.5px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px] leading-relaxed line-clamp-2">
                        {idea.shortDescription}
                      </p>
                    </div>

                    {/* Banner */}
                    {idea.imageURL && (
                      <div className="relative w-full h-[220px] sm:h-[260px]">
                        <Image
                          fill
                          src={idea.imageURL}
                          alt={idea.title}
                          sizes="800px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Count row */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                      <span className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                        ♥ {idea.likeCount || 0} likes
                      </span>
                      <span className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                        {idea.commentCount || 0} comments
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center px-2 py-1 gap-1">
                      <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                        <HiThumbUp className="text-[15px]" />
                        Like
                      </button>
                      <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                        <HiChat className="text-[15px]" />
                        Comment
                      </button>
                      <Link
                        href={`/ideas/${idea._id}`}
                        className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* RIGHT — Sticky Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4 order-1 lg:order-2 lg:sticky lg:top-[72px]">
            {/* About */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
              <p className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px] mb-4">
                About
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <HiMail className="text-[15px] shrink-0 text-black/30 dark:text-white/30" />
                  <span className="text-[13px] font-normal text-black/60 dark:text-white/60 tracking-[-0.1px] truncate">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HiCalendar className="text-[15px] shrink-0 text-black/30 dark:text-white/30" />
                  <span className="text-[13px] font-normal text-black/60 dark:text-white/60 tracking-[-0.1px]">
                    Joined {joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Activity */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
              <p className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px] mb-4">
                Activity
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px]">
                    Ideas posted
                  </span>
                  <span className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px]">
                    {safeIdeas.length}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px]">
                    Total likes
                  </span>
                  <span className="text-[13px] font-semibold text-rose-500 tracking-[-0.1px]">
                    {totalLikes}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px]">
                    Total comments
                  </span>
                  <span className="text-[13px] font-semibold text-blue-500 tracking-[-0.1px]">
                    {totalComments}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
              <p className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px] mb-3">
                Quick Links
              </p>
              <div className="flex flex-col gap-1">
                <Link
                  href="/my-ideas"
                  className="text-[13px] font-normal text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] px-3 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]"
                >
                  → Manage My Ideas
                </Link>
                <Link
                  href="/my-interactions"
                  className="text-[13px] font-normal text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] px-3 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]"
                >
                  → My Interactions
                </Link>
                <Link
                  href="/add-idea"
                  className="text-[13px] font-normal text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] px-3 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]"
                >
                  → Share New Idea
                </Link>
                <Link
                  href="/settings"
                  className="text-[13px] font-normal text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.04] px-3 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]"
                >
                  → Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
