"use client";

import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { Book } from "@/data/books";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { authClient } from "@/lib/auth-client";

type BorrowBookModalProps = {
  book: Book;
};

export default function BorrowCard({ book }: BorrowBookModalProps) {
  const [borrowing, setBorrowing] = useState(false);
  const [days, setDays] = useState("7");
  const [fieldError,setFieldError] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;
  const handleBorrow = async () => {
    if (!user) {
      toast.error("Please sign in to borrow this book.");
      return;
    }
    if (days === "7" || !days){
        setFieldError(true);
        return;
    }
    setBorrowing(true);
    const date = new Date().toDateString().toString();
    const {image,title,author,category,description,email} = book
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bookId: book?._id,
          bookowneremail: email,
          receiveremail: user.email,
          image,
          title,
          author,
          category,
          description,
          borrowsDate: date,
          returnDate: days,
          status: "Active"
        }),
      });
      if (!res.ok) throw new Error("Borrow failed");
      const result = await res.json();
      console.log(result);
      toast.success(`${result} borrowed successfully.`);
    } catch {
      toast.error("Could not borrow this book right now.");
    } finally {
      setBorrowing(false);
    }
  };
  console.log(days);
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <button
              type="button"
              className="rounded-xl bg-[#0d4d33] px-8 py-3.5 text-sm font-bold text-white shadow-md shadow-[#0d4d33]/25 transition-all duration-300 hover:bg-[#126344] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
            >
              {"Borrow This Book"}
            </button>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="relative w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl sm:p-10">
              {/* Header */}
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold text-[#0d4d33] sm:text-3xl">
                  Borrow Book
                </h2>

                <button
                  // onClick={onClose}
                  aria-label="Close modal"
                  className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-[#0d4d33]"
                ></button>
              </div>

              {/* Book Information */}
              <div className="mb-6 flex items-center gap-5">
                <div className="h-[140px] w-[115px] shrink-0 overflow-hidden rounded-xl bg-slate-100">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="min-w-0">
                  <h3 className="mb-2 text-lg font-bold text-[#0d4d33] sm:text-xl">
                    {book.title}
                  </h3>

                  <p className="text-sm font-medium text-slate-500 sm:text-base">
                    {book.author}
                  </p>
                </div>
              </div>

              {/* Return Days */}
              <div className="mb-8">
                <label
                  htmlFor="borrowingDays"
                  className="mb-3 block text-base font-bold text-[#0d4d33]"
                >
                  Return Date
                </label>

                <div className="relative">
                  <input
                    type="date"
                    id="borrowingDate"
                    value={days}
                    onChange={(e) => setDays(e.target.value)}
                    className={`h-[66px] w-full appearance-none rounded-xl border ${fieldError ? "border-red-500": "border-slate-200"} bg-white px-6 pr-12 text-base font-semibold text-slate-600 outline-none transition focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/10`}
                  />
                </div>
              {fieldError && <p className="text-red-500 mt-2">Please select return date</p>}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:justify-between">
                <DialogClose
                  render={
                    <Button
                      type="button"
                      className="h-[68px] w-full rounded-xl border-2 border-slate-200 bg-white text-lg font-bold text-[#0d4d33] transition hover:border-[#0d4d33] hover:bg-slate-50 sm:w-[45%]"
                    >
                      Cancel
                    </Button>
                  }
                />

                <Button
                  type="button"
                  disabled={borrowing}
                  onClick={handleBorrow}
                  className={`h-[68px] w-full rounded-xl bg-[#006b50] text-lg font-bold text-white shadow-md transition hover:bg-[#00563f] active:scale-[0.98] sm:w-[45%] px-4`}
                >
                  {borrowing ? "Borrowing…" : "Confirm Borrow"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
