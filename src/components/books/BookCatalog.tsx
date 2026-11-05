"use client";

import { useEffect, useMemo, useState } from "react";
import { BookOpen, Search, X } from "lucide-react";
import BookCard from "@/components/cards/BookCard";
import { Book } from "@/data/books";
import BooksSkeleton from "../skeleton/allBookSkeleton";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Fiction",
  "Science Fiction",
  "History",
  "Kids",
  "Other / Unknown",
];

export default function BookCatalog() {
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getBooksData = async () => {
      try {
        const res = await fetch(`https://book-nook-server.vercel.app/books`);
        const data = await res.json();
        setBooksData(data);
        console.log(data);
      } catch {
        setBooksData([]);
      } finally {
        setLoading(false);
      }
    };
    getBooksData();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return booksData.filter((book) => {
      const byCategory = category === "" || book.category === category;
      const byQuery =
        q === "" ||
        `${book.title} ${book.author} ${book.category}`
          .toLowerCase()
          .includes(q);
      return byCategory && byQuery;
    });
  }, [booksData, category, query]);

  if (loading) {
    return <BooksSkeleton />;
  }

  const chips = ["All", ...CATEGORIES];

  return (
    <div>
      {/* Toolbar: search + result count */}
      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author or category…"
            aria-label="Search books"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-10 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <p className="shrink-0 text-xs font-medium text-slate-500 sm:text-sm">
          Showing{" "}
          <span className="font-bold text-slate-800">{filtered.length}</span> of{" "}
          <span className="font-bold text-slate-800">{booksData.length}</span>{" "}
          books
        </p>
      </div>

      {/* Category chips — scrollable on small screens */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {chips.map((name) => {
          const value = name === "All" ? "" : name;
          const active = category === value;
          return (
            <button
              key={name}
              type="button"
              onClick={() => setCategory(value)}
              aria-pressed={active}
              className={cn(
                "shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition-all duration-200 sm:text-sm",
                active
                  ? "border-[#0d4d33] bg-[#0d4d33] text-white shadow-sm shadow-[#0d4d33]/25"
                  : "border-slate-200 bg-white text-slate-600 hover:border-[#0d4d33]/40 hover:text-[#0d4d33]",
              )}
            >
              {name}
            </button>
          );
        })}
      </div>

      {/* Book grid */}
      {filtered.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="mt-6 flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
            <BookOpen className="h-6 w-6 text-[#0d4d33]" />
          </span>
          <p className="mt-4 text-sm font-bold text-slate-800">No books found</p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different search term or pick another category.
          </p>
          {(query || category) && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("");
              }}
              className="mt-5 rounded-xl border border-[#0d4d33]/25 bg-white px-4 py-2 text-xs font-bold text-[#0d4d33] transition-colors hover:bg-[#0d4d33]/5"
            >
              Clear filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
