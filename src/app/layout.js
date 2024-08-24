// RootLayout.js
import "../../public/css/bootstrap.min.css";
import "../../public/css/font-awesome.min.css";
import "../../public/css/elegant-icons.css";
import "../../public/css/nice-select.css";
import "../../public/css/flaticon.css";
import "../../public/css/barfiller.css";
import "../../public/css/magnific-popup.css";
import "../../public/css/jquery-ui.min.css";
import "../../public/css/owl.carousel.min.css";
import "../../public/css/slicknav.min.css";
import "../../public/css/style.css";
import Script from "next/script";
import Preloder from "./components/Preloder";
import Header from "./components/Header";
import Footer from "./components/Footer";

export const metadata = {
  title: "Pet Service Connect",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body>
          
          <Header />
          {children}
          <Footer />
          <Script src="js/jquery-3.3.1.min.js" strategy="afterInteractive"></Script>
          <Script src="js/bootstrap.min.js" strategy="afterInteractive"></Script>
          <Script src="js/jquery.nice-select.min.js" strategy="afterInteractive"></Script>
          <Script src="js/jquery-ui.min.js" strategy="afterInteractive"></Script>
          <Script src="js/jquery.nicescroll.min.js" strategy="afterInteractive"></Script>
          <Script src="js/jquery.barfiller.js" strategy="afterInteractive"></Script>
          <Script src="js/jquery.magnific-popup.min.js" strategy="afterInteractive"></Script>
          <Script src="js/jquery.slicknav.js" strategy="afterInteractive"></Script>
          <Script src="js/owl.carousel.min.js " strategy="afterInteractive"></Script>
          <Script src="js/main.js" strategy="lazyOnload"></Script>
        </body>

       
      </html>
        
    </>
  );
}
