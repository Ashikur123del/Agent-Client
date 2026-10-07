"use client";

import React from "react";
import Link from "next/link";
import {
  FaNewspaper,
  FaImages,
  FaArrowRight,
  FaChartLine,
  FaCheckCircle,
} from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

import WithRole from "@/components/auth/WithRole";
import BecomeAgentDash from "@/components/BecomeAgentDash/BecomeAgentDash";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user as (typeof session & { role?: string }) | undefined;
  const userRole = user?.role || "user";
  const userName = session?.user?.name || "User";

  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
          <p className="text-sm font-semibold text-slate-500">
            Loading dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 lg:py-2 lg:px-2">
      {/* Dynamic Header */}
    {userRole === "admin" && ( <div className="mb-3 rounded-3xl bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-950 p-3 text-white shadow-xl"> <div className="max-w-2xl"> <span className="mb-3 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-300"> Admin Panel </span> <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl"> Welcome, {userName}! </h1> </div> </div> )}

      {/* 1. ADMIN DASHBOARD */}
      <WithRole roles={["admin"]}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-3 text-emerald-600">
                <FaImages className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Home Slider</h3>
            <p className="mt-1 text-sm text-slate-500">Manage slider images.</p>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <Link
                href="/heroslider"
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                Add Sliders <FaArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-cyan-50 p-3 text-cyan-600">
                <FaNewspaper className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Travel News</h3>
            <p className="mt-1 text-sm text-slate-500">Manage articles and news.</p>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <Link
                href="/addnews"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-700"
              >
                Add News <FaArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-xl bg-amber-50 p-3 text-amber-600">
                <FaChartLine className="h-6 w-6" />
              </div>
            </div>
            <h3 className="text-lg font-bold text-slate-900">Gallery</h3>
            <p className="mt-1 text-sm text-slate-500">Manage photo gallery.</p>
            <div className="mt-6 border-t border-slate-100 pt-4">
              <Link
                href="/addgallery"
                className="inline-flex items-center gap-2 text-sm font-semibold text-amber-600 hover:text-amber-700"
              >
                Add Gallery <FaArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </WithRole>

     
      <WithRole roles={["agent"]}>
        <div className="rounded-2xl border border-emerald-200 bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center gap-3 text-emerald-600">
            <FaCheckCircle className="h-8 w-8" />
            <h2 className="text-2xl font-bold text-slate-900">
              Verified Agent Dashboard
            </h2>
          </div>
          <p className="text-slate-600">
            আপনার Agent Profile এক্টিভ আছে। এখন থেকে আপনি আপনার এজেন্ট সার্ভিস এবং বুকিং সুবিধা অ্যাক্সেস করতে পারবেন।
          </p>
        </div>
      </WithRole>

      {/* 3. REGULAR USER (Shows Registration Form) */}
      <WithRole roles={["user"]}>
        <div className="">
          <BecomeAgentDash />
        </div>
      </WithRole>
    </div>
  );
}