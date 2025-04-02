"use client";
import Link from "next/link";
import "./admin.css";
import { unauthenticate } from "@/utils/action";
import refreshSession from "@/library/refreshSession";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Preloder from "@/components/Preloder";
import NotFound from "../not-found";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }) {
  async function handleSignOut(e) {
    e.preventDefault();
    await unauthenticate();
    await refreshSession();
    window.location.href = "/home";

    toast.info(
      <div>
        <strong>Logout successful</strong>
        <p>You have successfully logged out!</p>
      </div>,
      {
        theme: "light",
      }
    );
  }
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    if (session) {
      setUser(session.user);
      setLoading(false);
    }
  }, [session]);
  if (loading) {
    return <Preloder />;
  }

  if (user?.role != "ROLE_ADMIN") {
    return <NotFound />;
  } else {
    return (
      <section
        style={{ backgroundColor: "#ebedef" }}
        className="admin-management"
      >
        <div className="wrapper">
          <nav id="sidebar">
            <div className="sidebar-header">
              <h3>ADMIN</h3>
            </div>
            <ul className="list-unstyled components">
              <li
                className={`${pathname == "/admin/dashboard" ? `active` : ""}`}
              >
                <Link href="/admin/dashboard">DASHBOARD</Link>
              </li>
              <hr />
              <li className={`${pathname == "/admin/user" ? `active` : ""}`}>
                <Link href="/admin/user">USER MANAGEMENT</Link>
              </li>
              <hr />
              <li
                className={`${
                  pathname == "/admin/service-management" ? `active` : ""
                }`}
              >
                <Link href="/admin/service-management">SERVICE MANAGEMENT</Link>
              </li>
              <hr />
              <li
                className={`${
                  pathname == "/admin/upgrade-user" ? `active` : ""
                }`}
              >
                <Link href="/admin/upgrade-user">UPGRADE REQUEST</Link>
              </li>
              <hr />
              <li
                className={`${
                  pathname == "/admin/revenue-management" ? `active` : ""
                }`}
              >
                <Link href="/admin/revenue-management">REVENUE MANAGEMENT</Link>
              </li>
              <hr />
              <li>
                <a
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handleSignOut(e)}
                >
                  SIGN OUT
                </a>
              </li>
            </ul>
          </nav>
          <div id="content">{children}</div>
        </div>
      </section>
    );
  }
}
