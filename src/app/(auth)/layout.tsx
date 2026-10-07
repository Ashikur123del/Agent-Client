import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication | Travel",
  description: "Login and Register",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}