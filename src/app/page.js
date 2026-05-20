import BannerSwiper from "@/components/Banner";
import TrendingIdeas from "@/components/TrendingIdeas";
export const metadata = {
  title: "Home",
  description:
    "Discover trending startup ideas, explore innovations across categories, and share your own ideas with the IdeaFlow community.",
  keywords: [
    "startup ideas",
    "trending ideas",
    "innovation",
    "ideaflow",
    "fintech",
    "edtech",
    "healthtech",
    "saas ideas",
  ],
  openGraph: {
    title: "IdeaFlow — Share & Discover Ideas",
    description:
      "Discover trending startup ideas and share your own with the world.",
    url: "https://ideaflow.com",
    siteName: "IdeaFlow",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaFlow — Share & Discover Ideas",
    description:
      "Discover trending startup ideas and share your own with the world.",
  },
};

export default function Home() {
  return (
    <>
      <BannerSwiper />
      <TrendingIdeas />
    </>
  );
}
