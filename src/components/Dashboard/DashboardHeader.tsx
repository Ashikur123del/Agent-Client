
"use client";

import { FaSignOutAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

export default function DashboardHeader() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as { role?: string } | undefined;

  const userRole = user?.role || "user";

  const handleLogout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Agent cookie clear
      document.cookie =
        "agent_verified=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // Better Auth cookies clear
      document.cookie =
        "better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      document.cookie =
        "__Secure-better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

      // Local storage clear
      localStorage.removeItem("agentData");
      localStorage.clear();

      // Login page
      window.location.href = "/login";
    }
  };

  if (isPending) {
    return (
      <header className="sticky top-0 z-30 hidden h-16 items-center border-b border-emerald-100/70 bg-white/90 px-6 shadow-sm backdrop-blur-md lg:flex">
        <p className="text-sm font-semibold text-slate-500">
          Loading...
        </p>
      </header>
    );
  }

  const dashboardTitle =
    userRole === "admin"
      ? "Admin Dashboard"
      : userRole === "agent"
        ? "Agent Dashboard"
        : "User Dashboard";

  return (
    <header className="sticky top-0 z-30 hidden h-16 items-center justify-between border-b border-emerald-100/70 bg-white/90 px-6 shadow-sm backdrop-blur-md lg:flex">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-600">
          TravelAgence
        </p>

        <h1 className="text-lg font-bold text-slate-800">
          {dashboardTitle}
        </h1>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-white px-4 py-2 text-sm font-semibold text-teal-700 shadow-sm transition hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700"
      >
        <FaSignOutAlt className="h-4 w-4" />
        Logout
      </button>
    </header>
  );
}

