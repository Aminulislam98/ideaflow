"use client";

import { useState } from "react";
import { Modal } from "@heroui/react";
import { HiTrash, HiExclamation } from "react-icons/hi";

export function DeleteIdeaAlert({ idea }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await onDelete();
    setLoading(false);
    setOpen(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="flex-1 flex items-center justify-center gap-1.5 text-[12px] font-normal text-red-400 hover:text-red-500 border border-red-100 hover:border-red-200 hover:bg-red-50 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
      >
        <HiTrash className="text-[13px]" />
        Delete
      </button>

      {/* Modal */}
      <Modal isOpen={open} onOpenChange={setOpen}>
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="!p-0 max-w-[380px] rounded-2xl overflow-hidden shadow-none">
              {/* Content */}
              <div className="p-6">
                {/* Icon */}
                <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center mb-4">
                  <HiExclamation className="text-red-500 text-[22px]" />
                </div>

                {/* Title */}
                <h2 className="text-[16px] font-bold text-black tracking-[-0.02em] mb-1.5">
                  Delete this idea?
                </h2>

                {/* Description */}
                <p className="text-[13px] font-normal text-black/50 tracking-[-0.1px] leading-relaxed">
                  This action cannot be undone. Your idea and all its comments
                  will be permanently deleted.
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-black/[0.06]" />

              {/* Buttons */}
              <div className="flex items-center gap-2 p-4">
                <button
                  onClick={() => setOpen(false)}
                  className="flex-1 text-[13px] font-normal text-black/60 bg-black/[0.04] hover:bg-black/[0.08] py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="flex-1 text-[13px] font-normal text-white bg-red-500 hover:bg-red-600 disabled:opacity-50 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
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
