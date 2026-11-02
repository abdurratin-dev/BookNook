"use client";

import { authClient } from "@/lib/auth-client";
import { BorrowsListType } from "@/types/borrowListType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  Active: "bg-[#d3f4e0] text-[#0f7b4f]",
  Returned: "bg-[#e6efe9] text-[#41604f]",
};

function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-3 py-1.5 text-[11px] font-bold ${STATUS_STYLES[status] as string}`}
    >
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
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg border px-4 py-2 text-xs font-bold transition-colors ${
        disabled
          ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
          : "border-[#0d4d33]/50 bg-white text-[#0d4d33] hover:bg-[#0d4d33] hover:text-white"
      }`}
    >
      Return
    </button>
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
  const router = useRouter()
  const { data: session } = authClient.useSession();
  const user = session?.user;
  useEffect(() => {
    const getBorrowsData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`,
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

  const hendlereturnBook = async (id: string,name:string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/borrows/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({status:"Returned"}),
        },
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("This book not returned");
    }finally{
      toast.success(`${name} are successfully returned`)
      router.refresh();
    }
  };

  const returnBook = (id: string) =>
    setItems((current) =>
      current.map((item) =>
        item._id === id && item.status === "Active"
          ? { ...item, status: "Returned" as const }
          : item,
      ),
    );

  return (
    <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
      {/* Desktop table */}
      <table className="hidden w-full md:table">
        <thead>
          <tr className="border-b border-slate-100 text-left text-xs font-bold text-[#0d4d33]">
            <th className="px-6 py-4">Book</th>
            <th className="px-6 py-4">Borrowed On</th>
            <th className="px-6 py-4">Return Date</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((borrowing) => (
            <tr
              key={borrowing._id}
              className="border-b border-slate-50 transition-colors last:border-0 hover:bg-slate-50/70"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Cover borrowing={borrowing} />
                  <BookIdentity book={borrowing} />
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {borrowing.receiveremail}
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
                  onClick={() => hendlereturnBook(borrowing._id,borrowing.title)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile cards */}
      <ul className="divide-y divide-slate-100 md:hidden">
        {items.map((borrowing) => (
          <li key={borrowing._id} className="p-4">
            <div className="flex items-start gap-3">
              <Cover borrowing={borrowing} />
              <div className="min-w-0 flex-1">
                <BookIdentity book={borrowing} />

                <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs">
                  <dt className="font-semibold text-slate-400">Borrowed On</dt>
                  <dd className="text-right text-slate-500">
                    {borrowing.receiveremail}
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
                    onClick={() => returnBook(borrowing._id)}
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
