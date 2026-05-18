"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaXTwitter,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa6";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";

const platformLinks = [
  { label: "Ideas", href: "/ideas" },
  { label: "Categories", href: "/categories" },
  { label: "Add Idea", href: "/add-ideas" },
  { label: "My Ideas", href: "/my-ideas" },
  { label: "My Interactions", href: "/my-instructions" },
];

const companyLinks = [
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Use", href: "/terms" },
];

const socialLinks = [
  { icon: FaXTwitter, href: "https://x.com", label: "X / Twitter" },
  { icon: FaGithub, href: "https://github.com", label: "GitHub" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  const pathName = usePathname();
  return (
    <footer className="w-full bg-white border-t border-black/6">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14">
          {/* Brand Column */}
          <div className="flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-[15px] font-semibold tracking-[-0.3px] text-black w-fit"
            >
              IdeaFlow
            </Link>
            <p className="text-[13px] font-normal text-black/50 leading-relaxed tracking-[-0.1px] max-w-[220px]">
              A place to share, discover, and grow ideas together.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-1">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-black hover:bg-black/4 transition-all duration-150"
                >
                  <Icon className="text-[14px]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-medium text-black/30 tracking-[0.5px] uppercase">
              Platform
            </p>
            {platformLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-[13px] font-normal text-black hover:text-black/50 transition-colors duration-150 tracking-[-0.1px] w-fit ${pathName === link.href ? "underline" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-medium text-black/30 tracking-[0.5px] uppercase">
              Company
            </p>
            {companyLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={`text-[13px] font-normal text-black hover:text-black/50 transition-colors duration-150 tracking-[-0.1px] w-fit ${pathName === link.href ? "underline" : ""}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-[11px] font-medium text-black/30 tracking-[0.5px] uppercase">
              Contact
            </p>
            <a
              href="mailto:hello@ideaflow.com"
              className="flex items-center gap-2 text-[13px] font-normal text-black hover:text-black/50 transition-colors duration-150 tracking-[-0.1px] w-fit"
            >
              <HiOutlineMail className="text-[14px] shrink-0" />
              hello@ideaflow.com
            </a>
            <div className="flex items-start gap-2 text-[13px] font-normal text-black tracking-[-0.1px]">
              <HiOutlineLocationMarker className="text-[14px] shrink-0 mt-[2px]" />
              <span className="text-black/50">London, United Kingdom</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-black/[0.06] py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] font-normal text-black/30 tracking-[-0.1px]">
            © {new Date().getFullYear()} IdeaFlow. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-[12px] font-normal text-black/30 hover:text-black transition-colors duration-150 tracking-[-0.1px]"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-[12px] font-normal text-black/30 hover:text-black transition-colors duration-150 tracking-[-0.1px]"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="text-[12px] font-normal text-black/30 hover:text-black transition-colors duration-150 tracking-[-0.1px]"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
