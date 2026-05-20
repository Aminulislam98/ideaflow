import Image from "next/image";
import {
  HiDotsHorizontal,
  HiThumbUp,
  HiChat,
  HiBadgeCheck,
  HiLocationMarker,
  HiMail,
  HiCalendar,
} from "react-icons/hi";

const user = {
  name: "Aminul Islam",
  email: "aminul@aminulislam.co.uk",
  avatar: "https://i.pravatar.cc/150?img=33",
  verified: true,
  location: "London, UK",
  joined: "January 2024",
  bio: "Passionate about startups, tech & innovation. Building ideas one day at a time.",
  totalIdeas: 6,
  totalLikes: 770,
  totalComments: 185,
};

const myIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Finance Assistant",
    category: "FinTech",
    banner:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60",
    description:
      "An intelligent assistant that tracks your spending habits and gives personalized saving tips.",
    displayDate: "May 12, 2025",
    likes: 142,
    comments: 38,
  },
  {
    id: 2,
    title: "Community-Based Learning Platform",
    category: "EdTech",
    banner:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
    description:
      "A peer-to-peer learning platform where students teach each other skills.",
    displayDate: "May 10, 2025",
    likes: 98,
    comments: 21,
  },
  {
    id: 3,
    title: "Mental Health Check-In App",
    category: "HealthTech",
    banner:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&auto=format&fit=crop&q=60",
    description:
      "A daily mood tracking app that connects users with therapists.",
    displayDate: "May 9, 2025",
    likes: 210,
    comments: 54,
  },
  {
    id: 4,
    title: "Hyperlocal Food Waste Marketplace",
    category: "GreenTech",
    banner:
      "https://images.unsplash.com/photo-1542601906897-b47b5fe2b67a?w=600&auto=format&fit=crop&q=60",
    description: "Connects restaurants with surplus food to nearby shelters.",
    displayDate: "May 8, 2025",
    likes: 76,
    comments: 17,
  },
  {
    id: 5,
    title: "Remote Team Culture Builder",
    category: "SaaS",
    banner:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=60",
    description:
      "A platform that helps remote companies build culture through async standups.",
    displayDate: "May 7, 2025",
    likes: 55,
    comments: 12,
  },
  {
    id: 6,
    title: "Smart Urban Farming Kit",
    category: "AgriTech",
    banner:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=60",
    description:
      "An IoT-powered home farming kit that lets city dwellers grow vegetables.",
    displayDate: "May 6, 2025",
    likes: 189,
    comments: 43,
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

export default function ProfilePage() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950 pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6 flex flex-col gap-5">
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            {/* Left — avatar + name + bio */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full relative shrink-0">
                <Image
                  fill
                  src={user.avatar}
                  alt={user.name}
                  className="rounded-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[17px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                    {user.name}
                  </h1>
                  {user.verified && (
                    <HiBadgeCheck className="text-blue-500 text-[16px] shrink-0" />
                  )}
                </div>
                <p className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] mt-0.5 max-w-xs">
                  {user.bio}
                </p>
              </div>
            </div>

            {/* Right — stats */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="text-center px-4 py-2.5 bg-[#f0f2f5] dark:bg-zinc-800 rounded-xl min-w-[72px]">
                <p className="text-[18px] font-semibold text-black dark:text-white tracking-[-0.03em]">
                  {user.totalIdeas}
                </p>
                <p className="text-[10px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                  Ideas
                </p>
              </div>
              <div className="text-center px-4 py-2.5 bg-rose-50 dark:bg-rose-500/10 rounded-xl min-w-[72px]">
                <p className="text-[18px] font-semibold text-rose-500 tracking-[-0.03em]">
                  {user.totalLikes}
                </p>
                <p className="text-[10px] font-normal text-rose-300 tracking-[-0.1px]">
                  Likes
                </p>
              </div>
              <div className="text-center px-4 py-2.5 bg-blue-50 dark:bg-blue-500/10 rounded-xl min-w-[72px]">
                <p className="text-[18px] font-semibold text-blue-500 tracking-[-0.03em]">
                  {user.totalComments}
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
          {/* LEFT — Posts Feed */}
          <div className="flex-1 min-w-0 flex flex-col gap-4 order-2 lg:order-1">
            {myIdeas.map((idea) => {
              const color = categoryColors[idea.category] || {
                bg: "bg-gray-50",
                text: "text-gray-600",
              };
              return (
                <div
                  key={idea.id}
                  className="bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_4px_20px_rgb(0,0,0,0.3)] transition-all duration-200"
                >
                  {/* Post Header */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full relative shrink-0">
                        <Image
                          fill
                          src={user.avatar}
                          alt={user.name}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          <p className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px] leading-none">
                            {user.name}
                          </p>
                          {user.verified && (
                            <HiBadgeCheck className="text-blue-500 text-[13px] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] font-normal text-black/30 dark:text-white/30 tracking-[-0.1px] mt-0.5">
                          {idea.displayDate}
                        </p>
                      </div>
                    </div>

                    {/* 3 dot menu */}
                    <div className="relative group">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all duration-150">
                        <HiDotsHorizontal className="text-[18px]" />
                      </button>
                      <div className="absolute right-0 top-full mt-1 w-[160px] bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-10">
                        <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] tracking-[-0.1px] transition-all duration-150">
                          ✏️ Edit idea
                        </button>
                        <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                        <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal text-red-500 hover:bg-red-50/60 dark:hover:bg-red-500/10 tracking-[-0.1px] transition-all duration-150">
                          🗑️ Delete idea
                        </button>
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
                      {idea.description}
                    </p>
                  </div>

                  {/* Banner */}
                  <div className="relative w-full h-[220px] sm:h-[260px]">
                    <Image
                      fill
                      src={idea.banner}
                      alt={idea.title}
                      className="object-cover"
                    />
                  </div>

                  {/* Count row */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.05] dark:border-white/[0.05]">
                    <span className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                      ♥ {idea.likes} likes
                    </span>
                    <span className="text-[12px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
                      {idea.comments} comments
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center px-2 py-1 gap-1">
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                      <HiThumbUp className="text-[15px]" />
                      Like
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-500/10 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                      <HiChat className="text-[15px]" />
                      Comment
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
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
                  <HiLocationMarker className="text-[15px] shrink-0 text-black/30 dark:text-white/30" />
                  <span className="text-[13px] font-normal text-black/60 dark:text-white/60 tracking-[-0.1px]">
                    {user.location}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HiMail className="text-[15px] shrink-0 text-black/30 dark:text-white/30" />
                  <span className="text-[13px] font-normal text-black/60 dark:text-white/60 tracking-[-0.1px] truncate">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <HiCalendar className="text-[15px] shrink-0 text-black/30 dark:text-white/30" />
                  <span className="text-[13px] font-normal text-black/60 dark:text-white/60 tracking-[-0.1px]">
                    Joined {user.joined}
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
                    {user.totalIdeas}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px]">
                    Total likes
                  </span>
                  <span className="text-[13px] font-semibold text-rose-500 tracking-[-0.1px]">
                    {user.totalLikes}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px]">
                    Total comments
                  </span>
                  <span className="text-[13px] font-semibold text-blue-500 tracking-[-0.1px]">
                    {user.totalComments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
