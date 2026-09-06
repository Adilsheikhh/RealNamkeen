import { BrandStorySection } from "@/components/home/brand-story-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { CtaSection } from "@/components/home/cta-section";
import { FeaturedProductsSection } from "@/components/home/featured-products-section";
import { HeroSection } from "@/components/home/hero-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseUsSection } from "@/components/home/why-choose-us-section";

export default function HomePage() {
  return (
    <>
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