import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  Feather,
  Landmark,
  Puzzle,
  Quote,
  Shapes,
  Star,
  Trophy,
} from "lucide-react";

const STEPS = ["Choose a book", "Borrow for a few days", "Return it easily"];

const CATEGORIES = [
  { label: "Fiction", slug: "fiction", icon: BookMarked },
  { label: "Poetry", slug: "poetry", icon: Feather },
  { label: "History", slug: "history", icon: Landmark },
  { label: "Kids", slug: "kids", icon: Puzzle },
  { label: "Others", slug: "others", icon: Shapes },
];

const CARD =
  "flex h-full flex-col rounded-2xl border border-black/[0.05] bg-[#f7f8f7] p-5 sm:p-6";
const ICON = "h-7 w-7 text-[#0d4d33]";
const HEADING = "mt-4 text-lg font-bold text-slate-900";
const LINK =
  "mt-auto flex items-center gap-1.5 pt-6 text-sm font-semibold text-[#0d4d33] transition-colors hover:gap-2.5 hover:text-[#0a3d28]";

function Stars({ rating = 4.5 }: { rating?: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.min(Math.max(rating - i, 0), 1);
        return (
          <span key={i} className="relative block h-3.5 w-3.5">
            <Star className="absolute inset-0 h-3.5 w-3.5 fill-slate-300 text-slate-300" />
            <span
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            </span>
          </span>
        );
      })}
    </span>
  );
}

export default function Features() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 sm:pb-20">
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-3">
        {/* How Borrowing Works */}
        <article className={CARD}>
          <BookMarked className={ICON} strokeWidth={1.8} />
          <h3 className={HEADING}>How Borrowing Works</h3>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-600 marker:font-semibold marker:text-[#0d4d33]">
            {STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Link href="/all-books" className={LINK}>
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        {/* Top Categories */}
        <article className={CARD}>
          <Trophy className={ICON} strokeWidth={1.8} />
          <h3 className={HEADING}>Top Categories</h3>
          <div className="mt-5 flex items-start gap-1.5">
            {CATEGORIES.map(({ label, slug, icon: Icon }) => (
              <Link
                key={slug}
                href={`/all-books?category=${slug}`}
                className="group flex min-w-0 flex-1 flex-col items-center gap-1.5"
              >
                <Icon
                  className="h-6 w-6 text-[#0d4d33] transition-transform group-hover:-translate-y-0.5"
                  strokeWidth={1.7}
                />
                <span className="truncate text-[11px] text-slate-600 group-hover:text-[#0d4d33]">
                  {label}
                </span>
              </Link>
            ))}
            <span className="shrink-0 self-end pb-0.5 text-xs italic text-slate-400">
              etc
            </span>
          </div>
          <Link href="/all-books" className={LINK}>
            Browse Categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </article>

        {/* Reader Reviews */}
        <article className={CARD}>
          <Quote className={ICON} strokeWidth={1.8} />
          <h3 className={HEADING}>Reader Reviews</h3>
          <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
            &ldquo;BookNook has made reading so much easier. The collection is amazing and
            the borrowing process is super simple!&rdquo;
          </blockquote>
          <div className="mt-auto flex items-center gap-3 pt-5">
            <Image
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Sarah Ahmed"
              width={40}
              height={40}
              unoptimized
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div>
              <div className="text-sm font-semibold text-slate-800">Sarah Ahmed</div>
              <div className="mt-1">
                <Stars rating={4.5} />
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
