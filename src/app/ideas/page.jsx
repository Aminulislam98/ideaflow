import FilterBar from "@/components/FilterBar";
import IdeaCard from "@/components/IdeaCard";

const getIdeasData = async (search = "", category = "", sort = "") => {
  const res = await fetch(
    `http://localhost:4000/ideas?search=${search}&category=${category}&sort=${sort}`,
    { cache: "no-store" },
  );
  const data = await res.json();
  return data;
};

export default async function IdeasPage({ searchParams }) {
  const sp = await searchParams;
  const ideas = await getIdeasData(sp.search, sp.category, sp.sort);

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950">
      {/* Filter Bar */}
      <FilterBar />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea?._id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );
}
