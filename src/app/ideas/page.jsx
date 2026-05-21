import FilterBar from "@/components/FilterBar";
import IdeaCard from "@/components/IdeaCard";
import { HiLightBulb } from "react-icons/hi";

// Fallback string validation to prevent 'undefined' passing into new URL()
const baseUrl =
  process.env.NEXT_PUBLIC_CLIENT_URL &&
  process.env.NEXT_PUBLIC_CLIENT_URL !== "undefined"
    ? process.env.NEXT_PUBLIC_CLIENT_URL
    : "http://localhost:3000";

export const metadata = {
  title: "IdeaVault — Discover, Share & Explore Innovative Ideas",
  description:
    "Explore trending startup ideas, creative projects, business concepts, and innovative solutions on IdeaVault. Share your thoughts, discover inspiration, and connect with creators worldwide.",

  keywords: [
    "startup ideas",
    "business ideas",
    "innovation platform",
    "creative ideas",
    "entrepreneurship",
    "project showcase",
    "idea sharing",
    "tech ideas",
    "product ideas",
    "web app inspiration",
    "IdeaVault",
    "founder community",
    "side projects",
    "startup community",
  ],

  authors: [{ name: "IdeaVault Team" }],
  creator: "IdeaVault",
  publisher: "IdeaVault",

  metadataBase: new URL(baseUrl),

  alternates: {
    canonical: "/ideas",
  },

  openGraph: {
    title: "IdeaVault — Discover Innovative Ideas",
    description:
      "Browse trending ideas, startup concepts, and creative innovations shared by creators around the world.",
    url: "/ideas",
    siteName: "IdeaVault",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IdeaVault Platform Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "IdeaVault — Explore Creative Ideas",
    description:
      "Discover startup ideas, innovations, and inspiring projects from creators worldwide.",
    images: ["/og-image.png"],
    creator: "@ideavault",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

const getIdeasData = async (search = "", category = "", sort = "") => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/ideas?search=${search}&category=${category}&sort=${sort}`,
      { cache: "no-store" },
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch ideas:", err);
    return [];
  }
};

export default async function IdeasPage({ searchParams }) {
  const sp = await searchParams;
  const ideas = await getIdeasData(sp.search, sp.category, sp.sort);

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] dark:bg-zinc-950">
      <FilterBar />
      <div className="max-w-6xl mx-auto  sm:px-8">
        {/* Conditional Layout Rendering */}
        {ideas.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-3 sm:py-4">
            {ideas.map((idea) => (
              <IdeaCard key={idea?._id} idea={idea} />
            ))}
          </div>
        ) : (
          /* Premium Black-Themed Empty State Box */
          <div className="flex flex-col items-center justify-center text-center py-24 px-4 my-6 ">
            {/* Icon Circle */}
            <div className="w-16 h-16 rounded-full bg-black/[0.03] dark:bg-zinc-800/80 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-center mb-4 transition-transform duration-300 hover:scale-105">
              <HiLightBulb className="text-[30px] text-black/40 dark:text-zinc-400" />
            </div>

            {/* Heading */}
            <h3 className="text-[16px] font-semibold text-black dark:text-white tracking-[-0.02em] mb-1">
              No ideas available
            </h3>

            {/* Description */}
            <p className="text-[13px] font-normal text-black/50 dark:text-zinc-400 max-w-[280px] leading-relaxed tracking-[-0.01em]">
              We couldn't find anything matching those parameters. Try adjusting
              your search query or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
