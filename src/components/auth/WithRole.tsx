"use client";

import { authClient } from "@/lib/auth-client";
import { ReactNode, useEffect, useState } from "react";

interface WithRoleProps {
  roles: string[];
  children: ReactNode;
  fallback?: ReactNode;
}

// Agent cookie থেকে role বের করা
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

export default function WithRole({
  roles,
  children,
  fallback = null,
}: WithRoleProps) {
  const { data: session } = authClient.useSession();
  const [agentRole, setAgentRole] = useState<string | null>(null);

  useEffect(() => {
    setAgentRole(getAgentCookieRole());
  }, []);

  const user = session?.user as (typeof session & { role?: string }) | undefined;
  // Admin-এর session role অথবা Agent cookie-র role
  const userRole = user?.role || agentRole || "user";

  if (!roles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}