"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ChevronDown, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  "Fiction",
  "Science Fiction",
  "History",
  "Kids",
  "Other / Unknown",
];

/** Demo values — replace with the authenticated session later if you want. */

type Field = "title" | "author" | "category" | "image";
type Errors = Partial<Record<Field, string>>;

const LABEL = "block text-sm font-medium text-slate-700";
const REQUIRED = <span className="text-red-500">*</span>;
/** Base field styles — padding is applied separately so it never conflicts. */
const INPUT =
  "w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15";
const PAD = "px-3.5";
const ERROR_TEXT = "mt-1.5 text-xs font-medium text-red-600";

export default function AddBookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [img,setImg] = useState("")
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [success, setSuccess] = useState(false);

  // Revoke the object URL whenever the preview changes or the form unmounts.
  useEffect(() => {
    if (!preview) return;
    return () => URL.revokeObjectURL(preview);
  }, [preview]);

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 4000);
    return () => clearTimeout(timer);
  }, [success]);

  const setError = (field: Field, message?: string) =>
    setErrors((prev) => ({ ...prev, [field]: message }));


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const next: Errors = {};
    if (!title.trim()) next.title = "Book title is required.";
    if (!author.trim()) next.author = "Author name is required.";
    if (!category) next.category = "Please select a category.";
    if (!img.trim()) next.image = "Please upload a cover image.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // UI-only for now — swap this block for a POST to /api/books once it exists.
    setSuccess(true);
    setTitle("");
    setAuthor("");
    setCategory("");
    setPreview(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm sm:p-6"
    >
      {success && (
        <div
          role="status"
          className="mb-5 flex items-center gap-2 rounded-lg border border-[#0d4d33]/20 bg-[#0d4d33]/10 px-4 py-3 text-sm font-medium text-[#0d4d33]"
        >
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          Book added to the library.
        </div>
      )}

      <div className="grid items-start gap-5 sm:grid-cols-2">
        {/* Book Title */}
        <div>
          <label htmlFor="book-title" className={LABEL}>
            Book Title {REQUIRED}
          </label>
          <input
            id="book-title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setError("title");
            }}
            placeholder="Enter book title"
            className={cn("mt-2", INPUT, PAD, errors.title && "border-red-400")}
          />
          {errors.title && <p className={ERROR_TEXT}>{errors.title}</p>}
        </div>

        {/* Author Name */}
        <div>
          <label htmlFor="book-author" className={LABEL}>
            Author Name {REQUIRED}
          </label>
          <input
            id="book-author"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              if (errors.author) setError("author");
            }}
            placeholder="Enter author name"
            className={cn(
              "mt-2",
              INPUT,
              PAD,
              errors.author && "border-red-400",
            )}
          />
          {errors.author && <p className={ERROR_TEXT}>{errors.author}</p>}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="book-category" className={LABEL}>
            Category {REQUIRED}
          </label>
          <div className="relative mt-2">
            <select
              id="book-category"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (errors.category) setError("category");
              }}
              className={cn(
                INPUT,
                "appearance-none pl-3.5 pr-10",
                errors.category && "border-red-400",
              )}
            >
              <option value="">Select category</option>
              {CATEGORIES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          </div>
          {errors.category && <p className={ERROR_TEXT}>{errors.category}</p>}
        </div>

        {/* Book Image */}
        <div>
          <span className={LABEL}>Image Url{REQUIRED}</span>
          <input
            id="book-image"
            type="text"
            className={cn("mt-2", INPUT, PAD)}
          />
        </div>

        {/* User Name */}
        <div>
          <label htmlFor="user-name" className={LABEL}>
            User Name {REQUIRED}
          </label>
          <input
            id="user-name"
            // value={DEMO_USER.name}
            readOnly
            className={cn(
              "mt-2 cursor-not-allowed bg-slate-50 text-slate-500",
              INPUT,
              PAD,
            )}
          />
        </div>

        {/* User Email */}
        <div>
          <label htmlFor="user-email" className={LABEL}>
            User Email {REQUIRED}
          </label>
          <div className="relative mt-2">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="user-email"
              type="email"
              // value={DEMO_USER.email}
              readOnly
              className={cn(
                "cursor-not-allowed bg-slate-50 pl-9 pr-3.5 text-slate-500",
                INPUT,
              )}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description" className={LABEL}>
            Description {REQUIRED}
          </label>
          <textarea
            name="description"
            id="description"
            className={cn("mt-2",INPUT, PAD)}
          ></textarea>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-lg bg-[#0d4d33] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a3d28]"
      >
        Add Book
      </button>
    </form>
  );
}
