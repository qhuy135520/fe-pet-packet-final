"use client";
import HeroSection from "@/components/home/HeroSection";
import LocationSection from "@/components/home/LocationSection";
import NewSlatterSection from "@/components/home/NewSlatterSection";
import ServicesSection from "@/components/home/ServicesSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import WorkSection from "@/components/home/WorkSection";

import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BlogSection from "../../components/home/BlogSection";
import Preloder from "@/components/Preloder";
import { useSession } from "next-auth/react";

export default function Home() {
  const [serviceCategories, setServiceCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      if (session?.user.role == "ROLE_ADMIN") {
        window.location.href = "/admin/user";
      } else {
        const resCities = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/cities`,
        });
        setCities(resCities.data);

        const resCategories = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/services/service-categories`,
        });
        setServiceCategories(resCategories.data);

        const resBlogs = await sendRequest({
          method: "GET",
          url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/three`,
        });
        setBlogs(resBlogs.data);

        const success = localStorage.getItem("loginSuccessful");

        setLoading(false);

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
