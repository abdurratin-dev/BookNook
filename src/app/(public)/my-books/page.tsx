
"use client";

import { useMemo, useState } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  date: string;
  cover: string;
};

const initialBooks: Book[] = [
  {
    id: 1,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    date: "May 10, 2025",
    cover: "bg-orange-100 text-orange-700",
  },
  {
    id: 2,
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    date: "May 8, 2025",
    cover: "bg-red-600 text-white",
  },
  {
    id: 3,
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    date: "May 5, 2025",
    cover: "bg-blue-800 text-white",
  },
  {
    id: 4,
    title: "The Martian",
    author: "Andy Weir",
    category: "Science Fiction",
    date: "May 2, 2025",
    cover: "bg-orange-500 text-white",
  },
  {
    id: 5,
    title: "Harry Potter",
    author: "J.K. Rowling",
    category: "Fantasy",
    date: "Apr 30, 2025",
    cover: "bg-stone-800 text-yellow-300",
  },
];

export default function MyBooksPage() {
  const [books, setBooks] = useState(initialBooks);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  const filteredBooks = useMemo(() => {
    return books.filter((book) =>
      `${book.title} ${book.author} ${book.category}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [books, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBooks.length / perPage)
  );

  const currentBooks = filteredBooks.slice(
    (page - 1) * perPage,
    page * perPage
  );

  const deleteBook = (id: number) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const addBook = () => {
    const title = prompt("Enter book title:");
    if (!title?.trim()) return;

    const author = prompt("Enter author name:") || "Unknown Author";
    const category = prompt("Enter category:") || "General";

    setBooks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        author,
        category,
        date: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        cover: "bg-emerald-700 text-white",
      },
    ]);
    setPage(Math.ceil((books.length + 1) / perPage));
  };

  const editBook = (book: Book) => {
    const title = prompt("Edit book title:", book.title);
    if (!title?.trim()) return;

    setBooks((prev) =>
      prev.map((item) =>
        item.id === book.id ? { ...item, title } : item
      )
    );
  };

  return (
    <main className="min-h-screen bg-[#fafaf7] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-[#174c43]">
            My Books
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Books you have added to the library
          </p>
        </div>

        {/* Search and Add */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm transition focus-within:border-emerald-600">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-4-4" />
            </svg>

            <input
              type="text"
              placeholder="Search your books..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          <button
            onClick={addBook}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm transition hover:bg-emerald-50"
            title="Add Book"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>

        {/* Books Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

          {/* Desktop Header */}
          <div className="hidden grid-cols-[2fr_1.1fr_1fr_1.2fr] gap-4 border-b border-gray-100 bg-[#fcfcfa] px-6 py-4 text-sm font-semibold text-[#286c5e] md:grid">
            <span>Books</span>
            <span>Category</span>
            <span>Added On</span>
            <span className="text-center">Actions</span>
          </div>

          {/* Book Rows */}
          {currentBooks.length > 0 ? (
            currentBooks.map((book) => (
              <div
                key={book.id}
                className="grid grid-cols-1 gap-4 border-b border-gray-100 px-4 py-4 transition hover:bg-[#fafcf9] last:border-0 sm:px-6 md:grid-cols-[2fr_1.1fr_1fr_1.2fr] md:items-center"
              >
                {/* Book Information */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-[65px] w-[48px] shrink-0 flex-col items-center justify-center rounded-md border border-black/10 p-1 text-center shadow-sm ${book.cover}`}
                  >
                    <span className="text-[8px] font-bold leading-tight">
                      {book.title}
                    </span>
                    <span className="mt-1 text-[6px] opacity-70">
                      BOOK
                    </span>
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#214d46]">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {book.author}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <span className="text-xs text-gray-600 md:hidden">
                    Category:{" "}
                  </span>
                  <span className="text-sm text-gray-500">
                    {book.category}
                  </span>
                </div>

                {/* Date */}
                <div>
                  <span className="text-xs text-gray-600 md:hidden">
                    Added:{" "}
                  </span>
                  <span className="text-sm text-gray-500">
                    {book.date}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:justify-center">
                  <button
                    onClick={() => editBook(book)}
                    className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
                    </svg>
                    Edit
                  </button>

                  <button
                    onClick={() => deleteBook(book.id)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-16 text-center">
              <p className="font-semibold text-gray-600">
                No books found!
              </p>
              <p className="mt-1 text-sm text-gray-400">
                Try searching with another keyword.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-7 flex items-center justify-center gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-emerald-50 disabled:opacity-40"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                className={`h-10 min-w-10 rounded-lg px-3 text-sm font-semibold transition ${
                  page === number
                    ? "bg-[#08785e] text-white shadow-sm"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-emerald-50"
                }`}
              >
                {number}
              </button>
            )
          )}

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition hover:bg-emerald-50 disabled:opacity-40"
          >
            ›
          </button>
        </div>

      </div>
    </main>
  );
}
