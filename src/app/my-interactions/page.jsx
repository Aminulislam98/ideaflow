import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { HiThumbUp, HiChat } from "react-icons/hi";
import { IoIosReturnRight } from "react-icons/io";
import { LuThumbsUp } from "react-icons/lu";
import { MdOutlineModeComment } from "react-icons/md";

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
    <div className="min-h-screen w-full sm:bg-[#f0f2f5] dark:bg-zinc-950 pt-13">
      <div className="max-w-2xl mx-auto sm:px-5  sm:py-6 flex flex-col gap-4">
        {/* ───────────────────────────── */}
        {/* COMMENTED IDEAS SECTION       */}
        {/* ───────────────────────────── */}
        {data.commentedIdeas.length > 0 && (
          <div className="flex flex-col  gap-0.5 sm:gap-2 py-2">
            <p className="text-xl font-semibold py-2 text-black px-3 dark:text-white/40">
              Ideas you commented on
            </p>

            {data.commentedIdeas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-zinc-900 border-b-2 sm:border border-black/20 dark:border-white/[0.06] sm:rounded-2xl overflow-hidden "
              >
                {/* label — You commented */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-green-50/60 dark:bg-blue-500/10 border-b border-black/[0.04] dark:border-white/[0.04] ">
                  <MdOutlineModeComment className="text-green-500 text-xl" />
                  <span className="text-base text-green-400">
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
                    <div className="text-sm font-medium  text-black/60 dark:text-white/30 mb-1">
                      Your comment
                    </div>
                    <div className="text-base text-black/70 dark:text-white/70 leading-relaxed flex justify-start items-center gap-2">
                      <IoIosReturnRight className="text-2xl font-black text-green-600" />
                      {idea.myComment || "—"}
                    </div>
                  </div>
                </div>

                {/* view button */}
                <div className="px-4 pb-3 flex justify-end">
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="text-base text-green-600 dark:text-white/50 border border-green-600 rounded-xl dark:border-white/10 px-4 py-1.5  hover:bg-black/[0.03] transition-all duration-150"
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
          <div className="flex flex-col  gap-0.5 sm:gap-2">
            <p className="text-xl py-2 font-semibold text-black dark:text-white/40 px-3">
              Ideas you liked
            </p>

            {data.likedIdeas.map((idea) => (
              <div
                key={idea._id}
                className="bg-white dark:bg-zinc-900 border-b-2 sm:border border-black/20 dark:border-white/[0.06] sm:rounded-2xl overflow-hidden"
              >
                {/* label — You liked */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-50/60 dark:bg-blue-500/10 border-b border-black/[0.04] dark:border-white/[0.04]">
                  <LuThumbsUp className="text-blue-500 text-xl" />
                  <span className="text-base font-semibold text-blue-400">
                    You liked this
                  </span>
                </div>

                {/* idea title */}
                <div className="px-4 py-3">
                  <h3 className="text-base font-semibold text-black dark:text-white tracking-[-0.02em]">
                    {idea.title}
                  </h3>
                </div>

                {/* view button */}
                <div className="px-4 p-3 flex justify-end">
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="text-base text-blue-500 dark:text-white/50 border border-blue-600  rounded-xl dark:border-white/10 px-4 py-1.5  hover:bg-black/[0.03] transition-all duration-150"
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
