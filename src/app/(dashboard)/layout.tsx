import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import DashboardSidebar from "@/components/Dashboard/Sidebar";

export const metadata: Metadata = {
  title: "Dashboard | Travel",
  description: "Travel Admin Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-slate-50/60 text-slate-800">
      <ToastContainer position="top-right" autoClose={3000} />
      <DashboardSidebar />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardHeader />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 pt-7 lg:pt-5">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}