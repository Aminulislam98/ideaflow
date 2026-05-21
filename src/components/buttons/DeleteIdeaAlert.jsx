"use client";

import { useState } from "react";
import { Modal } from "@heroui/react";
import { HiTrash, HiExclamation } from "react-icons/hi";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export function DeleteIdeaAlert({ idea }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const { data: token } = await authClient.token();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/idea/${idea._id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token.token}`,
          },
        },
      );
      if (res.ok) {
        toast.success("Idea deleted!");
        router.refresh();
      } else {
        toast.error("Failed to delete idea.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
      toast.error("An error occurred.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      {/* Trigger Button adaptive layout */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-red-500 hover:text-red-600 border border-red-500/10 hover:border-red-500/20 bg-red-500/[0.02] hover:bg-red-500/10 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
      >
        <HiTrash className="text-[13px]" />
        Delete
      </button>

      {/* Modal matching standard production designs */}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Backdrop className="bg-black/40 dark:bg-black/60 backdrop-blur-md">
          <Modal.Container>
            <Modal.Dialog className="!p-0 max-w-[380px] bg-white dark:bg-zinc-900 border border-black/[0.06] dark:border-white/[0.06] rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
              {/* Content */}
              <div className="p-6">
                {/* Adaptive Alert Icon */}
                <div className="w-11 h-11 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4">
                  <HiExclamation className="text-red-500 dark:text-red-400 text-[22px]" />
                </div>

                {/* Adaptive Title */}
                <h2 className="text-[16px] font-bold text-black dark:text-white tracking-[-0.02em] mb-1.5">
                  Delete this idea?
                </h2>

                {/* Adaptive Description */}
                <p className="text-[13px] font-normal text-black/50 dark:text-zinc-400 tracking-[-0.1px] leading-relaxed">
                  This action cannot be undone. Your idea and all its comments
                  will be permanently deleted.
                </p>
              </div>

              {/* Adaptive Divider */}
              <div className="h-px bg-black/[0.06] dark:bg-white/[0.06]" />

              {/* Action Layout Elements */}
              <div className="flex items-center gap-2 p-4">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 text-[13px] font-normal text-black/60 hover:text-black dark:text-zinc-300 dark:hover:text-white bg-[#f0f2f5] hover:bg-black/[0.07] dark:bg-zinc-800 dark:hover:bg-zinc-700/80 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 text-[13px] font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                >
                  {loading ? "Deleting..." : "Delete"}
                </button>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal>
    </>
  );
}
