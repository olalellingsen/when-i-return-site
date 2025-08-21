import type { Metadata } from "next";
import { Radley } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const radley = Radley({
  subsets: ["latin"],
  variable: "--font-radley",
  weight: "400",
});

const radleyMono = Radley({
  subsets: ["latin"],
  variable: "--font-radley-mono",
  weight: "400",
});

export const metadata: Metadata = {
  title: "When I Return",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${radley.variable} ${radleyMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className="flex-grow w-full max-w-5xl mx-auto py-4 sm:py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
