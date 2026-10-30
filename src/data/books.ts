export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  cover: string;
};

/** Swap this array for API data once the backend exposes a books endpoint. */
export const newArrivals: Book[] = [
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
];

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
