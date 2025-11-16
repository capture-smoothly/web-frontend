import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Snapshot - Professional Screenshot & Content Capture Tool",
  description: "The only Chrome extension that turns your copied text into beautiful, shareable images. Plus revolutionary two-point selection that never loses your place. 35+ Premium Themes, Smart Text Selection, Professional Editing.",
  keywords: ["screenshot", "chrome extension", "text to image", "screen capture", "annotation", "screenshot tool"],
  authors: [{ name: "Snapshot" }],
  openGraph: {
    title: "Snapshot - Professional Screenshot & Content Capture Tool",
    description: "Create stunning screenshots & text snapshots in seconds. 35+ Premium Themes, Smart Text Selection, Professional Editing.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Snapshot - Professional Screenshot & Content Capture Tool",
    description: "Create stunning screenshots & text snapshots in seconds",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={clsx(inter.variable, "antialiased font-sans bg-white text-dark")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
