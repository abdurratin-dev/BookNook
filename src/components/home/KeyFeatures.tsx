import {
  Bell,
  BookMarked,
  BookOpen,
  LayoutGrid,
  MonitorSmartphone,
  Search,
  ShieldCheck,
  Star,
  Tags,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Feature = {
  label: string;
  description: string;
  icon: LucideIcon;
};

const FEATURES: Feature[] = [
  {
    label: "Vast Catalogue",
    description: "Thousands of titles across every genre",
    icon: BookMarked,
  },
  {
    label: "Smart Categories",
    description: "Browse by genre, mood or reading level",
    icon: LayoutGrid,
  },
  {
    label: "Fully Responsive",
    description: "Read and borrow on any device",
    icon: MonitorSmartphone,
  },
  {
    label: "Instant Search",
    description: "Find any book in a split second",
    icon: Search,
  },
  {
    label: "Curated Lists",
    description: "Hand-picked picks for every reader",
    icon: Tags,
  },
  {
    label: "Easy Borrowing",
    description: "Borrow in a couple of taps",
    icon: BookOpen,
  },
  {
    label: "Reading Progress",
    description: "Track what you have read so far",
    icon: TrendingUp,
  },
  {
    label: "Ratings & Reviews",
    description: "See what other readers think",
    icon: Star,
  },
  {
    label: "Borrow Reminders",
    description: "Never miss a return date",
    icon: Bell,
  },
  {
    label: "Secure Accounts",
    description: "Your data stays private and safe",
    icon: ShieldCheck,
  },
];

export default function KeyFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl font-bold text-[#0d4d33] sm:text-3xl">
          Key features
        </h2>
        <p className="mt-3 text-sm text-slate-500 sm:text-base">
          BookNook is equipped with everything you need for a smooth reading and
          borrowing experience!
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-9 sm:mt-12 sm:grid-cols-3 sm:gap-y-11 lg:grid-cols-5">
        {FEATURES.map(({ label, description, icon: Icon }) => (
          <li
            key={label}
            className="group flex flex-col items-center text-center"
          >
            <span
              className="grid h-28 w-28 place-items-center rounded-full border border-dashed border-slate-300 transition-colors group-hover:border-[#0d4d33]/40 sm:h-32 sm:w-32"
              aria-hidden="true"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full bg-[#0d4d33] text-white shadow-md shadow-[#0d4d33]/20 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
                <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.9} />
              </span>
            </span>
            <span className="mt-4 text-xs font-semibold text-[#0d4d33] sm:text-sm">
              {label}
            </span>
            <span className="mt-1 max-w-[11rem] text-[11px] leading-snug text-slate-400 sm:text-xs">
              {description}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
