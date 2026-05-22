"use client";
import React, { useState } from "react";
import { HiTrash, HiX } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar";
import { AiOutlineDelete, AiTwotoneDelete } from "react-icons/ai";

// ── Delete Confirmation Modal ──────────────────────────────────────────────
function DeleteConfirmModal({ onConfirm, onCancel, isDeleting }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal box */}
      <div className="relative w-full max-w-[400px] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-black/[0.06] dark:border-white/[0.06]">
          <h2 className="text-[16px] font-black text-black dark:text-white tracking-[-0.3px]">
            Delete Comment?
          </h2>
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/[0.12] transition-colors duration-150"
          >
            <HiX className="text-[15px] text-black dark:text-white" />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-4">
          <p className="text-[14px] text-black/70 dark:text-white/60 leading-relaxed tracking-[-0.1px]">
            Are you sure you want to permanently delete this comment? This
            action
            <span className="font-bold text-black dark:text-white">
              {" "}
              cannot be undone
            </span>
            .
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 px-4 pb-4">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="flex-1 py-2.5 text-[14px] font-black text-black dark:text-white bg-black/[0.06] dark:bg-white/[0.08] hover:bg-black/10 dark:hover:bg-white/[0.12] rounded-xl transition-colors duration-150 tracking-[-0.1px] disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 py-2.5 text-[14px] font-black text-white bg-red-500 hover:bg-red-600 active:bg-red-700 rounded-xl transition-colors duration-150 tracking-[-0.1px] disabled:opacity-70 flex items-center justify-center gap-2"
          >
            {isDeleting ? (
              <>
                <ImSpinner2 className="text-[14px] animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <HiTrash className="text-[15px]" />
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── CommentCard ────────────────────────────────────────────────────────────
export default function CommentCard({ comment, currentUser, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isOwner = currentUser?.id === comment?.author?.userId;

  const executeDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        { method: "DELETE" },
      );

      if (res.ok) {
        toast.success("Comment deleted");
        setShowConfirm(false);
        onDelete(comment._id);
      } else {
        const errorData = await res.json().catch(() => ({}));
        toast.error(errorData.message || "Failed to delete comment");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("An error occurred while removing the comment.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      {/* Delete confirmation modal */}
      {showConfirm && (
        <DeleteConfirmModal
          onConfirm={executeDelete}
          onCancel={() => setShowConfirm(false)}
          isDeleting={isDeleting}
        />
      )}

      <div className="flex gap-3 group items-start">
        {/* Avatar */}
        <UserAvatar
          user={{ image: comment?.author?.photo, name: comment?.author?.name }}
          size={32}
        />

        {/* Bubble */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#f0f2f5] dark:bg-zinc-800/60 rounded-2xl px-3 py-2.5 inline-block max-w-full">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-black dark:text-white tracking-[-0.1px]">
                {comment?.author?.name || "Anonymous"}
              </span>
            </div>
            <p className="text-sm font-normal text-black dark:text-zinc-200 leading-relaxed wrap-break-word mt-0 ">
              {comment?.text}
            </p>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-3 mt-1 px-1.5">
            {isOwner && (
              <button
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="flex items-center gap-1 text-sm font-medium text-red-500/70 hover:text-red-600 disabled:opacity-40 transition-colors duration-150 border border-red-500 px-1 rounded-xl"
              >
                <AiOutlineDelete className="text-xl" />
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
