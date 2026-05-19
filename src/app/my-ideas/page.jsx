import Image from "next/image";
import { HiPencil, HiTrash, HiBadgeCheck } from "react-icons/hi";

const myIdeas = [
  {
    id: 1,
    title: "AI-Powered Personal Finance Assistant",
    category: "FinTech",
    banner:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60",
    description:
      "An intelligent assistant that tracks your spending habits and gives personalized saving tips based on your lifestyle.",
    displayDate: "May 12, 2025",
    likes: 142,
    comments: 38,
    status: "Published",
  },
  {
    id: 2,
    title: "Community-Based Learning Platform",
    category: "EdTech",
    banner:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
    description:
      "A peer-to-peer learning platform where students teach each other skills and earn credentials verified on blockchain.",
    displayDate: "May 10, 2025",
    likes: 98,
    comments: 21,
    status: "Published",
  },
  {
    id: 3,
    title: "Mental Health Check-In App",
    category: "HealthTech",
    banner:
      "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&auto=format&fit=crop&q=60",
    description:
      "A daily mood tracking app that connects users with therapists and provides guided meditation based on emotional state.",
    displayDate: "May 9, 2025",
    likes: 210,
    comments: 54,
    status: "Draft",
  },
  {
    id: 4,
    title: "Hyperlocal Food Waste Marketplace",
    category: "GreenTech",
    banner:
      "https://images.unsplash.com/photo-1542601906897-b47b5fe2b67a?w=600&auto=format&fit=crop&q=60",
    description:
      "Connects restaurants with surplus food to nearby shelters and individuals at reduced prices to cut food waste.",
    displayDate: "May 8, 2025",
    likes: 76,
    comments: 17,
    status: "Published",
  },
  {
    id: 5,
    title: "Remote Team Culture Builder",
    category: "SaaS",
    banner:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=60",
    description:
      "A platform that helps remote companies build culture through async standups, virtual events, and team challenges.",
    displayDate: "May 7, 2025",
    likes: 55,
    comments: 12,
    status: "Draft",
  },
  {
    id: 6,
    title: "Smart Urban Farming Kit",
    category: "AgriTech",
    banner:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop&q=60",
    description:
      "An IoT-powered home farming kit that lets city dwellers grow vegetables with automated watering and light control.",
    displayDate: "May 6, 2025",
    likes: 189,
    comments: 43,
    status: "Published",
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

const user = {
  name: "Aminul Islam",
  email: "aminul@aminulislam.co.uk",
  avatar: "https://i.pravatar.cc/150?img=33",
  verified: true,
};

export default function MyIdeasPage() {
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5]  pt-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full relative shrink-0">
              <Image
                fill
                src={user.avatar}
                alt={user.name}
                className="rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <h1 className="text-[15px] font-semibold text-black tracking-[-0.02em]">
                  {user.name}
                </h1>
                {user.verified && (
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
                {myIdeas.reduce((a, b) => a + b.likes, 0)}
              </p>
              <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px]">
                Total likes
              </p>
            </div>
            <div className="bg-white border border-black/[0.06] rounded-xl px-4 py-2.5 text-center">
              <p className="text-[18px] font-semibold text-black tracking-[-0.03em]">
                {myIdeas.reduce((a, b) => a + b.comments, 0)}
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
                key={idea.id}
                className="flex flex-col bg-white border border-black/[0.06] rounded-2xl overflow-hidden hover:shadow-[0_4px_20px_rgb(0,0,0,0.08)] transition-all duration-200"
              >
                {/* Banner */}
                <div className="relative w-full h-40 shrink-0">
                  <Image
                    fill
                    src={idea.banner}
                    alt={idea.title}
                    className="object-cover"
                  />
                  {/* Status badge */}
                  <span
                    className={`absolute top-3 right-3 text-[10px] font-medium tracking-[-0.1px] px-2 py-0.5 rounded-full ${
                      idea.status === "Published"
                        ? "bg-green-100 text-green-600"
                        : "bg-amber-100 text-amber-600"
                    }`}
                  >
                    {idea.status}
                  </span>
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
                    {idea.description}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 mt-3 mb-3">
                    <span className="text-[12px] font-normal text-rose-400 bg-rose-50 px-2 py-0.5 rounded-full">
                      ♥ {idea.likes}
                    </span>
                    <span className="text-[12px] font-normal text-blue-400 bg-blue-50 px-2 py-0.5 rounded-full">
                      💬 {idea.comments}
                    </span>
                    <span className="text-[11px] font-normal text-black/30 tracking-[-0.1px] ml-auto">
                      {idea.displayDate}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-black/[0.06] mb-3" />

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-black/60 hover:text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]">
                      <HiPencil className="text-[13px]" />
                      Edit
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-red-400 hover:text-red-500 border border-red-100 hover:border-red-200 hover:bg-red-50 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]">
                      <HiTrash className="text-[13px]" />
                      Delete
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-black/60 hover:text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]">
                      View
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {myIdeas.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <p className="text-[32px]">💡</p>
            <p className="text-[15px] font-semibold text-black tracking-[-0.02em]">
              No ideas yet
            </p>
            <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px]">
              Share your first idea with the world
            </p>
            <a
              href="/add-ideas"
              className="mt-2 text-[13px] font-normal text-white bg-black hover:bg-black/80 px-5 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
            >
              Add Idea
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
