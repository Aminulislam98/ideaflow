"use client";
import NextNProgress from "nextjs-progressbar";

export default function ProgressBar() {
  return (
    <NextNProgress
      color="#3b82f6"
      height={2.5}
      showOnShallow={true}
      options={{ showSpinner: false }}
    />
  );
}
