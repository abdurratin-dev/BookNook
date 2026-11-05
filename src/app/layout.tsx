import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Inter,
  Playfair_Display,
  Caveat,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import UserDataProvider from "@/context/userDataContext";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["700", "800"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["500", "600"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNook",
  description: "A Small Online Library",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        playfair.variable,
        caveat.variable,
      )}
    >
      <body className="min-h-full flex flex-col">
        <Suspense fallback={<Loading />}>
          <Toaster
            position="top-center"
            reverseOrder={true}
            toastOptions={{
              style: {
                borderRadius: "12px",
                fontSize: "14px",
                fontWeight: 500,
                boxShadow:
                  "0 10px 30px -12px rgba(13, 77, 51, 0.35)",
                padding: "10px 14px",
              },
              success: {
                iconTheme: { primary: "#0d4d33", secondary: "#ffffff" },
              },
              error: {
                iconTheme: { primary: "#b91c1c", secondary: "#ffffff" },
              },
            }}
          />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
