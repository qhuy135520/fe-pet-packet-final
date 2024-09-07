"use client";
import refreshSession from "@/library/refreshSession";
import { unauthenticate } from "@/utils/action";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "Shop", href: "/shop" },
];

export default function Header() {
  const { data: session, status } = useSession();

  const pathname = usePathname();

  async function handleSignOut() {
    await unauthenticate();
    await refreshSession();

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

  useEffect(() => {
    console.log("Session:", session);
  }, [session]);

  return (
    <header className="header header--normal">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-md-3">
            <div className="header__logo">
              <Link href="/home">
                <Image src="/img/Logo.jpg" width={220} height={45} alt="" />
              </Link>
            </div>
          </div>
          <div className="col-lg-9 col-md-9">
            <div className="header__nav">
              <nav className="header__menu mobile-menu">
                <ul>
                  {navLinks.map((link) => {
                    const isActive = pathname.startsWith(link.href);
                    return (
                      <li key={link.name} className={isActive ? "active" : ""}>
                        <Link href={link.href}>{link.name}</Link>
                      </li>
                    );
                  })}

                  <li>
                    <a href="#">Pages</a>
                    <ul className="dropdown">
                      <li>
                        <a href="./about.html">About</a>
                      </li>
                      <li>
                        <a href="./listing-details.html">Listing Details</a>
                      </li>
                      <li>
                        <a href="./blog-details.html">Blog Details</a>
                      </li>
                      <li>
                        <a href="./contact.html">Contact</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
              <div className="header__menu__right">
                <Link href="#" className="primary-btn">
                  <i className="fa fa-plus"></i>Add Listing
                </Link>
                {session?.user?.role !== "ROLE_CUSTOMER" ? (
                  <Link
                    href="/signin"
                    className="login-btn"
                    as="/signin"
                    passHref
                  >
                    <i className="fa fa-user"></i>
                  </Link>
                ) : (
                  <nav className="header__menu header__menu__user">
                    <ul>
                      <li>
                        <a>
                          <div className="login-btn">
                            <i className="fa fa-user"></i>
                          </div>
                        </a>
                        <ul className="dropdown">
                          <li>
                            <Link href="/profile">
                              <i className="fa-solid fa-address-card"></i>{" "}
                              &nbsp; Profile
                            </Link>
                          </li>
                          <li>
                            <Link href="#" onClick={() => handleSignOut()}>
                              <i className="fa-solid fa-arrow-right-from-bracket"></i>
                              &nbsp;&nbsp; Sign Out
                            </Link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                )}
              </div>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
}
