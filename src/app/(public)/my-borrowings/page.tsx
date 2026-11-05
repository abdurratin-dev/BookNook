import type { Metadata } from "next";
import { BookUp } from "lucide-react";
import BorrowList from "@/components/borrows/BorrowList";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "My Borrows · BookNook",
  description: "Books you have borrowed from the library.",
};

export default function MyBorrowingsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <PageHeader
        icon={BookUp}
        eyebrow="Loans"
        title="My Borrows"
        description="Books you have borrowed from BookNook — track the due date and return them when you are done."
      />

      <BorrowList />
    </div>
  );
}
