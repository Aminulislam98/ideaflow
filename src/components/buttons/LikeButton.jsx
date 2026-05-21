"use client";
import React, { useState } from "react";
import { HiThumbUp } from "react-icons/hi";

const LikeButton = ({ idea, user }) => {
  const [liked, setLiked] = useState(idea.likes?.includes(user?.id) ?? false);
  const [likeCount, setLikeCount] = useState(idea.likeCount || 0);

  const handleLike = async () => {
    if (!user) return;
    console.log(
      "FULL URL:",
      `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}/like`,
    );
    // WHY? — don't allow if not logged in
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}/like`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        },
      );
      const data = await res.json();
      setLiked(data.liked); // true or false from server
      setLikeCount(data.likeCount); // updated count from server
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button
      onClick={handleLike}
      className={`flex items-center gap-1.5 text-[13px] font-medium border px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]
        ${
          liked
            ? "text-blue-600 border-blue-300 bg-blue-50 dark:bg-blue-500/10"
            : "text-black dark:text-white border-black/10 dark:border-white/1 "
        }`}
    >
      <HiThumbUp className="text-[15px]" />
      {liked ? "Liked" : "Like"}
      <span className="text-[12px] font-normal">{likeCount}</span>
    </button>
  );
};

export default LikeButton;
