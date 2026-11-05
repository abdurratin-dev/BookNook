"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import BookCard from "@/components/cards/BookCard";
import { Book } from "@/data/books";
import BooksSkeleton from "../skeleton/allBookSkeleton";

const PER_PAGE = 9;

type Filters = { query: string; category: string };

function matches(book: Book, { query, category }: Filters) {
  if (category !== "" && book.category !== category) return false;
  if (query === "") return true;

  const haystack =
    `${book.title} ${book.author} ${book.category}`.toLowerCase();
  return haystack.includes(query);
}

export default function BookCatalog() {
  const [category, setCategory] = useState("");
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const getBooksData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`);
        const data = await res.json();
        setBooksData(data);
      } catch (error) {
        setError("");
      } finally {
        setLoading(false);
      }
    };
    getBooksData();
  }, []);
  console.log(booksData);
  const bookCategories = [
    "Fiction",
    "Science Fiction",
    "History",
    "Kids",
    "Other / Unknown",
  ];

  const books = booksData.filter((books) => books.category === category);
  const allBooks = books.length === 0 ? booksData : books;
  
  if(loading){
    return(
      <BooksSkeleton />
    )
  }
  return (
    <div>
      {/* Search + category filters */}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-between">
        {/* Result count */}
        <p className=" text-xs font-medium text-slate-500 sm:text-sm">
          Total Books:{" "}
          <span className="font-bold text-slate-800">{booksData.length}</span>
        </p>
        <div className="relative sm:w-52">
          <select
            value={category}
            onChange={(event) => {
              setCategory(event.target.value);
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

      {/* Book grid */}
      {allBooks.length > 0 ? (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {allBooks.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <div className="mt-5 flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
            <BookOpen className="h-6 w-6 text-[#0d4d33]" />
          </span>
          <p className="mt-4 text-sm font-bold text-slate-800">
            No books found
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Try a different search term or pick another category.
          </p>
        </div>
      )}
    </div>
  );
}
