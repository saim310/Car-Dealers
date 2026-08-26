import type { Metadata } from "next";
import { Roboto, Inter_Tight } from "next/font/google";
import Script from "next/script";
import SocialBar from "@/sections/common/SocialBar";
import "../../public/assets/css/style.css";
import ContextProvider from "../components/context/ContextProvider";
import CustomLayout from "../components/custom-layout/CustomLayout";
import { BlogFilterProvider } from "@/context/BlogFilterContext";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--gorent-font",
});

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--gorent-font-two",
});

export const metadata: Metadata = {
  title: "Japanese Cars for Sale in Australia | UKA Japan Motors",
  description:
    "UKA Japan Motors offers premium Japanese cars for sale in Australia. Browse reliable used cars, automatics, and small cars at competitive prices today.",
  metadataBase: new URL("https://ukajapan.com.au"), // <-- YEH LINE ADD KAREIN
  alternates: {                                     // <-- YEH BLOCK ADD KAREIN
    canonical: "./",                                //
  },                                                //
  verification: {
    google: "m2HEzFR7ahombtQlYFbMbEms1rcwi5qJgTcbhFYZJrM",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QVW0MLGG0K"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QVW0MLGG0K');
          `}
        </Script>

{/* Updated Meta Pixel Code */}
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '946019551868082');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${roboto.variable} ${interTight.variable}`}>
        {/* Meta Pixel Fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=946019551868082&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

      

        <ContextProvider>
          <CustomLayout>
            <BlogFilterProvider>
              {children}
            </BlogFilterProvider>
          </CustomLayout>
        </ContextProvider>
        <SocialBar />
      </body>
    </html>
  );
}
