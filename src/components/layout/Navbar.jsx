"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineChevronDown,
  HiOutlineBell,
  HiSun,
  HiMoon,
  HiOutlineLogout,
} from "react-icons/hi";
import { RiMenuFold2Line, RiCloseLargeLine } from "react-icons/ri";
import { LogoutModal } from "../buttons/LogoutButton";
import { useTheme } from "next-themes";
import Image from "next/image";

const links = [
  { name: "Home", href: "/", protected: false },
  { name: "Ideas", href: "/ideas", protected: false },
  { name: "Add Idea", href: "/add-idea", protected: true },
  { name: "My Ideas", href: "/my-ideas", protected: true },
  { name: "My Interactions", href: "/my-interactions", protected: true },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const pathName = usePathname();
  const router = useRouter();

  const closeMobile = () => setMobileOpen(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    closeMobile();
    setDropdownOpen(false);
  }, [pathName]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleNav = (href, isProtected) => {
    closeMobile();
    if (isProtected && !user) {
      router.push(`/signin?callbackUrl=${encodeURIComponent(href)}`);
      return;
    }
    router.push(href);
  };

  const isActive = (href) => pathName === href;

  return (
    <>
      <nav className="w-full fixed top-0 left-0 right-0 z-50 bg-white dark:bg-zinc-950 border-b border-black/[0.08] dark:border-white/[0.07]">
        {/* Use relative + absolute trick so center links are truly centered */}
        <div className="relative flex items-center px-4 sm:px-6 lg:px-8 h-14">
          {/* ── LEFT: Hamburger (mobile) + Logo ── */}
          <div className="flex items-center gap-3 z-10">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors duration-150"
            >
              {mobileOpen ? (
                <RiCloseLargeLine className="text-[22px]" />
              ) : (
                <RiMenuFold2Line className="text-[24px]" />
              )}
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-1 select-none shrink-0"
            >
              <span className="text-[22px] sm:text-[26px] font-black tracking-[-1px] text-black dark:text-white leading-none">
                idea
              </span>
              <span className="text-[22px] sm:text-[26px] font-black tracking-[-1px] leading-none bg-black dark:bg-white text-white dark:text-black px-1.5 py-0.5 rounded-md">
                Vault
              </span>
            </Link>
          </div>

          {/* ── CENTER: Desktop nav links — truly centered with absolute ── */}
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 top-0 h-full">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.protected)}
                className={`relative h-full px-4 text-[13.5px] font-normal tracking-[-0.15px] transition-colors duration-150 font-black 
                  ${
                    isActive(link.href)
                      ? "text-black uppercase dark:text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2.5px] after:bg-black dark:after:bg-white after:content-[''] after:rounded-t-full"
                      : " uppercase dark:text-white/40 hover:text-black dark:hover:text-white"
                  }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* ── RIGHT: Notification + Avatar ── */}
          <div className="flex items-center gap-1 sm:gap-2 ml-auto z-10">
            {/* Notification bell — only when logged in */}
            {user && (
              <Link
                href="/my-interactions"
                aria-label="Notifications"
                className="flex items-center justify-center w-10 h-10 rounded-xl text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors duration-150 relative"
              >
                <HiOutlineBell className="text-[28px]" />
                {/* Unread dot — remove if not needed */}
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-zinc-950" />
              </Link>
            )}

            {/* Avatar / Auth */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center p-1 rounded-xl hover:bg-black/[0.05] dark:hover:bg-white/[0.06] transition-colors duration-150"
                >
                  {/* Facebook-style avatar: circle + chevron badge */}
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full shrink-0 ring-2 ring-black/10 dark:ring-white/10 overflow-hidden relative">
                      {user.image ? (
                        <Image
                          fill
                          src={user.image}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center text-[14px] font-black text-white dark:text-black">
                          {user.name?.charAt(0).toUpperCase() ?? "U"}
                        </div>
                      )}
                    </div>
                    {/* Chevron badge at bottom-right like Facebook */}
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-zinc-200 dark:bg-zinc-700 border-2 border-white dark:border-zinc-950 flex items-center justify-center transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                    >
                      <HiOutlineChevronDown className="text-[9px] text-black dark:text-white" />
                    </div>
                  </div>
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[210px] bg-white dark:bg-zinc-900 border border-black/[0.08] dark:border-white/[0.08] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.4)]">
                    <div className="px-3.5 py-3 border-b border-black/[0.06] dark:border-white/[0.06]">
                      <p className="text-[13px] font-black text-black dark:text-white tracking-[-0.2px] truncate">
                        {user.name}
                      </p>
                      <p className="text-[11px] text-black/40 dark:text-white/40 truncate mt-0.5">
                        {user.email}
                      </p>
                    </div>
                    <div className="p-1">
                      <Link
                        href="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-bold text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.1px]"
                      >
                        <HiOutlineUser className="text-[15px] shrink-0" />
                        Profile
                      </Link>
                      <Link
                        href="/updateProfile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-bold text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.1px]"
                      >
                        <HiOutlineCog className="text-[15px] shrink-0" />
                        Settings
                      </Link>
                      {mounted && (
                        <button
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[13px] font-bold text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.1px]"
                        >
                          {theme === "dark" ? (
                            <>
                              <HiSun className="text-[15px] shrink-0" /> Light
                              Mode
                            </>
                          ) : (
                            <>
                              <HiMoon className="text-[15px] shrink-0" /> Dark
                              Mode
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
              <div className="flex items-center gap-1.5">
                <Link
                  href={`/signin?callbackUrl=${encodeURIComponent(pathName)}`}
                  className="hidden sm:block text-[13px] font-black text-black dark:text-white px-3.5 py-1.5 hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.1px]"
                >
                  Log in
                </Link>
                <Link
                  href={`/signup?callbackUrl=${encodeURIComponent(pathName)}`}
                  className="text-[13px] font-black text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 px-4 py-1.5 rounded-xl transition-colors duration-150 tracking-[-0.1px]"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      {mobileOpen && (
        <div className="lg:hidden fixed top-14 left-0 right-0 bottom-0 z-40 bg-white dark:bg-zinc-950 overflow-y-auto">
          <div className="px-4 py-4 flex flex-col gap-0.5">
            {/* User info strip (if logged in) */}
            {user && (
              <div className="flex items-center gap-3 px-3 py-3 mb-2 bg-black/[0.03] dark:bg-white/[0.04] rounded-2xl">
                <div className="w-9 h-9 rounded-full shrink-0 ring-2 ring-black/10 dark:ring-white/10 overflow-hidden relative">
                  {user.image ? (
                    <Image
                      fill
                      src={user.image}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-black dark:bg-white flex items-center justify-center text-[14px] font-black text-white dark:text-black">
                      {user.name?.charAt(0).toUpperCase() ?? "U"}
                    </div>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="text-[15px] font-black text-black dark:text-white tracking-[-0.2px] truncate">
                    {user.name}
                  </p>
                  <p className="text-[12px] text-black/40 dark:text-white/40 truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            )}

            {/* Nav links */}
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNav(link.href, link.protected)}
                className={`text-left px-4 py-3 text-[15px] font-black rounded-xl transition-colors duration-150 w-full tracking-[-0.2px]
                  ${
                    isActive(link.href)
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06]"
                  }`}
              >
                {link.name}
              </button>
            ))}

            {/* Divider */}
            <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] my-2" />

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 text-[15px] font-black text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.2px]"
                >
                  <HiOutlineUser className="text-[18px]" /> Profile
                </Link>
                <Link
                  href="/updateProfile"
                  onClick={closeMobile}
                  className="flex items-center gap-3 px-4 py-3 text-[15px] font-black text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.2px]"
                >
                  <HiOutlineCog className="text-[18px]" /> Settings
                </Link>
                {mounted && (
                  <button
                    onClick={() => {
                      setTheme(theme === "dark" ? "light" : "dark");
                      closeMobile();
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-[15px] font-black text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.06] rounded-xl transition-colors duration-150 tracking-[-0.2px] w-full text-left"
                  >
                    {theme === "dark" ? (
                      <>
                        <HiSun className="text-[18px]" /> Light Mode
                      </>
                    ) : (
                      <>
                        <HiMoon className="text-[18px]" /> Dark Mode
                      </>
                    )}
                  </button>
                )}
                <div className="h-px bg-black/[0.06] dark:bg-white/[0.06] my-2" />
                <LogoutModal setDropdownOpen={closeMobile} mobileView />
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-1">
                <Link
                  href={`/signin?callbackUrl=${encodeURIComponent(pathName)}`}
                  onClick={closeMobile}
                  className="w-full text-center text-[15px] font-black text-black dark:text-white border-2 border-black/10 dark:border-white/10 hover:bg-black/[0.04] dark:hover:bg-white/[0.04] px-4 py-3 rounded-2xl transition-colors duration-150 tracking-[-0.2px]"
                >
                  Log in
                </Link>
                <Link
                  href={`/signup?callbackUrl=${encodeURIComponent(pathName)}`}
                  onClick={closeMobile}
                  className="w-full text-center text-[15px] font-black text-white dark:text-black bg-black dark:bg-white hover:bg-black/80 dark:hover:bg-white/90 px-4 py-3 rounded-2xl transition-colors duration-150 tracking-[-0.2px]"
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
