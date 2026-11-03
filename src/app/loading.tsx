
"use client";

import { BookOpen } from "lucide-react";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f4f8f5] px-4">
      <div className="flex flex-col items-center text-center">

        {/* Logo */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-[#0d4d33] shadow-xl shadow-[#0d4d33]/20">
          <BookOpen size={58} className="text-white"/>
        </div>

        {/* Brand Name */}
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#0d4d33]">
          BookNook
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Your next chapter starts here.
        </p>

        {/* Loading Animation */}
        <div className="mt-9 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#0d4d33] animate-bounce [animation-delay:-0.3s]" />
          <span className="h-2 w-2 rounded-full bg-[#0d4d33] animate-bounce [animation-delay:-0.15s]" />
          <span className="h-2 w-2 rounded-full bg-[#0d4d33] animate-bounce" />
        </div>

        <p className="mt-3 text-xs font-medium tracking-wide text-[#0d4d33]">
          Loading your library...
        </p>

        {/* Progress Bar */}
        <div className="mt-5 h-1 w-40 overflow-hidden rounded-full bg-[#dce9df]">
          <div className="h-full w-1/2 animate-loading rounded-full bg-[#0d4d33]" />
        </div>

        {/* Footer */}
        <p className="mt-10 text-xs text-gray-400">
          A little patience, a lot of stories.
        </p>

      </div>
    </div>
  );
}
