"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Book } from "@/data/books";

export default function BookCard({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0d4d33]/30 hover:shadow-xl hover:shadow-[#0d4d33]/10">
      {/* Book Cover */}
      <Link
        href={`/all-books/${book._id}`}
        className="relative block aspect-[2/3] overflow-hidden rounded-xl bg-slate-100"
      >
        {failed ? (
          <div className="flex h-full w-full flex-col justify-end bg-gradient-to-br from-[#0d4d33] to-[#16845a] p-4">
            <span className="text-base font-bold leading-snug text-white">
              {book.title}
            </span>
            <span className="mt-2 text-xs text-white/70">{book.author}</span>
          </div>
        ) : (
          <Image
            src={book?.image}
            alt={`${book.title} cover`}
            fill
            unoptimized
            sizes="(max-width: 640px) 45vw, (max-width: 1024px) 28vw, 180px"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setFailed(true)}
          />
        )}

        {/* Category Badge */}
        <span className="absolute left-2.5 top-2.5 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#0d4d33] shadow-sm backdrop-blur-md">
          {book.category}
        </span>

        {/* Bottom Gradient */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </Link>

      {/* Book Information */}
      <div className="flex flex-1 flex-col px-1 pt-3">
        <h3 className="line-clamp-2 text-sm font-bold leading-5 text-slate-800 transition-colors group-hover:text-[#0d4d33]">
          {book.title}
        </h3>

        <p className="mt-1 truncate text-xs font-medium text-slate-500">
          By {book.author}
        </p>

        <p className="mt-1 mb-2 truncate text-xs font-medium text-slate-500">
          Added on {book.name}
        </p>

        {/* View Details Button */}
        <Link
          href={`/all-books/${book._id}`}
          className="mt-auto flex items-center justify-center gap-2 rounded-xl bg-[#0d4d33] px-3 py-2.5 text-xs font-bold text-white shadow-sm transition-all duration-300 hover:bg-[#126344] hover:shadow-md active:scale-95"
        >
          View Details
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </article>
  );
}
