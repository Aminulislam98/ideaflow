"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const UserAvatar = ({ user, author, size = 32 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const triggerMounted = async () => {
      setMounted(true);
    };
    triggerMounted();
  }, []);

  const name = user?.name ?? author?.name ?? "";
  const photo = user?.image ?? author?.photo ?? "";
  const initial = name.charAt(0).toUpperCase() || "?";

  return (
    <div
      className="relative rounded-full overflow-hidden shrink-0 bg-black/[0.08] flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {mounted && photo ? (
        <Image
          fill
          src={photo}
          alt={name || "User"}
          sizes={`${size}px`}
          className="object-cover"
        />
      ) : (
        <span
          className="font-semibold text-black/50"
          style={{ fontSize: size * 0.375 }}
        >
          {mounted ? initial : ""}
        </span>
      )}
    </div>
  );
};

export default UserAvatar;
