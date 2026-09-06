import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Share2 } from "lucide-react";

const placeholderContact = false;

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-stone-200 bg-stone-900 text-stone-300">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="inline-flex focus-visible:outline-none">
            <Image
              src="/images/brand/logo.png"
              alt="Real Foods logo"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-stone-400">
            Authentic, freshly made namkeen and traditional snacks crafted
            with care. Real taste, real ingredients.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Quick links
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/products">Products</Link></li>
            <li><Link className="hover:text-white" href="/about">About us</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
            <li><Link className="hover:text-white" href="/track-order">Track order</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Products
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link className="hover:text-white" href="/products?category=murukku">Murukku</Link></li>
            <li><Link className="hover:text-white" href="/products?category=achappam">Achappam</Link></li>
            <li><Link className="hover:text-white" href="/products?category=chips">Chips</Link></li>
            <li><Link className="hover:text-white" href="/products?category=namkeen">Namkeen</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
            Contact
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-amber-500" />
              <span>Kannur, Kerala</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-amber-500" />
              <span>+91 9526395590, +91 9846906366</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-amber-500" />
              <span>realfoodspnr@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-page">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-800 py-6 text-sm text-stone-400 sm:flex-row">
          <p>© {new Date().getFullYear()} Real Foods. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-stone-400 hover:text-white"
            >
              <Share2 className="size-5" />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-stone-400 hover:text-white"
            >
              <Share2 className="size-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}