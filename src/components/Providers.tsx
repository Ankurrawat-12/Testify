"use client"
import { SessionProvider } from "next-auth/react";
import React from "react";
import { ThemeProvider as NextThemeProvider, ThemeProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Define the QueryClient instance without re-declaring it.
const queryClient = new QueryClient();

const Providers = ({ children, ...props }: ThemeProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <SessionProvider>{children}</SessionProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
