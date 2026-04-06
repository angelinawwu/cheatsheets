import type { Metadata } from "next";
import localFont from "next/font/local";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";

const otBulb = localFont({
  src: "./fonts/OTBulbMonoline-500.otf",
  variable: "--font-bulb",
  weight: "500",
  display: "swap",
});

const fragmentMono = Fragment_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Angie's Cheatsheet Compendium",
  description: "A collection of course cheatsheets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${otBulb.variable} ${fragmentMono.variable} h-full antialiased`}>
      <body className="h-full overflow-hidden">{children}</body>
    </html>
  );
}
