"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BookPlus, BookUp, Clock3, UserRound } from "lucide-react";
import ProfileEditCard from "@/components/cards/profileEditCard";
import ProfileSkeleton from "@/components/skeleton/profileSkeleton";
import PageHeader from "@/components/layout/PageHeader";
import { Book } from "@/data/books";
import { authClient } from "@/lib/auth-client";
import { BorrowsListType } from "@/types/borrowListType";

export default function ProfilePage() {
  const [addBook, setAddBook] = useState<Book[]>([]);
  const [borrowedBook, setBorrowedBook] = useState<BorrowsListType[]>([]);
  const [loading, setLoading] = useState(true);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const getBooksData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`);
        const data: Book[] = await res.json();
        const userBook = data.filter((book) => book.email === user?.email);
        setAddBook(userBook);
      } catch {
        setAddBook([]);
      }
    };
    getBooksData();
  }, [user]);

  useEffect(() => {
    const getBorrowsData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/borrows`);
        const data: BorrowsListType[] = await res.json();
        const borrows = data.filter(
          (borrow) => borrow.receiveremail === user?.email,
        );
        setBorrowedBook(borrows);
      } catch {
        setBorrowedBook([]);
      } finally {
        setLoading(false);
      }
    };
    getBorrowsData();
  }, [user]);

  if (loading) {
    return <ProfileSkeleton />;
  }

  const activeBorrows = borrowedBook.filter(
    (borrow) => borrow.status === "Active",
  ).length;

  const stats = [
    { label: "Books Added", value: addBook.length, icon: BookPlus },
    { label: "Books Borrowed", value: borrowedBook.length, icon: BookUp },
    { label: "Active Borrows", value: activeBorrows, icon: Clock3 },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      {/* Page Heading */}
      <div className="mb-7">
        <PageHeader
          icon={UserRound}
          eyebrow="Account"
          title="My Profile"
          description="Manage your personal information and see your reading activity at a glance."
        />
      </div>

      {/* Profile Header */}
      <div className="overflow-hidden rounded-3xl border border-black/[0.06] bg-white shadow-sm">
        <div className="relative h-32 bg-gradient-to-r from-[#0d4d33] via-[#126344] to-[#1a8a5f] sm:h-40">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_20%_20%,white,transparent_60%)]"
          />
        </div>

        <div className="px-5 pb-6 sm:px-8">
          <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
            {/* Avatar & User Info */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-5">
              <div className="relative z-1 h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-[#e7f2ed] text-3xl font-bold text-[#0d4d33] shadow-md sm:h-28 sm:w-28">
                {user?.image ? (
                  <Image
                    src={user.image}
                    alt={user?.name ?? "Profile"}
                    width={112}
                    height={112}
                    unoptimized
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="flex h-full w-full items-center justify-center">
                    {user?.name?.slice(0, 1)?.toUpperCase() ?? "B"}
                  </span>
                )}
              </div>

              <div className="pb-1">
                <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                  {user?.name}
                </h2>
                <p className="mt-1 break-all text-sm text-slate-500">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="sm:pb-1">
              <ProfileEditCard />
            </div>
          </div>
        </div>
      </div>

      {/* Reading Statistics */}
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#0d4d33]/10"
          >
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-[#0d4d33]/10 text-[#0d4d33]">
              <stat.icon className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3 className="text-2xl font-bold text-[#0d4d33]">
                {stat.value}
              </h3>
              <p className="mt-0.5 truncate text-xs text-slate-500">
                {stat.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Information */}
      <div className="mt-7 rounded-3xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-7">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-slate-900">
              Personal Information
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              Your personal details and contact information.
            </p>
          </div>

          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[#0d4d33]/10 text-[#0d4d33]">
            <UserRound className="h-5 w-5" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {[
            { label: "Full Name", value: user?.name },
            { label: "Email Address", value: user?.email },
            { label: "Account Type", value: "Reader Account" },
          ].map((item) => (
            <div key={item.label}>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                {item.label}
              </p>
              <p className="break-words border-b border-slate-100 pb-3 text-sm font-bold text-slate-800">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
