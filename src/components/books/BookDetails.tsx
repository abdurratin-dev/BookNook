"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ChevronRight,
  Hash,
  Languages,
  Layers,
  Quote,
  Star,
  UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import type { Book, BookReview } from "@/data/books";
import BorrowCard from "../borrows/BorrowCard";
import { Button } from "@heroui/react";
import { EditBook } from "./editBooks";

type Tab = "description" | "reviews";

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

/** Cover with the same graceful gradient fallback used by BookCard. */
function Cover({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[2/3] w-full max-w-[300px] overflow-hidden rounded-2xl border border-black/10 bg-slate-100 shadow-2xl shadow-black/15">
      {failed || !book.image ? (
        <div className="flex h-full w-full flex-col justify-end bg-gradient-to-br from-[#0d4d33] to-[#16845a] p-5">
          <span className="text-lg font-bold leading-snug text-white">
            {book.title}
          </span>
          <span className="mt-2 text-sm text-white/70">{book.author}</span>
        </div>
      ) : (
        <Image
          src={book.image}
          alt={`${book.title} cover`}
          fill
          unoptimized
          sizes="(max-width: 640px) 70vw, 300px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function Rating({ book }: { book: Book }) {
  const rating = book.rating ?? 0;
  const reviewCount = book.reviewCount ?? 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </span>
      {rating > 0 ? (
        <span className="text-sm font-semibold text-slate-700">
          {rating.toFixed(1)}{" "}
          <span className="font-normal text-slate-500">
            ({reviewCount} review{reviewCount === 1 ? "" : "s"})
          </span>
        </span>
      ) : (
        <span className="text-sm font-medium text-slate-400">
          No reviews yet
        </span>
      )}
    </div>
  );
}

/** Author / Category / Language / Pages strip under the hero. */
function InfoCard({ book }: { book: Book }) {
  const items = [
    { icon: UserRound, label: "Author", value: book.author },
    { icon: Layers, label: "Category", value: book.category },
    { icon: Languages, label: "Language", value: book.language ?? "English" },
    {
      icon: Hash,
      label: "Pages",
      value: book.pages ? String(book.pages) : "—",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-200/70 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-3 bg-white px-5 py-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eef6f1] text-[#0d4d33]">
            <Icon className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              {label}
            </p>
            <p className="truncate text-sm font-bold text-slate-800">{value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewList({ reviews }: { reviews: BookReview[] }) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
          <Quote className="h-5 w-5 text-[#0d4d33]" />
        </span>
        <p className="mt-4 text-sm font-bold text-slate-800">No reviews yet</p>
        <p className="mt-1 text-xs text-slate-500">
          Be the first to share your thoughts about this book.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article
          key={review._id}
          className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-slate-800">
              {review.userName}
            </p>
            <span
              className="flex items-center gap-0.5"
              aria-label={`${review.rating} out of 5 stars`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-3.5 w-3.5 ${
                    star <= review.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-slate-200 text-slate-200"
                  }`}
                />
              ))}
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {review.comment}
          </p>
          {review.createdAt && (
            <p className="mt-3 text-xs text-slate-400">
              {formatDate(review.createdAt)}
            </p>
          )}
        </article>
      ))}
    </div>
  );
}

export default function BookDetails({ bookId }: { bookId: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("description");
  const [saved, setSaved] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${bookId}`,
        );
        if (!res.ok) throw new Error("Book not found");
        const data = await res.json();
        // Some APIs wrap the document — accept both shapes.
        setBook(data.book ?? data);
      } catch {
        setError("We couldn't load this book. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    getBook();
  }, [bookId]);

  // Reviews are optional — an empty list simply shows the empty state.
  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${bookId}/reviews`,
        );
        if (!res.ok) return;
        const data = await res.json();
        setReviews(Array.isArray(data) ? data : (data.reviews ?? []));
      } catch {
        /* no reviews endpoint — keep the empty state */
      }
    };
    getReviews();
  }, [bookId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 py-32 text-slate-400">
        <span className="h-9 w-9 animate-spin rounded-full border-[3px] border-slate-200 border-t-[#0d4d33]" />
        <p className="text-sm font-medium">Loading book details…</p>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 py-32 text-center">
        <p className="text-sm font-bold text-slate-800">Book not found</p>
        <p className="text-sm text-slate-500">
          {error || "This book may have been removed from the library."}
        </p>
        <Link
          href="/all-books"
          className="mt-4 rounded-xl bg-[#0d4d33] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#126344]"
        >
          Browse All Books
        </Link>
      </div>
    );
  }

  return (
    <div>
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-400"
      >
        <Link href="/" className="transition-colors hover:text-[#0d4d33]">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link
          href="/all-books"
          className="transition-colors hover:text-[#0d4d33]"
        >
          All Books
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-[#0d4d33]">{book.title}</span>
      </nav>

      {/* Hero */}
      <section className="mt-5 overflow-hidden rounded-3xl bg-gradient-to-br from-[#f6f8ee] via-[#f3f6ea] to-[#e8f1e4] ring-1 ring-[#0d4d33]/10">
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[300px_1fr] lg:gap-12 lg:p-10">
          {/* Cover */}
          <div className="flex justify-center lg:justify-start">
            <Cover book={book} />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <h1 className="font-display text-3xl font-bold leading-tight text-[#0d4d33] sm:text-4xl">
              {book.title}
            </h1>

            <Link
              href="/all-books"
              className="mt-2 w-fit text-sm font-semibold text-[#16845a] transition-colors hover:text-[#0d4d33] hover:underline"
            >
              {book.author}
            </Link>

            <div className="mt-4">
              <Rating book={book} />
            </div>

            <span className="mt-4 w-fit rounded-full bg-[#dcefe4] px-4 py-1.5 text-xs font-bold text-[#0f7b4f]">
              {book.category}
            </span>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {book.description}
            </p>

            <div className="mt-6 h-px w-full max-w-xl bg-[#0d4d33]/15" />

            <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
              <span>
                <span className="font-semibold text-slate-800">Pages:</span>{" "}
                {book.pages ?? "—"}
              </span>
              <span className="text-slate-300">|</span>
              <span>
                <span className="font-semibold text-slate-800">Language:</span>{" "}
                {book.language ?? "English"}
              </span>
            </div>

            <p className="mt-3 flex items-center gap-5 text-sm text-slate-600">
              <span>
                <span className="font-semibold text-slate-800">Added on:</span>{" "}
                {book.name}
              </span>
              <span>
                <span className="font-semibold text-slate-800">
                  Added date:
                </span>{" "}
                {formatDate(book.createdAt)}
              </span>
            </p>

            {/* Actions */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              {
                book.email === user?.email ? <EditBook book={book} /> : <BorrowCard book={book}/>
              }
            </div>
          </div>
        </div>
      </section>

      {/* Quick info strip */}
      <div className="mt-8">
        <InfoCard book={book} />
      </div>

      {/* Tabs */}
      <div className="mt-10 flex gap-8 border-b border-slate-200">
        {(["description", "reviews"] as const).map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setTab(name)}
            aria-selected={tab === name}
            role="tab"
            className={`relative -mb-px pb-3 text-sm font-bold capitalize transition-colors ${
              tab === name
                ? "text-[#0d4d33]"
                : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {name}
            {tab === name && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#0d4d33]" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "description" ? (
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
              {book.description}
            </p>
          </div>
        ) : (
          <ReviewList reviews={reviews} />
        )}
      </div>
    </div>
  );
}
