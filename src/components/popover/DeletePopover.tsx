"use client";

import { Book } from "@/data/books";
import { authClient } from "@/lib/auth-client";
import { Popover } from "@heroui/react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
export default function DeletePopover({ book }: { book: Book }) {
  const hendleDeleteBook = async (_id: string, title: string) => {
    const { data: jwttoken, error } = await authClient.token();
    try {
      const res = await fetch(
        `https://book-nook-server.vercel.app/borrows/${_id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `elitebook ${jwttoken?.token}`,
          },
        },
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("Delete faild");
    }

    try {
      const res = await fetch(
        `https://book-nook-server.vercel.app/books/${_id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `elitebook ${jwttoken?.token}`,
          },
        },
      );
      const result = await res.json();
      console.log(result);
    } catch (error) {
      toast.error("Delete faild");
    }
    toast.success(`${title} is deleted`);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  return (
    <Popover>
      <Popover.Trigger aria-label="User profile">
        <button className="inline-flex items-center gap-1.5 rounded-xl border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50">
          <Trash2 className="h-3.5 w-3.5" />
          Delete
        </button>
      </Popover.Trigger>
      <Popover.Content>
        <div className="grid gap-2 p-5">
          <p>Are you sure <span className="text-red-600 font-semibold">Delete</span> your book</p>
          <button
            onClick={() => hendleDeleteBook(book?._id, book.title)}
            className="inline-flex items-center gap-1.5 rounded-xl justify-center border border-red-200 bg-white px-3 py-2 text-xs font-bold text-red-600 transition-colors hover:border-red-300 hover:bg-red-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Delete
          </button>
        </div>
      </Popover.Content>
    </Popover>
  );
}
