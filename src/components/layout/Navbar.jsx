"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineChevronDown,
  HiMenu,
  HiX,
  HiSun,
  HiMoon,
} from "react-icons/hi";
import { LogoutModal } from "../buttons/LogoutButton";
import { useTheme } from "next-themes";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathName = usePathname();

  const isHome = pathName === "/";
  const closeMobile = () => setMobileOpen(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Ideas", href: "/ideas" },
    { name: "Add Idea", href: "/add-idea" },
    { name: "My Ideas", href: "/my-ideas" },
    { name: "My Interactions", href: "/my-instructions" },
  ];

  // dark mode aware text/hover/active
  const textColor = isHome
    ? scrolled
      ? "text-black dark:text-white"
      : "text-white"
    : "text-black dark:text-white";

  const hoverBg = isHome
    ? scrolled
      ? "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
      : "hover:bg-white/[0.1]"
    : "hover:bg-black/[0.04] dark:hover:bg-white/[0.06]";

  const activeBg = isHome
    ? scrolled
      ? "bg-black/[0.04] dark:bg-white/[0.06]"
      : "bg-white/[0.1]"
    : "bg-black/[0.04] dark:bg-white/[0.06]";

  return (
    <nav
      className={`w-full fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        isHome
          ? scrolled
            ? "bg-white dark:bg-zinc-900 border-black/[0.06] dark:border-white/[0.06]"
            : "bg-transparent border-transparent"
          : "bg-white dark:bg-zinc-900 border-black/[0.06] dark:border-white/[0.06]"
      }`}
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-5 sm:px-8 h-13">
        {/* Logo */}
        <Link
          href="/"
          className={`text-[15px] font-semibold tracking-[-0.3px] shrink-0 transition-colors duration-300 ${textColor}`}
        >
          IdeaFlow
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-0.5">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link?.href}
              className={`text-[13px] font-normal px-3 py-1.5 rounded-lg transition-all duration-150 tracking-[-0.1px] ${textColor} ${hoverBg} ${
                pathName === link.href ? activeBg : ""
              }`}
            >
              {link?.name}
            </Link>
          ))}
        </div>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-9 h-9 flex items-center justify-center rounded-full transition-all duration-150 ${hoverBg}`}
            >
              {theme === "dark" ? (
                <HiSun className="text-[18px] text-white" />
              ) : (
                <HiMoon className={`text-[18px] ${textColor}`} />
              )}
            </button>
          )}

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 text-[13px] font-normal px-2.5 py-1.5 rounded-lg transition-all duration-150 tracking-[-0.1px] ${textColor} ${hoverBg}`}
              >
                <div
                  className={`w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-medium shrink-0 transition-colors duration-300 ${
                    isHome && !scrolled
                      ? "bg-white text-black"
                      : "bg-black dark:bg-white text-white dark:text-black"
                  }`}
                >
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <span>{user.name}</span>
                <HiOutlineChevronDown
                  className={`text-[11px] transition-all duration-200 ${
                    isHome && !scrolled
                      ? "text-white/50"
                      : "text-black/40 dark:text-white/40"
                  } ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-[200px] bg-white/80 dark:bg-zinc-800/80 backdrop-blur-2xl border border-black/[0.08] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="px-3.5 py-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                    <p className="text-[13px] font-medium text-black dark:text-white tracking-[-0.2px] truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] font-normal text-black/40 dark:text-white/40 truncate mt-0.5">
                      {user.email}
                    </p>
                  </div>
                  <div className="p-1">
                    <Link
                      href="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiOutlineUser className="text-[13px] shrink-0" />
                      Profile
                    </Link>
                    <Link
                      href="/updateProfile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
                    >
                      <HiOutlineCog className="text-[13px] shrink-0" />
                      Settings
                    </Link>

                    {mounted && (
                      <button
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="w-full flex items-center gap-2 px-3 py-2 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
                      >
                        {theme === "dark" ? (
                          <>
                            <HiSun className="text-[13px] shrink-0" />
                            Light Mode
                          </>
                        ) : (
                          <>
                            <HiMoon className="text-[13px] shrink-0" />
                            Dark Mode
                          </>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="p-1 border-t border-black/[0.06] dark:border-white/[0.06]">
                    <LogoutModal setDropdownOpen={setDropdownOpen} />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className={`text-[13px] font-normal px-3 py-1.5 rounded-lg transition-all duration-150 tracking-[-0.1px] ${textColor} ${hoverBg}`}
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className={`text-[13px] font-normal px-4 py-1.5 rounded-full transition-all duration-150 tracking-[-0.1px] ${
                  isHome && !scrolled
                    ? "text-black bg-white hover:bg-white/90"
                    : "text-white bg-black dark:bg-white dark:text-black hover:bg-black/80 dark:hover:bg-white/90"
                }`}
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
          className={`md:hidden flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 ${textColor} ${hoverBg}`}
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
        <div className="lg:hidden border-t border-black/[0.06] dark:border-white/[0.06] bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl px-2 pb-3 pt-1.5 flex flex-col">
          {user && (
            <>
              <div className="flex items-center gap-2.5 px-3 py-2.5">
                <div className="w-8 h-8 rounded-full bg-black dark:bg-white flex items-center justify-center text-[12px] font-medium text-white dark:text-black shrink-0">
                  {user.name?.charAt(0).toUpperCase() ?? "U"}
                </div>
                <div className="min-w-0">
                  <p className="text-[13px] font-medium text-black dark:text-white tracking-[-0.2px] truncate">
                    {user.name}
                  </p>
                  <p className="text-[11px] font-normal text-black/40 dark:text-white/40 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mx-2 mb-1" />
            </>
          )}

          <Link
            href="/"
            onClick={closeMobile}
            className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
          >
            Home
          </Link>
          <Link
            href="/ideas"
            onClick={closeMobile}
            className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
          >
            Ideas
          </Link>

          <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mx-2 my-1" />

          {user ? (
            <>
              <Link
                href="/ideas/add"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                Add Idea
              </Link>
              <Link
                href="/my-ideas"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                My Ideas
              </Link>
              <Link
                href="/my-interactions"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                My Interactions
              </Link>

              <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mx-2 my-1" />

              <Link
                href="/profile"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                onClick={closeMobile}
                className="px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px]"
              >
                Settings
              </Link>

              {mounted && (
                <button
                  onClick={() => {
                    setTheme(theme === "dark" ? "light" : "dark");
                    closeMobile();
                  }}
                  className="text-left px-3 py-2.5 text-[13px] font-normal text-black dark:text-white hover:bg-black/[0.04] dark:hover:bg-white/[0.06] rounded-xl transition-all duration-150 tracking-[-0.1px] w-full flex items-center gap-2"
                >
                  {theme === "dark" ? (
                    <>
                      <HiSun className="text-[14px]" />
                      Light Mode
                    </>
                  ) : (
                    <>
                      <HiMoon className="text-[14px]" />
                      Dark Mode
                    </>
                  )}
                </button>
              )}

              <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mx-2 my-1" />

              <button
                onClick={() => closeMobile()}
                className="text-left px-3 py-2.5 text-[13px] font-normal text-red-500 hover:bg-red-50/60 dark:hover:bg-red-500/10 rounded-xl transition-all duration-150 tracking-[-0.1px] w-full"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <span className="px-3 py-2.5 text-[13px] font-normal text-black/20 dark:text-white/20 cursor-not-allowed select-none tracking-[-0.1px]">
                Add Idea
              </span>
              <span className="px-3 py-2.5 text-[13px] font-normal text-black/20 dark:text-white/20 cursor-not-allowed select-none tracking-[-0.1px]">
                My Ideas
              </span>
              <span className="px-3 py-2.5 text-[13px] font-normal text-black/20 dark:text-white/20 cursor-not-allowed select-none tracking-[-0.1px]">
                My Interactions
              </span>

              <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] mx-2 my-2" />

              <div className="flex gap-2 px-1">
                <Link
                  href="/login"
                  onClick={closeMobile}
                  className="flex-1 text-center text-[13px] font-normal text-black dark:text-white border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.03] dark:hover:bg-white/[0.03] px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  onClick={closeMobile}
                  className="flex-1 text-center text-[13px] font-normal text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 px-4 py-2 rounded-full transition-all duration-150 tracking-[-0.1px]"
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
