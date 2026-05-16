import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JL Custom Upholstery | Precision Craftsmanship Grounded in Integrity",
  description:
    "Orange County's premier custom upholstery studio. 25+ years of mastery in luxury home, commercial, marine, and classic auto upholstery. Instant photo estimates available.",
  keywords: [
    "custom upholstery",
    "luxury upholstery",
    "reupholstery",
    "auto upholstery",
    "leather repair",
    "commercial upholstery",
    "marine seating",
    "boat upholstery",
    "classic car interior",
    "furniture restoration",
    "Orange County upholstery",
    "Anaheim upholstery",
    "custom furniture",
    "designer textiles",
    "hospitality seating",
    "RV upholstery",
    "antique restoration",
  ],
  authors: [{ name: "JL Custom Upholstery" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "JL Custom Upholstery",
    description: "Precision Craftsmanship Grounded in Integrity",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
