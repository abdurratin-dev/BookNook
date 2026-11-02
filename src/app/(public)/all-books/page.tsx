import type { Metadata } from "next";
import BookCatalog from "@/components/books/BookCatalog";

export const metadata: Metadata = {
  title: "All Books · BookNook",
  description: "Browse our complete collection of books.",
};

export default function AllBooksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="font-display text-3xl font-bold text-[#0d4d33] sm:text-4xl">
        All Books
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Browse our complete collection of books.
      </p>
      
      <BookCatalog />
    </div>
  );
}
