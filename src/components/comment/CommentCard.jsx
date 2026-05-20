"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  HiReply,
  HiThumbUp,
  HiChat,
  HiChevronDown,
  HiChevronUp,
  HiPaperAirplane,
  HiPencil,
  HiCheck,
  HiX,
  HiTrash,
} from "react-icons/hi";

const CommentCard = ({ comment, currentUser, depth = 0 }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState(comment.replies || []);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(comment.text);
  const [commentText, setCommentText] = useState(comment.text);
  const [deleted, setDeleted] = useState(false);
  const [liked, setLiked] = useState(
    comment.likes?.includes(currentUser?.id) || false,
  );
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);

  const isMyComment = currentUser && comment.author?.userId === currentUser.id;

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
      setLiked(!liked);
      setLikeCount(data.likeCount);
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;
    try {
      const replyPayload = {
        ideaId: comment.ideaId,
        parentId: comment._id,
        text: replyText.trim(),
        likes: [],
        likeCount: 0,
        createdAt: new Date().toISOString(),
        author: {
          userId: currentUser?.id || "",
          name: currentUser?.name || "You",
          photo: currentUser?.image || "",
        },
      };
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/comment/${comment._id}/reply`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(replyPayload),
        },
      );
      const savedReply = await res.json();
      setReplies((prev) => [...prev, savedReply]);
      setReplyText("");
      setShowReplyInput(false);
      setShowReplies(true);
    } catch (err) {
      console.error("Reply error:", err);
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
    <div className={`flex items-start gap-3 ${depth > 0 ? "mt-3" : ""}`}>
      {/* Avatar */}
      <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 bg-black/[0.08] flex items-center justify-center">
        {comment.author?.photo ? (
          <Image
            fill
            src={comment.author.photo}
            alt={comment.author?.name || "User"}
            sizes="32px"
            className="object-cover"
          />
        ) : (
          <span className="text-[12px] font-semibold text-black/50">
            {comment.author?.name?.charAt(0)?.toUpperCase() || "?"}
          </span>
        )}
      </div>

      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            depth > 0 ? "bg-blue-50 border border-blue-100" : "bg-[#f0f2f5]"
          }`}
        >
          {depth > 0 && (
            <div className="flex items-center gap-1 mb-1">
              <HiReply className="text-[11px] text-blue-400 rotate-180" />
              <span className="text-[11px] text-blue-400 font-medium tracking-[-0.1px]">
                Reply
              </span>
            </div>
          )}

          {/* Name + Edit/Delete */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <p className="text-[13px] font-bold text-black tracking-[-0.1px] leading-none">
              {comment.author?.name || "Unknown"}
            </p>
            {isMyComment && !isEditing && (
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/[0.06] hover:bg-black/[0.1] transition-all duration-150 min-w-[44px] justify-center"
                >
                  <HiPencil className="text-[12px] text-black/50" />
                  <span className="text-[11px] font-medium text-black/50 tracking-[-0.1px]">
                    Edit
                  </span>
                </button>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 hover:bg-red-100 transition-all duration-150 min-w-[44px] justify-center"
                >
                  <HiTrash className="text-[12px] text-red-400" />
                  <span className="text-[11px] font-medium text-red-400 tracking-[-0.1px]">
                    Delete
                  </span>
                </button>
              </div>
            )}
          </div>

          {/* Text or Edit */}
          {isEditing ? (
            <div className="flex items-center gap-2 mt-2">
              <input
                autoFocus
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEditSave()}
                className="flex-1 bg-white border border-black/10 rounded-full px-3 py-1.5 text-[13px] font-normal text-black outline-none tracking-[-0.1px]"
              />
              <button
                onClick={handleEditSave}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-blue-500 text-white shrink-0"
              >
                <HiCheck className="text-[13px]" />
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditText(commentText);
                }}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.06] text-black/50 shrink-0"
              >
                <HiX className="text-[13px]" />
              </button>
            </div>
          ) : (
            <p className="text-[13px] font-normal text-black tracking-[-0.1px] leading-relaxed">
              {commentText}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 mt-1.5 px-1 flex-wrap">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1 text-[12px] font-bold tracking-[-0.1px] transition-colors duration-150 min-h-[32px] px-1 ${
              liked ? "text-blue-500" : "text-black/50 hover:text-blue-500"
            }`}
          >
            <HiThumbUp className="text-[13px]" />
            {likeCount > 0 && <span>{likeCount}</span>}
          </button>

          {depth === 0 && (
            <button
              onClick={() => setShowReplyInput((prev) => !prev)}
              className="flex items-center gap-1 text-[12px] font-bold text-black/50 hover:text-black tracking-[-0.1px] transition-colors duration-150 min-h-[32px] px-1"
            >
              <HiChat className="text-[13px]" />
              Reply
            </button>
          )}

          <span className="text-[11px] font-normal text-black/40 tracking-[-0.1px]">
            {comment.createdAt
              ? new Date(comment.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "Just now"}
          </span>

          {replies.length > 0 && (
            <button
              onClick={() => setShowReplies((prev) => !prev)}
              className="flex items-center gap-1 text-[12px] font-bold text-blue-500 hover:text-blue-600 tracking-[-0.1px] transition-colors duration-150 ml-auto min-h-[32px]"
            >
              {showReplies ? (
                <>
                  <HiChevronUp className="text-[13px]" />
                  Hide replies
                </>
              ) : (
                <>
                  <HiChevronDown className="text-[13px]" />
                  {replies.length} {replies.length === 1 ? "reply" : "replies"}
                </>
              )}
            </button>
          )}
        </div>

        {/* Reply Input */}
        {showReplyInput && (
          <div className="flex items-center gap-2 mt-3">
            <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 bg-black/[0.08] flex items-center justify-center">
              {currentUser?.image ? (
                <Image
                  fill
                  src={currentUser.image}
                  alt="You"
                  sizes="28px"
                  className="object-cover"
                />
              ) : (
                <span className="text-[11px] font-semibold text-black/50">
                  {currentUser?.name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              )}
            </div>
            <div className="flex-1 flex items-center bg-[#f0f2f5] rounded-full px-4 py-2 gap-2">
              <input
                autoFocus
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleReplySubmit()}
                placeholder={`Reply to ${comment.author?.name || "user"}...`}
                className="flex-1 bg-transparent text-[13px] font-normal text-black placeholder:text-black/40 tracking-[-0.1px] outline-none"
              />
              <button
                onClick={handleReplySubmit}
                disabled={!replyText.trim()}
                className="text-blue-500 hover:text-blue-600 disabled:text-black/20 transition-colors duration-150"
              >
                <HiPaperAirplane className="text-[15px] rotate-90" />
              </button>
            </div>
          </div>
        )}

        {/* Nested Replies */}
        {showReplies && replies.length > 0 && depth === 0 && (
          <div className="mt-3 pl-10 flex flex-col gap-3">
            {replies.map((reply) => (
              <CommentCard
                key={reply._id}
                comment={reply}
                currentUser={currentUser}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
