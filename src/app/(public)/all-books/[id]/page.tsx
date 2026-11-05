import type { Metadata } from "next";
import BookDetails from "@/components/books/BookDetails";

type Params = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.SERVER_URL}/books/${id}`,
    );
    if (!res.ok) return { title: "Book Not Found · BookNook" };
    const data = await res.json();
    const book = data.book ?? data;
    return {
      title: `${book.title} · BookNook`,
      description: book.description,
    };
  } catch {
    return { title: "Book Details · BookNook" };
  }
}

export default async function BookDetailsPage({ params }: Params) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
      <BookDetails bookId={id} />
    </div>
  );
}
