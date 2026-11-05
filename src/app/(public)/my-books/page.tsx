"use client";

import { EditBook } from "@/components/books/editBooks";
import PageHeader from "@/components/layout/PageHeader";
import MyBooksSkeleton from "@/components/skeleton/myBookSkeleton";
import { Book } from "@/data/books";
import { authClient } from "@/lib/auth-client";
import { BookMarked, Plus, Search, SearchX, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function MyBooksPage() {
  const [search, setSearch] = useState("");
  const [booksData, setBooksData] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  useEffect(() => {
    const getBooksData = async () => {
      try {
        const res = await fetch(`${process.env.SERVER_URL}/books`);
        const data = await res.json();
        setBooksData(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getBooksData();
  }, []);
  const myBooks = booksData.filter((book) => book.email === user?.email);

  const filteredBooks = myBooks.filter((book) => {
    if (!search.trim()) return true;
    return book.title.toLowerCase().includes(search.toLowerCase());
  });
  const hendleDeleteBook = async (_id: string, title: string) => {
    const { data: jwttoken, error } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/borrows/${_id}`,
        {
          method: "DELETE",
          headers:{
            authorization: `elitebook ${jwttoken?.token}`,
          }
        },
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("Delete faild");
    }

    try {
      const res = await fetch(
        `${process.env.SERVER_URL}/books/${_id}`,
        {
          method: "DELETE",
          headers:{
             authorization: `elitebook ${jwttoken?.token}`,
          }
        },
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("Delete faild");
    }
    toast.success(`${title} is deleted`);
    window.location.reload();
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <div>
        {/* Header */}
        <div className="mb-7">
          <PageHeader
            icon={BookMarked}
            eyebrow="Your Shelf"
            title="My Books"
            description="Books you have added to the BookNook library — edit their details or remove them."
          />
        </div>

        {loading ? (
          <MyBooksSkeleton />
        ) : (
          <div>
            {/* Search and Add */}
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex h-11 flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 shadow-sm transition focus-within:border-[#0d4d33] focus-within:ring-2 focus-within:ring-[#0d4d33]/15">
                <Search className="h-4.5 w-4.5 shrink-0 text-slate-400" />

                <input
                  type="text"
                  placeholder="Search your books..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>

              <Link
                href="/add-book"
                className="flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0d4d33] px-5 text-sm font-bold text-white shadow-md shadow-[#0d4d33]/25 transition-all hover:bg-[#0a3d28] active:scale-[0.99]"
                title="Add Book"
              >
                <Plus className="h-4 w-4" />
                Add Book
              </Link>
            </div>

            {/* Books Table */}
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Desktop Header */}
              <div className="hidden grid-cols-[2fr_1.1fr_1fr_1.2fr] gap-4 border-b border-black/[0.05] bg-[#f7f9f4] px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#0d4d33] md:grid">
                <span>Books</span>
                <span>Category</span>
                <span>Added On</span>
                <span className="text-center">Actions</span>
              </div>

              {/* Book Rows */}
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <div
                    key={book._id}
                    className="grid grid-cols-1 gap-4 border-b border-black/[0.04] px-4 py-4 transition-colors last:border-0 hover:bg-[#f7f9f4] sm:px-6 md:grid-cols-[2fr_1.1fr_1fr_1.2fr] md:items-center"
                  >
                    {/* Book Information */}
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-[65px] w-[48px] shrink-0 flex-col items-center justify-center overflow-hidden rounded-lg border border-black/10 bg-slate-50 p-1 text-center shadow-sm`}
                      >
                        <Image
                          src={book?.image || "/next.svg"}
                          alt={book?.title}
                          width={50}
                          height={50}
                          unoptimized
                          className="h-full w-full rounded-md object-cover"
                        />
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
                        {book.createdDate}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 md:justify-center">
                      <EditBook book={book} />

                      <button
                        onClick={() => hendleDeleteBook(book?._id, book.title)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center px-4 py-16 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
                    <SearchX className="h-5 w-5 text-[#0d4d33]" />
                  </span>
                  <p className="mt-4 font-semibold text-slate-700">
                    {search ? "No books match your search" : "No books yet!"}
                  </p>
                  <p className="mt-1 text-sm text-slate-400">
                    {search
                      ? "Try searching with another keyword."
                      : "Add your first book to the library."}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
