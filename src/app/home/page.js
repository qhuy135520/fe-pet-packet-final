import Image from "next/image";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import WorkSection from "../components/WorkSection";
import LocationSection from "../components/LocationSection";
import TestimonialSection from '../components/TestimonialSection'
import NewSlatterSection from '../components/NewSlatterSection'

import BlogSection from '../components/BlogSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WorkSection />
      <LocationSection />
      <TestimonialSection/>
      <BlogSection/>
      <NewSlatterSection/>
    </>
  );
}
