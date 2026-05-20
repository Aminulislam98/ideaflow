"use client";
import React, { useState } from "react";
import { HiThumbUp, HiPencil, HiCheck, HiX, HiTrash } from "react-icons/hi";
import UserAvatar from "./UserAvatar";

const CommentCard = ({ comment, currentUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [commentText, setCommentText] = useState(comment.text);
  const [deleted, setDeleted] = useState(false);
  const [liked, setLiked] = useState(
    comment.likes?.includes(currentUser?.id) ?? false,
  );
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);

  const isOwner = currentUser && comment.author?.userId === currentUser.id;

  const handleLike = async () => {
    if (!currentUser) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}/like`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ userId: currentUser.id }),
        },
      );
      const data = await res.json();
      setLiked((prev) => !prev);
      setLikeCount(data.likeCount);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleEditSave = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ text: editText }),
        },
      );
      setCommentText(editText);
      setIsEditing(false);
    } catch (err) {
      console.error("Edit error:", err);
    }
  };

  const handleEditCancel = () => {
    setEditText(commentText);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        { method: "DELETE" },
      );
      setDeleted(true);
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  if (deleted) return null;

  return (
    <div className="flex items-start gap-3">
      <UserAvatar author={comment.author} size={32} />

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="rounded-2xl px-4 py-3 bg-[#f0f2f5] dark:bg-zinc-800">
          {/* Name + owner actions */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[13px] font-bold text-black dark:text-white tracking-[-0.1px] leading-none">
              {comment.author?.name || "Unknown"}
            </p>

            {isOwner && !isEditing && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/[0.1] dark:hover:bg-white/[0.12] transition-all duration-150"
                >
                  <HiPencil className="text-[12px] text-black/50 dark:text-white/50" />
                  <span className="text-[11px] font-medium text-black/50 dark:text-white/50 tracking-[-0.1px]">
                    Edit
                  </span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-500/10 hover:bg-red-100 dark:hover:bg-red-500/20 transition-all duration-150"
                >
                  <HiTrash className="text-[12px] text-red-400" />
                  <span className="text-[11px] font-medium text-red-400 tracking-[-0.1px]">
                    Delete
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Text or edit input */}
          {isEditing ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                autoFocus
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEditSave();
                  if (e.key === "Escape") handleEditCancel();
                }}
                className="flex-1 bg-white dark:bg-zinc-700 border border-black/10 dark:border-white/10 rounded-full px-3 py-1.5 text-[13px] text-black dark:text-white outline-none tracking-[-0.1px]"
              />
              <button
                onClick={handleEditSave}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shrink-0"
              >
                <HiCheck className="text-[13px]" />
              </button>
              <button
                onClick={handleEditCancel}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.06] dark:bg-white/[0.08] text-black/50 dark:text-white/50 shrink-0"
              >
                <HiX className="text-[13px]" />
              </button>
            </div>
          ) : (
            <p className="text-[13px] font-normal text-black dark:text-white tracking-[-0.1px] leading-relaxed">
              {commentText}
            </p>
          )}
        </div>

        {/* Like + timestamp */}
        <div className="flex items-center gap-3 mt-1.5 px-1">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-[12px] font-bold tracking-[-0.1px] transition-colors duration-150 min-h-[32px] px-1 ${
              liked
                ? "text-blue-500"
                : "text-black/50 dark:text-white/50 hover:text-blue-500"
            }`}
          >
            <HiThumbUp className="text-[13px]" />
            {likeCount > 0 && <span>{likeCount}</span>}
          </button>

          <span className="text-[11px] font-normal text-black/40 dark:text-white/40 tracking-[-0.1px]">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Just now"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
