"use client";

import BlogDetails from "@/components/blogs/BlogDetails";
import Preloder from "@/components/Preloder";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Page({ params }) {
    const [loading, setLoading] = useState(true); // State for search query

    const slug = params.slug;

    const [blog, setBlog] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const resBlog = await sendRequest({
                    method: "GET",
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs/${slug}`,                    
                });
                setBlog(resBlog.data);
                setLoading(false)

            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [slug]);
        if (loading) {
            return <Preloder />
        }

    return (
        <>
            <BlogDetails blog={blog} />
        </>
    )
}
