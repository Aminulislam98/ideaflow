import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { HiThumbUp, HiChat, HiBadgeCheck } from "react-icons/hi";

const categoryColors = {
  FinTech: { bg: "bg-blue-50", text: "text-blue-600" },
  EdTech: { bg: "bg-violet-50", text: "text-violet-600" },
  HealthTech: { bg: "bg-green-50", text: "text-green-600" },
  GreenTech: { bg: "bg-emerald-50", text: "text-emerald-600" },
  SaaS: { bg: "bg-orange-50", text: "text-orange-600" },
  AgriTech: { bg: "bg-lime-50", text: "text-lime-600" },
};

export default async function MyInteractionsPage() {
  // get logged in user and token
  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  // fetch commented and liked ideas from backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-interaction/${user.id}`,
    { headers: { authorization: `Bearer ${token}` } },
  );
  const data = await res.json();

  // tag each commented idea
  const commentedWithTag = data.commentedIdeas.map((idea) => ({
    ...idea,
    interactionType: "comment",
  }));

  // tag each liked idea
  const likedWithTag = data.likedIdeas.map((idea) => ({
    ...idea,
    interactionType: "like",
  }));

  // merge both into one array
  const allIdeas = [...commentedWithTag, ...likedWithTag];

  // deduplicate — if same idea in both, mark as "both"
  const seen = {};
  allIdeas.forEach((idea) => {
    const key = idea._id.toString();
    if (seen[key]) {
      seen[key].interactionType = "both";
    } else {
      seen[key] = { ...idea };
    }
  });

  // shape data for UI
  const interactions = Object.values(seen).map((idea) => ({
    id: idea._id,
    type: idea.interactionType,
    date: new Date(idea.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    idea: {
      _id: idea._id,
      title: idea.title,
      category: idea.category,
      banner: idea.imageURL,
      authorName: idea.author?.name,
      authorPhoto: idea.author?.photo,
      // these come directly from the ideas collection
      likes: idea.likeCount,
      comments: idea.commentCount,
    },
  }));

  // counts for header badges
  const totalLikes = interactions.filter(
    (i) => i.type === "like" || i.type === "both",
  ).length;
  const totalComments = interactions.filter(
    (i) => i.type === "comment" || i.type === "both",
  ).length;

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-5">
        {/* Page Header */}
        <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[17px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                My Interactions
              </h1>
              <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">
                Ideas you've liked and commented on
              </p>
            </div>

            {/* total likes and comments badges */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 text-[12px] text-rose-500 bg-rose-50 dark:bg-rose-500/10 px-3 py-1.5 rounded-full">
                <HiThumbUp className="text-[13px]" />
                {totalLikes} likes
              </div>
              <div className="flex items-center gap-1.5 text-[12px] text-blue-500 bg-blue-50 dark:bg-blue-500/10 px-3 py-1.5 rounded-full">
                <HiChat className="text-[13px]" />
                {totalComments} comments
              </div>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <p className="text-[13px] text-black/40 dark:text-white/40 -mb-2">
          All Interactions
        </p>

        {/* Idea Cards */}
        {interactions.map((item) => {
          const color = categoryColors[item.idea.category] || {
            bg: "bg-gray-50",
            text: "text-gray-600",
          };

          return (
            <div
              key={item.id}
              className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden"
            >
              {/* top label — liked / commented / both */}
              <div
                className={`flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.04] dark:border-white/[0.04]
                  ${item.type === "like" ? "bg-rose-50/60 dark:bg-rose-500/10" : ""}
                  ${item.type === "comment" ? "bg-blue-50/60 dark:bg-blue-500/10" : ""}
                  ${item.type === "both" ? "bg-purple-50/60 dark:bg-purple-500/10" : ""}
                `}
              >
                {item.type === "like" && (
                  <>
                    <HiThumbUp className="text-rose-400 text-[13px]" />
                    <span className="text-[12px] text-rose-400">
                      Liked · {item.date}
                    </span>
                  </>
                )}
                {item.type === "comment" && (
                  <>
                    <HiChat className="text-blue-400 text-[13px]" />
                    <span className="text-[12px] text-blue-400">
                      Commented · {item.date}
                    </span>
                  </>
                )}
                {item.type === "both" && (
                  <>
                    <HiThumbUp className="text-purple-400 text-[13px]" />
                    <HiChat className="text-purple-400 text-[13px]" />
                    <span className="text-[12px] text-purple-400">
                      Liked & Commented · {item.date}
                    </span>
                  </>
                )}
              </div>

              {/* idea author row */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full relative shrink-0">
                    <Image
                      fill
                      src={item.idea.authorPhoto}
                      alt={item.idea.authorName}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-semibold text-black dark:text-white">
                      {item.idea.authorName}
                    </p>
                    <HiBadgeCheck className="text-blue-500 text-[13px]" />
                  </div>
                </div>
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}
                >
                  {item.idea.category}
                </span>
              </div>

              {/* idea title */}
              <div className="px-4 pb-3">
                <h3 className="text-[14px] font-semibold text-black dark:text-white">
                  {item.idea.title}
                </h3>
              </div>

              {/* idea banner image */}
              <div className="relative w-full h-[180px] sm:h-[220px]">
                <Image
                  fill
                  src={item.idea.banner}
                  alt={item.idea.title}
                  className="object-cover"
                />
              </div>

              {/* like count and comment count — bigger and easy to read */}
              <div className="flex items-center justify-between px-4 py-3 border-t border-black/[0.04] dark:border-white/[0.04]">
                <div className="flex items-center gap-4">
                  {/* like count */}
                  <div className="flex items-center gap-1.5">
                    <HiThumbUp className="text-rose-400 text-[16px]" />
                    <span className="text-[15px] font-semibold text-black dark:text-white">
                      {item.idea.likes}
                    </span>
                    <span className="text-[12px] text-black/40 dark:text-white/40">
                      likes
                    </span>
                  </div>

                  {/* comment count */}
                  <div className="flex items-center gap-1.5">
                    <HiChat className="text-blue-400 text-[16px]" />
                    <span className="text-[15px] font-semibold text-black dark:text-white">
                      {item.idea.comments}
                    </span>
                    <span className="text-[12px] text-black/40 dark:text-white/40">
                      comments
                    </span>
                  </div>
                </div>

                {/* view idea link */}
                <Link
                  href={`/ideas/${item.idea._id}`}
                  className="text-[12px] text-black/50 dark:text-white/50 border border-black/10 dark:border-white/10 px-4 py-1.5 rounded-full hover:bg-black/[0.03] dark:hover:bg-white/[0.03] transition-all duration-150"
                >
                  View Idea
                </Link>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {interactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-[32px]">💬</p>
            <p className="text-[15px] font-semibold text-black dark:text-white">
              No interactions yet
            </p>
            <p className="text-[13px] text-black/40 dark:text-white/40">
              Like or comment on ideas to see them here
            </p>
            <Link
              href="/ideas"
              className="mt-2 text-[13px] text-white dark:text-black bg-black dark:bg-white px-5 py-2 rounded-full"
            >
              Explore Ideas
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
