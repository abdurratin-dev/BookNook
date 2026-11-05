"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Globe,
  Hash,
  Heart,
  Home,
  Layers,
  Link2,
  Quote,
  Star,
  Tag,
  UserRound,
} from "lucide-react";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import type { Book, BookReview } from "@/data/books";
import BorrowCard from "../borrows/BorrowCard";
import { EditBook } from "./editBooks";

type Tab = "about" | "reviews" | "similar";

function formatDate(value?: string) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/* ------------------------------------------------------------------ */
/* Cover                                                               */
/* ------------------------------------------------------------------ */

/** Cover art (in a white card, category badge on top) with a gradient fallback. */
function Cover({ book }: { book: Book }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-3 shadow-sm">
      <span className="absolute left-5 top-5 z-10 rounded-md bg-[#0d4d33] px-2.5 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm">
        {book.category}
      </span>

      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl bg-slate-100">
        {failed || !book.image ? (
          <div className="flex h-full w-full flex-col justify-end bg-gradient-to-br from-[#0d4d33] to-[#16845a] p-4">
            <span className="text-base font-bold leading-snug text-white">
              {book.title}
            </span>
            <span className="mt-1.5 text-xs text-white/70">{book.author}</span>
          </div>
        ) : (
          <Image
            src={book.image}
            alt={`${book.title} cover`}
            fill
            unoptimized
            sizes="(max-width: 1024px) 45vw, 240px"
            className="object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

function Rating({ book }: { book: Book }) {
  const rating = book.rating ?? 0;
  const reviewCount = book.reviewCount ?? 0;

  return (
    <div className="flex flex-wrap items-center gap-2.5">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-[18px] w-[18px] ${
              star <= Math.round(rating)
                ? "fill-amber-400 text-amber-400"
                : "fill-slate-200 text-slate-200"
            }`}
          />
        ))}
      </span>
      {rating > 0 ? (
        <span className="text-sm font-bold text-slate-800">
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

function Chip({
  icon: Icon,
  children,
}: {
  icon: typeof Tag;
  children: React.ReactNode;
}) {
  return (
    <span className="flex items-center gap-1.5 text-sm font-medium text-slate-600">
      <Icon className="h-4 w-4 text-[#0d4d33]" />
      {children}
    </span>
  );
}

function Tile({
  icon: Icon,
  label,
  value,
  tone = "default",
}: {
  icon: typeof Tag;
  label: string;
  value: React.ReactNode;
  tone?: "default" | "success";
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 ${
        tone === "success"
          ? "border-[#0d4d33]/15 bg-[#eaf5ee]"
          : "border-[#0d4d33]/10 bg-[#f4f7f1]"
      }`}
    >
      <span
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
          tone === "success"
            ? "bg-[#0d4d33] text-white"
            : "bg-white text-[#0d4d33] shadow-sm ring-1 ring-[#0d4d33]/10"
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>
        <p
          className={`truncate text-sm font-bold ${
            tone === "success" ? "text-[#0d4d33]" : "text-slate-800"
          }`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

function ReviewList({ reviews }: { reviews: BookReview[] }) {
  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center">
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
          className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-bold text-slate-800">{review.userName}</p>
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

/* ------------------------------------------------------------------ */
/* Promo card (bottom right)                                           */
/* ------------------------------------------------------------------ */

function PromoCard() {
  const [failed, setFailed] = useState(false);

  return (
    <aside className="relative overflow-hidden rounded-3xl bg-[#0d4d33] p-6 text-white sm:p-7">
      {!failed && (
        <Image
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80"
          alt=""
          fill
          unoptimized
          sizes="(max-width: 1024px) 100vw, 300px"
          className="object-cover opacity-70"
          onError={() => setFailed(true)}
        />
      )}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0d4d33] via-[#0d4d33]/90 to-[#0d4d33]/30"
      />
      <div className="relative z-10">
        <h3 className="font-display text-2xl font-bold leading-tight">
          Read More,
          <br />
          Discover More.
        </h3>
        <p className="mt-2 text-xs text-white/70">
          Welcome to BookNook – Your Online Library
        </p>
        <Link
          href="/all-books"
          className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2 text-xs font-bold text-[#0d4d33] transition-colors hover:bg-white/90"
        >
          Explore Books
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export default function BookDetails({ bookId }: { bookId: string }) {
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<BookReview[]>([]);
  const [similar, setSimilar] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<Tab>("about");
  const [saved, setSaved] = useState(false);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await fetch(
          `https://book-nook-server.vercel.app/books/${bookId}`,
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

  // Similar books — loaded lazily, only when the tab is opened.
  useEffect(() => {
    if (tab !== "similar" || !book) return;
    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(`https://book-nook-server.vercel.app/books`);
        const data = await res.json();
        const list: Book[] = Array.isArray(data) ? data : (data.books ?? []);
        if (!cancelled) {
          setSimilar(
            list
              .filter((b) => b._id !== book._id && b.category === book.category)
              .slice(0, 6),
          );
        }
      } catch {
        if (!cancelled) setSimilar([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [tab, book]);

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

  const isOwner = book.email === user?.email;
  const copies = Number(book.copies);
  const hasCopies = Number.isFinite(copies) && copies > 0;
  const addedDate = formatDate(book.createdDate ?? book.createdAt);

  const TABS: { id: Tab; label: string; Icon: typeof BookOpen }[] = [
    { id: "about", label: "About This Book", Icon: BookOpen },
    { id: "reviews", label: `Reviews (${reviews.length})`, Icon: Star },
    { id: "similar", label: "Similar Books", Icon: Layers },
  ];

  const pageUrl = () =>
    typeof window !== "undefined" ? window.location.href : "";

  const shareOn = (network: "facebook" | "x" | "linkedin") => {
    const url = encodeURIComponent(pageUrl());
    const text = encodeURIComponent(`${book.title} · BookNook`);
    const targets: Record<typeof network, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      x: `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };
    window.open(targets[network], "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl());
      toast.success("Link copied to clipboard");
    } catch {
      toast.error("Could not copy the link");
    }
  };

  const toggleSaved = () => {
    const next = !saved;
    setSaved(next);
    toast.success(
      next
        ? `${book.title} added to your wishlist`
        : `${book.title} removed from your wishlist`,
    );
  };

  return (
    <div>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500"
      >
        <Link
          href="/"
          aria-label="Home"
          className="grid h-6 w-6 place-items-center rounded-md transition-colors hover:bg-slate-100 hover:text-[#0d4d33]"
        >
          <Home className="h-3.5 w-3.5" />
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
        <Link
          href="/all-books"
          className="transition-colors hover:text-[#0d4d33]"
        >
          All Books
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
        <span className="min-w-0 truncate font-semibold text-[#0d4d33]">
          {book.title}
        </span>
      </nav>

      {/* Hero */}
      <section className="mt-6 grid gap-6 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)_240px]">
        {/* Cover + added by */}
        <div className="mx-auto flex w-full max-w-[280px] flex-col gap-4 lg:max-w-none">
          <Cover book={book} />
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-sm">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0d4d33] text-[11px] font-bold text-white">
              {(book.name || "BN")
                .split(" ")
                .map((w) => w[0])
                .filter(Boolean)
                .slice(0, 2)
                .join("")
                .toUpperCase()}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] text-slate-400">Added by</p>
              <p className="truncate text-sm font-bold text-slate-800">
                {book.name || "BookNook member"}
              </p>
            </div>
          </div>
        </div>

        {/* Main info */}
        <div className="min-w-0">
          <h1 className="font-display text-3xl font-bold leading-tight text-[#0d4d33] sm:text-4xl">
            {book.title}
          </h1>
          <p className="mt-1.5 font-display text-base italic text-slate-500">
            by {book.author.trim()}
          </p>

          {/* Meta chips */}
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2.5">
            <Chip icon={Tag}>{book.category}</Chip>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <Chip icon={CalendarDays}>Added {addedDate}</Chip>
            <span className="hidden h-4 w-px bg-slate-200 sm:block" />
            <Chip icon={Globe}>{book.language ?? "English"}</Chip>
          </div>

          {/* Rating */}
          <div className="mt-4">
            <Rating book={book} />
          </div>

          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            {book.description}
          </p>

          {/* Detail tiles */}
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Tile
              icon={Hash}
              label="Pages"
              value={book.page ? String(book.page) : "—"}
            />
            <Tile icon={UserRound} label="Added By" value={book.name || "—"} />
            <Tile
              icon={Star}
              label="Rating"
              value={
                book.rating ? `${book.rating.toFixed(1)} / 5` : "Not rated yet"
              }
            />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <Tile
              icon={BookOpen}
              label="Available Copies"
              value={Number.isFinite(copies) ? copies : "—"}
            />
            <Tile
              icon={CheckCircle2}
              label="Status"
              value={hasCopies ? "Available" : "Out of copies"}
              tone={hasCopies ? "success" : "default"}
            />
          </div>

          {/* Actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {isOwner ? (
              <EditBook book={book} />
            ) : (
              <BorrowCard book={book} />
            )}
            <button
              type="button"
              onClick={toggleSaved}
              aria-pressed={saved}
              className={`inline-flex h-10 items-center gap-2 rounded-xl border px-5 text-sm font-bold transition-colors ${
                saved
                  ? "border-[#0d4d33]/40 bg-[#0d4d33]/10 text-[#0d4d33]"
                  : "border-slate-200 bg-white text-slate-700 hover:border-[#0d4d33] hover:text-[#0d4d33]"
              }`}
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              {saved ? "Wishlisted" : "Add to Wishlist"}
            </button>
          </div>
        </div>

        {/* Quick info */}
        <aside className="sticky top-20 rounded-3xl h-fit border border-[#0d4d33]/10 bg-[#f7f9f4] p-5 sm:p-6 lg:col-span-2 xl:col-span-1">
          <h2 className="font-display text-xl font-bold text-[#0d4d33]">
            Quick Info
          </h2>

          <dl className="mt-4 grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
            {[
              { icon: CalendarDays, label: "Added", value: addedDate },
              { icon: Tag, label: "Category", value: book.category },
              { icon: UserRound, label: "Author", value: book.author.trim() },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-white text-[#0d4d33] shadow-sm ring-1 ring-[#0d4d33]/10">
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                  </dt>
                  <dd className="mt-0.5 truncate text-sm font-bold text-slate-800">
                    {value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </aside>
      </section>

      {/* Tabs  */}
      <section className="mt-8">
        <div className="min-w-0">
          <div
            role="tablist"
            aria-label="Book information"
            className="flex flex-wrap gap-6 border-b border-slate-200"
          >
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`-mb-px inline-flex items-center gap-2 border-b-2 pb-3 text-sm font-bold transition-colors ${
                  tab === id
                    ? "border-[#0d4d33] text-[#0d4d33]"
                    : "border-transparent text-slate-500 hover:text-slate-700"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="mt-6">
            {tab === "about" && (
              <div className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-7">
                <p className="text-sm leading-relaxed text-slate-600 sm:text-[15px]">
                  {book.description}
                </p>
              </div>
            )}

            {tab === "reviews" && <ReviewList reviews={reviews} />}

            {tab === "similar" &&
              (similar.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50/60 px-6 py-14 text-center">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0d4d33]/10">
                    <Layers className="h-5 w-5 text-[#0d4d33]" />
                  </span>
                  <p className="mt-4 text-sm font-bold text-slate-800">
                    Nothing similar yet
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    We couldn&apos;t find other books in {book.category}.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
                  {similar.map((item) => (
                    <Link
                      key={item._id}
                      href={`/all-books/${item._id}`}
                      className="group rounded-2xl border border-slate-200/80 bg-white p-2 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="relative aspect-[2/3] overflow-hidden rounded-xl bg-slate-100">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={`${item.title} cover`}
                            fill
                            unoptimized
                            sizes="(max-width: 640px) 45vw, 180px"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-end bg-gradient-to-br from-[#0d4d33] to-[#16845a] p-3">
                            <span className="line-clamp-2 text-xs font-bold text-white">
                              {item.title}
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="mt-2 line-clamp-1 px-1 text-xs font-bold text-slate-800">
                        {item.title}
                      </p>
                      <p className="line-clamp-1 px-1 pb-1 text-[11px] text-slate-500">
                        {item.author}
                      </p>
                    </Link>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}
