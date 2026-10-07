import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TravelAgence",
  description: "Travel Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}