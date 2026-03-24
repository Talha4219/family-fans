import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Script from "next/script";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FamilyFans | Premium E-Commerce Store",
  description:
    "Experience the ultimate shopping with FamilyFans. Your one-stop shop for premium electronics and lifestyle products.",
  icons: {
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EMW8BW076R"
        />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-EMW8BW076R');
          `}
        </Script>
      </head>
      <body
        className={`${plusJakartaSans.variable} antialiased font-body font-normal`}
      >
        <Providers>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
