import Image from "next/image";
import { HiThumbUp, HiChat, HiBadgeCheck } from "react-icons/hi";

const ideas = [
  {
    id: 1,
    title: "AI-Powered Personal Finance Assistant",
    category: "FinTech",
    banner:
      "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60",
    description:
      "An intelligent assistant that tracks your spending habits and gives personalized saving tips based on your lifestyle.",
    author: "Sarah Johnson",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=1",
    date: "May 12, 2025",
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
      "A peer-to-peer learning platform where students teach each other skills and earn credentials verified on blockchain.",
    author: "Rahul Mehta",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=11",
    date: "May 10, 2025",
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
      "A daily mood tracking app that connects users with therapists and provides guided meditation based on emotional state.",
    author: "Aminul Islam",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=33",
    date: "May 9, 2025",
    likes: 210,
    comments: 54,
  },
  {
    id: 4,
    title: "Hyperlocal Food Waste Marketplace",
    category: "GreenTech",
    banner:
      "https://images.unsplash.com/photo-1542601906897-b47b5fe2b67a?w=600&auto=format&fit=crop&q=60",
    description:
      "Connects restaurants with surplus food to nearby shelters and individuals at reduced prices to cut food waste.",
    author: "Emily Chen",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=5",
    date: "May 8, 2025",
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
      "A platform that helps remote companies build culture through async standups, virtual events, and team challenges.",
    author: "James Okafor",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=15",
    date: "May 7, 2025",
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
      "An IoT-powered home farming kit that lets city dwellers grow vegetables with automated watering and light control.",
    author: "Fatima Al-Hassan",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=9",
    date: "May 6, 2025",
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

export default function TrendingIdeas() {
  return (
    <section className="w-full px-5 sm:px-8 py-16 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-[11px] font-medium tracking-[1px] uppercase text-black/30 mb-2">
          Trending
        </p>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black tracking-[-0.03em]">
          Ideas people love
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => {
          const color = categoryColors[idea.category] || {
            bg: "bg-gray-50",
            text: "text-gray-600",
          };
          return (
            <div
              key={idea.id}
              className="flex flex-col bg-white border border-black/[0.08] rounded-2xl overflow-hidden hover:border-black/20 hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all duration-200"
            >
              {/* Card Top — Author */}
              <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-2.5">
                  {/* Avatar */}
                  <div className="w-9 h-9 rounded-full relative shrink-0">
                    <Image
                      fill
                      src={idea.avatar}
                      alt={idea.author}
                      className="rounded-full object-cover"
                    />
                  </div>
                  {/* Name + Date */}
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="text-[13px] font-semibold text-black tracking-[-0.1px] leading-none">
                        {idea.author}
                      </p>
                      {idea.verified && (
                        <HiBadgeCheck className="text-blue-500 text-[14px] shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px] mt-0.5">
                      {idea.date}
                    </p>
                  </div>
                </div>
              </div>

              {/* Title + Description */}
              <div className="px-4 pb-3">
                <h3 className="text-[14px] font-semibold text-black tracking-[-0.02em] leading-snug mb-1.5">
                  {idea.title}
                </h3>
                <p className="text-[12.5px] font-normal text-black/50 tracking-[-0.1px] leading-relaxed line-clamp-2">
                  {idea.description}
                </p>
              </div>

              {/* Banner Image */}
              <div className="relative w-full h-44 shrink-0">
                <Image
                  fill
                  src={idea.banner}
                  alt={idea.title}
                  className="object-cover"
                />
              </div>

              {/* Divider */}
              <div className="h-px bg-black/[0.06] mx-4 mt-3" />

              {/* Action Buttons — Facebook style */}
              <div className="flex items-center px-2 py-1 gap-1">
                <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 hover:text-blue-500 hover:bg-blue-50 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                  <HiThumbUp className="text-[16px]" />
                  <span>Like</span>
                  <span className="text-[12px] text-black/30">
                    {idea.likes}
                  </span>
                </button>

                <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 hover:text-green-500 hover:bg-green-50 py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                  <HiChat className="text-[16px]" />
                  <span>Comment</span>
                  <span className="text-[12px] text-black/30">
                    {idea.comments}
                  </span>
                </button>

                <button className="flex-1 flex items-center justify-center gap-1.5 text-[13px] font-normal text-black/50 hover:text-black hover:bg-black/[0.04] py-2 rounded-xl transition-all duration-150 tracking-[-0.1px]">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
