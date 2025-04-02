"use client";

import UserUpdate from "@/components/admin/UserUpdate";
import BlogDetails from "@/components/blogs/BlogDetails";
import { sendRequest } from "@/utils/api";
import { useEffect, useState } from "react";

export default function Page({ params }) {

    const slug = params.slug;

    const [user, setUser] = useState();

    useEffect(() => {
        async function getData() {
            try {
                const resUser = await sendRequest({
                    method: "GET",
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${slug}`,                    
                });
                setUser(resUser.data);
            } catch (error) {
                console.error(error);
            }
        }
        getData()
    }, [slug]);

    return (
        <>
            <UserUpdate user={user} />
        </>
    )
}
