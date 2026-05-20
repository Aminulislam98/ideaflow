"use client";
import React, { useState, useEffect } from "react";
import { HiChat, HiPaperAirplane } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";
import CommentCard from "./CommentCard";

const NewCommentOnPost = ({ idea }) => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${idea._id}`,
        );
        if (!res.ok) throw new Error("Failed to load comments");
        const mainComments = await res.json();

        const commentsWithReplies = await Promise.all(
          mainComments.map(async (comment) => {
            const replyRes = await fetch(
              `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}/replies`,
            );
            const replies = await replyRes.json();
            return { ...comment, replies };
          }),
        );

        setComments(commentsWithReplies);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };
    if (idea?._id) fetchComments();
  }, [idea?._id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;
    try {
      setLoading(true);
      setError(null);
      const commentPayload = {
        ideaId: idea._id,
        text: newComment.trim(),
        parentId: null,
        likes: [],
        likeCount: 0,
        createdAt: new Date().toISOString(),
        author: {
          userId: user.id,
          name: user.name,
          photo: user.image,
        },
      };
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(commentPayload),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const savedComment = await res.json();
      const fullyStructuredComment = {
        ...commentPayload,
        ...savedComment,
        replies: [],
        author: savedComment.author?.name
          ? savedComment.author
          : commentPayload.author,
      };
      setComments((prev) => [fullyStructuredComment, ...prev]);
      setNewComment("");
    } catch (err) {
      console.error("Comment submission error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-black/[0.08] rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5">
        <HiChat className="text-[16px] text-black" />
        <h2 className="text-[15px] font-bold text-black tracking-[-0.02em]">
          Comments
        </h2>
        <span className="text-[13px] font-normal text-black/40 tracking-[-0.1px]">
          {comments.length}
        </span>
      </div>

      {/* Input */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-black/[0.08] flex items-center justify-center"
          suppressHydrationWarning
        >
          {user?.image ? (
            <Image
              fill
              src={user.image}
              alt="You"
              sizes="32px"
              className="object-cover"
              suppressHydrationWarning
            />
          ) : (
            <span className="text-[12px] font-semibold text-black/50">
              {user?.name?.charAt(0)?.toUpperCase() || "?"}
            </span>
          )}
        </div>
        <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-4 py-2.5 gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
            placeholder="Write a comment..."
            disabled={loading}
            className="flex-1 bg-transparent text-[13px] font-normal text-black placeholder:text-black/40 tracking-[-0.1px] outline-none disabled:opacity-50"
          />
          <button
            onClick={handleAddComment}
            disabled={!newComment.trim() || loading}
            className="text-blue-500 hover:text-blue-600 disabled:text-black/20 transition-colors duration-150"
          >
            {loading ? (
              <ImSpinner2 className="text-[15px] animate-spin" />
            ) : (
              <HiPaperAirplane className="text-[15px] rotate-90" />
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-[12px] text-red-500 mb-3 px-1">{error}</p>}

      <div className="h-px bg-black/[0.06] mb-4" />

      {/* Comments List */}
      <div className="flex flex-col gap-5">
        {comments.map((comment) => (
          <CommentCard
            key={comment._id || comment.createdAt}
            comment={comment}
            currentUser={user}
            depth={0}
          />
        ))}
      </div>
    </div>
  );
};

export default NewCommentOnPost;
