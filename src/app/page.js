'use server'
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import LocationSection from "@/components/home/LocationSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewSlatterSection from "@/components/home/NewSlatterSection";

import BlogSection from "@/components/home/BlogSection";

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <LocationSection />
      <TestimonialSection />
      <BlogSection />
      <NewSlatterSection />
    </>
  );
}
