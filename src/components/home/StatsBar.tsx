import { BookOpen, Clock, Layers, Users } from "lucide-react";
import { stats } from "@/data/books";

const icons = {
  books: BookOpen,
  readers: Users,
  categories: Layers,
  available: Clock,
} as const;

export default function StatsBar() {
  return (
    <div className="relative z-1 mx-auto -mt-[30px] max-w-7xl px-4 sm:-mt-9 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = icons[stat.id as keyof typeof icons];
          return (
            <div
              key={stat.id}
              className="flex items-center gap-3 rounded-2xl border border-black/[0.06] bg-white px-3 py-3 shadow-sm shadow-black/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md sm:px-4 sm:py-4"
            >
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#0d4d33]/10 text-[#0d4d33] sm:h-10 sm:w-10">
                <Icon className="h-[18px] w-[18px]" strokeWidth={2} />
              </span>
              <span className="min-w-0">
                <span className="block text-base font-bold leading-tight text-slate-800 sm:text-lg">
                  {stat.value}
                </span>
                <span className="block truncate text-[11px] text-slate-500 sm:text-xs">
                  {stat.label}
                </span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
