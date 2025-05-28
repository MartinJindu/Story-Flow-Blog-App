import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

const blogInfo = {
  name: "Story Flow",
  author: "Chijindu Okpalanweze",
  title: "Story Flow - Unleash Your Creativity",
  description:
    "Modern blogging platform where you can share your thoughts, stories, and experiences with the world.",
  url: "https://story-flow-blog-app.vercel.app/",
  image: `https://story-flow-blog-app.vercel.app/opengraph-image.png`,
  twitterHandle: "@MartinJindu",
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
};

export const metadata: Metadata = {
  title: {
    default: `${blogInfo.title}`,
    template: `%s | ${blogInfo.name}`,
  },
  description: blogInfo.description,

  authors: [{ name: blogInfo.author, url: blogInfo.url }],
  creator: blogInfo.author,

  keywords: blogInfo.keywords,
  publisher: "Chijindu Okpalanweze",
  applicationName: "Chijindu's Portfolio",

  // Canonical URL
  metadataBase: new URL(blogInfo.url as string),
  alternates: {
    canonical: "/",
  },

  // Open Graph metadata for social sharing
  openGraph: {
    type: "website",
    locale: "en_US",
    url: blogInfo.url,
    title: ` ${blogInfo.title}`,
    description: blogInfo.description,
    siteName: `${blogInfo.name} Blog`,
    images: [
      {
        url: blogInfo.image,
        width: 1904,
        height: 928,
        alt: `${blogInfo.name}`,
      },
    ],
  },

  // Twitter card metadata
  twitter: {
    card: "summary_large_image",
    title: `${blogInfo.title}`,
    description: blogInfo.description,
    creator: blogInfo.twitterHandle,
    images: [blogInfo.image],
  },
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
