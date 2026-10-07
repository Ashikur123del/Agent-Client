"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { handleSignUp } from "@/lib/auth-service";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

import H3 from "@/assets/H-3.avif";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    await handleSignUp(
      { email, password, name },
      () => {
        setLoading(false); 
        router.push("/dashboard");
        router.refresh();
      },
      (errMsg) => {
        setError(errMsg);
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="order-2 flex items-center justify-center px-6 py-12 sm:px-10 lg:order-2">
          <div className="w-full max-w-md">
            <Link
              href="/"
              className="mb-10 block text-center text-2xl font-bold text-emerald-700 lg:hidden"
            >
              Travel
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                Agence
              </span>
            </Link>

            <div className="mb-8">
              <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.2em]">
                <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
                <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                  Start Your Journey
                </p>
              </div>

              <h2 className="text-4xl font-extrabold leading-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-3 text-slate-500">
                Join us and start planning your next adventure.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>
                <div className="relative">
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-20 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-6 text-slate-500"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
                  >
                    Terms & Conditions
                  </Link>{" "}
                  and Privacy Policy.
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Create Account"}
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-emerald-600 transition-colors hover:text-emerald-700"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
  
        <div className="relative hidden lg:block order-1 lg:order-1">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${H3.src})`,
            }}
          />
        </div>
      </div>
    </div>
  );
}