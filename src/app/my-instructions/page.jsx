import Image from "next/image";
import { HiThumbUp, HiChat, HiBadgeCheck } from "react-icons/hi";

const interactions = [
  {
    id: 1,
    type: "comment",
    myComment:
      "This is exactly what the market needs right now. Have you thought about B2B pricing?",
    commentDate: "May 13, 2025",
    idea: {
      title: "AI-Powered Personal Finance Assistant",
      category: "FinTech",
      banner:
        "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60",
      author: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      verified: true,
      likes: 142,
      comments: 38,
    },
  },
  {
    id: 2,
    type: "like",
    likedDate: "May 12, 2025",
    idea: {
      title: "Community-Based Learning Platform",
      category: "EdTech",
      banner:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
      author: "Rahul Mehta",
      avatar: "https://i.pravatar.cc/150?img=11",
      verified: false,
      likes: 98,
      comments: 21,
    },
  },
  {
    id: 3,
    type: "comment",
    myComment:
      "Love the sustainability angle. Would this work in cities with no recycling infrastructure?",
    commentDate: "May 11, 2025",
    idea: {
      title: "Hyperlocal Food Waste Marketplace",
      category: "GreenTech",
      banner:
        "https://images.unsplash.com/photo-1542601906897-b47b5fe2b67a?w=600&auto=format&fit=crop&q=60",
      author: "Emily Chen",
      avatar: "https://i.pravatar.cc/150?img=5",
      verified: false,
      likes: 76,
      comments: 17,
    },
  },
  {
    id: 4,
    type: "like",
    likedDate: "May 10, 2025",
    idea: {
      title: "Mental Health Check-In App",
      category: "HealthTech",
      banner:
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&auto=format&fit=crop&q=60",
      author: "Aminul Islam",
      avatar: "https://i.pravatar.cc/150?img=33",
      verified: true,
      likes: 210,
      comments: 54,
    },
  },
  {
    id: 5,
    type: "comment",
    myComment:
      "The async standup idea is brilliant. We use something similar at work but it's clunky.",
    commentDate: "May 9, 2025",
    idea: {
      title: "Remote Team Culture Builder",
      category: "SaaS",
      banner:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=60",
      author: "James Okafor",
      avatar: "https://i.pravatar.cc/150?img=15",
      verified: true,
      likes: 55,
      comments: 12,
    },
  },
  {
    id: 6,
    type: "like",
    likedDate: "May 8, 2025",
    idea: {
      title: "Smart Urban Farming Kit",
      category: "AgriTech",
      banner:
        "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=60",
      author: "Fatima Al-Hassan",
      avatar: "https://i.pravatar.cc/150?img=9",
      verified: false,
      likes: 189,
      comments: 43,
    },
  },
];

const categoryColors = {
  FinTech: { bg: "bg-blue-50", text: "text-blue-600" },
  EdTech: { bg: "bg-violet-50", text: "text-violet-600" },
  HealthTech: { bg: "bg-green-50", text: "text-green-600" },
  GreenTech: { bg: "bg-emerald-50", text: "text-emerald-600" },
  SaaS: { bg: "bg-orange-50", text: "text-orange-600" },
  AgriTech: { bg: "bg-lime-50", text: "text-lime-600" },
};

const totalLikes = interactions.filter((i) => i.type === "like").length;
const totalComments = interactions.filter((i) => i.type === "comment").length;

export default function MyInteractionsPage() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-16">
      <div className="max-w-3xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-5">
        {/* Page Header */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-[17px] font-semibold text-black tracking-[-0.03em]">
                My Interactions
              </h1>
              <p className="text-[12px] font-normal text-black/40 tracking-[-0.1px] mt-0.5">
                Ideas you've liked and commented on
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="flex items-center gap-1.5 text-[12px] font-normal text-rose-500 bg-rose-50 px-3 py-1.5 rounded-full tracking-[-0.1px]">
                <HiThumbUp className="text-[13px]" />
                {totalLikes} likes
              </div>
              <div className="flex items-center gap-1.5 text-[12px] font-normal text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full tracking-[-0.1px]">
                <HiChat className="text-[13px]" />
                {totalComments} comments
              </div>
            </div>
          </div>
        </div>

        {/* Section Label */}
        <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] -mb-2">
          All Interactions
        </p>

        {/* Feed */}
        {interactions.map((item) => {
          const color = categoryColors[item.idea.category] || {
            bg: "bg-gray-50",
            text: "text-gray-600",
          };
          return (
            <div
              key={item.id}
              className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-200"
            >
              {/* Interaction type label */}
              <div
                className={`flex items-center gap-2 px-4 py-2.5 border-b border-black/[0.04] ${
                  item.type === "like" ? "bg-rose-50/60" : "bg-blue-50/60"
                }`}
              >
                {item.type === "like" ? (
                  <>
                    <HiThumbUp className="text-rose-400 text-[13px]" />
                    <span className="text-[12px] font-normal text-rose-400 tracking-[-0.1px]">
                      You liked this · {item.likedDate}
                    </span>
                  </>
                ) : (
                  <>
                    <HiChat className="text-blue-400 text-[13px]" />
                    <span className="text-[12px] font-normal text-blue-400 tracking-[-0.1px]">
                      You commented · {item.commentDate}
                    </span>
                  </>
                )}
              </div>

              {/* Idea author row */}
              <div className="flex items-center justify-between px-4 pt-3 pb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full relative shrink-0">
                    <Image
                      fill
                      src={item.idea.avatar}
                      alt={item.idea.author}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px] font-semibold text-black tracking-[-0.1px] leading-none">
                        {item.idea.author}
                      </p>
                      {item.idea.verified && (
                        <HiBadgeCheck className="text-blue-500 text-[13px] shrink-0" />
                      )}
                    </div>
                  </div>
                </div>
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${color.bg} ${color.text}`}
                >
                  {item.idea.category}
                </span>
              </div>

              {/* Idea title */}
              <div className="px-4 pb-2">
                <h3 className="text-[14px] font-semibold text-black tracking-[-0.02em] leading-snug">
                  {item.idea.title}
                </h3>
              </div>

              {/* Banner */}
              <div className="relative w-full h-[180px] sm:h-[220px]">
                <Image
                  fill
                  src={item.idea.banner}
                  alt={item.idea.title}
                  className="object-cover"
                />
              </div>

              {/* My comment — only for comment type */}
              {item.type === "comment" && (
                <div className="mx-4 my-3 bg-[#f0f2f5] rounded-xl px-4 py-3">
                  <p className="text-[11px] font-medium text-black/30 tracking-[-0.1px] mb-1">
                    Your comment
                  </p>
                  <p className="text-[13px] font-normal text-black/70 tracking-[-0.1px] leading-relaxed">
                    {item.myComment}
                  </p>
                </div>
              )}

              {/* Stats + action */}
              <div className="flex items-center justify-between px-4 py-2.5 border-t border-black/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-normal text-black/30 tracking-[-0.1px]">
                    ♥ {item.idea.likes}
                  </span>
                  <span className="text-[12px] font-normal text-black/30 tracking-[-0.1px]">
                    💬 {item.idea.comments}
                  </span>
                </div>
                <button className="text-[12px] font-normal text-black/50 hover:text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] px-4 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]">
                  View Idea
                </button>
              </div>
            </div>
          );
        })}

        {/* Empty state */}
        {interactions.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-[32px]">💬</p>
            <p className="text-[15px] font-semibold text-black tracking-[-0.02em]">
              No interactions yet
            </p>
            <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px]">
              Like or comment on ideas to see them here
            </p>
            <a
              href="/ideas"
              className="mt-2 text-[13px] font-normal text-white bg-black hover:bg-black/80 px-5 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
            >
              Explore Ideas
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
