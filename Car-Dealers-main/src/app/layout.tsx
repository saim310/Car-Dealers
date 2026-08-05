import type { Metadata } from "next";
import { Roboto, Inter_Tight } from "next/font/google";
  import SocialBar from "@/sections/common/SocialBar";

import "../../public/assets/css/style.css";
import ContextProvider from "../components/context/ContextProvider";
import CustomLayout from "../components/custom-layout/CustomLayout";

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
  description: " UKA Japan Motors offers premium Japanese cars for sale in Australia. Browse reliable used cars, automatics, and small cars at competitive prices today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className={`${roboto.variable} ${interTight.variable}`}>
        <ContextProvider>
          <CustomLayout>
            {children}
          </CustomLayout>
        </ContextProvider>
          <SocialBar />
      </body>
    </html>
  );
}
