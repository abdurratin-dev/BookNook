"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

type Field = "name" | "image";
type Errors = Partial<Record<Field, string>>;

const LABEL = "block text-sm font-semibold text-slate-700";
const INPUT =
  "w-full rounded-xl border border-slate-200 bg-white py-3 text-sm text-slate-800 placeholder:text-slate-400 outline-none transition-colors focus:border-[#0d4d33] focus:ring-2 focus:ring-[#0d4d33]/15";
const PAD = "px-4";
const ERROR_TEXT = "mt-1.5 text-xs font-medium text-red-600";

export default function ProfileEditCard() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [name, setName] = useState(user?.name);
  const [image, setImage] = useState(user?.image);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  const setError = (field: Field, message?: string) =>
    setErrors((prev) => ({ ...prev, [field]: message }));
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const next: Errors = {};
    if (!name?.trim()) next.name = "Book title is required.";
    if (!image?.trim()) next.image = "Image url is required.";
    setErrors(next);
    if (!name?.trim() || !image?.trim()) {
      return;
    }

    try {
      const { data, error } = await authClient.updateUser({
        name,
        image,
      });
    } catch (error) {
      toast.error("Edit feild");
      return;
    }
    // UI-only for now — swap this block for a POST to /api/books once it exists.
    setSuccess(true);
    toast.success(`Edited succesfully`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <button className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0d4d33] px-5 text-sm font-semibold text-white shadow-md shadow-[#0d4d33]/25 transition-all hover:bg-[#0a3d28] active:scale-[0.99]">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="m16 4 4 4M4 20l4-.8L19 8a2.8 2.8 0 0 0-4-4L4 15z" />
              </svg>
              Edit Profile
            </button>
          }
        />
        <DialogContent className="sm:max-w-lg">
          <DialogTitle className="pr-8 font-display text-lg font-bold text-[#0d4d33]">
            Edit Profile
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <div className="grid items-start gap-5 sm:grid-cols-2">
              {/* Name */}
              <div>
                <label htmlFor="name" className={LABEL}>
                  Name
                </label>
                <input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setError("name");
                  }}
                  placeholder="Your display name"
                  className={cn(
                    "mt-2",
                    INPUT,
                    PAD,
                    errors.name && "border-red-400",
                  )}
                />
                {errors.name && <p className={ERROR_TEXT}>{errors.name}</p>}
              </div>

              <div>
                <span className={LABEL}>Image Url</span>
                <input
                  id="image"
                  type="text"
                  value={image || ""}
                  placeholder="https://… profile image"
                  onChange={(e) => {
                    setImage(e.target.value);
                    if (errors.image) setError("image");
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
            </div>
            {success && (
              <div
                role="status"
                className="mt-5 flex items-center gap-2 rounded-xl border border-[#0d4d33]/20 bg-[#0d4d33]/10 px-4 py-3 text-sm font-semibold text-[#0d4d33]"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                Profile updated.
              </div>
            )}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
              <DialogClose
                render={
                  <Button className="h-11 w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 sm:w-auto sm:flex-1">
                    Cancel
                  </Button>
                }
              />
              <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-[#0d4d33] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0a3d28] sm:w-auto sm:flex-1"
              >
                Save Changes
              </Button>
            </div>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
}
