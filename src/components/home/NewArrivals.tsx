import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "../cards/BookCard";
import { Book } from "@/data/books";

export default async function NewArrivals() {
  const res = await fetch(`${process.env.SERVER_URL}/books`);
  const data: Book[] = await res.json();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0d4d33]/15 bg-[#0d4d33]/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0d4d33]">
            Just in
          </span>
          <h2 className="mt-3 font-display text-xl font-bold tracking-tight text-[#0d4d33] sm:text-2xl">
            New Arrivals
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Fresh books, just for you
          </p>
        </div>
        <Link
          href="/all-books"
          className="group flex shrink-0 items-center gap-1.5 rounded-full border border-[#0d4d33]/25 bg-white px-4 py-2 text-xs font-bold text-[#0d4d33] transition-colors hover:bg-[#0d4d33] hover:text-white sm:text-sm"
        >
          See All Books
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {data.slice(-6).map((book: Book, ind: number) => (
          <BookCard key={ind} book={book} />
        ))}
      </div>
    </section>
  );
}
