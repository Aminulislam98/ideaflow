"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { RouterProvider } from "@heroui/react";

export function Providers({ children }) {
  return (
    <RouterProvider>
      <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </NextThemesProvider>
    </RouterProvider>
  );
}
