"use client";

import BlogsManage from "@/components/blogs/BlogsManage";
import Preloder from "@/components/Preloder";
import { sendRequest } from "@/utils/api";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(true); // State for search query
  const { data: session, status } = useSession();

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        if (session?.user) {
          const resBlogs = await sendRequest({
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/user/${session?.user.userId}`,
          });
          setBlogs(resBlogs.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, [session?.user]);
  if (loading) {
    return <Preloder />;
  }
  return (
    <>
      <BlogsManage blogs={blogs} />
    </>
  );
}
