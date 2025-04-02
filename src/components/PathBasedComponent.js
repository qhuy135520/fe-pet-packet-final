"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PathBasedComponent() {
  const pathname = usePathname();

  useEffect(() => {
    const body = document.body;

    if (pathname.startsWith("/services")) {
      body.classList.add("ov-hid");
    } else {
      body.classList.remove("ov-hid");
    }
  }, [pathname]);

  return null; 
}
