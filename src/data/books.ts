export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
};

/** Swap this array for API data once the backend exposes a books endpoint. */
export const allBooks: Book[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self Help",
    cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg",
  },
  {
    id: "dune",
    title: "Dune",
    author: "Frank Herbert",
    category: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg",
  },
  {
    id: "the-great-gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    category: "Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg",
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    category: "History",
    cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg",
  },
  {
    id: "harry-potter",
    title: "Harry Potter",
    author: "J.K. Rowling",
    category: "Fantasy",
    cover: "https://covers.openlibrary.org/b/isbn/9780590353427-L.jpg",
  },
  {
    id: "the-alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    cover: "https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg",
  },
  {
    id: "to-kill-a-mockingbird",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    category: "Fiction",
    cover: "https://covers.openlibrary.org/b/id/14351077-L.jpg",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    category: "Technology",
    cover: "https://covers.openlibrary.org/b/id/8065615-L.jpg",
  },
  {
    id: "1984",
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    cover: "https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg",
  },
  {
    id: "the-catcher-in-the-rye",
    title: "The Catcher in the Rye",
    author: "J. D. Salinger",
    category: "Fiction",
    cover: "https://covers.openlibrary.org/b/id/9273490-L.jpg",
  },
  {
    id: "the-hobbit",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    cover: "https://covers.openlibrary.org/b/id/14627509-L.jpg",
  },
  {
    id: "brave-new-world",
    title: "Brave New World",
    author: "Aldous Huxley",
    category: "Dystopian",
    cover: "https://covers.openlibrary.org/b/id/8231823-L.jpg",
  },
  {
    id: "thinking-fast-and-slow",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    category: "Psychology",
    cover: "https://covers.openlibrary.org/b/id/13290711-L.jpg",
  },
  {
    id: "educated",
    title: "Educated",
    author: "Tara Westover",
    category: "Memoir",
    cover: "https://covers.openlibrary.org/b/id/8314077-L.jpg",
  },
  {
    id: "the-martian",
    title: "The Martian",
    author: "Andy Weir",
    category: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/id/11447888-L.jpg",
  },
  {
    id: "project-hail-mary",
    title: "Project Hail Mary",
    author: "Andy Weir",
    category: "Science Fiction",
    cover: "https://covers.openlibrary.org/b/id/11200092-L.jpg",
  },
  {
    id: "the-psychology-of-money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    category: "Self Help",
    cover: "https://covers.openlibrary.org/b/id/10389354-L.jpg",
  },
  {
    id: "outliers",
    title: "Outliers",
    author: "Malcolm Gladwell",
    category: "Nonfiction",
    cover: "https://covers.openlibrary.org/b/id/10021591-L.jpg",
  },
  {
    id: "a-brief-history-of-time",
    title: "A Brief History of Time",
    author: "Stephen Hawking",
    category: "Science",
    cover: "https://covers.openlibrary.org/b/id/10432365-L.jpg",
  },
  {
    id: "becoming",
    title: "Becoming",
    author: "Michelle Obama",
    category: "Memoir",
    cover: "https://covers.openlibrary.org/b/id/8824664-L.jpg",
  },
  {
    id: "the-diary-of-a-young-girl",
    title: "The Diary of a Young Girl",
    author: "Anne Frank",
    category: "History",
    cover: "https://covers.openlibrary.org/b/id/13334527-L.jpg",
  },
  {
    id: "deep-work",
    title: "Deep Work",
    author: "Cal Newport",
    category: "Self Help",
    cover: "https://covers.openlibrary.org/b/id/7988607-L.jpg",
  },
  {
    id: "the-lord-of-the-rings",
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    cover: "https://covers.openlibrary.org/b/id/14625765-L.jpg",
  },
  {
    id: "steve-jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    category: "Biography",
    cover: "https://covers.openlibrary.org/b/id/12374726-L.jpg",
  },
];

/** Categories used by the All Books filters, derived from the catalogue. */
export const bookCategories: string[] = [...new Set(allBooks.map((book) => book.category))].sort();

export const newArrivals: Book[] = allBooks.slice(0, 6);

export const heroSlides = [
  {
    id: "slide-1",
    title: ["Good Books", "Better Tomorrow"],
    subtitle: "Discover, borrow and enjoy your favorite books from our online library.",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1920&q=80",
    position: "center 40%",
  },
  {
    id: "slide-2",
    title: ["Every Page", "A New Journey"],
    subtitle: "Explore fresh arrivals and timeless classics curated for curious minds.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1920&q=80",
    position: "center 55%",
  },
];

export const stats = [
  { id: "books", value: "1000+", label: "Total Books" },
  { id: "readers", value: "500+", label: "Happy Readers" },
  { id: "categories", value: "8+", label: "Categories" },
  { id: "available", value: "24/7", label: "Available" },
];
