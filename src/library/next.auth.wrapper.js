'use client'

import { SessionProvider } from "next-auth/react"

export default function NextAuthWrapper({children}){
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}