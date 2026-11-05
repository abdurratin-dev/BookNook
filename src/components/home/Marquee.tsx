"use client";

import { Asterisk } from "lucide-react";
import Marquee from "react-fast-marquee";

/** Big mantra words — alternating solid / outlined treatment. */
const MANTRA = ["Read", "Borrow", "Return", "Repeat"];

/** Genres that keep scrolling in the secondary row. */
const GENRES = [
  "Fiction",
  "Poetry",
  "History",
  "Science",
  "Kids",
  "Biography",
  "Fantasy",
  "Mystery",
];

const GREEN = "#0d4d33";

export default function MarqueeSection() {
  return (
    <section
      aria-label="Reading mantra and popular genres"
      className="relative w-full overflow-hidden border-y border-black/[0.06] bg-[#0d4d33] py-7 sm:py-9"
    >
      {/* Row 1 — large mantra, scrolls left */}
      <Marquee
        autoFill
        pauseOnHover
        speed={55}
        gradient
        gradientColor={GREEN}
        gradientWidth={70}
      >
        <div className="flex items-center pr-5 sm:pr-8">
          {MANTRA.map((word, i) => (
            <span key={word} className="flex items-center">
              <span
                className={`font-display text-4xl font-bold uppercase leading-none tracking-tight sm:text-6xl ${
                  i % 2 === 0
                    ? "text-white"
                    : "text-transparent [-webkit-text-stroke:1.5px_rgba(255,255,255,0.65)]"
                }`}
              >
                {word}
              </span>
              <Asterisk
                className="mx-5 h-6 w-6 shrink-0 text-white/45 sm:mx-8 sm:h-8 sm:w-8"
                strokeWidth={1.75}
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </Marquee>

      {/* Row 2 — genres, scrolls right */}
      <div className="mt-4 sm:mt-5">
        <Marquee
          autoFill
          pauseOnHover
          direction="right"
          speed={40}
          gradient
          gradientColor={GREEN}
          gradientWidth={50}
        >
          <div className="flex items-center pr-4 sm:pr-6">
            {GENRES.map((genre) => (
              <span key={genre} className="flex items-center">
                <span className="text-xs font-medium uppercase tracking-[0.28em] text-white/70 sm:text-sm">
                  {genre}
                </span>
                <span
                  className="mx-4 h-1 w-1 rounded-full bg-white/40 sm:mx-6"
                  aria-hidden="true"
                />
              </span>
            ))}
          </div>
        </Marquee>
      </div>
    </section>
  );
}
