import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BookCard from "../cards/BookCard";
import { Book } from "@/data/books";

export default async function NewArrivals() {
  const getBooksData = async()=>{
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`);
    const data = await res.json();
    console.log(data);
    return data;
  }
  const newArrivals = await getBooksData();
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[#0d4d33] sm:text-2xl font-display">New Arrivals</h2>
          <p className="mt-1 text-sm text-slate-500">Fresh books, just for you</p>
        </div>
        <Link
          href="/all-books"
          className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[#0d4d33] hover:underline sm:text-sm"
        >
          See All Books
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
        {newArrivals.map((book : Book ,ind:number) => (
          <BookCard key={ind} book={book} />
        ))}
      </div>
    </section>
  );
}
