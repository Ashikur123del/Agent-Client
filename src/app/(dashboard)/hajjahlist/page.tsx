"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  getHajjahs,
  getHajjahStats,
  approveHajjah,
  rejectHajjah,
  reopenHajjah,
  deleteHajjah,
  getErrorMessage,
  type Hajjah,
  type HajjahFilters,
  type HajjahStatus,
  type HajjahStatusCounts,
} from "../../../lib/serviceapi/hajjah/api";
import { toast } from "react-toastify";
import {
  FaSearch,
  FaTrash,
  FaCheck,
  FaTimes,
  FaEye,
  FaEdit,
  FaPhoneAlt,
  FaIdCard,
  FaPassport,
  FaUndo,
} from "react-icons/fa";
import HajjahViewModal from "@/components/HajjahViewModal";
// ⚠️ file er asol nam ja, ta-i likhun (age "ajjahEditModal" chhilo)
import HajjahEditModal from "@/components/ajjahEditModal";
import { authClient } from "@/lib/auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

const STATUS_TABS: { key: string; label: string }[] = [
  { key: "", label: "All" },
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
];

const STATUS_STYLE: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-700",
  APPROVED: "bg-emerald-100 text-emerald-700",
  REJECTED: "bg-rose-100 text-rose-700",
};

function resolvePhoto(photo?: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
  // Windows backslash thakle thik kore nei
  const clean = photo.replace(/\\/g, "/").replace(/^\/+/, "");
  return `${API_URL}/${clean.replace(/^public\//, "")}`;
}

function getDue(item: Hajjah): number {
  const total = Number(item.totalAmount) || 0;
  const paid = Number(item.paidAmount) || 0;
  return Math.max(total - paid, 0);
}

export default function HajjahList() {
  const { data: session } = authClient.useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";

  const [hajjahs, setHajjahs] = useState<Hajjah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Search fields
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileFilter, setMobileFilter] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [debouncedMobile, setDebouncedMobile] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Pagination
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const [stats, setStats] = useState<HajjahStatusCounts | null>(null);

  // Modals
  const [viewId, setViewId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  // Debounce name/search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Debounce mobile
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedMobile(mobileFilter);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [mobileFilter]);

  const fetchHajjahs = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const filters: HajjahFilters = {
        page,
        limit,
        ...(debouncedSearch && { search: debouncedSearch }),
        ...(debouncedMobile && { mobileNo: debouncedMobile }),
        ...(statusFilter && { status: statusFilter as HajjahStatus }),
      };

      const res = await getHajjahs(filters);

      setHajjahs(res.data || []);
      const meta = (res as any).meta || (res as any).pagination;
      setTotalPages(meta?.totalPages || 1);
      setTotalCount(meta?.total ?? res.data?.length ?? 0);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [page, limit, debouncedSearch, debouncedMobile, statusFilter]);

  const fetchStats = useCallback(async () => {
    try {
      const data = await getHajjahStats();
      setStats(data);
    } catch {
      // optional
    }
  }, []);

  useEffect(() => {
    fetchHajjahs();
  }, [fetchHajjahs]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const refreshAll = async () => {
    await Promise.all([fetchHajjahs(), fetchStats()]);
  };

  const handleApprove = async (id: string) => {
    if (!window.confirm("Approve this application?")) return;
    setActionLoadingId(id);
    try {
      await approveHajjah(id);
      toast.success("Application approved");
      await refreshAll();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt("Enter rejection reason:");
    if (!reason?.trim()) return;

    setActionLoadingId(id);
    try {
      await rejectHajjah(id, reason.trim());
      toast.info("Application rejected");
      await refreshAll();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleReopen = async (id: string) => {
    if (!window.confirm("Reopen this application to Pending?")) return;
    setActionLoadingId(id);
    try {
      await reopenHajjah(id);
      toast.success("Application reopened to Pending");
      await refreshAll();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    setActionLoadingId(id);
    try {
      await deleteHajjah(id);
      toast.info("Record deleted");
      await refreshAll();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setActionLoadingId(null);
    }
  };

  const getTabCount = (key: string): number | null => {
    if (!stats) return null;
    if (key === "") {
      return (
        (stats.PENDING || 0) + (stats.APPROVED || 0) + (stats.REJECTED || 0)
      );
    }
    return stats[key as HajjahStatus] ?? null;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-slate-50 to-amber-50 p-3 sm:p-5">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* Header */}
        <div className="rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm backdrop-blur-md sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
                Hajjah List
              </h1>
              <p className="mt-0.5 text-xs text-slate-500">
                Total registered:{" "}
                <span className="font-semibold text-emerald-600">
                  {totalCount}
                </span>
              </p>
            </div>

            {/* Search fields */}
            <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center lg:w-auto">
              {/* Name / general search */}
              <div className="relative w-full sm:w-56">
                <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                )}
              </div>

              {/* Mobile search */}
              <div className="relative w-full sm:w-48">
                <FaPhoneAlt className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-400" />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="Search by mobile..."
                  value={mobileFilter}
                  onChange={(e) =>
                    setMobileFilter(e.target.value.replace(/\D/g, "").slice(0, 11))
                  }
                  maxLength={11}
                  className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                />
                {mobileFilter && (
                  <button
                    type="button"
                    onClick={() => setMobileFilter("")}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <FaTimes className="text-[10px]" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-3">
            {STATUS_TABS.map((tab) => {
              const count = getTabCount(tab.key);
              const active = statusFilter === tab.key;
              return (
                <button
                  key={tab.key || "all"}
                  type="button"
                  onClick={() => {
                    setStatusFilter(tab.key);
                    setPage(1);
                  }}
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                    active
                      ? "bg-emerald-600 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {tab.label}
                  {count !== null && (
                    <span
                      className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
                        active ? "bg-white/20" : "bg-white text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-sm backdrop-blur-md">
          {loading ? (
            <div className="py-16 text-center text-slate-500">
              <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent" />
              <p className="text-sm font-medium">Loading...</p>
            </div>
          ) : error ? (
            <div className="space-y-3 py-12 text-center text-red-500">
              <p className="text-base font-semibold">{error}</p>
              <button
                type="button"
                onClick={fetchHajjahs}
                className="rounded-md border border-red-200 bg-red-50 px-4 py-1.5 text-xs text-red-600 transition hover:bg-red-100"
              >
                Try Again
              </button>
            </div>
          ) : hajjahs.length === 0 ? (
            <div className="py-16 text-center text-slate-400">
              <p className="text-base font-medium">No hajjah records found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="border-b border-slate-100 bg-slate-50 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-4 py-3">Hajjah</th>
                    <th className="px-4 py-3">Contact</th>
                    <th className="px-4 py-3">ID Documents</th>
                    <th className="px-4 py-3">Package</th>
                    <th className="px-4 py-3">Due</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {hajjahs.map((item) => {
                    const due = getDue(item);
                    const isProcessing = actionLoadingId === item.id;
                    const photo = resolvePhoto(item.photo);

                    return (
                      <tr
                        key={item.id}
                        className="transition-colors hover:bg-slate-50/80"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            {photo ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={photo}
                                alt={item.name}
                                className="h-10 w-10 rounded-full border border-slate-200 object-cover"
                              />
                            ) : (
                              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                                {item.name?.slice(0, 2).toUpperCase() || "HJ"}
                              </div>
                            )}
                            <div>
                              <p className="font-semibold text-slate-800">
                                {item.name}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                SL #{item.slNo} · {item.gender}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3">
                          <p className="flex items-center gap-1 font-mono text-xs text-slate-700">
                            <FaPhoneAlt className="text-[9px] text-slate-400" />
                            {item.mobileNo}
                          </p>
                          <p className="mt-0.5 text-[10px] text-slate-400">
                            {item.district || "—"}
                          </p>
                        </td>

                        <td className="px-4 py-3 text-xs">
                          <p className="flex items-center gap-1">
                            <FaPassport className="text-[9px] text-slate-400" />
                            {item.passportNo}
                          </p>
                          <p className="mt-0.5 flex items-center gap-1 text-slate-500">
                            <FaIdCard className="text-[9px] text-slate-400" />
                            {item.nidNo}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-700">
                            {item.packageType || "—"}
                          </span>
                        </td>

                        <td className="px-4 py-3">
                          <p
                            className={`text-xs font-semibold ${
                              due > 0 ? "text-red-600" : "text-emerald-600"
                            }`}
                          >
                            ৳{due.toLocaleString()}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Paid ৳{(item.paidAmount || 0).toLocaleString()} /{" "}
                            {(item.totalAmount || 0).toLocaleString()}
                          </p>
                        </td>

                        <td className="px-4 py-3">
                          <span
                            className={`inline-block rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                              STATUS_STYLE[item.status] ||
                              "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.status}
                          </span>
                          {item.status === "REJECTED" && item.rejectReason && (
                            <p
                              className="mt-1 max-w-[120px] truncate text-[10px] text-rose-500"
                              title={item.rejectReason}
                            >
                              {item.rejectReason}
                            </p>
                          )}
                        </td>

                        <td className="px-4 py-3 text-right">
                          {isProcessing ? (
                            <span className="text-xs text-slate-400">
                              Processing...
                            </span>
                          ) : (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                type="button"
                                title="View"
                                className="rounded p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                                onClick={() => setViewId(item.id)}
                              >
                                <FaEye className="text-xs" />
                              </button>

                              {/* Agent approved hajjah edit korte pare na */}
                              {(isAdmin || item.status !== "APPROVED") && (
                                <button
                                  type="button"
                                  title="Edit"
                                  className="rounded p-1.5 text-blue-500 transition hover:bg-blue-50"
                                  onClick={() => setEditId(item.id)}
                                >
                                  <FaEdit className="text-xs" />
                                </button>
                              )}

                              {/* Approve / Reject / Reopen shudhu Admin */}
                              {isAdmin && item.status === "PENDING" && (
                                <button
                                  type="button"
                                  title="Approve"
                                  onClick={() => handleApprove(item.id)}
                                  className="rounded p-1.5 text-emerald-600 transition hover:bg-emerald-50"
                                >
                                  <FaCheck className="text-xs" />
                                </button>
                              )}

                              {isAdmin && item.status === "PENDING" && (
                                <button
                                  type="button"
                                  title="Reject"
                                  onClick={() => handleReject(item.id)}
                                  className="rounded p-1.5 text-amber-600 transition hover:bg-amber-50"
                                >
                                  <FaTimes className="text-xs" />
                                </button>
                              )}

                              {isAdmin && item.status === "REJECTED" && (
                                <button
                                  type="button"
                                  title="Reopen to Pending"
                                  onClick={() => handleReopen(item.id)}
                                  className="rounded p-1.5 text-blue-600 transition hover:bg-blue-50"
                                >
                                  <FaUndo className="text-xs" />
                                </button>
                              )}

                              {item.status !== "APPROVED" && (
                                <button
                                  type="button"
                                  title="Delete"
                                  onClick={() =>
                                    handleDelete(item.id, item.name)
                                  }
                                  className="rounded p-1.5 text-rose-600 transition hover:bg-rose-50"
                                >
                                  <FaTrash className="text-xs" />
                                </button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && !error && totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
              <span>
                Page <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{totalPages}</span>
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* View Modal */}
      <HajjahViewModal hajjahId={viewId} onClose={() => setViewId(null)} />

      {/* Edit Modal */}
      <HajjahEditModal
        hajjahId={editId}
        onClose={() => setEditId(null)}
        onUpdated={refreshAll}
      />
    </div>
  );
}