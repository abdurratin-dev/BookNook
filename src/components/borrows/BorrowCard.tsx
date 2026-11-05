"use client";

import { useState } from "react";
import { Book } from "@/data/books";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import { BorrowsListType } from "@/types/borrowListType";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";

type BorrowBookModalProps = {
  book: Book;
};

export default function BorrowCard({ book }: BorrowBookModalProps) {
  const [borrowing, setBorrowing] = useState(false);
  const [days, setDays] = useState("");
  const [fieldError, setFieldError] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const today = new Date().toISOString().slice(0, 10);

  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please sign in to borrow this book.");
      return;
    }
    if (!days) {
      setFieldError(true);
      return;
    }
    const { data: jwttoken } = await authClient.token();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`, {
        headers: {
          authorization: `elitebook ${jwttoken?.token}`,
        },
      });
      const data: BorrowsListType[] = await res.json();
      const chackData = data.some(
        (bookU) =>
          bookU.bookId === book._id && bookU.receiveremail === user.email,
      );
      if (chackData) {
        toast.error("This book is already on your borrow list");
        return;
      }
    } catch {
      /* listing check is best-effort */
    }

    setBorrowing(true);
    const date = new Date().toDateString().toString();
    const { image, title, author, category, description, email } = book;
    const copies = { copies: String(Number(book.copies) - 1) };
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books/${book._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `elitebook ${jwttoken?.token}`,
      },
      body: JSON.stringify(copies),
    });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `elitebook ${jwttoken?.token}`,
        },
        body: JSON.stringify({
          bookId: book?._id,
          bookowneremail: email,
          receiveremail: user?.email,
          image,
          title,
          author,
          category,
          description,
          borrowsDate: date,
          returnDate: days,
          status: "Active",
        }),
      });
      if (!res.ok) throw new Error("Borrow failed");
      await res.json();
      toast.success(`${title} borrowed successfully.`);
    } catch {
      toast.error("Could not borrow this book right now.");
    } finally {
      setBorrowing(false);
    }
  };

  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0d4d33] px-6 text-[15px] font-bold text-white shadow-md shadow-[#0d4d33]/25 transition-all duration-300 hover:bg-[#0a3d28] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 sm:min-w-[250px]"
            >
              <BookOpen className="h-4 w-4" />
              Borrow This Book
              <ArrowRight className="h-4 w-4" />
            </Button>
          }
        />

        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="pr-8 font-display text-lg font-bold text-[#0d4d33]">
            Borrow this book
          </DialogTitle>

          {/* Book summary */}
          <div className="flex items-center gap-4 rounded-2xl border border-black/[0.05] bg-[#f7f9f4] p-3">
            <div className="h-[124px] w-[96px] shrink-0 overflow-hidden rounded-xl border border-black/[0.06] bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={book.image}
                alt={book.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-base font-bold leading-snug text-[#0d4d33] sm:text-lg">
                {book.title}
              </h3>
              <p className="mt-1 truncate text-sm text-slate-500">
                {book.author}
              </p>
              <span className="mt-2.5 inline-flex rounded-full bg-[#0d4d33]/10 px-2.5 py-1 text-[11px] font-bold text-[#0d4d33]">
                {book.category}
              </span>
            </div>
          </div>

          {/* Return date */}
          <div>
            <label
              htmlFor="borrowingDate"
              className="block text-sm font-bold text-slate-700"
            >
              Return date
            </label>
            <div className="relative mt-2">
              <CalendarDays className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="date"
                id="borrowingDate"
                min={today}
                value={days}
                onChange={(e) => {
                  setDays(e.target.value);
                  if (fieldError) setFieldError(false);
                }}
                className={`h-12 w-full rounded-xl border bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none transition-colors ${
                  fieldError
                    ? "border-red-400 focus:ring-2 focus:ring-red-200"
                    : "border-slate-200 focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15"
                }`}
              />
            </div>
            {fieldError && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                Please select a return date
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row">
            <DialogClose
              render={
                <Button
                  type="button"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:flex-1"
                >
                  Cancel
                </Button>
              }
            />

            <Button
              type="button"
              disabled={borrowing}
              onClick={handleBorrow}
              className="h-11 w-full rounded-xl bg-[#0d4d33] px-4 text-sm font-bold text-white shadow-md shadow-[#0d4d33]/25 transition-all hover:bg-[#0a3d28] active:scale-[0.98] sm:w-auto sm:flex-1"
            >
              {borrowing ? "Borrowing…" : "Confirm Borrow"}
            </Button>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
