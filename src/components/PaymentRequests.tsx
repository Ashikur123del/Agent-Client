"use client";

import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getPaymentRequests,
  reviewPaymentRequest,
  cancelPaymentRequest,
  type PaymentRequestItem,
  type PaymentRequestStatus,
} from "@/lib/serviceapi/payment/api";
import { FaCheck, FaTimes, FaTrash, FaInbox } from "react-icons/fa";

const taka = (n: number) => `৳${n.toLocaleString()}`;
const errMsg = (e: unknown) => (e instanceof Error ? e.message : "Something went wrong");

type Filter = "ALL" | PaymentRequestStatus;

const STATUS_STYLE: Record<PaymentRequestStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  REJECTED: "bg-rose-50 text-rose-700 ring-rose-200",
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: "PENDING", label: "Pending" },
  { key: "APPROVED", label: "Approved" },
  { key: "REJECTED", label: "Rejected" },
  { key: "ALL", label: "All" },
];

export default function PaymentRequests({
  isAdmin,
  onChanged,
}: {
  isAdmin: boolean;
  onChanged?: () => void;
}) {
  const [items, setItems] = useState<PaymentRequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Filter>("PENDING");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getPaymentRequests({
        status: filter === "ALL" ? undefined : filter,
        page,
        limit: 10,
      });
      setItems(res.data || []);
      setTotalPages(res.meta?.totalPages || 1);
      setTotal(res.meta?.total ?? 0);
    } catch (e) {
      setError(errMsg(e));
    } finally {
      setLoading(false);
    }
  }, [filter, page]);

  useEffect(() => {
    load();
  }, [load]);

  const approve = async (r: PaymentRequestItem) => {
    if (
      !window.confirm(
        `${r.hajjah?.name ?? "Hajjah"} er ${taka(r.amount)} approve korben? Taka sathe sathe joma hoye jabe.`
      )
    )
      return;
    setBusyId(r.id);
    try {
      const res = await reviewPaymentRequest(r.id, "APPROVED");
      toast.success(res.message);
      await load();
      onChanged?.();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusyId(null);
    }
  };

  const reject = async (r: PaymentRequestItem) => {
    const reason = window.prompt("Reject korar karon likhun:");
    if (!reason?.trim()) return;
    setBusyId(r.id);
    try {
      const res = await reviewPaymentRequest(r.id, "REJECTED", reason.trim());
      toast.info(res.message);
      await load();
      onChanged?.();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusyId(null);
    }
  };

  const cancel = async (r: PaymentRequestItem) => {
    if (!window.confirm("Ei request cancel korben?")) return;
    setBusyId(r.id);
    try {
      await cancelPaymentRequest(r.id);
      toast.info("Request cancel kora hoyeche");
      await load();
    } catch (e) {
      toast.error(errMsg(e));
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="space-y-3">
      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => {
              setFilter(f.key);
              setPage(1);
            }}
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
              filter === f.key
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto text-[11px] text-slate-400">{total} ti request</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-sm">
        {loading ? (
          <div className="animate-pulse divide-y divide-slate-100">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-2 p-4">
                <div className="h-3 w-1/3 rounded bg-slate-200" />
                <div className="h-2.5 w-1/2 rounded bg-slate-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="space-y-3 py-12 text-center">
            <p className="text-sm font-semibold text-rose-500">{error}</p>
            <button
              type="button"
              onClick={load}
              className="rounded-md border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs text-rose-600 hover:bg-rose-100"
            >
              Try again
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center">
            <FaInbox className="mx-auto mb-3 text-3xl text-slate-300" />
            <p className="text-sm font-semibold text-slate-600">
              {filter === "PENDING" ? "Kono pending request nei" : "Kono request nei"}
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((r) => {
              const busy = busyId === r.id;
              return (
                <li key={r.id} className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {r.hajjah?.name ?? "—"}
                      </p>
                      <span className="text-[11px] text-slate-400">SL #{r.hajjah?.slNo}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ring-1 ${STATUS_STYLE[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-500">
                      {r.method}
                      {r.paymentNumber ? ` · ${r.paymentNumber}` : ""}
                      {r.transactionId ? ` · Trx: ${r.transactionId}` : ""}
                    </p>

                    <p className="mt-0.5 text-[11px] text-slate-400">
                      {isAdmin && r.agent ? `Agent: ${r.agent.name} · ` : ""}
                      {new Date(r.createdAt).toLocaleString("en-GB")}
                    </p>

                    {r.status === "REJECTED" && r.rejectReason && (
                      <p className="mt-1 rounded-lg bg-rose-50 px-2.5 py-1 text-[11px] text-rose-600">
                        Karon: {r.rejectReason}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-3 lg:justify-end">
                    <p className="text-lg font-extrabold text-slate-900">{taka(r.amount)}</p>

                    {busy ? (
                      <span className="text-xs text-slate-400">Processing...</span>
                    ) : r.status === "PENDING" ? (
                      isAdmin ? (
                        <div className="flex gap-1.5">
                          <button
                            type="button"
                            onClick={() => approve(r)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white hover:bg-emerald-700"
                          >
                            <FaCheck className="text-[10px]" /> Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => reject(r)}
                            className="inline-flex items-center gap-1.5 rounded-lg bg-rose-50 px-3 py-2 text-[11px] font-bold text-rose-600 hover:bg-rose-100"
                          >
                            <FaTimes className="text-[10px]" /> Reject
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => cancel(r)}
                          className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-2 text-[11px] font-semibold text-slate-600 hover:bg-slate-200"
                        >
                          <FaTrash className="text-[10px]" /> Cancel
                        </button>
                      )
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

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
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}