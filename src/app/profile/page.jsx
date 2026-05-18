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
  cover:
    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=1200&auto=format&fit=crop&q=60",
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
    <div className="min-h-screen w-full bg-[#f0f2f5]">
      {/* Cover + Avatar */}
      <div className="w-full bg-white border-b border-black/[0.06]">
        {/* Cover Photo */}
        <div className="relative w-full h-[220px] sm:h-[280px] lg:h-[320px]">
          <Image
            fill
            src={user.cover}
            alt="Cover"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Avatar + Name row */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-12 sm:-mt-14 pb-5">
            {/* Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white relative shrink-0 shadow-md">
              <Image
                fill
                src={user.avatar}
                alt={user.name}
                className="rounded-full object-cover"
              />
            </div>

            {/* Name + stats */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between flex-1 gap-3 sm:pb-1">
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="text-[20px] font-semibold text-black tracking-[-0.03em]">
                    {user.name}
                  </h1>
                  {user.verified && (
                    <HiBadgeCheck className="text-blue-500 text-[18px] shrink-0" />
                  )}
                </div>
                <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mt-0.5">
                  {user.bio}
                </p>
              </div>

              {/* Stats pills */}
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-center px-4 py-2 bg-[#f0f2f5] rounded-xl">
                  <p className="text-[16px] font-semibold text-black tracking-[-0.03em]">
                    {user.totalIdeas}
                  </p>
                  <p className="text-[10px] font-normal text-black/40 tracking-[-0.1px]">
                    Ideas
                  </p>
                </div>
                <div className="text-center px-4 py-2 bg-[#f0f2f5] rounded-xl">
                  <p className="text-[16px] font-semibold text-black tracking-[-0.03em]">
                    {user.totalLikes}
                  </p>
                  <p className="text-[10px] font-normal text-black/40 tracking-[-0.1px]">
                    Likes
                  </p>
                </div>
                <div className="text-center px-4 py-2 bg-[#f0f2f5] rounded-xl">
                  <p className="text-[16px] font-semibold text-black tracking-[-0.03em]">
                    {user.totalComments}
                  </p>
                  <p className="text-[10px] font-normal text-black/40 tracking-[-0.1px]">
                    Comments
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT — User Details */}
          <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-4">
            {/* About Card */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-5">
              <p className="text-[13px] font-semibold text-black tracking-[-0.1px] mb-4">
                About
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5 text-[13px] font-normal text-black/60 tracking-[-0.1px]">
                  <HiLocationMarker className="text-[15px] shrink-0 text-black/30" />
                  {user.location}
                </div>
                <div className="flex items-center gap-2.5 text-[13px] font-normal text-black/60 tracking-[-0.1px]">
                  <HiMail className="text-[15px] shrink-0 text-black/30" />
                  {user.email}
                </div>
                <div className="flex items-center gap-2.5 text-[13px] font-normal text-black/60 tracking-[-0.1px]">
                  <HiCalendar className="text-[15px] shrink-0 text-black/30" />
                  Joined {user.joined}
                </div>
              </div>
            </div>

            {/* Ideas summary card */}
            <div className="bg-white border border-black/[0.06] rounded-2xl p-5">
              <p className="text-[13px] font-semibold text-black tracking-[-0.1px] mb-4">
                Activity
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 tracking-[-0.1px]">
                    Ideas posted
                  </span>
                  <span className="text-[13px] font-semibold text-black tracking-[-0.1px]">
                    {user.totalIdeas}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 tracking-[-0.1px]">
                    Total likes received
                  </span>
                  <span className="text-[13px] font-semibold text-black tracking-[-0.1px]">
                    {user.totalLikes}
                  </span>
                </div>
                <div className="h-px bg-black/[0.05]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black/50 tracking-[-0.1px]">
                    Total comments
                  </span>
                  <span className="text-[13px] font-semibold text-black tracking-[-0.1px]">
                    {user.totalComments}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Posts Feed */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px]">
              Ideas
            </p>

            {myIdeas.map((idea) => {
              const color = categoryColors[idea.category] || {
                bg: "bg-gray-50",
                text: "text-gray-600",
              };
              return (
                <div
                  key={idea.id}
                  className="bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-200"
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
                          <p className="text-[13px] font-semibold text-black tracking-[-0.1px] leading-none">
                            {user.name}
                          </p>
                          {user.verified && (
                            <HiBadgeCheck className="text-blue-500 text-[13px] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px] mt-0.5">
                          {idea.displayDate}
                        </p>
                      </div>
                    </div>

                    {/* 3 dot menu */}
                    <div className="relative group">
                      <button className="w-8 h-8 flex items-center justify-center rounded-full text-black/40 hover:text-black hover:bg-black/[0.05] transition-all duration-150">
                        <HiDotsHorizontal className="text-[18px]" />
                      </button>

                      {/* Dropdown */}
                      <div className="absolute right-0 top-full mt-1 w-[160px] bg-white/90 backdrop-blur-xl border border-black/[0.08] rounded-xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 z-10">
                        <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal text-black hover:bg-black/[0.04] tracking-[-0.1px] transition-all duration-150">
                          ✏️ Edit idea
                        </button>
                        <div className="h-px bg-black/[0.05]" />
                        <button className="w-full text-left px-4 py-2.5 text-[13px] font-normal text-red-500 hover:bg-red-50/60 tracking-[-0.1px] transition-all duration-150">
                          🗑️ Delete idea
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Title + Description */}
                  <div className="px-4 pb-3">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="text-[14px] font-semibold text-black tracking-[-0.02em] leading-snug">
                        {idea.title}
                      </h3>
                      <span
                        className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${color.bg} ${color.text}`}
                      >
                        {idea.category}
                      </span>
                    </div>
                    <p className="text-[12.5px] font-normal text-black/50 tracking-[-0.1px] leading-relaxed line-clamp-2">
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

                  {/* Like + Comment count row */}
                  <div className="flex items-center justify-between px-4 py-2 border-b border-black/[0.05]">
                    <span className="text-[12px] font-normal text-black/40 tracking-[-0.1px]">
                      ♥ {idea.likes} likes
                    </span>
                    <span className="text-[12px] font-normal text-black/40 tracking-[-0.1px]">
                      {idea.comments} comments
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="flex items-center px-2 py-1 gap-1">
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 hover:text-blue-500 hover:bg-blue-50 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                      <HiThumbUp className="text-[15px]" />
                      Like
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 hover:text-green-500 hover:bg-green-50 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                      <HiChat className="text-[15px]" />
                      Comment
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 hover:text-black hover:bg-black/[0.04] py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                      View Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
