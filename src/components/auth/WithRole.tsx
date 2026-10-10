"use client";

import { ReactNode, useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

type Props = {
  roles: string[];
  children: ReactNode;
};

function getAgentCookieRole(): string | null {
  if (typeof document === "undefined") return null;
  const found = document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith("agent_verified="));
  if (!found) return null;
  const val = found.split("=")[1];
  return val && val !== "" && val !== "false" ? "agent" : null;
}

function resolveRole(sessionRole?: string | null, agentCookie?: string | null) {
  if (sessionRole === "admin") return "admin";
  if (sessionRole === "agent") return "agent";
  if (agentCookie === "agent") return "agent";
  return "user";
}

export default function WithRole({ roles, children }: Props) {
  const { data: session, isPending } = authClient.useSession();
  const [agentRole, setAgentRole] = useState<string | null>(null);

  useEffect(() => {
    setAgentRole(getAgentCookieRole());
  }, []);

  if (isPending) return null;

  const sessionRole = (session?.user as { role?: string } | undefined)?.role;
  const currentRole = resolveRole(sessionRole, agentRole);

  if (!roles.includes(currentRole)) return null;

  return <>{children}</>;
}