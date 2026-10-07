"use client";

import React, { useEffect, useState } from "react";
import {
  getHajjahById,
  updateHajjah,
  getErrorMessage,
  type Hajjah,
  type HajjahFormInput,
} from "@/lib/serviceapi/hajjah/api";
import { toast } from "react-toastify";
import {
  FaTimes,
  FaCamera,
  FaPaperPlane,
  FaUser,
  FaPassport,
  FaUsers,
  FaCreditCard,
  FaTrashAlt,
} from "react-icons/fa";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

function resolvePhoto(photo?: string | null): string | null {
  if (!photo) return null;
  if (photo.startsWith("http://") || photo.startsWith("https://")) return photo;
  return `${API_URL}/${photo.replace(/^\//, "")}`;
}

function toDateInput(value?: string | Date | null): string {
  if (!value) return "";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2 text-xs font-medium text-slate-800 transition duration-150 ease-in-out focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-emerald-500/10 hover:border-slate-300";

const labelClass =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-slate-500";

type FormState = {
  name: string;
  fathersName: string;
  mothersName: string;
  dob: string;
  gender: string;
  maritalStatus: string;
  nidNo: string;
  mobileNo: string;
  whatsappNo: string;
  district: string;
  presentAddress: string;
  permanentAddress: string;
  passportNo: string;
  passportIssueDate: string;
  passportExpiry: string;
  passportIssuePlace: string;
  mahramName: string;
  mahramRelation: string;
  mahramMobile: string;
  mahramPassportNo: string;
  bloodGroup: string;
  medicalConditions: string;
  meningitisVaccine: boolean;
  emergencyContactName: string;
  emergencyContactRelation: string;
  emergencyContactPhone: string;
  travelDate: string;
  roomType: string;
  previousHajj: boolean;
  specialAssistance: string;
  notes: string;
  packageType: string;
  totalAmount: string;
  paidAmount: string;
  paymentMethod: string;
  paymentNumber: string;
  transactionId: string;
  referredBy: string;
};

function mapHajjahToForm(h: Hajjah): FormState {
  return {
    name: h.name || "",
    fathersName: h.fathersName || "",
    mothersName: h.mothersName || "",
    dob: toDateInput(h.dob),
    gender: h.gender || "Female",
    maritalStatus: h.maritalStatus || "Married",
    nidNo: h.nidNo || "",
    mobileNo: h.mobileNo || "",
    whatsappNo: h.whatsappNo || "",
    district: h.district || "",
    presentAddress: h.presentAddress || "",
    permanentAddress: h.permanentAddress || "",
    passportNo: h.passportNo || "",
    passportIssueDate: toDateInput(h.passportIssueDate),
    passportExpiry: toDateInput(h.passportExpiry),
    passportIssuePlace: h.passportIssuePlace || "",
    mahramName: h.mahramName || "",
    mahramRelation: h.mahramRelation || "Husband",
    mahramMobile: h.mahramMobile || "",
    mahramPassportNo: h.mahramPassportNo || "",
    bloodGroup: h.bloodGroup || "O+",
    medicalConditions: h.medicalConditions || "",
    meningitisVaccine: !!h.meningitisVaccine,
    emergencyContactName: h.emergencyContactName || "",
    emergencyContactRelation: h.emergencyContactRelation || "Relative",
    emergencyContactPhone: h.emergencyContactPhone || "",
    travelDate: toDateInput(h.travelDate),
    roomType: h.roomType || "Quad",
    previousHajj: !!h.previousHajj,
    specialAssistance: h.specialAssistance || "",
    notes: h.notes || "",
    packageType: h.packageType || "Economy",
    totalAmount: String(h.totalAmount ?? ""),
    paidAmount: String(h.paidAmount ?? ""),
    paymentMethod: h.paymentMethod || "bKash",
    paymentNumber: h.paymentNumber || "",
    transactionId: h.transactionId || "",
    referredBy: h.referredBy || "",
  };
}

type Props = {
  hajjahId: string | null;
  onClose: () => void;
  onUpdated: () => void;
};

export default function HajjahEditModal({
  hajjahId,
  onClose,
  onUpdated,
}: Props) {
  const [form, setForm] = useState<FormState | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [existingPhoto, setExistingPhoto] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  useEffect(() => {
    if (!hajjahId) {
      setForm(null);
      setError(null);
      setPhotoFile(null);
      setPhotoPreview(null);
      setExistingPhoto(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    getHajjahById(hajjahId)
      .then((res) => {
        if (cancelled) return;
        setForm(mapHajjahToForm(res));
        setExistingPhoto(resolvePhoto(res.photo));
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (!form) return;
    const target = e.target;
    const { name } = target;

    let value: string | boolean = target.value;
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      value = target.checked;
    }

    setForm((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files allowed");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Max file size is 2MB");
      return;
    }
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const removeNewPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hajjahId || !form || saving) return;

    setSaving(true);
    try {
      const payload: Partial<HajjahFormInput> = {
        ...form,
        totalAmount: form.totalAmount as any,
        paidAmount: form.paidAmount as any,
      };

      await updateHajjah(hajjahId, payload, photoFile);
      toast.success("Hajjah updated successfully");
      onUpdated();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  };

  if (!hajjahId) return null;

  const displayPhoto = photoPreview || existingPhoto;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-900/10">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100/80 text-emerald-700">
              <FaUser className="text-base" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700 ring-1 ring-emerald-600/20">
                Edit Profile
              </span>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {form?.name || "Loading details..."}
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 transition hover:bg-slate-200/60 hover:text-slate-700"
          >
            <FaTimes className="text-sm" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />
              <p className="mt-3 text-xs font-medium">Fetching profile details...</p>
            </div>
          )}

          {error && (
            <div className="my-8 rounded-xl bg-red-50 p-4 text-center text-xs font-semibold text-red-600 ring-1 ring-red-100">
              {error}
            </div>
          )}

          {!loading && !error && form && (
            <form id="hajjah-edit-form" onSubmit={handleSubmit} className="space-y-6">
              
              {/* Photo Section */}
              <div className="flex items-center gap-5 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
                <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                  {displayPhoto ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={displayPhoto}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <FaCamera className="text-2xl text-slate-300" />
                  )}
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs font-semibold text-slate-800">Profile Picture</p>
                  <p className="text-[11px] text-slate-500">JPG, PNG or WEBP. Max size 2MB.</p>
                  <div className="flex items-center gap-2 pt-1">
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition shadow-sm hover:bg-emerald-700 active:scale-95">
                      <FaCamera className="text-[10px]" />
                      <span>{displayPhoto ? "Change Photo" : "Upload Photo"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhoto}
                      />
                    </label>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={removeNewPhoto}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-red-600"
                      >
                        <FaTrashAlt className="text-[10px]" />
                        <span>Remove New</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FaUser className="text-emerald-600" />
                  <span>Personal Details</span>
                </div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Father&apos;s Name *</label>
                    <input
                      name="fathersName"
                      value={form.fathersName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Mother&apos;s Name</label>
                    <input
                      name="mothersName"
                      value={form.mothersName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>DOB *</label>
                    <input
                      type="date"
                      name="dob"
                      value={form.dob}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Gender</label>
                    <select
                      name="gender"
                      value={form.gender}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Marital Status</label>
                    <select
                      name="maritalStatus"
                      value={form.maritalStatus}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Married">Married</option>
                      <option value="Unmarried">Unmarried</option>
                      <option value="Widowed">Widowed</option>
                      <option value="Divorced">Divorced</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>NID *</label>
                    <input
                      name="nidNo"
                      value={form.nidNo}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Mobile *</label>
                    <input
                      name="mobileNo"
                      value={form.mobileNo}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>WhatsApp</label>
                    <input
                      name="whatsappNo"
                      value={form.whatsappNo}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>District</label>
                    <input
                      name="district"
                      value={form.district}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <label className={labelClass}>Blood Group</label>
                    <select
                      name="bloodGroup"
                      value={form.bloodGroup}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(
                        (bg) => (
                          <option key={bg} value={bg}>
                            {bg}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Present Address *</label>
                    <textarea
                      name="presentAddress"
                      rows={2}
                      value={form.presentAddress}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                      required
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Permanent Address</label>
                    <textarea
                      name="permanentAddress"
                      rows={2}
                      value={form.permanentAddress}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Passport Details */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FaPassport className="text-emerald-600" />
                  <span>Passport Information</span>
                </div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className={labelClass}>Passport No *</label>
                    <input
                      name="passportNo"
                      value={form.passportNo}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Issue Date</label>
                    <input
                      type="date"
                      name="passportIssueDate"
                      value={form.passportIssueDate}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Expiry *</label>
                    <input
                      type="date"
                      name="passportExpiry"
                      value={form.passportExpiry}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Issue Place</label>
                    <input
                      name="passportIssuePlace"
                      value={form.passportIssuePlace}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Mahram & Emergency */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FaUsers className="text-emerald-600" />
                  <span>Mahram & Emergency Contact</span>
                </div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className={labelClass}>Mahram Name</label>
                    <input
                      name="mahramName"
                      value={form.mahramName}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Mahram Relation</label>
                    <select
                      name="mahramRelation"
                      value={form.mahramRelation}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Husband">Husband</option>
                      <option value="Father">Father</option>
                      <option value="Son">Son</option>
                      <option value="Brother">Brother</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Mahram Mobile</label>
                    <input
                      name="mahramMobile"
                      value={form.mahramMobile}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Mahram Passport</label>
                    <input
                      name="mahramPassportNo"
                      value={form.mahramPassportNo}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Emergency Name *</label>
                    <input
                      name="emergencyContactName"
                      value={form.emergencyContactName}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Emergency Relation *</label>
                    <select
                      name="emergencyContactRelation"
                      value={form.emergencyContactRelation}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Relative">Relative</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Parent">Parent</option>
                      <option value="Child">Child</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Friend">Friend</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Emergency Phone *</label>
                    <input
                      name="emergencyContactPhone"
                      value={form.emergencyContactPhone}
                      onChange={handleChange}
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Package & Payment */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FaCreditCard className="text-emerald-600" />
                  <span>Package & Payment</span>
                </div>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <label className={labelClass}>Package</label>
                    <select
                      name="packageType"
                      value={form.packageType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Standard">Standard</option>
                      <option value="VIP / Executive">VIP / Executive</option>
                      <option value="Non-Shifting">Non-Shifting</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Room Type</label>
                    <select
                      name="roomType"
                      value={form.roomType}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="Quad">Quad</option>
                      <option value="Triple">Triple</option>
                      <option value="Double">Double</option>
                      <option value="Single">Single</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Total Amount</label>
                    <input
                      name="totalAmount"
                      value={form.totalAmount}
                      onChange={handleChange}
                      className={inputClass}
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Paid Amount</label>
                    <input
                      name="paidAmount"
                      value={form.paidAmount}
                      onChange={handleChange}
                      className={inputClass}
                      inputMode="numeric"
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={form.paymentMethod}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="bKash">bKash</option>
                      <option value="Nagad">Nagad</option>
                      <option value="Bank">Bank</option>
                      <option value="Cash">Cash</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>Referred By</label>
                    <input
                      name="referredBy"
                      value={form.referredBy}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Notes</label>
                    <textarea
                      name="notes"
                      rows={2}
                      value={form.notes}
                      onChange={handleChange}
                      className={`${inputClass} resize-none`}
                    />
                  </div>
                </div>
              </div>

            </form>
          )}
        </div>

        {/* Footer */}
        {!loading && !error && form && (
          <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 active:scale-95"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="hajjah-edit-form"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-700 active:scale-95 disabled:opacity-60"
            >
              <FaPaperPlane className="text-[10px]" />
              <span>{saving ? "Saving Changes..." : "Save Changes"}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}