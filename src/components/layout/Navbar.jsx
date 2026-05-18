"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLogout,
  HiOutlineChevronDown,
  HiMenu,
  HiX,
} from "react-icons/hi";

export default function Navbar({ user }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathName = usePathname();

  const closeMobile = () => setMobileOpen(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/ideas" },
    { name: "Add Idea", href: "/add-ideas" },
    { name: "My Ideas", href: "/my-ideas" },
    { name: "My Interactions", href: "/my-instructions" },
  ];

  return (
    <nav className="w-full bg-white/90 backdrop-blur-xl border-b border-black/6  z-50 sticky top-0">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 h-13">
        {/* Logo */}
        <Link
          href="/"
          className="text-[15px] font-semibold tracking-[-0.3px] text-black shrink-0"
        >
          IdeaFlow
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link, index) => {
            return (
              <Link
                key={index}
                href={link?.href}
                className={`${pathName === link.href && "bg-black/4"} text-[13px] font-normal text-black px-3 py-1.5 rounded-lg hover:underline transition-all duration-150 tracking-[-0.1px]`}
              >
                {link?.name}
              </Link>
            );
          })}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-1.5 text-[13px] font-normal text-black hover:bg-black/4 px-2.5 py-1.5 rounded-lg transition-all duration-150 tracking-[-0.1px]"
              >
                <div className="w-5.5 h-5.5 rounded-full bg-black flex items-center justify-center text-[10px] font-medium text-white shrink-0">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span>{user.name}</span>
                <HiOutlineChevronDown
                  className={`text-[11px] text-black/40 transition-transform duration-200 ${dropdownOpen && "rotate-180"}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-[200px] bg-white/80 backdrop-blur-2xl border border-black/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="px-3.5 py-3 border-b border-black/[0.06]">
                    <p className="text-[13px] font-medium text-black tracking-[-0.2px] truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] font-normal text-black/40 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-black hover:bg-black/[0.04] rounded-xl transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiOutlineUser className="text-[13px] shrink-0" />
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-black hover:bg-black/[0.04] rounded-xl transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiOutlineCog className="text-[13px] shrink-0" />
                      Settings
                    </Link>
                  </div>
                  <div className="p-1 border-t border-black/[0.06]">
                    <button
                      onClick={() => {
                        setDropdownOpen(false); /* signOut() */
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-red-500 hover:bg-red-50/70 rounded-xl transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiOutlineLogout className="text-[13px] shrink-0" />
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
                className="text-[13px] font-normal text-black px-3 py-1.5 rounded-lg hover:bg-black/[0.04] transition-all duration-150 tracking-[-0.1px]"
              >
                Sign in
              </Link>
              <Link
                href="/register"
                className="text-[13px] font-normal text-white bg-black hover:bg-black/80 px-4 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden flex items-center justify-center w-8 h-8 rounded-lg text-black hover:bg-black/[0.04] transition-all duration-150"
        >
          {mobileOpen ? (
            <HiX className="text-[18px]" />
          ) : (
            <HiMenu className="text-[18px]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/6 bg-white/90 backdrop-blur-2xl px-2 pb-3 pt-1.5 flex flex-col">
          {user && (
            <>
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-[12px] font-medium text-white shrink-0">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-black tracking-[-0.2px] truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] font-normal text-black/40 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="h-px bg-black/6 mx-2 mb-1" />
            </>
          )}

          <Link
            href="/"
            onClick={closeMobile}
            className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
          >
            Home
          </Link>
          <Link
            href="/ideas"
            onClick={closeMobile}
            className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
          >
            Ideas
          </Link>

          <div className="h-px bg-black/[0.06] mx-2 my-1" />

          {user ? (
            <>
              <Link
                href="/ideas/add"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                Add Idea
              </Link>
              <Link
                href="/my-ideas"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                My Ideas
              </Link>
              <Link
                href="/my-interactions"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                My Interactions
              </Link>

              <div className="h-px bg-black/6 mx-2 my-1" />

              <Link
                href="/profile"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black hover:bg-black/4 rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                Settings
              </Link>

              <div className="h-px bg-black/6 mx-2 my-1" />

              <button
                onClick={() => {
                  closeMobile(); /* signOut() */
                }}
                className="text-left px-3 py-2.5 text-[13px] font-normal text-red-500 hover:bg-red-50/60 rounded-xl transition-all duration-150 tracking-[-0.1px] w-full"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <span className="px-3 py-2.5 text-[13px] font-normal text-black/20 cursor-not-allowed select-none tracking-[-0.1px]">
                Add Idea
              </span>
              <span className="px-3 py-2.5 text-[13px] font-normal text-black/20 cursor-not-allowed select-none tracking-[-0.1px]">
                My Ideas
              </span>
              <span className="px-3 py-2.5 text-[13px] font-normal text-black/20 cursor-not-allowed select-none tracking-[-0.1px]">
                My Interactions
              </span>

              <div className="h-px bg-black/6 mx-2 my-2" />

              <div className="flex gap-2 px-1">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="flex-1 text-center text-[13px] font-normal text-black border border-black/10 hover:border-black/20 hover:bg-black/3 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobile}
                  className="flex-1 text-center text-[13px] font-normal text-white bg-black hover:bg-black/80 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
                >
                  Get started
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
