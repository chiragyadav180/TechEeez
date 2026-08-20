"use client";

import { AboutSection } from "@/components/sections/about";
import { BlogPreviewSection } from "@/components/sections/blog-preview";
import { ContactCtaSection } from "@/components/sections/contact-cta";
import { HeroSection } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { TestimonialSection } from "@/components/sections/testimonial";
import { WorkSection } from "@/components/sections/work";

export function HomeSections() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <TestimonialSection />
      <ProcessSection />
      <BlogPreviewSection />
      <ContactCtaSection />
    </>
  );
}
