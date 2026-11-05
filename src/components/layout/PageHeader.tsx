import type { LucideIcon } from "lucide-react";

/**
 * Shared page heading: eyebrow chip + display title + supporting copy,
 * with an optional right-hand action slot (search, buttons, …).
 */
export default function PageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  action,
}: {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#0d4d33]/15 bg-[#0d4d33]/[0.06] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-[#0d4d33]">
          <Icon className="h-3.5 w-3.5" />
          {eyebrow}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0d4d33] sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
          {description}
        </p>
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  );
}
