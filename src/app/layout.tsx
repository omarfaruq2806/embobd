import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "EMBOBD - বাংলাদেশের এমব্রয়ডারি শিল্পের ১ নম্বর মার্কেটপ্লেস ও কমিউনিটি",
  description: "অভিজ্ঞ ডিজিটাইজার, দক্ষ অপারেটর খুঁজুন কিংবা আপনার বুটিক ও ফ্যাক্টরির জন্য সেরা কাজের সুযোগ তৈরি করুন — সবকিছু এক ঠিকানায়।",
  keywords: ["embroidery bangladesh", "wilcom digitizer", "embroidery jobs dhaka", "embroidery factory bangladesh", "এমব্রয়ডারি চাকরি", "ডিজিটাইজার নিয়োগ"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" className="h-full bg-white text-zinc-900">
      <body className="flex min-h-full flex-col bg-white text-zinc-900 antialiased selection:bg-zinc-900 selection:text-white">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
