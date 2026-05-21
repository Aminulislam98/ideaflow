"use client";
import React, { useState } from "react";
import { HiTrash } from "react-icons/hi";
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar";

export default function CommentCard({ comment, currentUser, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Check ownership: Is this comment written by the currently active user?
  const isOwner = currentUser?.id === comment?.author?.userId;

  // Execute actual API network drop call
  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        {
          method: "DELETE",
        },
      );

      if (res.ok) {
        toast.success("Comment deleted");
        onDelete(comment._id); // Fires parent callback to drop it from local state
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete network request error:", err);
      toast.error("An error occurred while removing the comment.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Triggers custom beautiful confirmation layout inside hot-toast
  const confirmDeleteToast = () => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2.5 p-1">
          <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100">
            Delete this comment permanently?
          </p>
          <div className="flex items-center gap-2 justify-end">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md text-zinc-500 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-300 hover:bg-zinc-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                toast.dismiss(t.id);
                executeDelete();
              }}
              className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "bottom-center",
        style: {
          background: "var(--toast-bg, #ffffff)",
          color: "var(--toast-color, #000000)",
          borderRadius: "12px",
          border: "1px solid rgba(0,0,0,0.05)",
        },
      },
    );
  };

  return (
    <div className="flex gap-3 group items-start">
      {/* Author Avatar Profile */}
      <UserAvatar
        user={{ image: comment?.author?.photo, name: comment?.author?.name }}
        size={32}
      />

      {/* Text Message Content bubble container */}
      <div className="flex-1 min-w-0">
        <div className="bg-[#f0f2f5] dark:bg-zinc-800/60 rounded-2xl px-4 py-2.5 inline-block max-w-full">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[13px] font-bold text-black dark:text-white tracking-[-0.1px]">
              {comment?.author?.name || "Anonymous"}
            </span>
            <span className="text-[10px] font-normal text-black/30 dark:text-white/30 tracking-[-0.05px]">
              {comment?.createdAt &&
                new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
            </span>
          </div>
          <p className="text-[13px] font-normal text-black/80 dark:text-zinc-200 leading-relaxed break-words">
            {comment?.text}
          </p>
        </div>

        {/* Action Row containing contextual tools */}
        <div className="flex items-center gap-3 mt-1 px-1.5">
          {/* Delete Action Trigger (Only visible to the genuine author) */}
          {isOwner && (
            <button
              onClick={confirmDeleteToast}
              disabled={isDeleting}
              className="flex items-center gap-1 text-[11px] font-medium text-red-500/70 hover:text-red-600 disabled:opacity-40 transition-colors duration-150"
            >
              <HiTrash className="text-[12px]" />
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
