"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import { useDebounce } from "use-debounce";

const demoSuggestions = [
  { _id: "1", title: "AI-Powered Personal Finance Assistant" },
  { _id: "2", title: "AI Tutor for Rural Schools" },
  { _id: "3", title: "Startup Pitch Deck Generator" },
  { _id: "4", title: "Smart Urban Farming Kit" },
  { _id: "5", title: "Neighbourhood Safety App" },
];

const FilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);

  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const res = await fetch(
        `http://localhost:4000/ideas/suggestions?search=${debouncedSearch}`,
      );
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortType, setSortType] = useState("Newest");

  //   handling search
  const handleSearch = (query = search) => {
    setShowSuggestions(false);
    const params = new URLSearchParams(searchParams);
    if (search) {
      params.set("search", search);
    } else {
      params.delete("search");
    }
    router.push(`${pathName}?${params.toString()}`);
  };
  //   handling category
  const handleCategory = (category) => {
    setSelectedCategory(category);
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    router.push(`${pathName}?${params.toString()}`);
  };
  //   handling sorting
  const handleSort = (sort) => {
    console.log("this is sort from client:", sort);
    setSortType(sort);
    const params = new URLSearchParams(searchParams);
    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    router.push(`${pathName}?${params.toString()}`);
  };

  return (
    <div className="pt-13 sticky top-0 z-40">
      <div className="bg-white border-b border-black/[0.06]">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          {/* Search — YouTube style with button */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center min-w-0 shadow-[inset_0_1px_4px_rgb(0,0,0,0.08)] rounded-full border border-black/[0.08]">
              {/* Input */}
              <div className="flex items-center gap-2.5 flex-1 bg-white rounded-l-full px-4 py-2 min-w-0">
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  onFocus={() => search.length > 0 && setShowSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowSuggestions(false), 150)
                  }
                  type="text"
                  placeholder="Search ideas..."
                  className="flex-1 bg-transparent text-[13px] font-normal text-black placeholder:text-black/30 tracking-[-0.1px] outline-none min-w-0"
                />
              </div>

              {/* Divider */}
              <div className="w-px h-5 bg-black/[0.1] shrink-0" />

              {/* Search Button */}
              <button
                onClick={handleSearch}
                className="flex items-center justify-center bg-[#f8f8f8] hover:bg-[#f0f0f0] rounded-r-full px-5 py-2 transition-all duration-150 shrink-0"
              >
                <HiSearch className="text-black/50 text-[17px]" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/80 backdrop-blur-2xl border border-black/8 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50">
                <p className="text-[11px] font-medium text-black/30 tracking-[0.5px] uppercase px-4 pt-3 pb-1.5">
                  Suggestions
                </p>

                {suggestions.map((s) => (
                  <button
                    key={s._id}
                    onMouseDown={() => {
                      handleSearch(s.title);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/4 transition-all duration-150 text-left cursor-pointer"
                  >
                    {s.imageURL ? (
                      <div className="relative w-8 h-8 shrink-0">
                        <Image
                          fill
                          src={s.imageURL}
                          alt={s.title}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <HiSearch className="text-black/20 text-[13px] shrink-0" />
                    )}
                    <span className="text-[13px] font-normal text-black tracking-[-0.1px] underline ">
                      {s.title}
                    </span>
                  </button>
                ))}

                <div className="h-px bg-black/[0.05] mx-4" />
                <button
                  onMouseDown={handleSearch}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/[0.04] transition-all duration-150 text-left"
                >
                  <HiSearch className="text-black/40 text-[13px] shrink-0" />
                  <span className="text-[13px] font-normal text-black/60 tracking-[-0.1px]">
                    Search for{" "}
                    <span className="text-black font-medium">"{search}"</span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right side — two dropdowns */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="relative flex items-center gap-1.5 bg-[#f0f2f5] hover:bg-black/[0.07] border border-transparent hover:border-black/[0.06] rounded-full px-4 py-2 cursor-pointer transition-all duration-150">
              <span className="text-[13px] font-normal text-black tracking-[-0.1px] whitespace-nowrap">
                {selectedCategory}
              </span>
              <HiChevronDown className="text-black/40 text-[13px] shrink-0" />
              <select
                defaultValue=""
                onChange={(e) => handleCategory(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              >
                <option value="All Categories">All Categories</option>
                <option value="FinTech">FinTech</option>
                <option value="EdTech">EdTech</option>
                <option value="HealthTech">HealthTech</option>
                <option value="GreenTech">GreenTech</option>
                <option value="SaaS">SaaS</option>
                <option value="AgriTech">AgriTech</option>
                <option value="Tech">Tech</option>
              </select>
            </div>

            <div className="relative flex items-center gap-1.5 bg-[#f0f2f5] hover:bg-black/[0.07] border border-transparent hover:border-black/[0.06] rounded-full px-4 py-2 cursor-pointer transition-all duration-150">
              <span className="text-[13px] font-normal text-black tracking-[-0.1px] whitespace-nowrap">
                {sortType}
              </span>
              <HiChevronDown className="text-black/40 text-[13px] shrink-0" />
              <select
                defaultValue=""
                onChange={(e) => handleSort(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              >
                <option value="Newest">Newest</option>
                <option value="Oldest">Oldest</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
