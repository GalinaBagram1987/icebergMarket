"use client";
import { ReduxProvider } from "./ReduxProvider";
import { QueryProvider } from "./QueryProvider";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReduxProvider>
      <QueryProvider>{children}</QueryProvider>
    </ReduxProvider>
  );
};
