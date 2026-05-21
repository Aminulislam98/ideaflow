import { HiBadgeCheck } from "react-icons/hi";

const testimonials = [
  {
    name: "Sarah Okonkwo",
    role: "Founder, EduReach",
    category: "EdTech",
    categoryColor: "text-violet-600 bg-violet-50 dark:bg-violet-500/10",
    avatar: "S",
    avatarBg:
      "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400",
    quote:
      "I posted my EdTech idea on IdeaFlow just to see what people thought. Within a week I had 200+ likes, 40 comments, and two investors reached out directly. Now we're live in 3 countries.",
    stat: "200+ likes in 7 days",
    verified: true,
  },
  {
    name: "Marcus Teel",
    role: "Co-founder, GreenHaul",
    category: "GreenTech",
    categoryColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
    avatar: "M",
    avatarBg:
      "bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400",
    quote:
      "The feedback I got from the community completely changed my pitch. People pointed out problems I hadn't even considered. IdeaFlow is basically a free focus group.",
    stat: "Raised $120k pre-seed",
    verified: true,
  },
  {
    name: "Priya Nair",
    role: "Solo founder, MedTrack",
    category: "HealthTech",
    categoryColor: "text-green-600 bg-green-50 dark:bg-green-500/10",
    avatar: "P",
    avatarBg:
      "bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-400",
    quote:
      "What I love most is that the comments are brutally honest. No sugarcoating. Real builders telling me what works and what doesn't. That's rare on any platform.",
    stat: "3,000+ community members reached",
    verified: false,
  },
  {
    name: "James Whitfield",
    role: "CTO, FinStack",
    category: "FinTech",
    categoryColor: "text-blue-600 bg-blue-50 dark:bg-blue-500/10",
    avatar: "J",
    avatarBg:
      "bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400",
    quote:
      "We used IdeaFlow to validate our payment API idea before writing a single line of code. The upvotes told us everything we needed to know. Ship fast, validate early.",
    stat: "Saved 3 months of dev time",
    verified: true,
  },
  {
    name: "Aisha Bello",
    role: "Product Designer, AgriSense",
    category: "AgriTech",
    categoryColor: "text-lime-600 bg-lime-50 dark:bg-lime-500/10",
    avatar: "A",
    avatarBg:
      "bg-lime-100 dark:bg-lime-500/20 text-lime-600 dark:text-lime-400",
    quote:
      "As a designer, I wanted feedback on the concept before I spent weeks on prototypes. IdeaFlow gave me real validation from real people in under 48 hours.",
    stat: "48hr validation turnaround",
    verified: false,
  },
  {
    name: "Daniel Kim",
    role: "Founder, SaaSify",
    category: "SaaS",
    categoryColor: "text-orange-600 bg-orange-50 dark:bg-orange-500/10",
    avatar: "D",
    avatarBg:
      "bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400",
    quote:
      "Trending on IdeaFlow was a turning point. It gave my idea social proof that I used in my first pitch deck. Investors noticed the community traction immediately.",
    stat: "Trended #1 for 5 days",
    verified: true,
  },
];

const stats = [
  { value: "12,000+", label: "Ideas shared" },
  { value: "48hrs", label: "Avg. first feedback" },
  { value: "340+", label: "Funded startups" },
  { value: "98%", label: "Founder satisfaction" },
];

export default function Testimonials() {
  return (
    <section className="w-full bg-[#f0f2f5] dark:bg-zinc-900 py-20 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-black/30 dark:text-white/30 mb-3">
            Success Stories
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-black dark:text-white tracking-[-0.04em] leading-tight max-w-[500px]">
            Founders who started with{" "}
            <span className="text-black/30 dark:text-white/30">
              just an idea
            </span>
          </h2>
          <p className="mt-3 text-[14px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] max-w-[360px] leading-relaxed">
            Real stories from real builders who used IdeaFlow to validate,
            refine, and launch.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-zinc-800 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl px-4 py-4 text-center"
            >
              <p className="text-[22px] font-bold text-black dark:text-white tracking-[-0.04em]">
                {stat.value}
              </p>
              <p className="text-[11px] font-normal text-black/35 dark:text-white/35 tracking-[-0.1px] mt-0.5">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col gap-4 p-5 bg-white dark:bg-zinc-800 border border-black/[0.06] dark:border-white/[0.06] rounded-2xl hover:shadow-[0_4px_24px_rgb(0,0,0,0.07)] dark:hover:shadow-[0_4px_24px_rgb(0,0,0,0.3)] transition-all duration-200"
            >
              {/* Category badge */}
              <span
                className={`self-start text-[10px] font-semibold tracking-[-0.1px] px-2 py-0.5 rounded-full ${t.categoryColor}`}
              >
                {t.category}
              </span>

              {/* Quote */}
              <p className="text-[13px] font-normal text-black/60 dark:text-white/60 tracking-[-0.1px] leading-relaxed flex-1">
                "{t.quote}"
              </p>

              {/* Stat pill */}
              <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />
              <p className="text-[11.5px] font-semibold text-black/40 dark:text-white/40 tracking-[-0.1px]">
                📈 {t.stat}
              </p>

              {/* Author */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 ${t.avatarBg}`}
                >
                  {t.avatar}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.02em] truncate">
                      {t.name}
                    </p>
                    {t.verified && (
                      <HiBadgeCheck className="text-blue-500 text-[13px] shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] font-normal text-black/35 dark:text-white/35 tracking-[-0.1px] truncate">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
