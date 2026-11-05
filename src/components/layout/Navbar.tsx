"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/navigation";
import { authClient } from "@/lib/auth-client";
import { NavbarPopOver } from "../popover/NavbarPopOver";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  // Subtle elevation once the page is scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-black/[0.05] bg-[#fbfcfa]/90 backdrop-blur-md transition-shadow duration-300",
        scrolled && "shadow-[0_6px_24px_-16px_rgba(13,77,51,0.55)]",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:gap-5">
        {/* Brand */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#0d4d33] text-white shadow-sm shadow-[#0d4d33]/25 transition-transform duration-300 group-hover:-rotate-6">
            <BookOpen className="h-[18px] w-[18px]" strokeWidth={2.2} />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-[#0d4d33]">
            BookNook
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-xl px-3 py-2 text-[13px] font-medium transition-colors duration-200",
                isActive(link.href)
                  ? "bg-[#0d4d33]/10 font-semibold text-[#0d4d33]"
                  : "text-slate-500 hover:bg-slate-100 hover:text-[#0d4d33]",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          {user ? (
            <div className="hidden md:flex">
              <NavbarPopOver user={user} onNavigate={() => setOpen(false)} />
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-xl border border-[#0d4d33]/25 bg-white px-4 py-2 text-[13px] font-semibold text-[#0d4d33] transition-colors hover:border-[#0d4d33] hover:bg-[#0d4d33]/5 md:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-xl bg-[#0d4d33] px-4 py-2 text-[13px] font-semibold text-white shadow-sm shadow-[#0d4d33]/25 transition-colors hover:bg-[#0a3d28] md:inline-flex"
              >
                Get Started
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-black/[0.06] bg-white text-slate-600 transition-colors hover:text-[#0d4d33] md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="animate-in fade-in-0 slide-in-from-top-2 border-t border-black/[0.05] bg-[#fbfcfa]/95 px-4 pb-5 pt-3 backdrop-blur-md md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-[#0d4d33]/10 font-semibold text-[#0d4d33]"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {user ? (
            <div className="mt-3 border-t border-black/[0.05] pt-3">
              <NavbarPopOver user={user} onNavigate={() => setOpen(false)} />
            </div>
          ) : (
            <div className="mt-3 flex gap-2.5 border-t border-black/[0.05] pt-3 sm:hidden">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl border border-[#0d4d33]/25 bg-white px-4 py-2.5 text-center text-sm font-semibold text-[#0d4d33] transition-colors hover:bg-[#0d4d33]/5"
              >
                Login
              </Link>
              <Link
                href="/signup"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-[#0d4d33] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#0a3d28]"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
