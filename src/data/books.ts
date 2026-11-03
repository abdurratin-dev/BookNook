export interface Book {
  _id: string
  title: string
  author: string
  category: string
  image: string
  description: string
  name: string
  email: string
  /** Optional detail fields — rendered with sensible fallbacks when absent. */
  page?: number
  language?: string
  rating?: number
  reviewCount?: number
  createdAt?: string
  createdDate?: string
}

export interface BookReview {
  _id: string
  userName: string
  rating: number
  comment: string
  createdAt?: string
}


/** Swap this array for API data once the backend exposes a books endpoint. */

/** Categories used by the All Books filters, derived from the catalogue. */

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
