"use client";
import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import LocationSection from "@/components/home/LocationSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewSlatterSection from "@/components/home/NewSlatterSection";

import BlogSection from "../../components/home/BlogSection";
import { auth } from "@/auth";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Home() {
  useEffect(() => {
    const success = localStorage.getItem("loginSuccessful");

    if (success) {
      toast.success(
        <div>
          <strong>Login successful</strong>
          <p>You have successfully logged in, have a good experience!</p>
        </div>,
        {
          theme: "light",
        }
      );
      localStorage.removeItem("loginSuccessful");
    }
  }, []);

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
