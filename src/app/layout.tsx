import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/seo/json-ld";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { CartProvider } from "@/components/cart/cart-context";
import { Providers } from "@/components/providers";
import { BUSINESS, SITE_NAME, SITE_URL } from "@/lib/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "Real Foods — Authentic Murukku, Achappam & Namkeen | Kannur, Kerala",
    template: "%s | Real Foods",
  },
  description:
    "Real Foods makes authentic, freshly made Indian namkeen in Kannur, Kerala. Shop premium murukku, achappam, chips and traditional snacks — real taste, real ingredients.",
  keywords: [
    "murukku",
    "achappam",
    "namkeen",
    "Indian snacks",
    "Kerala snacks",
    "Kannur snacks",
    "traditional snacks",
    "chakli",
    "papad",
    "healthy snacks Kerala",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: "Real Foods — Authentic Murukku, Achappam & Namkeen",
    description:
      "Authentic, freshly made Indian namkeen and chips from Kannur, Kerala. Premium quality snacks crafted with traditional recipes.",
    images: [
      {
        url: `${SITE_URL}/images/brand/og-home.jpg`,
        width: 1200,
        height: 630,
        alt: `Real Foods — murukku, achappam and traditional Kerala snacks`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Foods — Authentic Murukku, Achappam & Namkeen",
    description:
      "Authentic, freshly made Indian namkeen and chips from Kannur, Kerala.",
    images: ["/images/brand/og-home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "food",
  other: {
    "geo.region": "IN-KL",
    "geo.placename": "Kannur",
    ICBM: "11.8745, 75.3704",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: BUSINESS.image,
    width: 1254,
    height: 1254,
  },
  image: BUSINESS.image,
  email: BUSINESS.email,
  telephone: BUSINESS.telephones,
  address: {
    "@type": "PostalAddress",
    ...BUSINESS.address,
  },
  areaServed: "IN",
  sameAs: BUSINESS.sameAs,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="min-h-full flex flex-col bg-background">
        <Providers>
          <CartProvider>
            <SiteHeader />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}
