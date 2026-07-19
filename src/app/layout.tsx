import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const aalto = localFont({
  src: "../fonts/aalto-display-personal-use.otf",
  variable: "--font-aalto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "STUDIO",
  description: "minimalism",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${aalto.variable} h-full antialiased bg-black text-white`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans selection:bg-white selection:text-black overflow-x-hidden select-none">
        {children}
      </body>
    </html>
  );
}
