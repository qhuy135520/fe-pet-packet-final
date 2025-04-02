"use client";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkSection from "@/components/home/WorkSection";
import LocationSection from "@/components/home/LocationSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import NewSlatterSection from "@/components/home/NewSlatterSection";

import BlogSection from "@/components/home/BlogSection";
import { useEffect, useState } from "react";
import { sendRequest } from "@/utils/api";
import Preloder from "@/components/Preloder";
import { useSession } from "next-auth/react";

export default function HomePet() {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function getData() {
      if (session?.user.role == "ROLE_ADMIN") {
        window.location.href = "/admin/user";
      } else {
        try {
          const resCities = await sendRequest({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
          });
          setCities(resCities.data);

          const resBlogs = await sendRequest({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/three`,
          });
          setBlogs(resBlogs.data);

          const resCategories = await sendRequest({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/service-categories`,
          });
          setServiceCategories(resCategories.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    }

    getData();
  }, [session]);

  if (loading) {
    return <Preloder />;
  }

  return (
    <>
      <HeroSection serviceCategories={serviceCategories} cities={cities} />
      <ServicesSection serviceCategories={serviceCategories} />
      <WorkSection />
      {/* <LocationSection /> */}
      <TestimonialSection />
      <BlogSection blogs={blogs} />
      <NewSlatterSection />
    </>
  );
}
