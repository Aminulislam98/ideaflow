import BannerSwiper from "@/components/Banner";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testomonials";
import TrendingIdeas from "@/components/TrendingIdeas";
export const metadata = {
  title: "Home | IdeaVault",
  description:
    "Discover trending startup ideas, explore innovations across categories, and share your own ideas with the IdeaVault community.",
  keywords: [
    "startup ideas",
    "trending ideas",
    "innovation",
    "IdeaVault",
    "fintech",
    "edtech",
    "healthtech",
    "saas ideas",
  ],
  openGraph: {
    title: "IdeaVault — Share & Discover Ideas",
    description:
      "Discover trending startup ideas and share your own with the world.",
    url: "https://ideaflow-five-omega.vercel.app/",
    siteName: "IdeaVault",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaVault — Share & Discover Ideas",
    description:
      "Discover trending startup ideas and share your own with the world.",
  },
};

export default function Home() {
  return (
    <>
      <BannerSwiper />
      <TrendingIdeas />
      <HowItWorks />
      <Testimonials />
    </>
  );
}
