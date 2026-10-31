import { allBooks, type Book } from "./books";

export type BorrowingStatus = "Active" | "Returned";

export type Borrowing = {
  id: string;
  bookId: string;
  borrowedOn: string;
  returnDate: string;
  status: BorrowingStatus;
};

function findBook(bookId: string): Book {
  const book = allBooks.find((entry) => entry.id === bookId);

  if (!book) {
    throw new Error(`Unknown book id in borrowings: ${bookId}`);
  }

  return book;
}

/** Books currently or previously borrowed by the signed-in reader. */
export const borrowings: Borrowing[] = [
  { id: "borrow-1", bookId: "dune", borrowedOn: "2025-05-10", returnDate: "2025-05-17", status: "Active" },
  { id: "borrow-2", bookId: "the-martian", borrowedOn: "2025-05-08", returnDate: "2025-05-15", status: "Active" },
  { id: "borrow-3", bookId: "clean-code", borrowedOn: "2025-04-25", returnDate: "2025-05-02", status: "Returned" },
  { id: "borrow-4", bookId: "sapiens", borrowedOn: "2025-04-20", returnDate: "2025-04-27", status: "Returned" },
  { id: "borrow-5", bookId: "1984", borrowedOn: "2025-04-15", returnDate: "2025-04-22", status: "Returned" },
];

/** Resolves a borrowing to its book details (cover, title, author). */
export function borrowingBook(borrowing: Borrowing): Book {
  return findBook(borrowing.bookId);
}

export function formatBorrowDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
