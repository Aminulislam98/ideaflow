"use client";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { HiChevronDown, HiSearch } from "react-icons/hi";
import { useDebounce } from "use-debounce";

const FilterBar = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [debouncedSearch] = useDebounce(search, 300);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortType, setSortType] = useState("Newest");

  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 60) {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!debouncedSearch) {
      setSuggestions([]);
      return;
    }
    const fetchSuggestions = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas/suggestions?search=${debouncedSearch}`,
      );
      const data = await res.json();
      setSuggestions(data);
      setShowSuggestions(true);
    };
    fetchSuggestions();
  }, [debouncedSearch]);

  const handleSearch = (query = search) => {
    setShowSuggestions(false);
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("search", query);
    } else {
      params.delete("search");
    }
    router.push(`${pathName}?${params.toString()}`);
  };

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

  const handleSort = (sort) => {
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
    <div
      className={`pt-14 sticky top-0 z-40 transition-transform duration-200 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="bg-white dark:bg-zinc-950 border-b border-black/[0.06] dark:border-white/[0.05]">
        <div className="max-w-6xl mx-auto px-2 sm:px-8 py-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 w-full">
          {/* Search */}
          <div className="relative flex-1 min-w-0">
            <div className="flex items-center min-w-0 border border-black/[0.1] dark:border-white/[0.08] rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-[inset_0_1px_3px_rgb(0,0,0,0.06)] dark:shadow-none">
              <div className="flex items-center min-w-0 border border-black/[0.1] dark:border-white/[0.08] focus-within:border-blue-400 dark:focus-within:border-blue-500 rounded-xl overflow-hidden bg-white dark:bg-zinc-950 shadow-[inset_0_1px_3px_rgb(0,0,0,0.06)] dark:shadow-none transition-colors duration-150">
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
                  className="flex-1 bg-transparent text-base font-semibold text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 tracking-[-0.1px] outline-none min-w-0"
                />
              </div>

              <div className="w-px h-5 bg-black/[0.08] dark:bg-white/[0.08] shrink-0" />

              <button
                onClick={handleSearch}
                className="flex items-center justify-center hover:bg-black/[0.04] dark:hover:bg-white/[0.06] px-5 py-2.5 transition-all duration-150 shrink-0 self-stretch"
              >
                <HiSearch className="text-black/60 dark:text-white/60 text-[22px]" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-50">
                <p className="text-[11px] font-black text-black/30 dark:text-white/30 tracking-[0.8px] uppercase px-4 pt-3 pb-1.5">
                  Suggestions
                </p>

                {suggestions.map((s) => (
                  <button
                    key={s._id}
                    onMouseDown={() => {
                      handleSearch(s.title);
                      setShowSuggestions(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-150 text-left cursor-pointer"
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
                      <HiSearch className="text-black/20 dark:text-white/20 text-[14px] shrink-0" />
                    )}
                    <span className="text-[13px] font-semibold text-black dark:text-white tracking-[-0.1px]">
                      {s.title}
                    </span>
                  </button>
                ))}

                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05] mx-4" />
                <button
                  onMouseDown={handleSearch}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-150 text-left"
                >
                  <HiSearch className="text-black/40 dark:text-white/40 text-[14px] shrink-0" />
                  <span className="text-[13px] font-semibold text-black/60 dark:text-white/60 tracking-[-0.1px]">
                    Search for{" "}
                    <span className="text-black dark:text-white font-bold">
                      "{search}"
                    </span>
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Right side — two dropdowns */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Category */}
            <div className="relative flex items-center gap-1.5 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.08] px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-150">
              <span className="text-[13px] font-bold text-black dark:text-white tracking-[-0.1px] whitespace-nowrap">
                {selectedCategory}
              </span>
              <HiChevronDown className="text-black/40 dark:text-white/40 text-[18px] shrink-0" />
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

            {/* Sort */}
            <div className="relative flex items-center gap-1.5 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] border border-black/[0.1] dark:border-white/[0.08] px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-150">
              <span className="text-[13px] font-bold text-black dark:text-white tracking-[-0.1px] whitespace-nowrap">
                {sortType}
              </span>
              <HiChevronDown className="text-black/40 dark:text-white/40 text-[18px] shrink-0" />
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
