"use client";

import { EditBook } from "@/components/books/editBooks";
import { Book } from "@/data/books";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
export default function MyBooksPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const perPage = 5;

  const { data: session } = authClient.useSession();
  const user = session?.user;
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
  const myBooks = booksData.filter((book) => book.email === user?.email);

  const filteredBooks = myBooks.filter((book) => {
    if (!search.trim()) return myBooks;
    const filterBooks = book.title.toLowerCase().includes(search.toLowerCase());
    console.log(filterBooks);
    return filterBooks;
  });
  const totalPages = Math.max(1, Math.ceil(filteredBooks.length / perPage));

  const currentBooks = filteredBooks.slice(
    (page - 1) * perPage,
    page * perPage,
  );

  const hendleDeleteBook = async(_id: string,title:string) => {
    try{
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books/${_id}`,{
        method: "DELETE",
      });
      const result = await res.json();
      console.log(result);
    }catch(error){
      toast.error("Delete faild")
    }
    toast.success(`${title} is deleted`);
    window.location.reload()
  };

  return (
    <main className="min-h-screen px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[#174c43]">
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

          <Link
            href="/add-book"
            className="flex h-12 px-5 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-white text-emerald-700 shadow-sm transition hover:bg-emerald-50"
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
            Add Book
          </Link>
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
          {booksData.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="grid grid-cols-1 gap-4 border-b border-gray-100 px-4 py-4 transition hover:bg-[#fafcf9] last:border-0 sm:px-6 md:grid-cols-[2fr_1.1fr_1fr_1.2fr] md:items-center"
              >
                {/* Book Information */}
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-[65px] w-[48px] shrink-0 flex-col items-center justify-center rounded-md border border-black/10 p-1 text-center shadow-sm ${book.cover}`}
                  >
                    <Image
                      src={book?.image}
                      alt={book?.title}
                      width={50}
                      height={50}
                    />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-bold text-[#214d46]">
                      {book.title}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">{book.author}</p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <span className="text-xs text-gray-600 md:hidden">
                    Category:{" "}
                  </span>
                  <span className="text-sm text-gray-500">{book.category}</span>
                </div>

                {/* Date */}
                <div>
                  <span className="text-xs text-gray-600 md:hidden">
                    Added:{" "}
                  </span>
                  <span className="text-sm text-gray-500">
                    {book.creatDate}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 md:justify-center">
                  <EditBook book={book}/>

                  <button
                    onClick={() => hendleDeleteBook(book?._id,book.title)}
                    className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-16 text-center">
              <p className="font-semibold text-gray-600">No books found!</p>
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

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
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
          ))}

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
