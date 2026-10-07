import type { Metadata } from "next";
import "../globals.css";

import { ToastContainer } from "react-toastify";
import Navbar from "@/components/Shard/Navbar";
import Footer from "@/components/Shard/Footer";
import GoogleTranslator from "@/components/GoogleTranslator";

export const metadata: Metadata = {
  title: "Travel",
  description: "Travel Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleTranslator />

        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

        <Footer />

        <ToastContainer />
      </body>
    </html>
  );
}