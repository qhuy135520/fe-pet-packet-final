"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Footer() {
  const { data: session, status } = useSession();
  return (
    <>
      {session?.user.role !== "ROLE_ADMIN" && (
        <footer className="footer">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div className="footer__about">
                  <div className="footer__about__logo">
                    <a href="./index.html">
                      <Image
                        src="/img/Logo.jpg"
                        width={180}
                        height={45}
                        alt=""
                      />
                    </a>
                  </div>
                  <p>
                    Challenging the way things have always been done can lead to
                    creative new options that reward you.
                  </p>
                </div>
              </div>
              <div className="col-lg-4 offset-lg-1 col-md-6">
                <div className="footer__address">
                  <ul>
                    <li>
                      <span>Call Us:</span>
                      <p>(+84) 935-396-334</p>
                    </li>
                    <li>
                      <span>Email:</span>
                      <p>petgoservice@gmail.com</p>
                    </li>
                    <li>
                      <span>Fax:</span>
                      <p>(+84) 935-396-334</p>
                    </li>
                    <li>
                      <span>Connect Us:</span>
                      <div className="footer__social">
                        <a href="#">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-instagram"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#">
                          <i className="fa fa-skype"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 offset-lg-1 col-md-6">
                <div className="footer__widget">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Support</a>
                    </li>
                    <li>
                      <a href="#">How it work</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                    <li>
                      <a href="#">Blog</a>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <a href="#">Sign In</a>
                    </li>
                    <li>
                      <a href="#">How it Work</a>
                    </li>
                    <li>
                      <a href="#">Advantages</a>
                    </li>
                    <li>
                      <a href="#">Direo App</a>
                    </li>
                    <li>
                      <a href="#">Packages</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12">
                <div className="footer__copyright">
                  <div className="footer__copyright__text">
                    <p>
                      Copyright &copy;
                      {new Date().getFullYear()}
                      &nbsp;Pet Go
                    </p>
                  </div>
                  <div className="footer__copyright__links">
                    <a href="#">Terms</a>
                    <a href="#">Privacy Policy</a>
                    <a href="#">Cookie Policy</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      )}
    </>
  );
}
