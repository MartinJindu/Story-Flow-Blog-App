import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import SessionProvider from "@/components/SessionProvider";
import StoreProvider from "@/components/StoreProvider";

const inter = Inter({
  weight: ["300", "500"],
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Story Flow - Unleash Your Creativity",
  description:
    "Story Flow is a modern blogging platform where you can share your thoughts, stories, and experiences with the world.",
  authors: [{ name: "Chijindu Okpalanweze" }],
  keywords: [
    "Story Flow",
    "blog",
    "Next.js blog",
    "articles",
    "writing platform",
    "React blog",
    "content creation",
    "storytelling",
    "personal blog",
  ],
  creator: "Chijindu Okpalanweze",
  publisher: "Story Flow",
  applicationName: "Story Flow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased `}>
        <SessionProvider>
          <StoreProvider>
            <div className="flex flex-col min-h-screen">
              <header>
                <Navbar />
              </header>
              <Toaster richColors position="top-right" />
              <main className="flex-1">{children}</main>

              <Footer />
            </div>
          </StoreProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
