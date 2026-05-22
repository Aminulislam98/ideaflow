"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import {
  HiThumbUp,
  HiChat,
  HiBadgeCheck,
  HiPaperAirplane,
  HiX,
} from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import { Modal } from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import CommentCard from "@/components/comment/CommentCard";
import UserAvatar from "@/components/comment/UserAvatar";
import { MdOutlineModeComment, MdVerified } from "react-icons/md";
import { LuThumbsUp } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

export default function IdeaCard({ idea }) {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(idea.likeCount || 0);

  // Re-check liked state once session loads (user is null on first render)
  useEffect(() => {
    if (user?.id) {
      setLiked(idea.likes?.includes(user.id) ?? false);
    }
  }, [user?.id]);

  const handleLike = async () => {
    if (!user) return;
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
      setLiked(data.liked);
      setLikeCount(data.likeCount);
    } catch (err) {
      console.error(err);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);

  // Fetch comments when modal opens
  useEffect(() => {
    if (!modalOpen || !idea?._id) return;
    const fetchComments = async () => {
      setFetching(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${idea._id}`,
        );
        if (!res.ok) throw new Error("Failed to load comments");
        setComments(await res.json());
      } catch (err) {
        console.error("Error loading comments:", err);
      } finally {
        setFetching(false);
      }
    };
    fetchComments();
  }, [modalOpen, idea?._id]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !user) return;
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/comment`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ideaId: idea._id,
          text: newComment.trim(),
          parentId: null,
          likes: [],
          likeCount: 0,
          createdAt: new Date().toISOString(),
          author: { userId: user.id, name: user.name, photo: user.image },
        }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const updated = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${idea._id}`,
      );
      setComments(await updated.json());
      setNewComment("");
    } catch (err) {
      console.error("Comment error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCommentState = (commentId) => {
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  };

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 border-b-2 border-black/15 sm:border dark:border-white/20 rounded-none sm:rounded-2xl overflow-hidden transition-all duration-200 sm:hover:border-black/20 sm:dark:hover:border-white/20">
      {/* Author Row */}
      <div className="flex items-center justify-between px-3 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full relative shrink-0">
            <Image
              fill
              src={idea.author?.photo || "https://i.pravatar.cc/150?img=1"}
              alt={idea.author?.name || "Author"}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.1px] leading-none">
                {idea.author?.name}
              </p>
              <MdVerified className="text-blue-500 text-[13px] shrink-0" />
            </div>
            <p className="text-xs font-semibold text-black/60 dark:text-white/30 tracking-[-0.1px] mt-0.5">
              {new Date(idea.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-medium tracking-[-0.1px] px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.06] text-black/50 dark:text-white/50">
          {idea.category}
        </span>
      </div>

      {/* Title + Description */}
      <div className="px-3 pb-1.5">
        <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em] leading-snug  line-clamp-1">
          {idea.title}
        </h3>
        <p className="text-[14px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px] leading-relaxed line-clamp-1">
          {idea.shortDescription}{" "}
          <Link
            href={`/ideas/${idea._id}`}
            className="text-black/70 dark:text-white/70 font-medium hover:underline"
          >
            See more
          </Link>
        </p>
      </div>

      {/* Banner */}
      <div className="relative w-full h-44 shrink-0">
        <Image
          fill
          src={
            idea.imageURL ||
            "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&auto=format&fit=crop&q=60"
          }
          alt={idea.title}
          className="object-cover"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between px-4 py-1 gap-1">
        <div className="flex gap-5 flex-row">
          {/* Like */}
          <button
            onClick={handleLike}
            className={`flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl transition-all duration-150 text-[13px] font-semibold tracking-[-0.1px]
              ${
                liked
                  ? "text-blue-500"
                  : "text-black/50 dark:text-white/50 md:hover:text-blue-500"
              }`}
          >
            <LuThumbsUp
              className={`text-xl ${liked ? "text-blue-500" : "text-[#65686c]"}`}
            />
            {/* <span className="font-normal hidden sm:inline">
              {liked ? "Liked" : "Like"}
            </span> */}
            <span
              className={
                liked
                  ? "text-blue-400 text-base"
                  : "text-[#65686c] dark:text-white/40 text-base"
              }
            >
              {likeCount}
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 text-black/50 dark:text-white/50 md:hover:text-green-500 dark:hover:bg-green-500/10 py-2.5 rounded-xl transition-all duration-150"
          >
            <MdOutlineModeComment className="text-xl shrink-0 text-[#65686c]" />
            <span className="text-base font-semibold text-[#65686c] dark:text-white/40">
              {idea.commentCount}
            </span>
          </button>
        </div>

        {/* View Details */}
        <Link
          href={`/ideas/${idea._id}`}
          className="flex items-center justify-center gap-1.5 text-black dark:text-white/50 hover:text-black dark:hover:text-white py-2.5 rounded-xl transition-all duration-150 hover:underline"
        >
          <span className="text-base text-[#65686c] font-normal tracking-[-0.1px] px-3">
            View Details
          </span>
        </Link>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Backdrop>
          <Modal.Container className="!p-0 !m-0 sm:!p-4 sm:!py-4">
            <Modal.Dialog className="!p-0 w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:w-[560px] sm:max-w-[calc(100vw-32px)] flex flex-col m-0 rounded-none sm:rounded-2xl overflow-hidden shadow-none">
              {/* Header */}
              <div className="flex items-center px-3 justify-between py-3 border-b border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-900 shrink-0">
                <Modal.CloseTrigger className="bg-white mr-2!">
                  <div className="text-base font-semibold text-black">
                    Close
                  </div>
                </Modal.CloseTrigger>
                <span className="text-xl font-bold text-black dark:text-white tracking-[-0.02em]">
                  {idea.author?.name}'s Idea
                </span>
                <div className="w-9 mr-3" />
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain bg-white dark:bg-zinc-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Author Row */}
                <div className="flex items-center justify-between px-3 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-full relative shrink-0">
                      <Image
                        fill
                        src={
                          idea.author?.photo ||
                          "https://i.pravatar.cc/150?img=1"
                        }
                        alt={idea.author?.name || "Author"}
                        className="rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.1px] leading-none">
                          {idea.author?.name}
                        </p>
                        <MdVerified className="text-blue-500 text-[13px] shrink-0" />
                      </div>
                      <p className="text-xs font-semibold text-black/60 dark:text-white/30 tracking-[-0.1px] mt-0.5">
                        {new Date(idea.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium tracking-[-0.1px] px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.06] text-black/50 dark:text-white/50">
                    {idea.category}
                  </span>
                </div>

                {/* Title + Description */}
                <div className="px-3 pb-2">
                  <h3 className="text-[14px] font-bold text-black dark:text-white tracking-[-0.02em] leading-snug mb-1">
                    {idea.title}
                  </h3>
                  <p className="text-[13px] font-normal text-black/50 dark:text-white/50 leading-relaxed">
                    {idea.shortDescription}
                  </p>
                </div>

                {/* Banner */}
                <div className="w-full">
                  <img
                    src={idea.imageURL}
                    alt={idea.title}
                    className="w-full object-contain"
                  />
                </div>

                {/* Like + Comment count */}
                <div className="flex items-center justify-between px-4 py-1 gap-1">
                  <div className="flex gap-5 flex-row">
                    {/* Like */}
                    <button
                      onClick={handleLike}
                      className={`flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl transition-all duration-150 text-[13px] font-semibold tracking-[-0.1px]
              ${
                liked
                  ? "text-blue-500"
                  : "text-black/50 dark:text-white/50 md:hover:text-blue-500"
              }`}
                    >
                      <LuThumbsUp
                        className={`text-xl ${liked ? "text-blue-500" : "text-[#65686c]"}`}
                      />
                      {/* <span className="font-normal hidden sm:inline">
              {liked ? "Liked" : "Like"}
            </span> */}
                      <span
                        className={
                          liked
                            ? "text-blue-400 text-base"
                            : "text-[#65686c] dark:text-white/40 text-base"
                        }
                      >
                        {likeCount}
                      </span>
                    </button>

                    {/* Comment */}
                    <button
                      onClick={() => setModalOpen(true)}
                      className="flex-1 flex items-center justify-center gap-1 text-black/50 dark:text-white/50 md:hover:text-green-500 dark:hover:bg-green-500/10 py-2.5 rounded-xl transition-all duration-150"
                    >
                      <MdOutlineModeComment className="text-xl shrink-0 text-[#65686c]" />
                      <span className="text-base font-semibold text-[#65686c] dark:text-white/40">
                        {idea.commentCount}
                      </span>
                    </button>
                  </div>

                  {/* View Details */}
                  <Link
                    href={`/ideas/${idea._id}`}
                    className="flex items-center justify-center gap-1.5 text-black dark:text-white/50 hover:text-black dark:hover:text-white py-2.5 rounded-xl transition-all duration-150 hover:underline"
                  >
                    <span className="text-base text-[#65686c] font-normal tracking-[-0.1px] px-3 border rounded-md ">
                      View Details
                    </span>
                  </Link>
                </div>

                {/* Comments list */}
                <div className="px-3 pt-3 pb-4 flex flex-col gap-4">
                  {fetching ? (
                    <div className="flex justify-center py-6">
                      <ImSpinner2 className="text-[20px] text-black/30 dark:text-white/30 animate-spin" />
                    </div>
                  ) : comments.length > 0 ? (
                    comments.map((comment) => (
                      <CommentCard
                        key={comment._id || comment.createdAt}
                        comment={comment}
                        currentUser={user}
                        onDelete={handleDeleteCommentState}
                      />
                    ))
                  ) : (
                    <p className="text-center text-base text-black/60 dark:text-white/30 py-4">
                      No comments yet. Be the first!
                    </p>
                  )}
                </div>
              </div>

              {/* Sticky comment input */}
              <div className="border-t border-black/[0.06] dark:border-white/[0.06] py-2.5 bg-white dark:bg-zinc-900 flex items-center gap-2 shrink-0 px-3">
                <UserAvatar user={user} size={40} />
                <div className="flex-1 flex items-center bg-[#f0f2f5] dark:bg-zinc-800 rounded-full px-3 py-2 gap-2 border border-black/10">
                  <input
                    type="text"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddComment()}
                    placeholder={
                      user ? "Write a comment..." : "Sign in to comment"
                    }
                    disabled={loading || !user}
                    className="flex-1 bg-transparent text-base font-normal text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none min-w-0 disabled:opacity-50"
                  />
                  <button
                    onClick={handleAddComment}
                    disabled={!newComment.trim() || loading || !user}
                    className="text-blue-500 disabled:text-black/20 dark:disabled:text-white/20 transition-colors duration-150 shrink-0"
                  >
                    {loading ? (
                      <ImSpinner2 className="text-[15px] animate-spin" />
                    ) : (
                      <HiPaperAirplane className="text-2xl text-blue-500 rotate-90" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <p className="text-[12px] text-red-500 px-4 pb-2 bg-white dark:bg-zinc-900">
                  {error}
                </p>
              )}
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
