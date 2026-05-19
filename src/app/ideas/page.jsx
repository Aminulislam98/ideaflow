import IdeaCard from "@/components/IdeaCard";
import {
  HiThumbUp,
  HiChat,
  HiSearch,
  HiBadgeCheck,
  HiChevronDown,
} from "react-icons/hi";

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
      "A peer-to-peer learning platform where students teach each other skills and earn credentials verified on blockchain.",
    author: "Rahul Mehta",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=11",
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
      "A daily mood tracking app that connects users with therapists and provides guided meditation based on emotional state.",
    author: "Aminul Islam",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=33",
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
    description:
      "Connects restaurants with surplus food to nearby shelters and individuals at reduced prices to cut food waste.",
    author: "Emily Chen",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=5",
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
      "A platform that helps remote companies build culture through async standups, virtual events, and team challenges.",
    author: "James Okafor",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=15",
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
      "An IoT-powered home farming kit that lets city dwellers grow vegetables with automated watering and light control.",
    author: "Fatima Al-Hassan",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=9",
    displayDate: "May 6, 2025",
    likes: 189,
    comments: 43,
  },
  {
    id: 7,
    title: "Blockchain-Based Supply Chain Tracker",
    category: "Tech",
    banner:
      "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&auto=format&fit=crop&q=60",
    description:
      "A decentralized platform that tracks products from manufacturer to consumer, ensuring transparency and trust.",
    author: "David Park",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=21",
    displayDate: "Apr 20, 2025",
    likes: 134,
    comments: 29,
  },
  {
    id: 8,
    title: "AI Tutor for Rural Schools",
    category: "EdTech",
    banner:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&auto=format&fit=crop&q=60",
    description:
      "An offline-capable AI tutoring app designed for students in areas with limited internet connectivity.",
    author: "Priya Sharma",
    verified: false,
    avatar: "https://i.pravatar.cc/150?img=44",
    displayDate: "Apr 15, 2025",
    likes: 88,
    comments: 19,
  },
  {
    id: 9,
    title: "Carbon Footprint Tracker",
    category: "GreenTech",
    banner:
      "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&auto=format&fit=crop&q=60",
    description:
      "A personal app that tracks daily carbon emissions from travel, food, and energy usage with actionable tips.",
    author: "Lena Müller",
    verified: true,
    avatar: "https://i.pravatar.cc/150?img=47",
    displayDate: "Mar 10, 2025",
    likes: 201,
    comments: 61,
  },
];

export default async function IdeasPage() {
  const res = await fetch("http://localhost:4000/ideas");
  const ideas = await res.json();
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5]">
      {/* Filter Bar */}
      <div className="sticky top-[52px] z-40 bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search — half width */}
          <div className="flex-1 flex items-center gap-2.5 bg-[#f0f2f5] rounded-full px-4 py-2 min-w-0">
            <HiSearch className="text-black/30 text-[15px] shrink-0" />
            <input
              type="text"
              placeholder="Search ideas..."
              className="flex-1 bg-transparent text-[13px] font-normal text-black placeholder:text-black/30 tracking-[-0.1px] outline-none min-w-0"
            />
          </div>

          {/* Right side — two dropdowns */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Category Dropdown */}
            <div className="relative flex items-center gap-1.5 bg-[#f0f2f5] hover:bg-black/[0.07] border border-transparent hover:border-black/[0.06] rounded-full px-4 py-2 cursor-pointer transition-all duration-150">
              <span className="text-[13px] font-normal text-black tracking-[-0.1px] whitespace-nowrap">
                All Categories
              </span>
              <HiChevronDown className="text-black/40 text-[13px] shrink-0" />
              <select className="absolute inset-0 opacity-0 cursor-pointer w-full">
                <option>All Categories</option>
                <option>FinTech</option>
                <option>EdTech</option>
                <option>HealthTech</option>
                <option>GreenTech</option>
                <option>SaaS</option>
                <option>AgriTech</option>
                <option>Tech</option>
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center gap-1.5 bg-[#f0f2f5] hover:bg-black/[0.07] border border-transparent hover:border-black/[0.06] rounded-full px-4 py-2 cursor-pointer transition-all duration-150">
              <span className="text-[13px] font-normal text-black tracking-[-0.1px] whitespace-nowrap">
                Newest
              </span>
              <HiChevronDown className="text-black/40 text-[13px] shrink-0" />
              <select className="absolute inset-0 opacity-0 cursor-pointer w-full">
                <option>Newest</option>
                <option>Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        {/* Section Label */}
        <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mb-6">
          All Ideas
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => {
            return <IdeaCard key={idea?._id} idea={idea} />;
          })}
        </div>
      </div>
    </div>
  );
}
