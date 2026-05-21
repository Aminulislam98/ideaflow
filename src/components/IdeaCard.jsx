"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  HiThumbUp,
  HiChat,
  HiBadgeCheck,
  HiPaperAirplane,
  HiDotsHorizontal,
  HiPencil,
  HiTrash,
  HiX,
} from "react-icons/hi";
import { Modal } from "@heroui/react";

const dummyComments = [
  {
    _id: "c1",
    author: {
      name: "Rahul Mehta",
      photo: "https://i.pravatar.cc/150?img=11",
      verified: true,
    },
    text: "This is exactly what the market needs right now. Have you thought about B2B pricing?",
    isOwn: false,
  },
  {
    _id: "c2",
    author: {
      name: "Emily Chen",
      photo: "https://i.pravatar.cc/150?img=5",
      verified: false,
    },
    text: "Love the concept. Have you looked into Plaid or TrueLayer for bank integrations?",
    isOwn: false,
  },
  {
    _id: "c3",
    author: {
      name: "Aminul Islam",
      photo: "https://i.pravatar.cc/150?img=33",
      verified: true,
    },
    text: "Would love to beta test this. The weekly health report idea is brilliant.",
    isOwn: true,
  },
];

export default function IdeaCard({ idea }) {
  const [comment, setComment] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="flex flex-col bg-white dark:bg-zinc-900 border-b-2 md:border-black/[0.06] md:dark:border-white/[0.06]  rounded-none sm:rounded-2xl overflow-hidden transition-all duration-200 md:hover:border-black/20 md:dark:hover:border-white/20">
      {/* Author Row */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full relative shrink-0">
            <Image
              fill
              src={idea.author?.photo || "https://i.pravatar.cc/150?img=1"}
              alt={idea.author?.name || "Author"}
              className="rounded-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="text-base font-semibold text-black dark:text-white tracking-[-0.1px] leading-none">
                {idea.author?.name}
              </p>
              <HiBadgeCheck className="text-blue-500 text-[14px] shrink-0" />
            </div>
            <p className="text-[11px] font-normal text-black/30 dark:text-white/30 tracking-[-0.1px] mt-0.5">
              {new Date(idea.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
        <span className="text-[11px] font-medium tracking-[-0.1px] px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-black/50 dark:text-white/50">
          {idea.category}
        </span>
      </div>

      {/* Title + Description */}
      <div className="px-4 pb-3">
        <h3 className="text-[14px] font-semibold text-black dark:text-white tracking-[-0.02em] leading-snug mb-1 line-clamp-1">
          {idea.title}
        </h3>
        <p className="text-[12.5px] font-normal text-black/50 dark:text-white/50 tracking-[-0.1px] leading-relaxed line-clamp-1">
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
      <div className="flex items-center px-2 py-1 gap-1">
        <div className="flex gap-5 flex-row">
          {/* Like */}
          <button className="flex-1 flex items-center justify-center gap-1 text-black/50 dark:text-white/50 md:hover:text-blue-500  md:dark:hover:bg-blue-500/10 py-2.5 rounded-xl transition-all duration-150">
            <HiThumbUp className="text-[20px] sm:text-[16px]" />
            <span className="text-[13px] font-normal tracking-[-0.1px] hidden sm:inline">
              Like
            </span>
            <span className="text-[13px] font-semibold text-black/40 dark:text-white/40">
              {idea.likeCount}
            </span>
          </button>

          {/* Comment */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-1 text-black/50 dark:text-white/50 md:hover:text-green-500  dark:hover:bg-green-500/10 py-2.5 rounded-xl transition-all duration-150"
          >
            <HiChat className="text-[20px] sm:text-[16px] shrink-0" />
            <span className="text-[13px] font-normal tracking-[-0.1px] hidden sm:inline">
              Comment
            </span>
            <span className="text-[13px] font-semibold text-black/40 dark:text-white/40">
              {idea.commentCount}
            </span>
          </button>
        </div>

        {/* View Details */}
        <Link
          href={`/ideas/${idea._id}`}
          className="flex-1 flex items-center justify-center gap-1.5 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] py-2.5 rounded-xl transition-all duration-150"
        >
          <span className="text-[13px] font-normal tracking-[-0.1px]">
            View Details
          </span>
        </Link>
      </div>

      {/* Modal */}
      <Modal isOpen={modalOpen} onOpenChange={setModalOpen}>
        <Modal.Backdrop>
          <Modal.Container className="p-0! m-0! sm:p-4! py-0!">
            <Modal.Dialog className="!p-0 w-full h-[100dvh] sm:h-auto sm:max-h-[90vh] sm:max-w-[560px] flex flex-col m-0 rounded-none sm:rounded-2xl overflow-hidden shadow-none">
              {/* Header */}
              <div className="flex items-center px-4 justify-between py-3 border-b border-black/[0.06] dark:border-white/[0.06] bg-white dark:bg-zinc-900 shrink-0">
                <Modal.CloseTrigger>
                  <div className="rounded-full bg-[#e4e6eb] dark:bg-zinc-700 hover:bg-[#d8dadf] dark:hover:bg-zinc-600 cursor-pointer transition-all duration-150 p-1.5">
                    <HiX className="text-black dark:text-white text-[16px]" />
                  </div>
                </Modal.CloseTrigger>
                <span className="text-[15px] font-bold text-black dark:text-white tracking-[-0.02em]">
                  {idea.author?.name}'s Post
                </span>
                <div className="w-9 mr-3" />
              </div>

              {/* Scrollable */}
              <div className="flex-1 overflow-y-auto overscroll-contain bg-white dark:bg-zinc-900 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* Author */}
                <div className="flex items-center gap-2.5 px-3 pt-3 pb-2">
                  <div className="w-10 h-10 rounded-full relative shrink-0">
                    <Image
                      fill
                      src={
                        idea.author?.photo || "https://i.pravatar.cc/150?img=1"
                      }
                      alt={idea.author?.name || ""}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <p className="text-[14px] font-bold text-black dark:text-white tracking-[-0.1px] leading-none">
                        {idea.author?.name}
                      </p>
                      <HiBadgeCheck className="text-blue-500 text-[14px] shrink-0" />
                    </div>
                    <p className="text-[12px] font-normal text-black/40 dark:text-white/40 mt-0.5">
                      {new Date(idea.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-black/[0.04] dark:bg-white/[0.06] text-black/50 dark:text-white/50 shrink-0">
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
                <div className="flex items-center gap-4 px-3 py-2.5 border-b border-black/[0.06] dark:border-white/[0.06]">
                  <span className="flex items-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50">
                    <HiThumbUp className="text-[14px]" />
                    {idea.likeCount} likes
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] font-normal text-black/50 dark:text-white/50">
                    <HiChat className="text-[14px]" />
                    {idea.commentCount} comments
                  </span>
                </div>

                {/* Comments */}
                <div className="px-3 pt-3 pb-4 flex flex-col gap-3">
                  {dummyComments.map((c) => (
                    <div key={c._id} className="flex items-start gap-2">
                      <div className="w-9 h-9 rounded-full relative shrink-0">
                        <Image
                          fill
                          src={c.author.photo}
                          alt={c.author.name}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="relative bg-[#f0f2f5] dark:bg-zinc-800 rounded-2xl px-3 py-2.5">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <div className="flex items-center gap-1 min-w-0">
                              <p className="text-[13px] font-bold text-black dark:text-white leading-none truncate">
                                {c.author.name}
                              </p>
                              {c.author.verified && (
                                <HiBadgeCheck className="text-blue-500 text-[12px] shrink-0" />
                              )}
                            </div>
                            {c.isOwn && (
                              <div className="relative shrink-0">
                                <button
                                  onClick={() =>
                                    setOpenMenuId(
                                      openMenuId === c._id ? null : c._id,
                                    )
                                  }
                                  className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-black/[0.08] dark:hover:bg-white/[0.08] text-black/30 dark:text-white/30 hover:text-black dark:hover:text-white transition-all duration-150"
                                >
                                  <HiDotsHorizontal className="text-[14px]" />
                                </button>
                                {openMenuId === c._id && (
                                  <div className="absolute right-0 top-full mt-1 w-[130px] bg-white dark:bg-zinc-800 border border-black/[0.08] dark:border-white/[0.08] rounded-xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.1)] z-20">
                                    <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-150">
                                      <HiPencil className="text-[13px]" />
                                      Edit
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-3 py-2.5 text-[13px] font-normal text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-150">
                                      <HiTrash className="text-[13px]" />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          <p className="text-[13px] font-normal text-black dark:text-white leading-relaxed">
                            {c.text}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sticky Input */}
              <div className="border-t border-black/[0.06] dark:border-white/[0.06] py-2.5 bg-white dark:bg-zinc-900 flex items-center gap-2 shrink-0 px-3">
                <div className="w-8 h-8 rounded-full relative shrink-0 overflow-hidden">
                  <Image
                    fill
                    src={
                      idea.author?.photo || "https://i.pravatar.cc/150?img=1"
                    }
                    alt="me"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center gap-2 bg-[#f0f2f5] dark:bg-zinc-800 rounded-full px-3 py-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 bg-transparent text-[13px] font-normal text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 outline-none min-w-0"
                  />
                  <button
                    disabled={!comment.trim()}
                    className="text-blue-500 disabled:text-black/20 dark:disabled:text-white/20 transition-colors duration-150 shrink-0 rotate-90"
                  >
                    <HiPaperAirplane className="text-[18px]" />
                  </button>
                </div>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </div>
  );
}
