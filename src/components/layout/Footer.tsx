import Link from "next/link";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";
import { NAV_LINKS } from "@/data/navigation";
import { FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";

const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: FaFacebook },
  { label: "Twitter", href: "https://twitter.com", Icon: RiTwitterXLine },
  { label: "Instagram", href: "https://instagram.com", Icon: FaInstagram },
  { label: "YouTube", href: "https://youtube.com", Icon: FaYoutube },
];

const CONTACT = [
  {
    label: "Email",
    value: "support@booknook.com",
    href: "mailto:support@booknook.com",
    Icon: Mail,
  },
  {
    label: "Phone",
    value: "+880 1717 545678",
    href: "tel:+8801717545678",
    Icon: Phone,
  },
  { label: "Address", value: "Dhaka, Bangladesh", Icon: MapPin },
];

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0d4d33] text-white">
      {/* Soft glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex w-fit items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20">
                <BookOpen className="h-[18px] w-[18px]" strokeWidth={2.2} />
              </span>
              <span className="font-display text-lg font-bold tracking-tight">
                BookNook
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              More than books. A community of readers — borrow, share and
              discover your next favourite story.
            </p>

            <div className="mt-5 flex gap-2.5">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/20 bg-white/5 text-white/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/15 hover:text-white"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex rounded-lg transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/90">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-3.5 text-sm text-white/70">
              {CONTACT.map(({ label, value, href, Icon }) => (
                <li key={label} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white/10 text-white/80">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] uppercase tracking-wide text-white/45">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        className="break-words transition-colors hover:text-white"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="break-words">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-2 border-t border-white/15 pt-6 text-center text-xs text-white/55 sm:flex-row sm:justify-between sm:text-left">
          <p>© {year} BookNook. All rights reserved.</p>
          <p className="text-white/45">
            Made for readers, everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
