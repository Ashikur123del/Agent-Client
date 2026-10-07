"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Agent, UpdateAgentInput } from "@/types/agent.type";
import { getMyAgentProfile, updateMyAgentProfile } from "@/lib/serviceapi/agent/api";
import {
  FaUser, FaPhone, FaWhatsapp, FaMoneyBillWave, FaUniversity, FaMapMarkerAlt,
  FaEdit, FaTimes, FaCopy, FaCheck, FaCamera,
  FaCheckCircle, FaHome, FaLifeRing,
} from "react-icons/fa";

interface MyProfileProps {
  initialData?: Agent;
}

type ToastState = { text: string; type: "success" | "error" } | null;

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

// Cloudinary URL, naki purono local path (public\uploads\x.jpg) - dui-i handle kore
function resolvePhoto(photo?: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
  const clean = photo.replace(/\\/g, "/").replace(/^\/+/, "").replace(/^public\//, "");
  return `${API_URL}/${clean}`;
}

// Edit form fields, grouped into sections
const FORM_SECTIONS: { title: string; fields: { name: keyof UpdateAgentInput; label: string }[] }[] = [
  {
    title: "Personal",
    fields: [
      { name: "name", label: "Name" },
      { name: "fathersName", label: "Father's Name" },
      { name: "mobileNo", label: "Mobile No (login number)" },
      { name: "whatsAppNumber", label: "WhatsApp" },
    ],
  },
  {
    title: "Payment",
    fields: [
      { name: "bkashNumber", label: "bKash Number" },
      { name: "bankAccountNumber", label: "Bank Account" },
    ],
  },
  {
    title: "Address",
    fields: [
      { name: "presentAddress", label: "Present Address" },
      { name: "permanentAddress", label: "Permanent Address" },
    ],
  },
  {
    title: "Emergency Contact",
    fields: [
      { name: "emergencyName", label: "Name" },
      { name: "emergencyRelation", label: "Relation" },
      { name: "emergencyMobile", label: "Mobile" },
      { name: "emergencyAddress", label: "Address" },
    ],
  },
];

const DIGIT_ONLY_FIELDS = ["mobileNo", "whatsAppNumber", "bkashNumber", "emergencyMobile"];

const COMPLETENESS_KEYS = [
  "photo", "fathersName", "mobileNo", "whatsAppNumber", "bkashNumber", "bankAccountNumber",
  "presentAddress", "permanentAddress", "emergencyName", "emergencyRelation",
  "emergencyMobile", "emergencyAddress",
];

const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20";

/* ---------- small pieces ---------- */

const CopyButton = ({ value, onCopied }: { value: string; onCopied: () => void }) => {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      aria-label="Copy"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          onCopied();
          setTimeout(() => setDone(false), 1500);
        } catch {}
      }}
      className="rounded-md p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-emerald-600"
    >
      {done ? <FaCheck className="text-emerald-600" /> : <FaCopy />}
    </button>
  );
};

const InfoRow = ({
  icon, iconBg, label, value, href, onCopied, copyable = true,
}: {
  icon: React.ReactNode; iconBg: string; label: string; value?: string | null;
  href?: string; onCopied?: () => void; copyable?: boolean;
}) => (
  <div className="flex items-center gap-3 py-3">
    <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base ${iconBg}`}>
      {icon}
    </span>
    <div className="min-w-0 flex-1">
      <p className="text-xs text-slate-500">{label}</p>
      {value ? (
        href ? (
          <a href={href} className="block truncate text-sm font-medium text-slate-900 hover:text-emerald-700 hover:underline">
            {value}
          </a>
        ) : (
          <p className="break-words text-sm font-medium text-slate-900">{value}</p>
        )
      ) : (
        <p className="text-sm italic text-slate-400">Not added</p>
      )}
    </div>
    {value && copyable && onCopied && <CopyButton value={value} onCopied={onCopied} />}
  </div>
);

const Card = ({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
    <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-slate-900">
      <span className="text-emerald-700">{icon}</span>
      {title}
    </h2>
    <div className="divide-y divide-slate-100">{children}</div>
  </section>
);

// Page background: soft tinted base + dot grid + blurred colour glows
const PageBackground = ({ children }: { children: React.ReactNode }) => (
  <div className="relative min-h-screen overflow-hidden bg-[#F2F6F4]">
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage: "radial-gradient(#0f6b5433 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        }}
      />
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-emerald-300/30 blur-3xl" />
      <div className="absolute -right-24 top-40 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl" />
      <div className="absolute -bottom-32 left-1/3 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl" />
    </div>
    <div className="relative">{children}</div>
  </div>
);

const Skeleton = () => (
  <PageBackground>
    <div className="mx-auto max-w-4xl animate-pulse space-y-4 px-4 py-8">
      <div className="h-48 rounded-2xl bg-slate-200" />
      <div className="grid gap-4 md:grid-cols-2">
        <div className="h-64 rounded-2xl bg-slate-200" />
        <div className="h-64 rounded-2xl bg-slate-200" />
      </div>
    </div>
  </PageBackground>
);

/* ---------- main ---------- */

const MyProfile = ({ initialData }: MyProfileProps) => {
  const [agent, setAgent] = useState<Agent | null>(initialData || null);
  const [dataLoading, setDataLoading] = useState<boolean>(!initialData);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editFormData, setEditFormData] = useState<UpdateAgentInput>({});
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [toast, setToast] = useState<ToastState>(null);

  const showToast = useCallback((text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
  }, []);

  // Auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Server theke nijer profile load (session cookie diye)
  useEffect(() => {
    if (initialData) return;
    let cancelled = false;

    (async () => {
      try {
        const me = await getMyAgentProfile();
        if (cancelled) return;
        setAgent(me);
        try {
          localStorage.setItem("agentData", JSON.stringify(me));
        } catch {}
      } catch (error) {
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : "Failed to load profile");
        }
      } finally {
        if (!cancelled) setDataLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [initialData]);

  // Populate form only when the edit modal opens
  useEffect(() => {
    if (isEditOpen && agent) {
      setEditFormData({ ...agent });
      setSelectedPhoto(null);
      setPhotoPreview(null);
    }
    // agent bad dewa hoyeche jeno typing er shomoy form reset na hoy
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditOpen]);

  // Esc to close + lock page scroll while modal is open
  useEffect(() => {
    if (!isEditOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !loading) setIsEditOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isEditOpen, loading]);

  // Free object URL
  useEffect(() => () => { if (photoPreview) URL.revokeObjectURL(photoPreview); }, [photoPreview]);

  const completeness = useMemo(() => {
    if (!agent) return 0;
    const filled = COMPLETENESS_KEYS.filter((k) => !!(agent as any)[k]).length;
    return Math.round((filled / COMPLETENESS_KEYS.length) * 100);
  }, [agent]);

  if (dataLoading) return <Skeleton />;

  if (!agent) {
    return (
      <PageBackground>
        <div className="mx-auto max-w-md px-4 py-16">
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl text-slate-400">
              <FaUser />
            </span>
            <p className="font-semibold text-slate-800">কোনো এজেন্ট প্রোফাইল পাওয়া যায়নি।</p>
            <p className="mt-1 text-sm text-slate-500">
              {loadError || "Log in again to load your profile."}
            </p>
            <a
              href="/login"
              className="mt-5 inline-block rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
            >
              Go to login
            </a>
          </div>
        </div>
      </PageBackground>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    const value = DIGIT_ONLY_FIELDS.includes(name)
      ? e.target.value.replace(/\D/g, "")
      : e.target.value;
    setEditFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      showToast("Shudhu chobi upload kora jabe", "error");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      showToast("Chobir size 2MB er kom hote hobe", "error");
      return;
    }
    setSelectedPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload: UpdateAgentInput = {
        ...editFormData,
        ...(selectedPhoto && { photo: selectedPhoto }),
      };
      const response = await updateMyAgentProfile(payload);
      const updated = response.updatedAgent;
      setAgent(updated);
      try {
        localStorage.setItem("agentData", JSON.stringify(updated));
      } catch {}
      setIsEditOpen(false);
      showToast(response.message || "প্রোফাইল সফলভাবে আপডেট হয়েছে!");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "আপডেট করতে ব্যর্থ হয়েছে", "error");
    } finally {
      setLoading(false);
    }
  };

  const copied = () => showToast("Copied");
  const waNumber = agent.whatsAppNumber?.replace(/\D/g, "");
  const agentPhoto = resolvePhoto(agent.photo);

  return (
    <PageBackground>
      <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 sm:py-10">
        {/* ===== Profile header ===== */}
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="h-24 bg-gradient-to-r from-emerald-800 to-teal-600 sm:h-28" />
          <div className="px-5 pb-6 sm:px-6">
            <div className="-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end gap-4">
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
                  {agentPhoto ? (
                    <Image src={agentPhoto} alt={agent.name} fill sizes="96px" unoptimized className="object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl text-slate-400">
                      <FaUser />
                    </div>
                  )}
                </div>
                <div className="pb-1">
                  <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">{agent.name}</h1>
                  <p className="text-sm text-slate-500">Father: {agent.fathersName || "Not added"}</p>
                </div>
              </div>

              {/* Agent shudhu edit korte pare, delete button nai */}
              <div className="flex gap-2">
                <button
                  onClick={() => setIsEditOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
                >
                  <FaEdit /> Edit profile
                </button>
              </div>
            </div>

            {/* Profile completeness */}
            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <div className="mb-2 flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 font-medium text-slate-700">
                  {completeness === 100 && <FaCheckCircle className="text-emerald-600" />}
                  {completeness === 100 ? "Profile complete" : "Profile completeness"}
                </span>
                <span className="font-semibold text-slate-900">{completeness}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-200" role="progressbar" aria-valuenow={completeness} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full rounded-full bg-emerald-600 transition-all duration-500" style={{ width: `${completeness}%` }} />
              </div>
              {completeness < 100 && (
                <p className="mt-2 text-xs text-slate-500">Edit your profile to add the missing details.</p>
              )}
            </div>
          </div>
        </section>

        {/* ===== Details ===== */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card title="Contact & payment" icon={<FaPhone />}>
            <InfoRow icon={<FaPhone />} iconBg="bg-blue-50 text-blue-600" label="Mobile" value={agent.mobileNo} href={agent.mobileNo ? `tel:${agent.mobileNo}` : undefined} onCopied={copied} />
            <InfoRow icon={<FaWhatsapp />} iconBg="bg-green-50 text-green-600" label="WhatsApp" value={agent.whatsAppNumber} href={waNumber ? `https://wa.me/${waNumber}` : undefined} onCopied={copied} />
            <InfoRow icon={<FaMoneyBillWave />} iconBg="bg-pink-50 text-pink-600" label="bKash" value={agent.bkashNumber} onCopied={copied} />
            <InfoRow icon={<FaUniversity />} iconBg="bg-indigo-50 text-indigo-600" label="Bank account" value={agent.bankAccountNumber} onCopied={copied} />
          </Card>

          <Card title="Address" icon={<FaMapMarkerAlt />}>
            <InfoRow icon={<FaMapMarkerAlt />} iconBg="bg-red-50 text-red-500" label="Present address" value={agent.presentAddress} copyable={false} />
            <InfoRow icon={<FaHome />} iconBg="bg-slate-100 text-slate-600" label="Permanent address" value={agent.permanentAddress} copyable={false} />
          </Card>
        </div>

        <Card title="Emergency contact" icon={<FaLifeRing />}>
          <div className="grid gap-x-6 sm:grid-cols-2 sm:divide-y-0">
            <InfoRow icon={<FaUser />} iconBg="bg-amber-50 text-amber-600" label="Name" value={agent.emergencyName} copyable={false} />
            <InfoRow icon={<FaUser />} iconBg="bg-amber-50 text-amber-600" label="Relation" value={agent.emergencyRelation} copyable={false} />
            <InfoRow icon={<FaPhone />} iconBg="bg-amber-50 text-amber-600" label="Mobile" value={agent.emergencyMobile} href={agent.emergencyMobile ? `tel:${agent.emergencyMobile}` : undefined} onCopied={copied} />
            <InfoRow icon={<FaMapMarkerAlt />} iconBg="bg-amber-50 text-amber-600" label="Address" value={agent.emergencyAddress} copyable={false} />
          </div>
        </Card>

        {/* ===== Edit modal ===== */}
        {isEditOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-slate-900/50 sm:items-center sm:p-4"
            onMouseDown={(e) => e.target === e.currentTarget && !loading && setIsEditOpen(false)}
          >
            <div role="dialog" aria-modal="true" aria-labelledby="edit-title" className="flex max-h-[92vh] w-full max-w-2xl flex-col rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
              <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 sm:px-6">
                <h2 id="edit-title" className="text-lg font-bold text-slate-900">Edit profile</h2>
                <button onClick={() => setIsEditOpen(false)} aria-label="Close" className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                  <FaTimes />
                </button>
              </div>

              <form onSubmit={handleUpdate} className="flex min-h-0 flex-1 flex-col">
                <div className="flex-1 space-y-6 overflow-y-auto px-5 py-5 sm:px-6">
                  {/* Photo */}
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
                      {photoPreview || agentPhoto ? (
                        <Image
                          src={(photoPreview || agentPhoto) as string}
                          alt={photoPreview ? "New profile photo preview" : agent.name}
                          fill
                          sizes="80px"
                          unoptimized
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-2xl text-slate-400"><FaUser /></div>
                      )}
                    </div>
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus-within:outline focus-within:outline-2 focus-within:outline-emerald-600">
                      <FaCamera /> Change photo
                      <input type="file" accept="image/*" onChange={handleFileChange} className="sr-only" />
                    </label>
                  </div>

                  {FORM_SECTIONS.map((section) => (
                    <fieldset key={section.title}>
                      <legend className="mb-3 text-sm font-semibold text-slate-900">{section.title}</legend>
                      <div className="grid gap-4 sm:grid-cols-2">
                        {section.fields.map((f) => (
                          <div key={f.name as string}>
                            <label htmlFor={f.name as string} className="mb-1 block text-xs font-medium text-slate-600">
                              {f.label}
                            </label>
                            <input
                              id={f.name as string}
                              type="text"
                              name={f.name as string}
                              value={(editFormData[f.name] as string) || ""}
                              onChange={handleInputChange}
                              required={["name", "fathersName", "mobileNo"].includes(f.name as string)}
                              className={inputCls}
                            />
                          </div>
                        ))}
                      </div>
                    </fieldset>
                  ))}

                  <p className="rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-800">
                    Mobile number bodlale porer bar notun number diye login korte hobe.
                  </p>
                </div>

                {/* Sticky footer so Save is always visible */}
                <div className="flex justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
                  <button type="button" onClick={() => setIsEditOpen(false)} disabled={loading} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading} className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60">
                    {loading ? "Saving..." : "Save changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ===== Toast ===== */}
        {toast && (
          <div
            role="status"
            aria-live="polite"
            className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
              toast.type === "success" ? "bg-emerald-700" : "bg-red-600"
            }`}
          >
            {toast.text}
          </div>
        )}
      </div>
    </PageBackground>
  );
};

export default MyProfile;