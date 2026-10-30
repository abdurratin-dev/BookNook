import Link from "next/link";
import { NAV_LINKS } from "@/data/navigation";
import { FaFacebook,FaYoutube,FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";


const SOCIALS = [
  { label: "Facebook", href: "https://facebook.com", Icon: <FaFacebook /> },
  { label: "Twitter", href: "https://twitter.com", Icon:  <RiTwitterXLine />},
  { label: "Instagram", href: "https://instagram.com", Icon: <FaInstagram /> },
  { label: "YouTube", href: "https://youtube.com", Icon: <FaYoutube />},
];

const CONTACT = [
  { type: "email" as const, value: "support@booknook.com", href: "mailto:support@booknook.com" },
  { type: "phone" as const, value: "+880 1717 545678", href: "tel:+8801717545678" },
  { type: "address" as const, value: "Dhaka, Bangladesh" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[#0d4d33] text-white">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight">BookNook</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              More than books. A community of readers.
            </p>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h3 className="text-sm font-bold">Quick Links</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition-colors hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold">Contact Us</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/75">
              {CONTACT.map((item) => (
                <li key={item.type}>
                  {item.href ? (
                    <a href={item.href} className="transition-colors hover:text-white">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-5 flex gap-3">
              {SOCIALS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-full border border-white/35 text-white/85 transition-colors hover:bg-white/10 hover:text-white"
                >
                  {Icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/15 pt-6 text-center text-xs text-white/60">
          © 2025 BookNook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
