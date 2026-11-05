"use client";

import { authClient } from "@/lib/auth-client";
import { BorrowsListType } from "@/types/borrowListType";
import { BookUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import BorrowListSkeleton from "../skeleton/myBorrowsSkeleton";
import ReturnPopover from "../popover/ReturnPopover";

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-bold tracking-wide ${
        status === "Active"
          ? "bg-[#d3f4e0] text-[#0f7b4f]"
          : "bg-slate-100 text-slate-500"
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Active" ? "bg-[#0f7b4f]" : "bg-slate-400"
        }`}
      />
      {status}
    </span>
  );
}

function ReturnButton({
  status,
  onClick,
}: {
  status: string;
  onClick: () => void;
}) {
  const disabled = status === "Returned";
  return (
    <ReturnPopover onClick={onClick} disabled={disabled}/>
  );
}

function Cover({ borrowing }: { borrowing: BorrowsListType }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-slate-100">
      {failed ? (
        <div className="flex h-full w-full items-end bg-gradient-to-br from-[#0d4d33] to-[#16845a] p-1">
          <span className="line-clamp-2 text-[8px] font-bold leading-tight text-white">
            {borrowing.title}
          </span>
        </div>
      ) : (
        <Image
          src={
            borrowing?.image ||
            "https://cdn.pixabay.com/photo/2020/03/18/15/40/book-4944519_960_720.jpg"
          }
          alt={`${borrowing.title} cover`}
          fill
          unoptimized
          sizes="40px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function BookIdentity({ book }: { book: BorrowsListType }) {
  return (
    <div className="min-w-0">
      <p className="truncate text-sm font-bold text-slate-800">{book.title}</p>
      <p className="truncate text-xs text-slate-500">{book.author}</p>
    </div>
  );
}

export default function BorrowList() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [items, setItems] = useState<BorrowsListType[]>([]);
  const { data: session } = authClient.useSession();
  const user = session?.user;
  useEffect(() => {
    const getBorrowsData = async () => {
      const { data: jwttoken, error } = await authClient.token();
      try {
        const res = await fetch(
          `https://book-nook-server.vercel.app/borrows`,
          {
            headers: {
              authorization: `elitebook ${jwttoken?.token}`,
            },
          },
        );
        const data: BorrowsListType[] = await res.json();
        const borrows = data.filter(
          (borrows) => borrows.receiveremail === user?.email,
        );
        setItems(borrows);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getBorrowsData();
  }, [user]);

  const hendlereturnBook = async (id: string, bookId: string, name: string) => {
    try {
      const response = await fetch(
        `https://book-nook-server.vercel.app/books/${bookId}`,
      );
      const books = await response.json();
      const copies = {
        copies: String(Number(books.copies) + 1),
        status: "Returned",
      };
      const { data: jwttoken, error } = await authClient.token();
      const upres = await fetch(`https://book-nook-server.vercel.app/books/${bookId}`,{
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
             authorization: `elitebook ${jwttoken?.token}`,
          },
          body: JSON.stringify(copies),
        },);
      const  rres = await upres.json();
      console.log(rres);
      const res = await fetch(
        `https://book-nook-server.vercel.app/borrows/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `elitebook ${jwttoken?.token}`,
          },
          body: JSON.stringify({status: "Returned"}),
        },
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("This book not returned");
    } finally {
      toast.success(`${name} are successfully returned`);
      setTimeout(()=>{
        window.location.reload()
      },3000)
    }
  };

  if (loading) {
    return <BorrowListSkeleton />;
  }

  return (
    <div className="mt-8 overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-sm">
      {/* Desktop table */}
      {items.length > 0 ? (
        <table className="hidden w-full md:table">
          <thead>
            <tr className="border-b border-black/[0.05] bg-[#f7f9f4] text-left text-[11px] font-bold uppercase tracking-wider text-[#0d4d33]">
              <th className="px-6 py-3.5">Book</th>
              <th className="px-6 py-3.5">Owner</th>
              <th className="px-6 py-3.5">Return Date</th>
              <th className="px-6 py-3.5">Status</th>
              <th className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((borrowing) => {
              return (
                <tr
                  key={borrowing._id}
                  className="border-b border-black/[0.04] transition-colors last:border-0 hover:bg-[#f7f9f4]"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Cover borrowing={borrowing} />
                      <BookIdentity book={borrowing} />
                    </div>
                  </td>
                  <td className="max-w-[12rem] truncate px-6 py-4 text-sm text-slate-500">
                    {borrowing.bookowneremail}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {borrowing.returnDate}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={borrowing.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <ReturnButton
                      status={borrowing.status}
                      onClick={() =>
                        hendlereturnBook(borrowing._id,borrowing.bookId, borrowing.title)
                      }
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-center px-4 py-16 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
            <BookUp className="h-5 w-5 text-[#0d4d33]" />
          </span>
          <p className="mt-4 font-semibold text-slate-700">
            No borrowed books yet
          </p>
          <p className="mt-1 text-sm text-slate-400">
            Books you borrow will show up here with their return date.
          </p>
          <Link
            href="/all-books"
            className="mt-5 rounded-xl border border-[#0d4d33]/25 bg-white px-4 py-2 text-xs font-bold text-[#0d4d33] transition-colors hover:bg-[#0d4d33]/5"
          >
            Browse the catalogue
          </Link>
        </div>
      )}

      {/* Mobile cards */}
      <ul className="divide-y divide-slate-100 md:hidden">
        {items.map((borrowing) => (
          <li key={borrowing._id} className="p-4">
            <div className="flex items-start gap-3">
              <Cover borrowing={borrowing} />
              <div className="min-w-0 flex-1">
                <BookIdentity book={borrowing} />

                <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
                  <dt className="font-semibold text-slate-400">Owner</dt>
                  <dd className="truncate text-right text-slate-500">
                    {borrowing.bookowneremail}
                  </dd>
                  <dt className="font-semibold text-slate-400">Return Date</dt>
                  <dd className="text-right text-slate-500">
                    {borrowing.returnDate}
                  </dd>
                </dl>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <StatusBadge status={borrowing.status} />
                  <ReturnButton
                    status={borrowing.status}
                    onClick={() =>
                      hendlereturnBook(
                        borrowing._id,
                        borrowing.bookId,
                        borrowing.title,
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
