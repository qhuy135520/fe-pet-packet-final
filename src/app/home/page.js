import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import LocationSection from "@/components/home/LocationSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewSlatterSection from "@/components/home/NewSlatterSection";

import BlogSection from "../../components/home/BlogSection";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  console.log("check Session: ", session);
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
