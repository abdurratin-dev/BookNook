"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Book } from "@/data/books";
import toast from "react-hot-toast";

type Field = "title" | "author" | "category" | "image" | "description";
type Errors = Partial<Record<Field, string>>;

const CATEGORIES = [
  "Fiction",
  "Science Fiction",
  "History",
  "Kids",
  "Other / Unknown",
];

const LABEL = "block text-sm font-medium text-slate-700";
const INPUT =
  "w-full rounded-lg border border-slate-200 bg-white py-2.5 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15";
const PAD = "px-3.5";
const ERROR_TEXT = "mt-1.5 text-xs font-medium text-red-600";

export function EditBook({ book }: { book: Book }) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [category, setCategory] = useState(book.category);
  const [image, setImage] = useState(book.image);
  const [description, setDescription] = useState(book.description);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const setError = (field: Field, message?: string) =>
    setErrors((prev) => ({ ...prev, [field]: message }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Errors = {};
    if (!title.trim()) next.title = "Book title is required.";
    if (!author.trim()) next.author = "Author name is required.";
    if (!category) next.category = "Please select a category.";
    if (!image.trim()) next.image = "Image url is required.";
    if (!description.trim()) next.description = "Description is required.";
    setErrors(next);
    if (
      !title.trim() ||
      !author.trim() ||
      !image.trim() ||
      !category ||
      !description.trim()
    ) {
      return;
    }

    const formData = {
      title,
      author,
      category,
      image,
      description,
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/books/${book._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );
      const result = await res.json();
    } catch (error) {
      toast.error("Edit feild");
      return;
    }
    // UI-only for now — swap this block for a POST to /api/books once it exists.
    setSuccess(true);
    toast.success(`${book.title} books edited`);
    setTimeout(()=>{
      window.location.reload()
    },2000)
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <button className="flex items-center gap-1.5 rounded-lg border border-emerald-200 px-3 py-2 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-50">
              <svg
                className="h-3.5 w-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
              </svg>
              Edit Book
            </button>
          }
        />
        <DialogContent className="sm:max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="grid items-start gap-5 sm:grid-cols-2">
              {/* Book Title */}
              <div>
                <label htmlFor="book-title" className={LABEL}>
                  Book Title
                </label>
                <input
                  id="book-title"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  placeholder="Enter book title"
                  className={cn(
                    "mt-2",
                    INPUT,
                    PAD,
                    errors.title && "border-red-400",
                  )}
                />
                {errors.title && <p className={ERROR_TEXT}>{errors.title}</p>}
              </div>

              {/* Author Name */}
              <div>
                <label htmlFor="book-author" className={LABEL}>
                  Author Name
                </label>
                <input
                  id="book-author"
                  value={author}
                  onChange={(e) => {
                    setAuthor(e.target.value);
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
                  Category
                </label>
                <div className="relative mt-2">
                  <select
                    id="book-category"
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
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
                {errors.category && (
                  <p className={ERROR_TEXT}>{errors.category}</p>
                )}
              </div>

              {/* Book Image */}
              <div>
                <span className={LABEL}>Image Url</span>
                <input
                  id="book-image"
                  type="text"
                  value={image}
                  placeholder="Enter book image url"
                  onChange={(e) => {
                    setImage(e.target.value);
                  }}
                  className={cn(
                    "mt-2",
                    INPUT,
                    PAD,
                    errors.image && "border-red-400",
                  )}
                />
                {errors.image && <p className={ERROR_TEXT}>{errors.image}</p>}
              </div>

              <div className="col-span-2">
                <label htmlFor="description" className={LABEL}>
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={5}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className={cn(
                    "mt-2",
                    INPUT,
                    PAD,
                    errors.description && "border-red-400",
                  )}
                ></textarea>
                {errors.description && (
                  <p className={ERROR_TEXT}>{errors.description}</p>
                )}
              </div>
            </div>
            {success && (
              <div
                role="status"
                className="mb-5 flex items-center gap-2 rounded-lg border border-[#0d4d33]/20 bg-[#0d4d33]/10 px-4 py-3 text-sm font-medium text-[#0d4d33]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Book edited.
              </div>
            )}
            <div className="flex gap-5">
              <DialogClose
                render={
                  <Button className="h-10 mt-6 w-[45%] rounded-lg border bg-accent border-[#0d4d33] py-3 text-sm font-semibold text-[#0d4d33] transition-colors hover:bg-[#d1e1da]">
                    Close
                  </Button>
                }
              />
              <Button
                type="submit"
                className="h-10 mt-6 w-[45%] rounded-lg bg-[#0d4d33] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a3d28]"
              >
                Edit
              </Button>
            </div>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
