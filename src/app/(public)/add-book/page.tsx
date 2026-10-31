import type { Metadata } from "next";
import AddBookForm from "@/components/forms/AddBookForm";

export const metadata: Metadata = {
  title: "Add a New Book · BookNook",
  description: "Fill in the details to add a new book to the library.",
};

/** Decorative stack of books, plant and coffee cup beside the form. */
function BookStackArt({ className = "" }: { className?: string }) {
  const books = [
    { x: 34, y: 196, w: 184, cover: "#8c4a2f" },
    { x: 44, y: 170, w: 164, cover: "#2f6b52" },
    { x: 36, y: 144, w: 172, cover: "#c98b4b" },
    { x: 50, y: 118, w: 152, cover: "#1f4e46" },
  ];

  return (
    <svg viewBox="0 0 260 250" className={className} aria-hidden="true">
      {/* ground shadow */}
      <ellipse cx="132" cy="230" rx="98" ry="10" fill="#0d4d33" opacity="0.12" />

      {/* plant behind the stack */}
      <g>
        <path
          d="M208 152C206 122 210 98 216 76"
          fill="none"
          stroke="#2f6b52"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M207 134C219 126 229 118 235 106"
          fill="none"
          stroke="#2f6b52"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M206 122C195 114 189 104 187 92"
          fill="none"
          stroke="#2f6b52"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <ellipse cx="218" cy="72" rx="13" ry="7" fill="#2f6b52" transform="rotate(-58 218 72)" />
        <ellipse cx="238" cy="103" rx="12" ry="7" fill="#3f8a67" transform="rotate(-30 238 103)" />
        <ellipse cx="185" cy="89" rx="12" ry="7" fill="#3f8a67" transform="rotate(45 185 89)" />
        <ellipse cx="224" cy="93" rx="11" ry="6.5" fill="#4f9a76" transform="rotate(-15 224 93)" />
        <ellipse cx="193" cy="113" rx="11" ry="6.5" fill="#4f9a76" transform="rotate(35 193 113)" />
        {/* pot */}
        <path d="M190 152h42l-6 44h-30z" fill="#c96f4a" />
        <rect x="186" y="145" width="50" height="12" rx="5" fill="#d98356" />
      </g>

      {/* small leaves on the left */}
      <ellipse cx="30" cy="132" rx="13" ry="7" fill="#4f9a76" transform="rotate(-35 30 132)" />
      <ellipse cx="24" cy="156" rx="11" ry="6" fill="#3f8a67" transform="rotate(25 24 156)" />

      {/* book stack */}
      {books.map((book) => (
        <g key={book.y}>
          <rect x={book.x} y={book.y} width={book.w} height={24} rx={4} fill={book.cover} />
          <rect
            x={book.x + 11}
            y={book.y + 5}
            width={book.w - 17}
            height={14}
            rx={3}
            fill="#f5efe4"
          />
          <rect x={book.x} y={book.y} width={9} height={24} rx={4} fill={book.cover} opacity="0.75" />
        </g>
      ))}

      {/* coffee cup on top */}
      <g>
        <path
          d="M92 78c-4-6 4-9 0-15M104 78c-4-6 4-9 0-15"
          fill="none"
          stroke="#c9d4cd"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <ellipse cx="98" cy="116" rx="34" ry="7" fill="#e6ddcd" />
        <path d="M79 94h38l-5 18H84z" fill="#f4f7f4" stroke="#d5ddd7" strokeWidth="2" />
        <path
          d="M117 98a9 9 0 0 1 0 12"
          fill="none"
          stroke="#d5ddd7"
          strokeWidth="3"
        />
        <ellipse cx="98" cy="94" rx="19" ry="5" fill="#7a4b26" />
      </g>
    </svg>
  );
}

export default function AddBookPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="font-display text-3xl font-bold text-[#0d4d33] sm:text-4xl">
        Add a New Book
      </h1>
      <p className="mt-2 text-sm text-slate-500">
        Fill in the details to add a new book to the library.
      </p>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_290px]">
        <AddBookForm />

        <aside className="rounded-2xl border border-black/[0.05] bg-[#f7f8f7] p-6">
          <p className="font-handwriting text-2xl leading-snug text-[#0d4d33]">
            &ldquo;A book is a dream you hold in your hands.&rdquo;
          </p>
          <BookStackArt className="mt-6 w-full" />
        </aside>
      </div>
    </div>
  );
}
