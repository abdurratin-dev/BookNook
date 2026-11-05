import type { Metadata } from "next";
import { Library } from "lucide-react";
import BookCatalog from "@/components/books/BookCatalog";
import PageHeader from "@/components/layout/PageHeader";

export const metadata: Metadata = {
  title: "All Books · BookNook",
  description: "Browse our complete collection of books.",
};

export default function AllBooksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
      <PageHeader
        icon={Library}
        eyebrow="Catalogue"
        title="All Books"
        description="Browse the complete BookNook collection — filter by category or search for your next read."
      />

      <BookCatalog />
    </div>
  );
}
