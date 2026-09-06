"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, ShoppingBag, User, X } from "lucide-react";

import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 focus-visible:outline-none"
      aria-label="Real Foods — home"
    >
      <Image
        src="/images/brand/logo.png"
        alt="Real Foods logo"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        priority
      />
    </Link>
  );
}

export function SiteHeader() {
  const { itemsCount } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-background/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-100 hover:text-stone-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="relative" aria-label="Cart">
            <Link href="/cart">
              <ShoppingBag />
              {itemsCount > 0 && (
                <span className="absolute right-0.5 top-0.5 flex size-4 items-center justify-center rounded-full bg-amber-600 text-[10px] font-bold text-white">
                  {itemsCount > 9 ? "9+" : itemsCount}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="hidden md:inline-flex" aria-label="Account">
            <Link href="/account">
              <User />
            </Link>
          </Button>
          <Button asChild size="sm" className="hidden lg:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          className="container-page border-t border-stone-200 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-3 text-base font-medium text-stone-700 hover:bg-stone-100",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/account"
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base font-medium text-stone-700 hover:bg-stone-100"
              >
                Account
              </Link>
            </li>
            <li className="px-4 py-2">
              <Button asChild className="w-full">
                <Link href="/login" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}