"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  getHajjahById,
  getErrorMessage,
  type Hajjah,
} from "@/lib/serviceapi/hajjah/api";
import {
  FaTimes,
  FaPhoneAlt,
  FaWhatsapp,
  FaPassport,
  FaIdCard,
  FaCopy,
  FaCheck,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaHeartbeat,
  FaPlane,
  FaWallet,
  FaUserShield,
  FaUser,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function resolvePhoto(photo?: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
  const clean = photo
    .replace(/\\/g, "/")
    .replace(/^\/+/, "")
    .replace(/^public\//, "");
  return `${API_URL}/${clean}`;
}

function formatDate(value?: string | Date | null) {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function calcAge(dob?: string | Date | null): number | null {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
}

function monthsUntil(value?: string | Date | null): number | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24 * 30);
}

const STATUS_STYLE: Record<string, { pill: string; dot: string }> = {
  PENDING: { pill: "bg-amber-500/10 text-amber-700 ring-amber-500/30", dot: "bg-amber-500" },
  APPROVED: { pill: "bg-emerald-500/10 text-emerald-700 ring-emerald-500/30", dot: "bg-emerald-500" },
  REJECTED: { pill: "bg-rose-500/10 text-rose-700 ring-rose-500/30", dot: "bg-rose-500" },
};

type TabKey = "overview" | "documents" | "health" | "payment";

const TABS: { key: TabKey; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Overview", icon: <FaUser /> },
  { key: "documents", label: "Documents", icon: <FaPassport /> },
  { key: "health", label: "Health & Travel", icon: <FaHeartbeat /> },
  { key: "payment", label: "Payment", icon: <FaWallet /> },
];

/* ---------- Reusable Smart Components ---------- */

function Field({
  label,
  value,
  copy = false,
  onCopied,
  wide = false,
}: {
  label: string;
  value?: React.ReactNode;
  copy?: boolean;
  onCopied?: () => void;
  wide?: boolean;
}) {
  const isEmpty = value === undefined || value === null || value === "" || value === "—";
  const raw = typeof value === "string" || typeof value === "number" ? String(value) : "";

  return (
    <div className={`group relative rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-slate-200 hover:bg-slate-50 ${wide ? "col-span-1 sm:col-span-2" : "col-span-1"}`}>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <div className="mt-1 flex items-center justify-between gap-2">
        <div className={`min-w-0 break-words text-xs sm:text-sm font-semibold ${isEmpty ? "text-slate-300 italic font-normal" : "text-slate-800"}`}>
          {isEmpty ? "Not provided" : value}
        </div>
        {copy && !isEmpty && raw && (
          <button
            type="button"
            aria-label={`Copy ${label}`}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(raw);
                onCopied?.();
              } catch {}
            }}
            className="shrink-0 rounded-lg bg-white p-1.5 text-slate-400 shadow-sm transition hover:text-emerald-600 active:scale-95 border border-slate-200/60"
          >
            <FaCopy className="text-[11px]" />
          </button>
        )}
      </div>
    </div>
  );
}

function Group({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3">
      <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">{icon}</span>
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">{children}</div>
    </section>
  );
}

function Alert({
  tone,
  children,
}: {
  tone: "warn" | "danger";
  children: React.ReactNode;
}) {
  const cls =
    tone === "danger"
      ? "border-rose-200 bg-rose-50/80 text-rose-800"
      : "border-amber-200 bg-amber-50/80 text-amber-800";
  return (
    <div className={`flex items-start gap-2.5 rounded-2xl border p-3.5 text-xs font-medium shadow-sm ${cls}`}>
      <FaExclamationTriangle className="mt-0.5 shrink-0 text-sm" />
      <div className="leading-relaxed">{children}</div>
    </div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse space-y-5 p-6">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-2xl bg-slate-200 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-5 w-1/2 rounded-md bg-slate-200" />
          <div className="h-3 w-1/3 rounded-md bg-slate-200" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-14 rounded-xl bg-slate-100" />
        ))}
      </div>
    </div>
  );
}

/* ---------- Main Component ---------- */

type Props = {
  hajjahId: string | null;
  onClose: () => void;
};

export default function HajjahViewModal({ hajjahId, onClose }: Props) {
  const [data, setData] = useState<Hajjah | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>("overview");
  const [copiedMsg, setCopiedMsg] = useState(false);

  useEffect(() => {
    if (!hajjahId) {
      setData(null);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setTab("overview");

    getHajjahById(hajjahId)
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((err) => {
        if (!cancelled) setError(getErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [hajjahId]);

  useEffect(() => {
    if (!hajjahId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [hajjahId, onClose]);

  useEffect(() => {
    if (!copiedMsg) return;
    const t = setTimeout(() => setCopiedMsg(false), 1500);
    return () => clearTimeout(t);
  }, [copiedMsg]);

  const onCopied = useCallback(() => setCopiedMsg(true), []);

  const view = useMemo(() => {
    if (!data) return null;
    const total = Number(data.totalAmount) || 0;
    const paid = Number(data.paidAmount) || 0;
    const due = Math.max(total - paid, 0);
    const percent = total > 0 ? Math.min(Math.round((paid / total) * 100), 100) : 0;
    const age = calcAge(data.dob);
    const passportMonths = monthsUntil(data.passportExpiry);
    const wa = (data.whatsappNo || data.mobileNo || "").replace(/\D/g, "");
    const waLink = wa ? `https://wa.me/${wa.startsWith("0") ? "88" + wa : wa}` : undefined;
    return { total, paid, due, percent, age, passportMonths, waLink };
  }, [data]);

  if (!hajjahId) return null;

  const photo = resolvePhoto(data?.photo);
  const status = data ? STATUS_STYLE[data.status] ?? STATUS_STYLE.PENDING : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/60 p-0 backdrop-blur-md transition-all sm:items-center sm:p-4"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Hajjah details"
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl transition-all sm:rounded-3xl"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-30 flex h-8 w-8 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-black/40 active:scale-95"
        >
          <FaTimes className="text-sm" />
        </button>

        {loading && <LoadingSkeleton />}

        {error && (
          <div className="p-8 text-center sm:p-12">
            <p className="text-sm font-semibold text-rose-600">{error}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 rounded-xl bg-slate-100 px-5 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        )}

        {!loading && !error && data && view && status && (
          <>
            {/* ===== Header / Hero ===== */}
            <div className="relative bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-5 sm:p-6 text-white shrink-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-white/80 bg-emerald-900/30 shadow-md">
                  {photo ? (
                    <Image
                      src={photo}
                      alt={data.name}
                      fill
                      sizes="80px"
                      unoptimized
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-2xl font-black text-emerald-100">
                      {data.name?.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1 pr-6 sm:pr-0">
                  <span className="inline-block text-[10px] font-bold tracking-widest text-emerald-200 uppercase">
                    SL #{data.slNo}
                  </span>
                  <h2 className="truncate text-lg sm:text-2xl font-bold tracking-tight">
                    {data.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-bold ring-1 ${status.pill}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                      {data.status}
                    </span>
                    <span className="rounded-full bg-white/10 backdrop-blur-md px-2.5 py-0.5 font-medium border border-white/10">
                      {data.gender}
                      {view.age !== null && ` · ${view.age} yrs`}
                    </span>
                    {data.packageType && (
                      <span className="rounded-full bg-white/10 backdrop-blur-md px-2.5 py-0.5 font-medium border border-white/10">
                        {data.packageType}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Call Actions */}
              <div className="mt-5 flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                <a
                  href={`tel:${data.mobileNo}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-3.5 py-2 text-xs font-bold text-emerald-800 shadow-sm transition hover:bg-emerald-50 active:scale-95"
                >
                  <FaPhoneAlt className="text-[10px]" /> Call
                </a>
                {view.waLink && (
                  <a
                    href={view.waLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-md px-3.5 py-2 text-xs font-bold text-white border border-white/20 transition hover:bg-white/20 active:scale-95"
                  >
                    <FaWhatsapp className="text-sm text-emerald-300" /> WhatsApp
                  </a>
                )}
                <span
                  className={`ml-auto inline-flex items-center gap-1.5 rounded-lg bg-emerald-950/40 px-3 py-1.5 text-xs font-medium text-emerald-200 backdrop-blur-md transition-opacity duration-300 ${
                    copiedMsg ? "opacity-100" : "opacity-0"
                  }`}
                  aria-live="polite"
                >
                  <FaCheck className="text-[10px] text-emerald-400" /> Copied to Clipboard
                </span>
              </div>
            </div>

            {/* ===== Navigation Tabs ===== */}
            <div className="sticky top-0 z-10 flex gap-1 overflow-x-auto border-b border-slate-200/80 bg-white/95 backdrop-blur-md px-3 scrollbar-none shrink-0">
              {TABS.map((t) => {
                const active = tab === t.key;
                return (
                  <button
                    key={t.key}
                    type="button"
                    onClick={() => setTab(t.key)}
                    className={`flex shrink-0 items-center gap-2 border-b-2 px-3.5 py-3 text-xs sm:text-sm font-semibold transition ${
                      active
                        ? "border-emerald-600 text-emerald-700"
                        : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    <span className={active ? "text-emerald-600" : "text-slate-400"}>
                      {t.icon}
                    </span>
                    {t.label}
                  </button>
                );
              })}
            </div>

            {/* ===== Content Body ===== */}
            <div className="flex-1 space-y-6 overflow-y-auto bg-white p-4 sm:p-6">
              {data.status === "REJECTED" && data.rejectReason && (
                <Alert tone="danger">
                  <span className="font-bold">Rejected: </span>
                  {data.rejectReason}
                </Alert>
              )}

              {tab === "overview" && (
                <>
                  <Group title="Personal Info" icon={<FaUser />}>
                    <Field label="Father's Name" value={data.fathersName} />
                    <Field label="Mother's Name" value={data.mothersName} />
                    <Field label="Date of Birth" value={formatDate(data.dob)} />
                    <Field label="Marital Status" value={data.maritalStatus} />
                    <Field label="Mobile Number" value={data.mobileNo} copy onCopied={onCopied} />
                    <Field label="WhatsApp" value={data.whatsappNo} copy onCopied={onCopied} />
                  </Group>

                  <Group title="Address Details" icon={<FaMapMarkerAlt />}>
                    <Field label="District" value={data.district} wide />
                    <Field label="Present Address" value={data.presentAddress} wide />
                    <Field label="Permanent Address" value={data.permanentAddress} wide />
                  </Group>

                  <Group title="Mahram Details" icon={<FaUserShield />}>
                    <Field label="Name" value={data.mahramName} />
                    <Field label="Relation" value={data.mahramRelation} />
                    <Field label="Mobile" value={data.mahramMobile} copy onCopied={onCopied} />
                    <Field label="Passport" value={data.mahramPassportNo} copy onCopied={onCopied} />
                  </Group>
                </>
              )}

              {tab === "documents" && (
                <>
                  {view.passportMonths !== null && view.passportMonths < 0 && (
                    <Alert tone="danger">
                      Passport-এর মেয়াদ শেষ হয়ে গেছে ({formatDate(data.passportExpiry)})।
                    </Alert>
                  )}
                  {view.passportMonths !== null &&
                    view.passportMonths >= 0 &&
                    view.passportMonths < 6 && (
                      <Alert tone="warn">
                        Passport-এ মাত্র {Math.max(Math.floor(view.passportMonths), 0)} মাস Validity আছে। হজ্জের জন্য কমপক্ষে ৬ মাস থাকা প্রয়োজন।
                      </Alert>
                    )}

                  <Group title="National Identity" icon={<FaIdCard />}>
                    <Field label="NID / Smart Card Number" value={data.nidNo} copy onCopied={onCopied} wide />
                  </Group>

                  <Group title="Passport Details" icon={<FaPassport />}>
                    <Field label="Passport No" value={data.passportNo} copy onCopied={onCopied} />
                    <Field label="Issue Place" value={data.passportIssuePlace} />
                    <Field label="Issue Date" value={formatDate(data.passportIssueDate)} />
                    <Field label="Expiry Date" value={formatDate(data.passportExpiry)} />
                  </Group>
                </>
              )}

              {tab === "health" && (
                <>
                  <Group title="Health Record" icon={<FaHeartbeat />}>
                    <Field label="Blood Group" value={data.bloodGroup} />
                    <Field
                      label="Meningitis Vaccine"
                      value={data.meningitisVaccine ? "Yes" : "No"}
                    />
                    <Field label="Medical Conditions" value={data.medicalConditions} wide />
                  </Group>

                  <Group title="Emergency Contact" icon={<FaPhoneAlt />}>
                    <Field label="Contact Person" value={data.emergencyContactName} />
                    <Field label="Relation" value={data.emergencyContactRelation} />
                    <Field label="Phone Number" value={data.emergencyContactPhone} copy onCopied={onCopied} wide />
                  </Group>

                  <Group title="Travel & Logistics" icon={<FaPlane />}>
                    <Field label="Travel Date" value={formatDate(data.travelDate)} />
                    <Field label="Room Preference" value={data.roomType} />
                    <Field label="Previous Hajj Experience" value={data.previousHajj ? "Yes" : "No"} />
                    <Field label="Special Assistance Needed" value={data.specialAssistance} />
                    <Field label="Additional Notes" value={data.notes} wide />
                  </Group>
                </>
              )}

              {tab === "payment" && (
                <>
                  {/* Payment Overview Card */}
                  <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-4 sm:p-5 shadow-sm">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Total Due
                        </p>
                        <p
                          className={`text-2xl sm:text-3xl font-black ${
                            view.due > 0 ? "text-rose-600" : "text-emerald-600"
                          }`}
                        >
                          ৳{view.due.toLocaleString()}
                        </p>
                      </div>
                      <p className="text-xs text-slate-500 font-medium">
                        <span className="font-bold text-slate-900">
                          ৳{view.paid.toLocaleString()}
                        </span>{" "}
                        / ৳{view.total.toLocaleString()}
                      </p>
                    </div>

                    <div
                      className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-200/80"
                      role="progressbar"
                      aria-valuenow={view.percent}
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          view.percent >= 100 ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                        style={{ width: `${view.percent}%` }}
                      />
                    </div>
                    <p className="mt-2 text-right text-xs font-semibold text-slate-500">
                      {view.percent >= 100
                        ? "সম্পূর্ণ অর্থ পরিশোধিত"
                        : `${view.percent}% পরিশোধিত`}
                    </p>
                  </div>

                  <Group title="Package & Payment Gateway" icon={<FaWallet />}>
                    <Field label="Package Selected" value={data.packageType} />
                    <Field label="Payment Method" value={data.paymentMethod} />
                    <Field label="Sender Number" value={data.paymentNumber} copy onCopied={onCopied} />
                    <Field label="Transaction ID" value={data.transactionId} copy onCopied={onCopied} />
                    <Field label="Referred By" value={data.referredBy} wide />
                  </Group>
                </>
              )}
            </div>

            {/* ===== Modal Footer ===== */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/60 px-5 py-3.5 shrink-0">
              <p className="text-[11px] font-medium text-slate-400">
                Registered: {formatDate(data.createdAt)}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-xl bg-slate-200/80 px-5 py-2 text-xs font-bold text-slate-700 transition hover:bg-slate-300 active:scale-95"
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}