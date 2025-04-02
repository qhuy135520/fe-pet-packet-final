"use client";

import Blogs from '@/components/blogs/Blogs'
import Preloder from '@/components/Preloder';
import { sendRequest } from '@/utils/api';
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [loading, setLoading] = useState(true); // State for search query

    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        async function getData() {
            try {
                const resBlogs = await sendRequest({
                    method: "GET",
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/blogs`,
                });
                setBlogs(resBlogs.data);
                setLoading(false)
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, []);
    if (loading) {
        return <Preloder />
    }
    return (
        <>
            <Blogs blogs={blogs} />
        </>
    )
}
