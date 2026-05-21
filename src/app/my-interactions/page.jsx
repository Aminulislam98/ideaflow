import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { HiThumbUp, HiChat } from "react-icons/hi";

export async function generateMetadata() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userName = session?.user?.name || "My";

  return {
    title: `${userName}'s Interactions | IdeaFlow`,
    description: "View the ideas you have liked and commented on.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function MyInteractionsPage() {
  const { token } = await auth.api.getToken({ headers: await headers() });
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  // fetch from backend
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/my-interaction/${user.id}`,
    { headers: { authorization: `Bearer ${token}` } },
  );
  const data = await res.json();
  // data.commentedIdeas → ideas user commented on (with comments)
  // data.likedIdeas     → ideas user liked

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-4">
        {/* Page Header */}
        <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
          <h1 className="text-[17px] font-semibold text-black dark:text-white tracking-[-0.03em]">
            My Interactions
          </h1>
          <p className="text-[12px] text-black/40 dark:text-white/40 mt-0.5">
            Ideas you've liked and commented on
          </p>
        </div>

        {/* ───────────────────────────── */}
        {/* COMMENTED IDEAS SECTION       */}
        {/* ───────────────────────────── */}
        {data.commentedIdeas.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-black/40 dark:text-white/40">
              Ideas you commented on
            </p>

            {data.commentedIdeas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {/* label — You commented */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50/60 dark:bg-blue-500/10 border-b border-black/[0.04] dark:border-white/[0.04]">
                  <HiChat className="text-blue-400 text-[13px]" />
                  <span className="text-[12px] text-blue-400">
                    You commented
                  </span>
                </div>

                {/* idea title */}
                <div className="px-4 pt-3 pb-2">
                  <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em]">
                    {idea.title}
                  </h3>
                </div>

                {/* my comments on this idea */}
                <div className="px-4 pb-3 flex flex-col gap-2">
                  {/* 
                    data.commentedIdeas only has the idea, not the comment text
                    we need to show the comment — so we filter from the raw comments
                    but backend doesn't send comments yet, so we show a placeholder
                    → we need to update backend to send comments too (next step)
                  */}
                  <div className="bg-[#f0f2f5] dark:bg-zinc-800 rounded-xl px-4 py-3">
                    <p className="text-[11px] font-medium text-black/30 dark:text-white/30 mb-1">
                      Your comment
                    </p>
                    <p className="text-[13px] text-black/70 dark:text-white/70 leading-relaxed">
                      {idea.myComment || "—"}
                    </p>
                  </div>
                </div>

                {/* view button */}
                <div className="px-4 pb-3">
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="text-[12px] text-black/50 dark:text-white/50 border border-black/10 dark:border-white/10 px-4 py-1.5 rounded-full hover:bg-black/[0.03] transition-all duration-150"
                  >
                    View Idea
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* LIKED IDEAS SECTION           */}

        {data.likedIdeas.length > 0 && (
          <div className="flex flex-col gap-3">
            <p className="text-[13px] text-black/40 dark:text-white/40">
              Ideas you liked
            </p>

            {data.likedIdeas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden"
              >
                {/* label — You liked */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-rose-50/60 dark:bg-rose-500/10 border-b border-black/[0.04] dark:border-white/[0.04]">
                  <HiThumbUp className="text-rose-400 text-[13px]" />
                  <span className="text-[12px] text-rose-400">
                    You liked this
                  </span>
                </div>

                {/* idea title */}
                <div className="px-4 py-3">
                  <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em]">
                    {idea.title}
                  </h3>
                </div>

                {/* view button */}
                <div className="px-4 pb-3">
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="text-[12px] text-black/50 dark:text-white/50 border border-black/10 dark:border-white/10 px-4 py-1.5 rounded-full hover:bg-black/[0.03] transition-all duration-150"
                  >
                    View Idea
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {data.commentedIdeas.length === 0 && data.likedIdeas.length === 0 && (
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
