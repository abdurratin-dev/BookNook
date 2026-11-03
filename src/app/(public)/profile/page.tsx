"use client";
import ProfileEditCard from "@/components/cards/profileEditCard";
import ProfileSkeleton from "@/components/skeleton/profileSkeleton";
import { Book } from "@/data/books";
import { authClient } from "@/lib/auth-client";
import { BorrowsListType } from "@/types/borrowListType";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [addBook, setAddBook] = useState<Book[]>([]);
  const [borrowedBook, setBorrowedBook] = useState<BorrowsListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const stats = [
    { label: "Books Added", value: addBook.length, icon: "📚" },
    { label: "Books Borrowed", value: borrowedBook.length, icon: "📖" },
    { label: "Books Read", value: "08", icon: "✓" },
  ];

  useEffect(() => {
    const getBooksData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/books`);
        const data: Book[] = await res.json();
        const userBook = data.filter((book) => book.email === user?.email);
        setAddBook(userBook);
      } catch (error) {
        setError(true);
      }
    };
    getBooksData();
  }, [user]);

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
        setBorrowedBook(borrows);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    getBorrowsData();
  }, [user]);

  if (loading) {
    return <ProfileSkeleton />;
  }
  return (
    <div className="mx-auto max-w-7xl min-h-screen bg-[#fcfcfa] px-4 py-8 sm:px-6 lg:px-8">
      <div>
        {/* Page Heading */}
        <div className="mb-7">
          <h1 className="font-display text-2xl font-bold text-[#214d46] sm:text-3xl">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account settings.
          </p>
        </div>

        {/* Profile Header */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-32 bg-gradient-to-r from-[#214d46] to-[#398575] sm:h-40" />

          <div className="px-5 pb-6 sm:px-8">
            <div className="-mt-12 flex flex-col gap-4 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar & User Info */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:gap-5">
                {user?.image ? (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#e7f2ed] text-3xl font-bold text-[#286c5e] shadow-sm sm:h-28 sm:w-28">
                    <Image
                      src={user.image}
                      alt={user?.name}
                      width={100}
                      height={100}
                      className="rounded-xl"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-[#e7f2ed] text-3xl font-bold text-[#286c5e] shadow-sm sm:h-28 sm:w-28">
                    {user?.name.slice(0, 1)}
                  </div>
                )}

                <div className="pb-1">
                  <h2 className="text-xl font-bold text-white sm:text-2xl">
                    {user?.name}
                  </h2>
                  <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
                  <span className="mt-2 inline-flex rounded-full bg-[#e8f3ed] px-3 py-1 text-xs font-semibold text-[#286c5e]">
                    {/* {user?.role} */}
                  </span>
                </div>
              </div>

              <ProfileEditCard />
            </div>

            {/* Bio */}
            <p className="mt-6 max-w-2xl text-sm leading-6 text-gray-500">
              {/* {user.bio} */}
            </p>
          </div>
        </div>

        {/* Reading Statistics */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f3ed] text-xl text-[#286c5e]">
                {stat.icon}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-[#214d46]">
                  {stat.value}
                </h3>
                <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Personal Information */}
        <div className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#214d46]">
                Personal Information
              </h3>
              <p className="mt-1 text-xs text-gray-400">
                Your personal details and contact information.
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e8f3ed] text-[#286c5e]">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="8" r="4" />
                <path d="M5 21a7 7 0 0 1 14 0" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              { label: "Full Name", value: user?.name },
              { label: "Email Address", value: user?.email },
              { label: "Account Type", value: "Reader Account" },
            ].map((item) => (
              <div key={item.label}>
                <p className="mb-2 text-xs font-medium text-gray-400">
                  {item.label}
                </p>
                <p className="border-b border-gray-100 pb-3 text-sm font-semibold text-[#214d46]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
