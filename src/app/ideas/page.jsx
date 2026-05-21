import FilterBar from "@/components/FilterBar";
import IdeaCard from "@/components/IdeaCard";

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

  // FIXED: Using the validated baseline URL string variable
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
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ideas.map((idea) => (
            <IdeaCard key={idea?._id} idea={idea} />
          ))}
        </div>
      </div>
    </div>
  );
}
