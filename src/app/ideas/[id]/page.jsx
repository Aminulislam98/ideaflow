import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Image from "next/image";
import {
  HiThumbUp,
  HiChat,
  HiBadgeCheck,
  HiCalendar,
  HiTag,
  HiUsers,
  HiCurrencyDollar,
  HiLightBulb,
  HiShare,
} from "react-icons/hi";

const idea = {
  _id: "6a0bb2e50ee17bf6afdb14bc",
  title: "AI-Powered Personal Finance Assistant",
  shortDescription:
    "Smart assistant that tracks spending and gives saving tips.",
  detailedDescription:
    "An intelligent AI assistant that analyzes your daily spending patterns, categorizes expenses, and provides personalized saving tips based on your lifestyle and income. It integrates with major banks and gives weekly financial health reports. The system uses machine learning to understand your habits and adapts its recommendations over time, becoming more accurate and useful the longer you use it.",
  problemStatement:
    "Most people struggle to manage their finances effectively. They overspend without realizing it and have no clear picture of where their money goes each month. Traditional budgeting apps require manual input and are abandoned quickly.",
  proposedSolution:
    "An AI-powered app that connects to your bank account, automatically tracks and categorizes spending, and sends smart nudges to help you save more and spend wisely. No manual entry required — everything happens automatically in the background.",
  category: "FinTech",
  targetAudience: "Young professionals and students aged 18-35",
  imageURL:
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&auto=format&fit=crop&q=60",
  estimatedBudget: "$8,000 — $15,000",
  tags: ["AI", "Finance", "Mobile", "B2C"],
  author: {
    userId: "user_001",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    photo: "https://i.pravatar.cc/150?img=1",
  },
  likeCount: 142,
  commentCount: 38,
  createdAt: "2025-05-12T10:00:00.000Z",
};

const comments = [
  {
    _id: "c1",
    author: { name: "Rahul Mehta", photo: "https://i.pravatar.cc/150?img=11" },
    text: "This is exactly what the market needs right now. Have you thought about B2B pricing models?",
    createdAt: "2025-05-13T10:00:00.000Z",
  },
  {
    _id: "c2",
    author: { name: "Emily Chen", photo: "https://i.pravatar.cc/150?img=5" },
    text: "Love the concept. The biggest challenge will be bank API integrations — have you looked into Plaid or TrueLayer?",
    createdAt: "2025-05-14T09:00:00.000Z",
  },
  {
    _id: "c3",
    author: { name: "James Okafor", photo: "https://i.pravatar.cc/150?img=15" },
    text: "Would love to beta test this. The weekly health report idea is brilliant.",
    createdAt: "2025-05-15T08:00:00.000Z",
  },
];

export default async function IdeaDetailsPage({ params }) {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  console.log("this is idea id from client: ", id);
  const res = await fetch(`http://localhost:4000/ideas/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const idea = await res.json();

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-14">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-6">
        {/* Banner — image only, no text overlay */}
        <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden rounded-2xl mb-4">
          {/* Blurred bg */}
          <Image
            fill
            src={idea.imageURL}
            alt=""
            className="object-cover scale-110 blur-2xl brightness-50"
            aria-hidden="true"
          />
          {/* Real image */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <Image
              fill
              src={idea.imageURL}
              alt={idea.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        </div>

        {/* Title + Meta — below image, clean */}
        <div className="bg-white border border-black/[0.08] rounded-2xl px-5 py-4 mb-5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <span className="inline-block text-[11px] font-medium tracking-[0.5px] uppercase text-black/40 mb-2">
                {idea.category}
              </span>
              <h1 className="text-[20px] sm:text-[24px] font-bold text-black tracking-[-0.03em] leading-tight">
                {idea.title}
              </h1>
              <p className="text-[13px] font-normal text-black/50 tracking-[-0.1px] mt-1.5 leading-relaxed">
                {idea.shortDescription}
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-black hover:text-blue-600 hover:bg-blue-50 border border-black/10 hover:border-blue-200 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]">
                <HiThumbUp className="text-[15px]" />
                Like
                <span className="text-[12px] font-normal">
                  {idea.likeCount}
                </span>
              </button>
              <button className="flex items-center gap-1.5 text-[13px] font-medium text-black hover:bg-black/[0.05] border border-black/10 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]">
                <HiShare className="text-[15px]" />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">
          {/* LEFT */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {/* Author */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full relative shrink-0">
                  <Image
                    fill
                    src={idea.author.photo}
                    alt={idea.author.name}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-[14px] font-bold text-black tracking-[-0.1px]">
                      {idea.author.name}
                    </p>
                    <HiBadgeCheck className="text-blue-500 text-[15px]" />
                  </div>
                  <p className="text-[12px] font-normal text-black/50 tracking-[-0.1px]">
                    {idea.author.email}
                  </p>
                  <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                    Posted{" "}
                    {new Date(idea.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <h2 className="text-[15px] font-bold text-black tracking-[-0.02em] mb-3">
                About this idea
              </h2>
              <p className="text-[13.5px] font-normal text-black leading-relaxed tracking-[-0.1px]">
                {idea.detailedDescription}
              </p>
            </div>

            {/* Problem + Solution */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <span className="text-red-500 text-[13px]">⚠</span>
                  </div>
                  <h2 className="text-[14px] font-bold text-black tracking-[-0.02em]">
                    Problem
                  </h2>
                </div>
                <p className="text-[13px] font-normal text-black leading-relaxed tracking-[-0.1px]">
                  {idea.problemStatement}
                </p>
              </div>

              <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-7 h-7 rounded-full bg-green-50 flex items-center justify-center shrink-0">
                    <HiLightBulb className="text-green-500 text-[14px]" />
                  </div>
                  <h2 className="text-[14px] font-bold text-black tracking-[-0.02em]">
                    Solution
                  </h2>
                </div>
                <p className="text-[13px] font-normal text-black leading-relaxed tracking-[-0.1px]">
                  {idea.proposedSolution}
                </p>
              </div>
            </div>

            {/* Comments */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-5">
                <HiChat className="text-[16px] text-black" />
                <h2 className="text-[15px] font-bold text-black tracking-[-0.02em]">
                  Comments
                </h2>
                <span className="text-[13px] font-normal text-black/40 tracking-[-0.1px]">
                  {idea.commentCount}
                </span>
              </div>

              {/* Comment Input */}
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-black/10 shrink-0" />
                <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-4 py-2.5">
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent text-[13px] font-normal text-black placeholder:text-black/40 tracking-[-0.1px] outline-none"
                  />
                </div>
              </div>

              <div className="h-px bg-black/[0.06] mb-4" />

              {/* Comments List */}
              <div className="flex flex-col gap-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full relative shrink-0">
                      <Image
                        fill
                        src={comment.author.photo}
                        alt={comment.author.name}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="bg-[#f0f2f5] rounded-2xl px-4 py-3">
                        <p className="text-[13px] font-bold text-black tracking-[-0.1px] leading-none mb-1">
                          {comment.author.name}
                        </p>
                        <p className="text-[13px] font-normal text-black tracking-[-0.1px] leading-relaxed">
                          {comment.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 px-1">
                        <button className="text-[12px] font-bold text-black/50 hover:text-blue-500 tracking-[-0.1px] transition-colors duration-150">
                          Like
                        </button>
                        <button className="text-[12px] font-bold text-black/50 hover:text-black tracking-[-0.1px] transition-colors duration-150">
                          Reply
                        </button>
                        <span className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Sticky Sidebar */}
          <div className="w-full lg:w-[280px] shrink-0 flex flex-col gap-4 lg:sticky lg:top-[72px]">
            {/* Stats */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-black tracking-[-0.1px] mb-4">
                Stats
              </p>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black tracking-[-0.1px]">
                    Likes
                  </span>
                  <span className="text-[13px] font-bold text-rose-500 tracking-[-0.1px]">
                    ♥ {idea.likeCount}
                  </span>
                </div>
                <div className="h-px bg-black/[0.06]" />
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-normal text-black tracking-[-0.1px]">
                    Comments
                  </span>
                  <span className="text-[13px] font-bold text-blue-500 tracking-[-0.1px]">
                    💬 {idea.commentCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-black tracking-[-0.1px] mb-4">
                Details
              </p>
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <HiUsers className="text-[15px] text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                      Target Audience
                    </p>
                    <p className="text-[13px] font-normal text-black tracking-[-0.1px]">
                      {idea.targetAudience}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-black/[0.06]" />
                <div className="flex items-start gap-2.5">
                  <HiCurrencyDollar className="text-[15px] text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                      Estimated Budget
                    </p>
                    <p className="text-[13px] font-normal text-black tracking-[-0.1px]">
                      {idea.estimatedBudget}
                    </p>
                  </div>
                </div>
                <div className="h-px bg-black/[0.06]" />
                <div className="flex items-start gap-2.5">
                  <HiCalendar className="text-[15px] text-black shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
                      Posted
                    </p>
                    <p className="text-[13px] font-normal text-black tracking-[-0.1px]">
                      {new Date(idea.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <HiTag className="text-[14px] text-black" />
                <p className="text-[14px] font-bold text-black tracking-[-0.1px]">
                  Tags
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[12px] font-normal text-black bg-black/[0.05] hover:bg-black/[0.1] px-3 py-1 rounded-full tracking-[-0.1px] cursor-pointer transition-all duration-150"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Card */}
            <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
              <p className="text-[14px] font-bold text-black tracking-[-0.1px] mb-4">
                Posted by
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full relative shrink-0">
                  <Image
                    fill
                    src={idea.author.photo}
                    alt={idea.author.name}
                    className="rounded-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-bold text-black tracking-[-0.1px]">
                      {idea.author.name}
                    </p>
                    <HiBadgeCheck className="text-blue-500 text-[13px]" />
                  </div>
                  <p className="text-[11px] font-normal text-black/50 tracking-[-0.1px]">
                    {idea.author.email}
                  </p>
                </div>
              </div>
              <button className="w-full text-[13px] font-medium text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-2 rounded-full transition-all duration-150 tracking-[-0.1px]">
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
