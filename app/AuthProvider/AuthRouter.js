"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import SessionedPagesLayout from "./SessionedPagesLayout";

export default function AuthRouter({ children }) {
  return (
    <SessionProvider>
      <SessionedPagesLayout>{children}</SessionedPagesLayout>
    </SessionProvider>
  );
}
