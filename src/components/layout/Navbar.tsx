"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/data/navigation";
import { authClient } from "@/lib/auth-client";
import { NavbarPopOver } from "../popover/NavbarPopOver";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <header className="sticky top-0 z-50 border-b border-black/[0.06] bg-[#fbfcfa]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        {/* Brand */}
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="text-lg font-extrabold tracking-tight text-[#111827]">
            BookNook
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden flex-1 items-center justify-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative py-1 text-[13px] transition-colors",
                isActive(link.href)
                  ? "font-semibold text-[#0d4d33]"
                  : "text-slate-500 hover:text-[#0d4d33]",
              )}
            >
              {link.label}
              <span
                className={cn(
                  "absolute -bottom-1.5 left-0 h-[2px] w-full rounded-full bg-[#0d4d33] transition-opacity",
                  isActive(link.href) ? "opacity-100" : "opacity-0",
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 md:gap-3">
          <button
            type="button"
            aria-label="Search books"
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-slate-100 hover:text-[#0d4d33]"
          >
            <Search className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </button>
          {user ? (
            <NavbarPopOver user={user}/>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-lg border border-[#0d4d33]/35 bg-white px-4 py-2 text-[13px] font-medium text-[#0d4d33] transition-colors hover:bg-[#0d4d33]/5 sm:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-lg bg-[#0d4d33] px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-[#0a3d28] sm:inline-flex"
              >
                Register
              </Link>
            </>
          )}

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-black/[0.06] bg-[#fbfcfa] px-4 py-3 md:hidden">
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive(link.href)
                    ? "bg-[#0d4d33]/10 font-semibold text-[#0d4d33]"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex gap-2 sm:hidden">
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg border border-[#0d4d33]/35 bg-white px-4 py-2 text-center text-sm font-medium text-[#0d4d33]"
            >
              Login
            </Link>
            <Link
              href="/signup"
              onClick={() => setOpen(false)}
              className="flex-1 rounded-lg bg-[#0d4d33] px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
