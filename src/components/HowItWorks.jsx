import { HiLightBulb, HiUsers, HiTrendingUp, HiChatAlt2 } from "react-icons/hi";

const steps = [
  {
    number: "01",
    icon: HiLightBulb,
    title: "Share Your Idea",
    description:
      "Got a startup concept brewing? Post it on IdeaFlow with a title, description, category, and problem statement. Takes less than 2 minutes.",
    color: "text-amber-500",
    bg: "bg-amber-50 dark:bg-amber-500/10",
    border: "border-amber-100 dark:border-amber-500/20",
  },
  {
    number: "02",
    icon: HiUsers,
    title: "Reach the Community",
    description:
      "Your idea is instantly visible to thousands of entrepreneurs, investors, and innovators who are actively looking for the next big thing.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-500/10",
    border: "border-blue-100 dark:border-blue-500/20",
  },
  {
    number: "03",
    icon: HiChatAlt2,
    title: "Collect Feedback",
    description:
      "Get real comments, suggestions, and reactions from people who care. Refine your concept based on genuine community insight.",
    color: "text-violet-500",
    bg: "bg-violet-50 dark:bg-violet-500/10",
    border: "border-violet-100 dark:border-violet-500/20",
  },
  {
    number: "04",
    icon: HiTrendingUp,
    title: "Rise to the Top",
    description:
      "The best ideas get liked, shared, and featured in trending. Build momentum and prove your concept has real-world demand.",
    color: "text-emerald-500",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    border: "border-emerald-100 dark:border-emerald-500/20",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full bg-white dark:bg-zinc-950  py-10 px-5 sm:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-black/30 dark:text-white/30 mb-3">
            The Process
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-black dark:text-white tracking-[-0.04em] leading-tight max-w-[480px]">
            From spark to startup,{" "}
            <span className="text-black/30 dark:text-white/30">
              in four steps
            </span>
          </h2>
          <p className="mt-3 text-[14px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px] max-w-[380px] leading-relaxed">
            IdeaFlow turns half-baked concepts into validated opportunities
            through community-driven feedback.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className={`relative flex flex-col gap-4 p-5 rounded-2xl border bg-white dark:bg-zinc-900 ${step.border} hover:shadow-[0_4px_24px_rgb(0,0,0,0.07)] dark:hover:shadow-[0_4px_24px_rgb(0,0,0,0.3)] transition-all duration-200`}
              >
                {/* Step number */}
                <span className="text-[11px] font-bold tracking-[0.1em] text-black/20 dark:text-white/20">
                  {step.number}
                </span>

                {/* Icon */}
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${step.bg}`}
                >
                  <Icon className={`text-[20px] ${step.color}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em]">
                    {step.title}
                  </h3>
                  <p className="text-[12.5px] font-normal text-black/45 dark:text-white/45 tracking-[-0.1px] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connector line — hidden on last item */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-[52px] -right-2 w-4 h-px bg-black/10 dark:bg-white/10 z-10" />
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-10">
          <a
            href="/add-idea"
            className="text-[13px] font-semibold text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 px-6 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
          >
            Share your idea now →
          </a>
        </div>
      </div>
    </section>
  );
}
