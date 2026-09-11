import { JsonLd } from "@/components/seo/json-ld";
import { BUSINESS, SITE_URL } from "@/lib/site";

import { BrandStorySection } from "@/components/home/brand-story-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Store", "FoodEstablishment"],
  "@id": `${SITE_URL}/#local-business`,
  name: "Real Foods",
  url: SITE_URL,
  image: BUSINESS.image,
  description:
    "Authentic, freshly made namkeen and traditional snacks from Kannur, Kerala — murukku, achappam, chips and more.",
  email: BUSINESS.email,
  telephone: BUSINESS.telephones,
  priceRange: "₹20–₹100",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kannur",
    addressRegion: "Kerala",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: BUSINESS.geo.latitude,
    longitude: BUSINESS.geo.longitude,
  },
  areaServed: [
    { "@type": "State", name: "Kerala" },
    { "@type": "City", name: "Kannur" },
    { "@type": "Country", name: "India" },
  ],
  makesOffer: [
    "Murukku",
    "Achappam",
    "Chips",
    "Namkeen",
    "Traditional Kerala Snacks",
  ],
  sameAs: BUSINESS.sameAs,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: "Real Foods",
  url: SITE_URL,
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={localBusinessJsonLd} />
      <JsonLd data={websiteJsonLd} />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
      <WhyChooseUsSection />
      <BrandStorySection />
      <TestimonialsSection />
      <CtaSection />
    </>
  );
}