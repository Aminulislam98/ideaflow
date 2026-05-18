"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HiOutlineHome,
  HiOutlineLightBulb,
  HiOutlinePlusCircle,
  HiOutlineCollection,
  HiOutlineChat,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChevronDown,
} from "react-icons/hi";

export default function Navbar({ user }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="w-full bg-[#111] border-b border-white/5 px-6 h-[60px] flex items-center justify-between relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className="flex items-center gap-2 text-white font-semibold text-lg tracking-tight"
      >
        <HiOutlineLightBulb className="text-violet-400 text-xl" />
        <span>
          Idea<span className="text-violet-400">Flow</span>
        </span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-1">
        {/* Public Links */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          <HiOutlineHome className="text-base" />
          Home
        </Link>

        <Link
          href="/ideas"
          className="flex items-center gap-1.5 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all duration-150"
        >
          <HiOutlineLightBulb className="text-base" />
          Ideas
        </Link>

        {/* Divider */}
        <div className="w-px h-5 bg-white/10 mx-1" />

        {/* Private Links */}
        {user ? (
          <>
            <Link
              href="/ideas/add"
              className="flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-violet-300 hover:bg-violet-500/10 px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              <HiOutlinePlusCircle className="text-base" />
              Add Idea
            </Link>

            <Link
              href="/my-ideas"
              className="flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-violet-300 hover:bg-violet-500/10 px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              <HiOutlineCollection className="text-base" />
              My Ideas
            </Link>

            <Link
              href="/my-interactions"
              className="flex items-center gap-1.5 text-sm font-medium text-white/50 hover:text-violet-300 hover:bg-violet-500/10 px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              <HiOutlineChat className="text-base" />
              My Interactions
            </Link>
          </>
        ) : (
          <>
            <span className="flex items-center gap-1.5 text-sm font-medium text-white/20 px-3 py-1.5 cursor-not-allowed select-none">
              <HiOutlinePlusCircle className="text-base" />
              Add Idea
            </span>

            <span className="flex items-center gap-1.5 text-sm font-medium text-white/20 px-3 py-1.5 cursor-not-allowed select-none">
              <HiOutlineCollection className="text-base" />
              My Ideas
            </span>

            <span className="flex items-center gap-1.5 text-sm font-medium text-white/20 px-3 py-1.5 cursor-not-allowed select-none">
              <HiOutlineChat className="text-base" />
              My Interactions
            </span>
          </>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        {user ? (
          /* User Dropdown */
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 px-3 py-1.5 rounded-lg transition-all duration-150"
            >
              <div className="w-7 h-7 rounded-full bg-violet-500 flex items-center justify-center text-xs font-semibold text-white">
                {user.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <span className="text-sm">{user.name}</span>
              <HiOutlineChevronDown
                className={`text-sm transition-transform duration-200 ${
                  dropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-xl overflow-hidden">
                <div className="px-4 py-3 border-b border-white/5">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-white/40 truncate">{user.email}</p>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-150"
                  >
                    <HiOutlineUser className="text-base" />
                    Profile Management
                  </Link>

                  <Link
                    href="/settings"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all duration-150"
                  >
                    <HiOutlineCog className="text-base" />
                    Settings
                  </Link>
                </div>

                <div className="border-t border-white/5 py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      // call your signOut() here
                    }}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150"
                  >
                    <HiOutlineLogout className="text-base" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm font-medium text-white/60 hover:text-white border border-white/10 hover:border-white/20 hover:bg-white/5 px-4 py-1.5 rounded-lg transition-all duration-150"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-white bg-violet-500 hover:bg-violet-600 px-4 py-1.5 rounded-lg transition-all duration-150"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
