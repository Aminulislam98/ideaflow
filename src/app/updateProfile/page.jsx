"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import toast from "react-hot-toast";
import { HiBadgeCheck, HiCamera } from "react-icons/hi";

export default function SettingsPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState(user?.name || "");
  const [imageURL, setImageURL] = useState(user?.image || "");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    // কিছু change না হলে return
    if (name === user?.name && imageURL === user?.image) {
      toast.error("No changes made.");
      return;
    }

    try {
      setLoading(true);

      // শুধু changed values পাঠাও
      const updateData = {};
      if (name !== user?.name) updateData.name = name;
      if (imageURL !== user?.image) updateData.image = imageURL;

      // Better Auth — updateUser
      const { error } = await authClient.updateUser(updateData);

      if (error) {
        toast.error(error.message || "Failed to update.");
        return;
      }

      toast.success("Profile updated!");
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen w-full bg-[#f0f2f5] pt-14 flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-black/20 border-t-black animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] pt-14">
      <div className="max-w-xl mx-auto px-5 sm:px-8 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[clamp(1.5rem,3vw,2rem)] font-semibold text-black tracking-[-0.03em]">
            Settings
          </h1>
          <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mt-1">
            Update your profile information.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8 flex flex-col gap-6">
          {/* Current Avatar Preview */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-20 h-20 rounded-full overflow-hidden bg-black/[0.08] flex items-center justify-center shrink-0">
              {imageURL ? (
                <Image
                  fill
                  src={imageURL}
                  alt={name || "User"}
                  sizes="80px"
                  className="object-cover"
                  onError={() => setImageURL("")}
                />
              ) : (
                <span className="text-[28px] font-bold text-black/30">
                  {name?.charAt(0)?.toUpperCase() || "?"}
                </span>
              )}
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-150 cursor-pointer rounded-full">
                <HiCamera className="text-white text-[20px]" />
              </div>
            </div>
            <div className="flex items-center gap-1">
              <p className="text-[14px] font-semibold text-black tracking-[-0.1px]">
                {user?.name}
              </p>
              {user?.emailVerified && (
                <HiBadgeCheck className="text-blue-500 text-[15px]" />
              )}
            </div>
            <p className="text-[12px] font-normal text-black/40 tracking-[-0.1px]">
              {user?.email}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/[0.06]" />

          {/* Name Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-black tracking-[-0.1px]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full bg-[#f0f2f5] rounded-full px-4 py-2.5 text-[13px] font-normal text-black placeholder:text-black/30 tracking-[-0.1px] outline-none border border-transparent focus:border-black/10 transition-all duration-150"
            />
          </div>

          {/* Image URL Field */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[13px] font-medium text-black tracking-[-0.1px]">
              Profile Photo URL
            </label>
            <input
              type="url"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
              placeholder="https://example.com/photo.jpg"
              className="w-full bg-[#f0f2f5] rounded-full px-4 py-2.5 text-[13px] font-normal text-black placeholder:text-black/30 tracking-[-0.1px] outline-none border border-transparent focus:border-black/10 transition-all duration-150"
            />
            <p className="text-[11px] font-normal text-black/30 tracking-[-0.1px] px-1">
              Paste a direct image URL — preview updates automatically.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-black/[0.06]" />

          {/* Submit */}
          <button
            onClick={handleUpdate}
            disabled={
              loading || (name === user?.name && imageURL === user?.image)
            }
            className="w-full text-[13px] font-normal text-white bg-black hover:bg-black/80 disabled:opacity-40 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
