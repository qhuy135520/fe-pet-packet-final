"use client"


import Bookings from '@/components/user/bookings/Bookings';
import { sendRequest } from '@/utils/api';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

export default function Page() {

    const [bookings, setBookings] = useState([]);


    const { data: session, status } = useSession();
    const userId = session?.user?.userId;

    useEffect(() => {

        async function fetchBookings() {
            try {
                const res = await sendRequest({
                    method: 'GET',
                    url: `${process.env.NEXT_PUBLIC_API_URL}/api/booking/${userId}`,
                    // headers: {
                    //     Authorization: `Bearer ${token}`,
                    // }
                });
                setBookings(res.data);
            } catch (error) {
                console.error('Failed to fetch pets:', error);
            }
        }

        if (userId) {
            fetchBookings();
        }

    }, [userId]);



    return (
        <>
            <Bookings bookings={bookings} />
        </>
    )
}
