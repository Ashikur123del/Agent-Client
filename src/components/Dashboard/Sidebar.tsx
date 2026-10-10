"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FaBars, FaTimes, FaHome, FaSignOutAlt } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { NAV_ITEMS } from "@/config/navigation";
import WithRole from "@/components/auth/WithRole";

function getAgentCookieRole(): string | null {
  if (typeof document === "undefined") return null;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const agentCookie = cookies.find((c) => c.startsWith("agent_verified="));
  if (agentCookie) {
    const val = agentCookie.split("=")[1];
    if (val && val !== "" && val !== "false") return "agent";
  }
  return null;
}

function resolveRole(
  sessionRole?: string | null,
  agentCookieRole?: string | null
): "admin" | "agent" | "user" {
  if (sessionRole === "admin") return "admin";
  if (sessionRole === "agent") return "agent";
  if (agentCookieRole === "agent") return "agent";
  return "user";
}

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [agentRole, setAgentRole] = useState<string | null>(null);

  const { data: session } = authClient.useSession();
  const user = session?.user as { role?: string } | undefined;

  useEffect(() => {
    setAgentRole(getAgentCookieRole());
  }, []);

  const userRole = resolveRole(user?.role, agentRole);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            clearSessionAndRedirect();
          },
        },
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearSessionAndRedirect();
    }
  };

  const clearSessionAndRedirect = () => {
    document.cookie =
      "agent_verified=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie =
      "__Secure-better-auth.session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("agentData");
    localStorage.clear();

    window.location.href = "/login";
  };

  const closeSidebar = () => setSidebarOpen(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      {/* Mobile Top Header */}
      <header className="fixed left-0 right-0 top-0 z-40 flex h-16 items-center justify-between border-b border-emerald-100/70 bg-white/90 px-4 shadow-sm backdrop-blur-md lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-teal-700 transition hover:bg-emerald-100"
        >
          <FaBars className="h-5 w-5" />
        </button>

        <Link href="/dashboard" className="text-lg font-bold text-teal-700">
          Travel<span className="text-cyan-600">Agence</span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 transition hover:bg-amber-100"
        >
          <FaSignOutAlt className="h-4 w-4" />
        </button>
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-gradient-to-b from-teal-900 via-teal-800 to-emerald-950 text-white shadow-2xl shadow-emerald-950/30 transition-transform duration-300 lg:w-64 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <Link
            href="/"
            onClick={closeSidebar}
            className="text-2xl font-bold tracking-wide"
          >
            Travel<span className="text-cyan-200">Agence</span>
          </Link>

          <button
            type="button"
            onClick={closeSidebar}
            className="rounded-lg p-2 text-teal-100 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto p-2">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-200/70">
            {userRole === "admin"
              ? "Admin Menu"
              : userRole === "agent"
              ? "Agent Panel"
              : "User Menu"}
          </p>

          <nav className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);

              return (
                <WithRole key={item.href} roles={item.allowedRoles}>
                  <Link
                    href={item.href}
                    onClick={closeSidebar}
                    className={`group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-white/15 text-white shadow-inner ring-1 ring-white/20"
                        : "text-teal-100 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${
                        active ? "text-cyan-200" : "text-cyan-300"
                      }`}
                    />
                    {item.label}
                  </Link>
                </WithRole>
              );
            })}
          </nav>

          <div className="flex-1" />

          <Link
            href="/"
            onClick={closeSidebar}
            className="mb-3 flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-teal-100 transition hover:bg-white/10 hover:text-white"
          >
            <FaHome className="h-4 w-4 text-emerald-300" />
            Back to Website
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 to-emerald-500/10 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-400/40 hover:bg-amber-500/15"
          >
            <FaSignOutAlt className="h-4 w-4 text-amber-300 transition-transform group-hover:translate-x-0.5" />
            Logout
          </button>
        </div>

        <div className="border-t border-white/10 p-4">
          <p className="text-center text-xs text-teal-200/60">
            © 2026 TravelAgence
          </p>
        </div>
      </aside>
    </>
  );
}