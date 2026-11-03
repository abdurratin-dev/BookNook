import type { Metadata } from "next";
import BorrowList from "@/components/borrows/BorrowList";

export const metadata: Metadata = {
  title: "My Borrows · BookNook",
  description: "Books you have borrowed from the library.",
};

export default function MyBorrowingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="font-display text-3xl font-bold text-[#174c43] sm:text-4xl">
        My Borrows
      </h1>
      <p className="mt-2 text-sm text-slate-500">Books you have borrowed</p>

      <BorrowList />
    </div>
  );
}
