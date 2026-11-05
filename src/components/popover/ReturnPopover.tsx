"use client";

import { Popover } from "@heroui/react";
export default function ReturnPopover({onClick,disabled}:{
    onClick: () => void;
    disabled: boolean;
}) {
  return (
    <Popover>
      <Popover.Trigger aria-label="User profile">
       <button
            type="button"
            disabled={disabled}
            className={`inline-flex h-9 items-center justify-center rounded-xl border px-4 text-xs font-bold transition-colors ${
              disabled
                ? "cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400"
                : "border-[#0d4d33]/40 bg-white text-[#0d4d33] hover:bg-[#0d4d33] hover:text-white"
            }`}
          >
            Return
          </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="grid gap-2 p-5">
          <p>
            Are you sure{" "}
            <span className="text-[#0d4d33] font-semibold">Return</span> your book
          </p>
          <button
            type="button"
            onClick={onClick}
            className={`inline-flex h-9 items-center justify-center rounded-xl border px-4 text-xs font-bold transition-colors "border-[#0d4d33]/40 bg-white text-[#0d4d33] hover:bg-[#0d4d33] hover:text-white`}
          >
            Return
          </button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
