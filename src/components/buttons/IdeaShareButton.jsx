"use client";
import React from "react";
import { HiShare } from "react-icons/hi";

const IdeaShareButton = ({ idea }) => {
  // sharing idea
  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: idea.title,
        text: idea.shortDescription,
        url: `${window.location.origin}/ideas/${idea._id}`,
      });
    } else {
      await navigator.clipboard.writeText(
        `${window.location.origin}/ideas/${idea._id}`,
      );
      toast.success("Link copied!");
    }
  };
  return (
    <div>
      <button
        onClick={handleShare}
        className="flex items-center gap-1.5 text-[13px] font-medium text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] border border-black/10 dark:border-white/10 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
      >
        <HiShare className="text-[15px]" />
        Share
      </button>
    </div>
  );
};

export default IdeaShareButton;
