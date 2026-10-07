"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import {
  getHajjahs,
  updateHajjah,
  getErrorMessage,
  type Hajjah,
  type HajjahFormInput,
} from "@/lib/serviceapi/hajjah/api";
import { authClient } from "@/lib/auth-client";
import { createPaymentRequest } from "@/lib/serviceapi/payment/api";
import PaymentRequests from "@/components/PaymentRequests";
import {
  FaSearch,
  FaPhoneAlt,
  FaWhatsapp,
  FaPlus,
  FaTimes,
  FaDownload,
  FaWallet,
  FaUsers,
  FaCheckCircle,
  FaMoneyBillWave,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";
const PAGE_SIZE = 10;
const BD_PHONE = /^01[3-9]\d{8}$/;

/* ---------- helpers ---------- */

function resolvePhoto(photo?: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
  const clean = photo.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^public\//, "");
  return `${API_URL}/${clean}`;
}

const taka = (n: number) => `৳${n.toLocaleString()}`;

const getTotal = (h: Hajjah) => Number(h.totalAmount) || 0;
const getPaid = (h: Hajjah) => Number(h.paidAmount) || 0;
const getDue = (h: Hajjah) => Math.max(getTotal(h) - getPaid(h), 0);

function waLink(h: Hajjah): string | undefined {
  const raw = (h.whatsappNo || h.mobileNo || "").replace(/\D/g, "");
  if (!raw) return undefined;
  const number = raw.startsWith("0") ? `88${raw}` : raw;
  const msg = `Assalamu Alaikum ${h.name}, apnar Hajj package er ${taka(getDue(h))} baki ache. Onugroho kore poriposhod korun. Dhonnobad.`;
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}

function exportCsv(rows: Hajjah[]) {
  const header = ["SL", "Name", "Mobile", "Package", "Total", "Paid", "Due", "Status"];
  const lines = rows.map((h) =>
    [h.slNo, h.name, h.mobileNo, h.packageType ?? "", getTotal(h), getPaid(h), getDue(h), h.status]
      .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`)
      .join(",")
  );
  // BOM dile Excel e bangla nam thik dekhay
  const csv = "\uFEFF" + [header.join(","), ...lines].join("\n");
  const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
  const a = document.createElement("a");
  a.href = url;
  a.download = `due-payments-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

type StatusFilter = "ALL" | "APPROVED" | "PENDING";
type SortKey = "due_desc" | "due_asc" | "name";

/* ---------- small pieces ---------- */

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/80 bg-white/90 p-4 shadow-sm">
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${tone}`}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">{label}</p>
        <p className="truncate text-xl font-extrabold text-slate-900">{value}</p>
      </div>
    </div>
  );
}

function Avatar({ h }: { h: Hajjah }) {
  const photo = resolvePhoto(h.photo);
  return (
    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-slate-200 bg-emerald-100">
      {photo ? (
        <Image src={photo} alt={h.name} fill sizes="44px" unoptimized className="object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-xs font-bold text-emerald-700">
          {h.name?.slice(0, 2).toUpperCase() || "HJ"}
        </div>
      )}
    </div>
  );
}

/* ---------- payment modal (admin) ---------- */

function PaymentModal({
  hajjah,
  mode,
  onClose,
  onSaved,
}: {
  hajjah: Hajjah;
  mode: "direct" | "request";
  onClose: () => void;
  onSaved: () => void;
}) {
  const total = getTotal(hajjah);
  const paid = getPaid(hajjah);
  const due = getDue(hajjah);

  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState(hajjah.paymentMethod || "bKash");
  const [number, setNumber] = useState("");
  const [trx, setTrx] = useState("");
  const [saving, setSaving] = useState(false);

  const amt = Number(amount) || 0;
  const newDue = Math.max(due - amt, 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !saving) onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose, saving]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (saving) return;

    if (amt <= 0) return toast.error("Taka er poriman din");
    if (amt > due) return toast.error(`Baki ${taka(due)} er beshi neya jabe na`);
    if (method !== "Cash" && number && !BD_PHONE.test(number)) {
      return toast.error("Sothik payment number din (01XXXXXXXXX)");
    }

    // Agent: admin er kache request pathay, taka sathe sathe joma hoy na
    if (mode === "request") {
      if (method !== "Cash" && !trx.trim()) return toast.error("Transaction ID dorkar");
      setSaving(true);
      try {
        await createPaymentRequest({
          hajjahId: hajjah.id,
          amount: amt,
          method,
          paymentNumber: number || undefined,
          transactionId: trx.trim() || undefined,
        });
        toast.success("Request pathano hoyeche. Admin approve korle taka joma hobe.");
        onSaved();
        onClose();
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        setSaving(false);
      }
      return;
    }

    const payload: Record<string, unknown> = {
      // Dutoi pathai, jeno backend e Paid > Total check kaj kore
      totalAmount: String(total),
      paidAmount: String(paid + amt),
      paymentMethod: method,
    };
    if (number) payload.paymentNumber = number;
    if (trx.trim()) payload.transactionId = trx.trim();

    setSaving(true);
    try {
      await updateHajjah(hajjah.id, payload as unknown as Partial<HajjahFormInput>);
      toast.success(`${taka(amt)} joma hoyeche${newDue === 0 ? " - shob taka poriposhodh!" : ""}`);
      onSaved();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-[13px] text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 backdrop-blur-sm sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && !saving && onClose()}
    >
      <form
        onSubmit={submit}
        role="dialog"
        aria-modal="true"
        className="w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl"
      >
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              {mode === "request" ? "Payment request" : "Payment joma"}
            </p>
            <h2 className="truncate text-base font-extrabold text-slate-900">{hajjah.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {mode === "request" && (
            <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
              Hajjah taka pathiye thakle tothyo din. Admin taka milie approve korle tobei joma hobe.
            </p>
          )}

          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-slate-50 p-2.5">
              <p className="text-[10px] font-semibold uppercase text-slate-400">Total</p>
              <p className="text-sm font-bold text-slate-800">{taka(total)}</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-2.5">
              <p className="text-[10px] font-semibold uppercase text-slate-400">Paid</p>
              <p className="text-sm font-bold text-emerald-600">{taka(paid)}</p>
            </div>
            <div className="rounded-xl bg-rose-50 p-2.5">
              <p className="text-[10px] font-semibold uppercase text-rose-400">Due</p>
              <p className="text-sm font-bold text-rose-600">{taka(due)}</p>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">
              Joma er poriman (৳) *
            </label>
            <input
              inputMode="numeric"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              placeholder="0"
              autoFocus
              className={inputCls}
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {[1000, 5000, 10000].map((v) => (
                <button
                  key={v}
                  type="button"
                  disabled={v > due}
                  onClick={() => setAmount(String(v))}
                  className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold text-slate-600 transition hover:bg-slate-200 disabled:opacity-40"
                >
                  {taka(v)}
                </button>
              ))}
              <button
                type="button"
                onClick={() => setAmount(String(due))}
                className="rounded-full bg-emerald-50 px-3 py-1 text-[11px] font-bold text-emerald-700 transition hover:bg-emerald-100"
              >
                Full due ({taka(due)})
              </button>
            </div>
            {amt > 0 && (
              <p className="mt-2 text-[11px] text-slate-500">
                Joma er pore baki thakbe:{" "}
                <span className={`font-bold ${newDue === 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {taka(newDue)}
                </span>
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Method
              </label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} className={inputCls}>
                {["bKash", "Nagad", "Bank", "Cash"].map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            {method !== "Cash" && (
              <div>
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Payment number
                </label>
                <input
                  inputMode="tel"
                  maxLength={11}
                  value={number}
                  onChange={(e) => setNumber(e.target.value.replace(/\D/g, ""))}
                  placeholder="01XXXXXXXXX"
                  className={inputCls}
                />
              </div>
            )}
          </div>

          {method !== "Cash" && (
            <div>
              <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-slate-500">
                Transaction ID
              </label>
              <input
                value={trx}
                onChange={(e) => setTrx(e.target.value)}
                placeholder="TrxID"
                className={inputCls}
              />
              <p className="mt-1 text-[11px] text-slate-400">
                Dile ager Transaction ID ei notun ta diye bodle jabe.
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-end gap-2 border-t border-slate-100 px-5 py-3">
          <button
            type="button"
            onClick={onClose}
            disabled={saving}
            className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving || amt <= 0}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FaMoneyBillWave className="text-[11px]" />
            {saving ? "Saving..." : mode === "request" ? "Request pathan" : "Payment joma korun"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ---------- main ---------- */

const DuePayment = () => {
  const { data: session } = authClient.useSession();
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";

  const [all, setAll] = useState<Hajjah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("ALL");
  const [sort, setSort] = useState<SortKey>("due_desc");
  const [page, setPage] = useState(1);
  const [payTarget, setPayTarget] = useState<Hajjah | null>(null);
  const [tab, setTab] = useState<"due" | "requests">("due");

  // Shob hajjah page by page niye ashi (backend e "due" filter nai)
  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const items: Hajjah[] = [];
      let p = 1;
      let totalPages = 1;
      do {
        const res = await getHajjahs({ page: p, limit: 100 });
        items.push(...(res.data || []));
        const meta = (res as any).meta || (res as any).pagination;
        totalPages = meta?.totalPages || 1;
        p++;
      } while (p <= totalPages && p <= 50);
      setAll(items);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // Rejected hajjah der taka nei, tai bad
  const active = useMemo(() => all.filter((h) => h.status !== "REJECTED"), [all]);

  const stats = useMemo(() => {
    const totalAmount = active.reduce((s, h) => s + getTotal(h), 0);
    const totalPaid = active.reduce((s, h) => s + getPaid(h), 0);
    const dueList = active.filter((h) => getDue(h) > 0);
    return {
      totalDue: dueList.reduce((s, h) => s + getDue(h), 0),
      dueCount: dueList.length,
      collectedPercent: totalAmount > 0 ? Math.round((totalPaid / totalAmount) * 100) : 0,
      clearedCount: active.length - dueList.length,
    };
  }, [active]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const digits = q.replace(/\D/g, "");

    const list = active.filter((h) => {
      if (getDue(h) <= 0) return false;
      if (status !== "ALL" && h.status !== status) return false;
      if (!q) return true;
      return (
        h.name?.toLowerCase().includes(q) ||
        (digits.length > 0 && (h.mobileNo || "").includes(digits)) ||
        String(h.slNo) === q
      );
    });

    return list.sort((a, b) => {
      if (sort === "due_desc") return getDue(b) - getDue(a);
      if (sort === "due_asc") return getDue(a) - getDue(b);
      return (a.name || "").localeCompare(b.name || "");
    });
  }, [active, search, status, sort]);

  const totalPages = Math.max(Math.ceil(filtered.length / PAGE_SIZE), 1);
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const filteredDue = filtered.reduce((s, h) => s + getDue(h), 0);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-slate-50 to-amber-50 p-3 sm:p-5">
      <div className="mx-auto max-w-6xl space-y-4">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              Accounts
            </p>
            <h1 className="text-2xl font-extrabold text-slate-900">Due Payments</h1>
            <p className="text-xs text-slate-500">
              Jader taka ekhono baki, tader list. {isAdmin ? "Ekhan theke sorasori ba request approve kore joma ney jabe." : "Taka pele Payment pathan chapun, admin approve korle joma hobe."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => exportCsv(filtered)}
            disabled={filtered.length === 0}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg bg-white px-4 py-2 text-xs font-bold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-50 sm:self-auto"
          >
            <FaDownload className="text-[11px]" /> Export CSV
          </button>
        </div>

        {/* Tabs */}
        <div className="flex w-fit gap-1 rounded-xl bg-white/80 p-1 shadow-sm ring-1 ring-slate-100">
          {(
            [
              { key: "due", label: "Baki list" },
              { key: "requests", label: "Payment requests" },
            ] as const
          ).map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                tab === t.key
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "requests" ? (
          <PaymentRequests isAdmin={isAdmin} onChanged={fetchAll} />
        ) : (
          <>
        {/* Stats */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            icon={<FaWallet />}
            label="Total baki"
            value={taka(stats.totalDue)}
            tone="bg-rose-50 text-rose-500"
          />
          <StatCard
            icon={<FaUsers />}
            label="Baki ache emon hajjah"
            value={String(stats.dueCount)}
            tone="bg-amber-50 text-amber-600"
          />
          <StatCard
            icon={<FaCheckCircle />}
            label={`Collected (${stats.clearedCount} jon poriposhodh)`}
            value={`${stats.collectedPercent}%`}
            tone="bg-emerald-50 text-emerald-600"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-3 rounded-2xl border border-white/80 bg-white/90 p-3 shadow-sm sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-400" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Name, mobile ba SL no diye khujun..."
              className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-8 pr-8 text-xs text-slate-700 outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="Clear"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <FaTimes className="text-[10px]" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {(["ALL", "APPROVED", "PENDING"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setStatus(s);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1.5 text-[11px] font-semibold transition ${
                  status === s
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {s === "ALL" ? "All" : s === "APPROVED" ? "Approved" : "Pending"}
              </button>
            ))}

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-600 outline-none"
              aria-label="Sort"
            >
              <option value="due_desc">Beshi baki age</option>
              <option value="due_asc">Kom baki age</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-2xl border border-white/80 bg-white/90 shadow-sm">
          {loading ? (
            <div className="animate-pulse divide-y divide-slate-100">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-4">
                  <div className="h-11 w-11 rounded-full bg-slate-200" />
                  <div className="flex-1 space-y-2">
                    <div className="h-3 w-1/3 rounded bg-slate-200" />
                    <div className="h-2.5 w-1/2 rounded bg-slate-100" />
                  </div>
                  <div className="h-6 w-20 rounded bg-slate-200" />
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="space-y-3 py-12 text-center">
              <p className="text-sm font-semibold text-rose-500">{error}</p>
              <button
                type="button"
                onClick={fetchAll}
                className="rounded-md border border-rose-200 bg-rose-50 px-4 py-1.5 text-xs text-rose-600 hover:bg-rose-100"
              >
                Try again
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center">
              <FaCheckCircle className="mx-auto mb-3 text-3xl text-emerald-400" />
              <p className="text-sm font-semibold text-slate-700">
                {search || status !== "ALL"
                  ? "Ei filter e kono baki payment nei"
                  : "Shobar taka poriposhodh hoyeche"}
              </p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2 text-[11px] text-slate-500">
                <span>
                  <span className="font-bold text-slate-700">{filtered.length}</span> jon
                </span>
                <span>
                  Moth baki:{" "}
                  <span className="font-bold text-rose-600">{taka(filteredDue)}</span>
                </span>
              </div>

              <ul className="divide-y divide-slate-100">
                {pageItems.map((h) => {
                  const total = getTotal(h);
                  const paid = getPaid(h);
                  const due = getDue(h);
                  const percent = total > 0 ? Math.min(Math.round((paid / total) * 100), 100) : 0;
                  const wa = waLink(h);

                  return (
                    <li
                      key={h.id}
                      className="flex flex-col gap-3 p-4 transition-colors hover:bg-slate-50/70 lg:flex-row lg:items-center"
                    >
                      {/* Hajjah */}
                      <div className="flex min-w-0 items-center gap-3 lg:w-1/3">
                        <Avatar h={h} />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-slate-800">{h.name}</p>
                          <p className="text-[11px] text-slate-400">
                            SL #{h.slNo} · {h.packageType || "—"} ·{" "}
                            <span
                              className={
                                h.status === "APPROVED" ? "text-emerald-600" : "text-amber-600"
                              }
                            >
                              {h.status}
                            </span>
                          </p>
                          <p className="font-mono text-[11px] text-slate-500">{h.mobileNo}</p>
                        </div>
                      </div>

                      {/* Progress */}
                      <div className="flex-1">
                        <div className="mb-1 flex items-center justify-between text-[11px] text-slate-500">
                          <span>
                            Paid <span className="font-semibold text-slate-700">{taka(paid)}</span>{" "}
                            / {taka(total)}
                          </span>
                          <span className="font-semibold">{percent}%</span>
                        </div>
                        <div
                          className="h-2 overflow-hidden rounded-full bg-slate-200"
                          role="progressbar"
                          aria-valuenow={percent}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        >
                          <div
                            className={`h-full rounded-full ${
                              percent >= 70
                                ? "bg-emerald-500"
                                : percent >= 30
                                ? "bg-amber-500"
                                : "bg-rose-500"
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      {/* Due + actions */}
                      <div className="flex items-center justify-between gap-3 lg:w-64 lg:justify-end">
                        <div className="text-left lg:text-right">
                          <p className="text-[10px] font-semibold uppercase text-slate-400">Due</p>
                          <p className="text-lg font-extrabold text-rose-600">{taka(due)}</p>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${h.mobileNo}`}
                            aria-label="Call"
                            title="Call"
                            className="rounded-lg bg-slate-100 p-2.5 text-slate-600 transition hover:bg-slate-200"
                          >
                            <FaPhoneAlt className="text-xs" />
                          </a>
                          {wa && (
                            <a
                              href={wa}
                              target="_blank"
                              rel="noreferrer"
                              aria-label="WhatsApp reminder"
                              title="WhatsApp e reminder pathan"
                              className="rounded-lg bg-green-50 p-2.5 text-green-600 transition hover:bg-green-100"
                            >
                              <FaWhatsapp className="text-sm" />
                            </a>
                          )}
                          {session && (
                            <button
                              type="button"
                              onClick={() => setPayTarget(h)}
                              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-[11px] font-bold text-white transition hover:bg-emerald-700"
                            >
                              <FaPlus className="text-[9px]" /> {isAdmin ? "Payment" : "Payment pathan"}
                            </button>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50 px-4 py-3 text-xs text-slate-600">
                  <span>
                    Page <span className="font-semibold">{safePage}</span> of{" "}
                    <span className="font-semibold">{totalPages}</span>
                  </span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={safePage === 1}
                      onClick={() => setPage(safePage - 1)}
                      className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      disabled={safePage >= totalPages}
                      onClick={() => setPage(safePage + 1)}
                      className="rounded-md border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
          </>
        )}
      </div>

      {payTarget && (
        <PaymentModal
          hajjah={payTarget}
          mode={isAdmin ? "direct" : "request"}
          onClose={() => setPayTarget(null)}
          onSaved={fetchAll}
        />
      )}
    </div>
  );
};

export default DuePayment;