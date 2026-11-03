
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Home,
  Search,
} from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-[#f7faf7] px-4 py-16">

      {/* Background Decoration */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#0d4d33]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#0d4d33]/5 blur-3xl" />

      <div className="relative mx-auto w-full max-w-2xl text-center">

        {/* Book Illustration */}
        <div className="relative mx-auto mb-8 flex h-52 w-52 items-center justify-center">

          <div className="absolute inset-0 rounded-full border border-dashed border-[#0d4d33]/20" />
          <div className="absolute inset-4 rounded-full bg-[#0d4d33]/5" />

          <div className="relative flex h-32 w-28 -rotate-6 items-center justify-center rounded-r-xl rounded-l-md border-l-4 border-[#0a3927] bg-[#0d4d33] shadow-2xl shadow-[#0d4d33]/20">
            <BookOpen className="h-16 w-16 text-white" strokeWidth={1.3} />

            <div className="absolute bottom-4 left-0 h-1 w-full bg-white/20" />
          </div>

          {/* Floating Elements */}
          <div className="absolute right-5 top-7 flex h-10 w-10 rotate-12 items-center justify-center rounded-xl bg-white shadow-md">
            <Search className="h-5 w-5 text-[#0d4d33]" />
          </div>

          <div className="absolute bottom-7 left-5 flex h-9 w-9 -rotate-12 items-center justify-center rounded-lg bg-[#0d4d33] shadow-md">
            <BookOpen className="h-4 w-4 text-white" />
          </div>
        </div>

        {/* 404 Text */}
        <div className="relative">
          <h1 className="text-[100px] font-black leading-none tracking-tighter text-[#0d4d33] sm:text-[140px]">
            404
          </h1>

          <span className="absolute -right-1 top-1/2 hidden -translate-y-1/2 rounded-full border border-[#0d4d33]/10 bg-white px-4 py-2 text-xs font-bold text-[#0d4d33] shadow-sm sm:block">
            LOST PAGE!
          </span>
        </div>

        {/* Message */}
        <div className="mx-auto mt-5 max-w-md">
          <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Oops! Page Not Found
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
            Looks like this page has gone missing from our bookshelf.
            Don't worry, there are plenty of amazing books waiting for you!
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            href="/"
            className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0d4d33] px-7 text-sm font-bold text-white shadow-lg shadow-[#0d4d33]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0a3927] sm:w-auto"
          >
            <Home className="h-4 w-4" />
            Back to Home
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/all-books"
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-[#0d4d33]/20 bg-white px-7 text-sm font-bold text-[#0d4d33] transition-all duration-300 hover:-translate-y-1 hover:border-[#0d4d33] hover:bg-[#0d4d33]/5 sm:w-auto"
          >
            <BookOpen className="h-4 w-4" />
            Browse Books
          </Link>
        </div>

      </div>
    </main>
  );
}
