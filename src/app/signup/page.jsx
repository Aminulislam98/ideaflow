"use client";

import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
} from "@heroui/react";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineUser,
  HiOutlinePhotograph,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      const { data, error } = await authClient.signUp.email({
        email: user?.email,
        password: user?.password,
        name: user?.name, // user display name
        image: user?.photoURL,
      });
      if (error) {
        toast.error(error.message || "Something went wrong");
        return;
      }
      router.push("/signin");
    } catch (err) {
      console.error("Unexpected error:", err);
      alert("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#f0f2f5] flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-[400px] flex flex-col gap-4">
        {/* Logo */}
        <div className="text-center mb-2">
          <Link
            href="/"
            className="text-[22px] font-semibold text-black tracking-[-0.04em]"
          >
            IdeaFlow
          </Link>
          <p className="text-[13px] font-normal text-black/40 tracking-[-0.1px] mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white border border-black/[0.06] rounded-2xl p-6 sm:p-8">
          <Form onSubmit={onSubmit} className="flex flex-col gap-4">
            {/* Name */}
            <TextField name="name" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Full Name
              </Label>
              <div className="relative">
                <HiOutlineUser className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 text-[16px] pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Aminul Islam"
                  className="w-full pl-9"
                />
              </div>
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Photo URL */}
            <TextField name="photoURL" className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Photo URL
                <span className="text-[11px] font-normal text-black/30 ml-1.5">
                  (optional)
                </span>
              </Label>
              <div className="relative">
                <HiOutlinePhotograph className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 text-[16px] pointer-events-none" />
                <Input
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  className="w-full pl-9"
                />
              </div>
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Email */}
            <TextField name="email" isRequired className="w-full">
              <Label className="text-[13px] font-medium text-black tracking-[-0.1px] mb-1.5 block">
                Email
              </Label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 text-[16px] pointer-events-none" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full pl-9"
                />
              </div>
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Password */}
            <TextField name="password" isRequired className="w-full">
              <div className="flex items-center justify-between mb-1.5">
                <Label className="text-[13px] font-medium text-black tracking-[-0.1px]">
                  Password
                </Label>
                <span className="text-[12px] font-normal text-black/40 hover:text-black cursor-pointer tracking-[-0.1px] transition-colors duration-150">
                  Forgot password?
                </span>
              </div>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30 text-[16px] pointer-events-none" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full pl-9"
                />
              </div>
              <FieldError className="text-[11px] text-red-400 mt-1" />
            </TextField>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full text-[13px] font-normal text-white bg-black hover:bg-black/80 py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px] mt-1"
            >
              {loading ? (
                <svg
                  className="w-4 h-4 animate-spin"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="2"
                    opacity="0.25"
                  />
                  <path
                    d="M12 2a10 10 0 0 1 10 10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                "Sign up"
              )}
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-black/[0.06]" />
              <span className="text-[11px] font-normal text-black/30 tracking-[-0.1px]">
                or
              </span>
              <div className="flex-1 h-px bg-black/[0.06]" />
            </div>

            {/* Google */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2.5 text-[13px] font-normal text-black border border-black/10 hover:border-black/20 hover:bg-black/[0.03] py-2.5 rounded-full transition-all duration-150 tracking-[-0.1px]"
            >
              <FcGoogle className="text-[18px] shrink-0" />
              Continue with Google
            </button>
          </Form>
        </div>

        {/* Register link */}
        <p className="text-center text-[13px] font-normal text-black/40 tracking-[-0.1px]">
          Already have an account?{" "}
          <Link
            href="/register"
            className="text-black font-medium hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
