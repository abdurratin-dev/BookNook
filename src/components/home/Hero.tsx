"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/books";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaLongArrowAltRight } from "react-icons/fa";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (dir: 1 | -1) => {
    setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);
  };

  useEffect(() => {
    timer.current = setInterval(
      () => setIndex((i) => (i + 1) % heroSlides.length),
      10000,
    );
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[#0d4d33]">
      {/* Slides */}
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          aria-hidden={i !== index}
          className={cn(
            "absolute inset-0 -z-10 bg-cover bg-no-repeat transition-opacity duration-700",
            i === index ? "opacity-100" : "opacity-0",
          )}
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,45,32,0.94) 0%, rgba(8,45,32,0.78) 42%, rgba(8,45,32,0.35) 100%), url("${slide.image}")`,
            backgroundPosition: `center, ${slide.position}`,
          }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 pt-14 pb-20 sm:px-6 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-28">
        <div className="max-w-xl lg:pl-10">
          <h1 className="font-display text-4xl font-bold leading-[1.15] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.45)] sm:text-5xl lg:text-[3.4rem]">
            {heroSlides[index].title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/75 [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] sm:text-base">
            {heroSlides[index].subtitle}
          </p>

          {/* Primary CTA */}
          <Link
            href="/all-books"
            className="group mt-7 inline-flex w-fit items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-[#0d4d33] shadow-lg shadow-black/25 transition-colors hover:bg-white/90"
          >
            Browse Books
            <FaLongArrowAltRight className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Carousel arrows */}
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => go(-1)}
        className="absolute left-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/35 lg:grid sm:left-5"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => go(1)}
        className="absolute right-3 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/35 lg:grid sm:right-5"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-2 sm:bottom-14 lg:bottom-16">
        {heroSlides.map((slide, i) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index
                ? "w-6 bg-white"
                : "w-1.5 bg-white/45 hover:bg-white/70",
            )}
          />
        ))}
      </div>
    </section>
  );
}
