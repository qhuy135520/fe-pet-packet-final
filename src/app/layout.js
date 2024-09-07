import Script from "next/script";
import "public/css/barfiller.css";
import "public/css/bootstrap.min.css";
import "public/css/elegant-icons.css";
import "public/css/flaticon.css";
import "public/css/font-awesome.min.css";
import "public/css/jquery-ui.min.css";
import "public/css/magnific-popup.css";
import "public/css/nice-select.css";
import "public/css/owl.carousel.min.css";
import "public/css/slicknav.min.css";
import "public/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Footer from "../components/Footer";
import Header from "../components/Header";

import NextAuthWrapper from "@/library/next.auth.wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "@/auth";

export const metadata = {
  title: "Pet Service Connect",
  description: "",
};

export default async function RootLayout({ children }) {
  const isSignupPage =
    typeof window !== "undefined" &&
    window.location.pathname.startsWith("/signup");

  const session = await auth();
  return (
    <>
      <html lang="en">
        <body>
          <NextAuthWrapper>
            <Header session={session} />
            {children}
            <Footer />
          </NextAuthWrapper>

          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            pauseOnFocusLoss={true}
            theme="dark"
          />

          {!isSignupPage && (
            <>
              <Script
                src="js/jquery-3.3.1.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/bootstrap.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/jquery.nice-select.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/jquery-ui.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/jquery.nicescroll.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/jquery.barfiller.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/jquery.magnific-popup.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/jquery.slicknav.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="js/owl.carousel.min.js "
                strategy="afterInteractive"
              ></Script>
              <Script src="js/main.js" strategy="lazyOnload"></Script>
            </>
          )}
        </body>
      </html>
    </>
  );
}
