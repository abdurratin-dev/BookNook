"use client";

import { useMemo, useState } from "react";
import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import BookCard from "@/components/cards/BookCard";

const PER_PAGE = 9;

type Filters = { query: string; category: string };

function matches(book , { query, category }: Filters) {
  if (category !== "" && book.category !== category) return false;
  if (query === "") return true;
  
  const haystack = `${book.title} ${book.author} ${book.category}`.toLowerCase();
  return haystack.includes(query);
}

export default function BookCatalog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const normalizedQuery = query.trim().toLowerCase();
  const allBooks = [];
  const bookCategories = [];
  const filtered = useMemo(
    () =>
      allBooks.filter((book) =>
        matches(book, { query: normalizedQuery, category }),
      ),
    [normalizedQuery, category],
  );

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PER_PAGE;
  const visible = filtered.slice(start, start + PER_PAGE);

  const goTo = (next: number) => setPage(Math.min(Math.max(next, 1), totalPages));

  return (
    <div>
      {/* Search + category filters */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search books by title, author, or category..."
            aria-label="Search books"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15"
          />
        </div>

        <div className="relative sm:w-52">
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
              setPage(1);
            }}
            aria-label="Filter by category"
            className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-9 text-sm text-slate-700 outline-none transition-colors focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15"
          >
            <option value="">All Categories</option>
            {bookCategories.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        </div>
      </div>

      {/* Result count */}
      <p className="mt-5 text-xs font-medium text-slate-500 sm:text-sm">
        Total Books:{" "}
        <span className="font-bold text-slate-800">{filtered.length}</span>
      </p>

      {/* Book grid */}
      {visible.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {visible.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
            <BookOpen className="h-6 w-6 text-[#0d4d33]" />
          </span>
          <p className="mt-4 text-sm font-bold text-slate-800">No books found</p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different search term or pick another category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {filtered.length > PER_PAGE && (
        <nav
          aria-label="Pagination"
          className="mt-10 flex items-center justify-center gap-2"
        >
          <button
            type="button"
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#0d4d33] hover:text-[#0d4d33] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
            <button
              key={number}
              type="button"
              onClick={() => goTo(number)}
              aria-current={number === currentPage ? "page" : undefined}
              className={`h-9 min-w-9 rounded-lg px-2 text-sm font-bold transition-colors ${
                number === currentPage
                  ? "bg-[#0d4d33] text-white shadow-sm"
                  : "border border-slate-200 bg-white text-slate-600 hover:border-[#0d4d33] hover:text-[#0d4d33]"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next page"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-colors hover:border-[#0d4d33] hover:text-[#0d4d33] disabled:pointer-events-none disabled:opacity-40"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </nav>
      )}
    </div>
  );
}
