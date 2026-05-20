import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlobalLoader from "@/components/Loader/GlobalLoader";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // ─── Basic
  title: {
    default: "IdeaFlow — Share & Discover Ideas",
    template: "%s | IdeaFlow",
  },
  description:
    "IdeaFlow is a platform to share your startup ideas, discover innovations, and connect with like-minded builders.",
  keywords: [
    "ideas",
    "startup ideas",
    "innovation",
    "ideaflow",
    "share ideas",
    "discover ideas",
  ],

  // ─── Open Graph (Facebook, LinkedIn share)
  openGraph: {
    title: "IdeaFlow — Share & Discover Ideas",
    description:
      "Share your startup ideas, discover innovations, and connect with builders.",
    url: "https://ideaflow.com",
    siteName: "IdeaFlow",
    type: "website",
  },

  // ─── Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "IdeaFlow — Share & Discover Ideas",
    description:
      "Share your startup ideas, discover innovations, and connect with builders.",
  },

  // ─── Favicon
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${geistMono.variable}`}>
      <body className="min-h-full flex flex-col font-sans antialiased">
        <GlobalLoader />
        <Navbar user={null} />
        <main>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
