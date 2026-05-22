"use client";
import React, { useState } from "react";
import { HiTrash, HiX } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";
import UserAvatar from "./UserAvatar";

// ── Delete Confirmation Modal ──────────────────────────────────────────────
function DeleteConfirmModal({ onConfirm, onCancel, isDeleting }) {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      />
      <div className="relative w-full max-w-[400px] bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
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
export default function CommentCard({
  comment,
  currentUser,
  onDelete,
  onEdit,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment?.text);
  const [isSaving, setIsSaving] = useState(false);

  const isOwner = currentUser?.id === comment?.author?.userId;

  // ── Delete ──
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

  // ── Edit (Save) ──
  const executeEdit = async () => {
    if (!editText.trim() || editText === comment?.text) {
      setIsEditing(false);
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: editText }),
        },
      );
      if (res.ok) {
        toast.success("Comment updated");
        setIsEditing(false);
        onEdit(comment._id, editText);
      } else {
        toast.error("Failed to update comment");
      }
    } catch (err) {
      console.error("Edit error:", err);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  // calculating time and showing
  const getRelativeTime = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now - date;
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSecs < 60) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays}d ago`;
    if (diffWeeks < 4) return `${diffWeeks}w ago`;
    if (diffMonths < 12) return `${diffMonths}mo ago`;
    return `${diffYears}y ago`;
  };

  return (
    <>
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
          size={36}
        />

        {/* Bubble */}
        <div className="flex-1 min-w-0">
          <div className="bg-[#f0f2f5] dark:bg-zinc-800/60 rounded-2xl px-3 py-2.5 inline-block max-w-full w-full">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-sm font-semibold text-black dark:text-white tracking-[-0.1px]">
                {comment?.author?.name || "Anonymous"}
              </span>
            </div>

            {/* isEditing হলে textarea,  text */}
            {isEditing ? (
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={3}
                autoFocus
                className="w-full bg-white dark:bg-zinc-700 text-sm text-black dark:text-zinc-100 rounded-xl px-2 py-1.5 resize-none outline-none border border-black/10 dark:border-white/10 focus:border-blue-400 transition-colors"
              />
            ) : (
              <p className="text-base font-normal text-black dark:text-zinc-200 leading-relaxed break-words mt-0">
                {comment?.text}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 mt-1 px-1.5">
            <span className="text-xs font-semibold  text-black/60 dark:text-white/30 ">
              {comment?.createdAt ? getRelativeTime(comment.createdAt) : ""}
            </span>
            {/* Delete — শুধু isEditing false হলে দেখাবে */}
            {isOwner && !isEditing && (
              <button
                onClick={() => setShowConfirm(true)}
                disabled={isDeleting}
                className="text-xs font-semibold text-black/60 hover:text-red-600 disabled:opacity-40 transition-colors duration-150 px-1 rounded-xl hover:underline"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            )}

            {/* Edit / Save / Cancel */}
            {isOwner && (
              <>
                {isEditing ? (
                  <>
                    <button
                      onClick={executeEdit}
                      disabled={isSaving}
                      className="text-base font-medium text-blue-600 hover:text-blue-700 disabled:opacity-40 transition-colors duration-150 px-1 rounded-xl flex items-center gap-1"
                    >
                      {isSaving ? (
                        <>
                          <ImSpinner2 className="animate-spin text-sm" />
                          Saving...
                        </>
                      ) : (
                        "Save"
                      )}
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditText(comment?.text);
                      }}
                      disabled={isSaving}
                      className="text-base font-medium text-black/60 hover:text-black disabled:opacity-40 transition-colors duration-150 px-1 rounded-xl"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditText(comment?.text);
                    }}
                    className="text-xs font-semibold text-black/60  transition-colors duration-150 px-1 rounded-xl hover:underline"
                  >
                    Edit
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
