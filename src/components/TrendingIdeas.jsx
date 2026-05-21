import IdeaCard from "./IdeaCard";

export default async function TrendingIdeas() {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  let ideas = [];
  try {
    const res = await fetch(`${serverUrl}/ideas/trending`, {
      cache: "no-store", // অথবা next: { revalidate: 60 }
    });
    ideas = await res.json();
  } catch (err) {
    console.error("Failed to fetch trending ideas:", err);
  }

  return (
    <section className="w-full px-5 sm:px-8 py-16 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="mb-10">
        <p className="text-[11px] font-medium tracking-[1px] uppercase text-black/30 dark:text-white/30 mb-2">
          Trending
        </p>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black dark:text-white tracking-[-0.03em]">
          Ideas people love
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map((idea) => (
          <IdeaCard key={idea._id} idea={idea} />
        ))}
      </div>
    </section>
  );
}
