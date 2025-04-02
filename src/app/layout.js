import "@fortawesome/fontawesome-free/css/all.min.css";
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

import Footer from "../components/Footer";
import Header from "../components/Header";

import PathBasedComponent from "@/components/PathBasedComponent";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { headers } from "next/headers";

export const metadata = {
  title: "Pet Service Connect",
  description: "",
};

export default function RootLayout({ children }) {
  // const headersList = headers();
  // const referer = headersList.get("referer");

  // let pathname = "/";
  // if (referer) {
  //   try {
  //     pathname = new URL(referer).pathname;
  //   } catch (error) {
  //     console.error("Invalid referer URL: ", referer, error);
  //   }
  // }

  // if (pathname.startsWith("/admin")) {
  //   return (
  //     <>
  //       <html>
  //         <body>{children}</body>
  //       </html>
  //     </>
  //   );
  // } else {
    return (
      <>
        <html lang="en">
          <body>
            <NextAuthWrapper>
              <PathBasedComponent />
              <Header />
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

            <>
              <Script
                src="/js/jquery-3.3.1.min.js"
                strategy="beforeInteractive"
              ></Script>
              <Script
                src="/js/bootstrap.min.js"
                strategy="beforeInteractive"
              ></Script>
              <Script
                src="/js/jquery.nice-select.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="/js/jquery-ui.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="/js/jquery.nicescroll.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="/js/jquery.barfiller.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="/js/jquery.magnific-popup.min.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="/js/jquery.slicknav.js"
                strategy="afterInteractive"
              ></Script>
              <Script
                src="/js/owl.carousel.min.js "
                strategy="afterInteractive"
              ></Script>
              <Script src="/js/main.js" strategy="lazyOnload"></Script>
            </>
          </body>
        </html>
      </>
    );
  }
// }
