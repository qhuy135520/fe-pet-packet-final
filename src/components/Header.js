'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/home" },
  { name: "Services", href: "/services" },
  { name: "Categories", href: "/categories" },
  { name: "Blog", href: "/blog" },
  { name: "Shop", href: "/shop" },
];

export default function Header() {

  const pathname = usePathname();
  

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
                    const isActive = pathname.startsWith(link.href)
                    return (
                      <li key={link.name} className={isActive ? 'active' : ''}>
                        <Link href={link.href} >{link.name}</Link>
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
                <Link href="/signin" className="login-btn" as="/signin" passHref>
                  <i className="fa fa-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div id="mobile-menu-wrap"></div>
      </div>
    </header>
  );
}
