"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaUserShield,
  FaUserCheck,
} from "react-icons/fa";
import { handleSignIn } from "@/lib/auth-service";
import { verifyAgent } from "@/lib/serviceapi/agent/api";
import H1 from "@/assets/H-1.avif";

function getSafeCallbackUrl(raw: string | null): string {
  const fallback = "/dashboard";
  if (!raw) return fallback;
  if (raw.startsWith("/") && !raw.startsWith("//") && !raw.startsWith("/\\")) {
    return raw;
  }
  return fallback;
}

function LoginForm() {
  const searchParams = useSearchParams();

  const [loginType, setLoginType] = useState<"user" | "admin">("user");

  const [mobileNo, setMobileNo] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showUserPassword, setShowUserPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTabSwitch = (type: "user" | "admin") => {
    setLoginType(type);
    setError("");
    setShowUserPassword(false);
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const callbackUrl = getSafeCallbackUrl(searchParams.get("callbackUrl"));

    try {
      if (loginType === "user") {
        // Agent login (mobile + password)
        const data = await verifyAgent(
          mobileNo.replace(/\D/g, ""),
          userPassword
        );

        if (data?.success && data?.agent) {
          // Client-side flag (optional) — Better Auth session cookie backend থেকে আসবে
          const isSecure =
            typeof window !== "undefined" &&
            window.location.protocol === "https:";

          localStorage.setItem("agentData", JSON.stringify(data.agent));

          document.cookie = [
            "agent_verified=true",
            "path=/",
            `max-age=${60 * 60 * 24 * 7}`,
            "SameSite=Lax",
            isSecure ? "Secure" : "",
          ]
            .filter(Boolean)
            .join("; ");

          // Full page reload — cookie properly set হওয়ার পর dashboard-এ যাবে
          window.location.href = callbackUrl;
        } else {
          setError(data?.message || data?.error || "Agent login failed");
        }
      } else {
        // Admin login (email + password) — Better Auth
        await handleSignIn(
          { email, password },
          () => {
            window.location.href = callbackUrl;
          },
          (errMsg) => {
            setError(errMsg);
          }
        );
      }
    } catch (err: unknown) {
      console.error("Login Error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left Banner */}
        <div className="relative hidden lg:block">
          <Image
            src={H1}
            alt="Login Banner"
            fill
            priority
            className="object-cover"
            sizes="50vw"
          />
        </div>

        {/* Right Form */}
        <div className="flex items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full max-w-md">
            {/* Tab Switcher */}
            <div className="mb-6 flex rounded-2xl bg-slate-100 p-1.5 shadow-inner">
              <button
                type="button"
                onClick={() => handleTabSwitch("user")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  loginType === "user"
                    ? "bg-white text-emerald-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FaUserCheck className="text-emerald-600" /> User / Agent
              </button>
              <button
                type="button"
                onClick={() => handleTabSwitch("admin")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold transition-all ${
                  loginType === "admin"
                    ? "bg-white text-amber-700 shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FaUserShield className="text-amber-600" /> Admin Email
              </button>
            </div>

            {/* Title */}
            <div className="mb-8">
              <h2 className="text-3xl font-extrabold text-slate-900">
                {loginType === "user" ? "Agent Verification" : "Admin Sign In"}
              </h2>
              <p className="mt-2 text-xs text-slate-600 sm:text-sm">
                {loginType === "user"
                  ? "Enter your registered mobile number and password to enter dashboard."
                  : "Enter your admin email and password to access panel."}
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {loginType === "user" ? (
                <>
                  {/* Mobile */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Mobile Number
                    </label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="tel"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                        placeholder="017xxxxxxxx"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showUserPassword ? "text" : "password"}
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-20 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowUserPassword(!showUserPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600"
                      >
                        {showUserPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Admin Email */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Admin Email
                    </label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                    </div>
                  </div>

                  {/* Admin Password */}
                  <div>
                    <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700">
                      Password
                    </label>
                    <div className="relative">
                      <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password"
                        required
                        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-20 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-emerald-600"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-6 py-3.5 font-bold text-white transition-all hover:opacity-90 disabled:opacity-50"
              >
                {loading
                  ? "Verifying..."
                  : loginType === "user"
                  ? "Access Dashboard"
                  : "Sign In as Admin"}
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>

            {/* Become Agent Link */}
            <p className="mt-6 text-center text-sm text-slate-600">
              New Agent?{" "}
              <Link
                href="/becomeagent"
                className="font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
              >
                Apply Here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center font-medium text-slate-500">
          Loading page...
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}