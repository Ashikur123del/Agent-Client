"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaUserTie,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaWallet,
  FaCamera,
  FaPaperPlane,
  FaTimes,
  FaHashtag,
  FaIdCard,
  FaPassport,
  FaHeartbeat,
  FaBoxes,
  FaUserShield,
  FaCalendarAlt,
  FaHome,
  FaBed,
  FaNotesMedical,
  FaPlane,
  FaSyringe,
  FaUserFriends,
} from "react-icons/fa";
import { toast } from "react-toastify";

import { createHajjah, getErrorMessage } from "@/lib/serviceapi/hajjah/api";
import type { HajjahFormInput } from "@/types/hajjah.type";

// =========================
// Initial form
// =========================
const initialFormData = {
  // Personal
  name: "",
  fathersName: "",
  mothersName: "",
  dob: "",
  gender: "Female",
  maritalStatus: "Married",
  nidNo: "",
  mobileNo: "",
  whatsappNo: "",
  district: "",
  presentAddress: "",
  permanentAddress: "",

  // Passport
  passportNo: "",
  passportIssueDate: "",
  passportExpiry: "",
  passportIssuePlace: "Dhaka",

  // Mahram
  mahramName: "",
  mahramRelation: "Husband",
  mahramMobile: "",
  mahramPassportNo: "",

  // Health & Emergency
  bloodGroup: "O+",
  medicalConditions: "",
  meningitisVaccine: false,
  emergencyContactName: "",
  emergencyContactRelation: "Relative",
  emergencyContactPhone: "",

  // Travel
  travelDate: "",
  roomType: "Quad",
  previousHajj: false,
  specialAssistance: "",
  notes: "",

  // Package & Payment
  packageType: "Economy",
  totalAmount: "",
  paidAmount: "",
  paymentMethod: "bKash",
  paymentNumber: "",
  transactionId: "",
  referredBy: "",

  // Consent (backend e pathano hoy na)
  agree: false,
};

type FormState = typeof initialFormData;
type FieldErrors = Partial<Record<keyof FormState, string>>;

// =========================
// Constants & helpers
// =========================
const BD_PHONE = /^01[3-9]\d{8}$/;
const NID_REGEX = /^(\d{10}|\d{13}|\d{17})$/;
const PASSPORT_REGEX = /^[A-Z]{1,2}\d{7,8}$/i;

const PHONE_FIELDS = [
  "mobileNo",
  "whatsappNo",
  "mahramMobile",
  "emergencyContactPhone",
  "paymentNumber",
];
const DIGIT_FIELDS = ["nidNo", "totalAmount", "paidAmount"];

const calcAge = (dob: string) => {
  if (!dob) return null;
  const d = new Date(dob);
  if (isNaN(d.getTime())) return null;
  const now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-700 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100";

const inputErrorClass =
  "w-full rounded-lg border border-red-400 bg-red-50 px-3 py-1.5 text-xs text-slate-700 outline-none transition focus:border-red-500 focus:ring-2 focus:ring-red-100";

const labelClass =
  "mb-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-slate-600";

const sectionTitleClass =
  "flex items-center gap-2 border-b border-slate-100 pb-2 text-sm font-bold text-slate-800";

const gridClass = "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4";

// Small wrapper to keep markup short
function Field({
  label,
  icon,
  className = "",
  error,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  className?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label className={labelClass}>
        {icon}
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-0.5 text-[10px] font-medium text-red-500">{error}</p>
      )}
    </div>
  );
}

function Section({
  title,
  icon,
  first,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  first?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section className={`${first ? "" : "mt-5"} space-y-3`}>
      <div className={sectionTitleClass}>
        {icon}
        <span>{title}</span>
      </div>
      {children}
    </section>
  );
}

// =========================
// Component
// =========================
export default function HajjahAdd() {
  const [formData, setFormData] = useState<FormState>(initialFormData);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const age = calcAge(formData.dob);
  const total = Number(formData.totalAmount) || 0;
  const paid = Number(formData.paidAmount) || 0;
  const due = Math.max(total - paid, 0);

  const fieldClass = (name: keyof FormState) =>
    errors[name] ? inputErrorClass : inputClass;

  // =========================
  // Handle Input
  // =========================
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name } = target;

    let finalVal: string | boolean = target.value;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      finalVal = target.checked;
    } else if (PHONE_FIELDS.includes(name) || DIGIT_FIELDS.includes(name)) {
      finalVal = target.value.replace(/\D/g, "");
    } else if (name === "passportNo") {
      finalVal = target.value.toUpperCase().replace(/[^A-Z0-9]/gi, "");
    }

    setFormData((prev) => ({ ...prev, [name]: finalVal }));

    // Clear error for this field when user types
    if (errors[name as keyof FormState]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormState];
        return next;
      });
    }
  };

  // =========================
  // Photo Upload
  // =========================
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return toast.error("Shudhu chobi (JPG, PNG) upload kora jabe");
    }
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Chobir size 2MB er kom hote hobe");
    }

    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const clearPhoto = () => {
    if (photoPreview) URL.revokeObjectURL(photoPreview);
    setPhotoFile(null);
    setPhotoPreview(null);
  };

  // =========================
  // Validation (returns errors object)
  // =========================
  const validateForm = (): FieldErrors => {
    const f = formData;
    const errs: FieldErrors = {};

    if (!f.name.trim()) errs.name = "Full Name dorkar";
    if (!f.fathersName.trim()) errs.fathersName = "Father's Name dorkar";
    if (!f.dob) errs.dob = "Date of Birth dorkar";
    else if (age !== null && age < 12) errs.dob = "Sothik Date of Birth din";

    if (!NID_REGEX.test(f.nidNo))
      errs.nidNo = "NID 10, 13 ba 17 digit hote hobe";

    if (!BD_PHONE.test(f.mobileNo))
      errs.mobileNo = "Sothik Mobile Number din (11 digits)";

    if (f.whatsappNo && !BD_PHONE.test(f.whatsappNo))
      errs.whatsappNo = "Sothik WhatsApp Number din";

    if (!f.presentAddress.trim()) errs.presentAddress = "Present Address dorkar";

    // Passport
    if (!PASSPORT_REGEX.test(f.passportNo))
      errs.passportNo = "Sothik Passport Number din (jemon A01234567)";

    if (!f.passportExpiry) errs.passportExpiry = "Passport Expiry Date dorkar";

    if (f.passportIssueDate && f.passportExpiry) {
      if (f.passportIssueDate >= f.passportExpiry) {
        errs.passportIssueDate = "Issue Date expiry er age hote hobe";
        errs.passportExpiry = "Expiry Date issue er pore hote hobe";
      }
    }

    // Passport min 6 months validity
    if (f.passportExpiry) {
      const base = f.travelDate ? new Date(f.travelDate) : new Date();
      const minExpiry = new Date(base);
      minExpiry.setMonth(minExpiry.getMonth() + 6);
      if (new Date(f.passportExpiry) < minExpiry) {
        errs.passportExpiry =
          "Passport e kom pokkhe 6 mash validity thakte hobe";
      }
    }

    // Mahram
    if (f.gender === "Female") {
      if (!f.mahramName.trim()) errs.mahramName = "Mahram er Name dorkar";
      if (!BD_PHONE.test(f.mahramMobile))
        errs.mahramMobile = "Mahram er sothik Mobile Number din";
    } else if (f.mahramMobile && !BD_PHONE.test(f.mahramMobile)) {
      errs.mahramMobile = "Mahram er sothik Mobile Number din";
    }

    // Emergency
    if (!f.emergencyContactName.trim())
      errs.emergencyContactName = "Emergency Contact Name dorkar";
    if (!BD_PHONE.test(f.emergencyContactPhone))
      errs.emergencyContactPhone = "Sothik Emergency Mobile Number din";
    else if (f.emergencyContactPhone === f.mobileNo)
      errs.emergencyContactPhone =
        "Emergency number nijer number theke alada hote hobe";

    // Payment
    if (total <= 0) errs.totalAmount = "Total Package Price din";
    if (paid > total) errs.paidAmount = "Paid total er beshi hote pare na";
    if (paid > 0 && f.paymentMethod !== "Cash") {
      if (!BD_PHONE.test(f.paymentNumber))
        errs.paymentNumber = "Sothik Payment Number din (11 digits)";
      if (!f.transactionId.trim()) errs.transactionId = "Transaction ID dorkar";
    }

    if (!f.agree) errs.agree = "Shorto o niyom e sommoti din";

    return errs;
  };

  // =========================
  // Submit (POST API only)
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    const errs = validateForm();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // First error message toast
      const firstMsg = Object.values(errs)[0];
      toast.error(firstMsg);

      // Scroll to first error field
      const firstKey = Object.keys(errs)[0];
      const el = document.querySelector(`[name="${firstKey}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const { agree, ...payload } = formData;
    void agree;

    setSubmitting(true);

    try {
      const res = await createHajjah(payload as HajjahFormInput, photoFile);

      toast.success(
        `Sl No ${res.newHajjah.slNo} Hajjah Registration shafol hoyeche! (Pending)`
      );

      setFormData({ ...initialFormData });
      clearPhoto();
      setErrors({});
    } catch (error) {
      toast.error(getErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  const showMahramWarning =
    formData.gender === "Female" && age !== null && age < 45;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-100/70 via-slate-50 to-amber-100/60 p-3 sm:p-4">
      <div className="mx-auto max-w-7xl space-y-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600">
            Hajjah Registration
          </p>
          <h1 className="mt-0.5 text-2xl font-extrabold text-slate-900 sm:text-3xl">
            Hajjah{" "}
            <span className="text-amber-600">Registration Portal</span>
          </h1>
          <p className="mt-1 text-[11px] text-slate-500">
            * chihnito ghor gulo obosshoy puron korun
          </p>
        </motion.div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="mx-auto rounded-2xl border border-white/80 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:p-5"
        >
          {/* ================= PERSONAL ================= */}
          <Section
            first
            title="Personal Details"
            icon={<FaUser className="text-emerald-600" />}
          >
            <div className={gridClass}>
              <Field
                label="Sl No"
                icon={<FaHashtag className="text-emerald-600" />}
              >
                <input
                  value="Auto"
                  readOnly
                  className={`${inputClass} bg-slate-100 font-semibold text-slate-500`}
                />
              </Field>

              <Field
                label="Full Name (as in passport) *"
                icon={<FaUser className="text-emerald-600" />}
                className="md:col-span-2"
                error={errors.name}
              >
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Passport er moto full name"
                  className={fieldClass("name")}
                />
              </Field>

              <Field
                label="Gender"
                icon={<FaUser className="text-emerald-600" />}
              >
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                </select>
              </Field>

              <Field
                label="Father's Name *"
                icon={<FaUserTie className="text-emerald-600" />}
                error={errors.fathersName}
              >
                <input
                  type="text"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleChange}
                  placeholder="Father's name"
                  className={fieldClass("fathersName")}
                />
              </Field>

              <Field
                label="Mother's Name"
                icon={<FaUser className="text-emerald-600" />}
              >
                <input
                  type="text"
                  name="mothersName"
                  value={formData.mothersName}
                  onChange={handleChange}
                  placeholder="Mother's name"
                  className={inputClass}
                />
              </Field>

              <Field
                label={`Date of Birth *${age !== null ? ` (Age: ${age})` : ""}`}
                icon={<FaCalendarAlt className="text-emerald-600" />}
                error={errors.dob}
              >
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  className={fieldClass("dob")}
                />
              </Field>

              <Field label="Marital Status">
                <select
                  name="maritalStatus"
                  value={formData.maritalStatus}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Married">Married</option>
                  <option value="Unmarried">Unmarried</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                </select>
              </Field>

              <Field
                label="NID / Smart Card No *"
                icon={<FaIdCard className="text-emerald-600" />}
                error={errors.nidNo}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  name="nidNo"
                  maxLength={17}
                  value={formData.nidNo}
                  onChange={handleChange}
                  placeholder="10 / 13 / 17 digit"
                  className={fieldClass("nidNo")}
                />
              </Field>

              <Field
                label="Mobile Number *"
                icon={<FaPhoneAlt className="text-emerald-600" />}
                error={errors.mobileNo}
              >
                <input
                  type="tel"
                  name="mobileNo"
                  maxLength={11}
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className={fieldClass("mobileNo")}
                />
              </Field>

              <Field
                label="WhatsApp Number"
                icon={<FaWhatsapp className="text-emerald-600" />}
                error={errors.whatsappNo}
              >
                <input
                  type="tel"
                  name="whatsappNo"
                  maxLength={11}
                  value={formData.whatsappNo}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className={fieldClass("whatsappNo")}
                />
              </Field>

              <Field
                label="District"
                icon={<FaMapMarkerAlt className="text-emerald-600" />}
              >
                <input
                  type="text"
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  placeholder="District"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <Field
                label="Present Address *"
                icon={<FaHome className="text-amber-600" />}
                error={errors.presentAddress}
              >
                <textarea
                  name="presentAddress"
                  rows={2}
                  value={formData.presentAddress}
                  onChange={handleChange}
                  placeholder="Present address"
                  className={`${fieldClass("presentAddress")} resize-none`}
                />
              </Field>

              <Field
                label="Permanent Address"
                icon={<FaHome className="text-amber-600" />}
              >
                <textarea
                  name="permanentAddress"
                  rows={2}
                  value={formData.permanentAddress}
                  onChange={handleChange}
                  placeholder="Permanent address"
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            {/* PHOTO */}
            <div className="flex items-center gap-4 rounded-xl border border-dashed border-emerald-300 bg-emerald-50/40 p-3">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white shadow-inner">
                {photoPreview ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={photoPreview}
                    alt="Hajjah Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="text-center text-slate-400">
                    <FaCamera className="mx-auto text-2xl text-amber-500" />
                    <span className="mt-1 block text-[8px] font-bold">
                      PHOTO
                    </span>
                  </div>
                )}

                {photoPreview && (
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="absolute right-1 top-1 rounded-full bg-black/60 p-1 text-[9px] text-white"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>

              <div>
                <p className="text-[10px] font-bold text-slate-700">
                  Hajjah Photo
                </p>
                <p className="mb-2 text-[9px] text-slate-400">
                  JPG / PNG • Maximum 2MB • Safed background
                </p>
                <label className="inline-flex cursor-pointer rounded-md bg-emerald-600 px-3 py-1.5 text-[10px] font-bold text-white hover:bg-emerald-700">
                  {photoPreview ? "Change Photo" : "Upload Photo"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </Section>

          {/* ================= PASSPORT ================= */}
          <Section
            title="Passport Details"
            icon={<FaPassport className="text-emerald-600" />}
          >
            <div className={gridClass}>
              <Field
                label="Passport Number *"
                icon={<FaPassport className="text-emerald-600" />}
                error={errors.passportNo}
              >
                <input
                  type="text"
                  name="passportNo"
                  maxLength={10}
                  value={formData.passportNo}
                  onChange={handleChange}
                  placeholder="A01234567"
                  className={fieldClass("passportNo")}
                />
              </Field>

              <Field
                label="Issue Date"
                error={errors.passportIssueDate}
              >
                <input
                  type="date"
                  name="passportIssueDate"
                  value={formData.passportIssueDate}
                  onChange={handleChange}
                  className={fieldClass("passportIssueDate")}
                />
              </Field>

              <Field
                label="Expiry Date * (min 6 mash validity)"
                error={errors.passportExpiry}
              >
                <input
                  type="date"
                  name="passportExpiry"
                  value={formData.passportExpiry}
                  onChange={handleChange}
                  className={fieldClass("passportExpiry")}
                />
              </Field>

              <Field label="Place of Issue">
                <input
                  type="text"
                  name="passportIssuePlace"
                  value={formData.passportIssuePlace}
                  onChange={handleChange}
                  placeholder="Dhaka"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* ================= MAHRAM ================= */}
          <Section
            title={`Mahram Details${
              formData.gender === "Female" ? " (Required)" : ""
            }`}
            icon={<FaUserShield className="text-emerald-600" />}
          >
            {showMahramWarning && (
              <p className="rounded-lg bg-amber-50 px-3 py-2 text-[11px] text-amber-800">
                45 bochorer kom boyoshi mohila hajjir jonno Mahram er shathe
                jaoa dorkar. Mahram er tothyo thik moto din.
              </p>
            )}

            <div className={gridClass}>
              <Field
                label={`Mahram Name${formData.gender === "Female" ? " *" : ""}`}
                icon={<FaUserShield className="text-emerald-600" />}
                error={errors.mahramName}
              >
                <input
                  type="text"
                  name="mahramName"
                  value={formData.mahramName}
                  onChange={handleChange}
                  placeholder="Mahram name"
                  className={fieldClass("mahramName")}
                />
              </Field>

              <Field label="Relationship">
                <select
                  name="mahramRelation"
                  value={formData.mahramRelation}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Husband">Husband</option>
                  <option value="Father">Father</option>
                  <option value="Son">Son</option>
                  <option value="Brother">Brother</option>
                  <option value="Other">Other</option>
                </select>
              </Field>

              <Field
                label={`Mahram Mobile${formData.gender === "Female" ? " *" : ""}`}
                icon={<FaPhoneAlt className="text-emerald-600" />}
                error={errors.mahramMobile}
              >
                <input
                  type="tel"
                  name="mahramMobile"
                  maxLength={11}
                  value={formData.mahramMobile}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className={fieldClass("mahramMobile")}
                />
              </Field>

              <Field
                label="Mahram Passport No"
                icon={<FaPassport className="text-emerald-600" />}
              >
                <input
                  type="text"
                  name="mahramPassportNo"
                  maxLength={10}
                  value={formData.mahramPassportNo}
                  onChange={(e) => {
                    setFormData((p) => ({
                      ...p,
                      mahramPassportNo: e.target.value
                        .toUpperCase()
                        .replace(/[^A-Z0-9]/g, ""),
                    }));
                  }}
                  placeholder="A01234567"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* ================= HEALTH & EMERGENCY ================= */}
          <Section
            title="Health & Emergency Contact"
            icon={<FaHeartbeat className="text-red-500" />}
          >
            <div className={gridClass}>
              <Field
                label="Blood Group"
                icon={<FaHeartbeat className="text-red-500" />}
              >
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
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
              </Field>

              <Field
                label="Medical Conditions"
                icon={<FaNotesMedical className="text-red-500" />}
                className="md:col-span-2"
              >
                <input
                  type="text"
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  placeholder="Diabetes, Blood Pressure, Asthma... (na thakle khali rakhun)"
                  className={inputClass}
                />
              </Field>

              <Field
                label="Meningitis Vaccine"
                icon={<FaSyringe className="text-red-500" />}
              >
                <label className="flex h-[30px] cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    name="meningitisVaccine"
                    checked={formData.meningitisVaccine}
                    onChange={handleChange}
                    className="accent-emerald-600"
                  />
                  Vaccine neya hoyeche
                </label>
              </Field>

              <Field
                label="Emergency Contact Name *"
                icon={<FaUserFriends className="text-emerald-600" />}
                error={errors.emergencyContactName}
              >
                <input
                  type="text"
                  name="emergencyContactName"
                  value={formData.emergencyContactName}
                  onChange={handleChange}
                  placeholder="Contact person"
                  className={fieldClass("emergencyContactName")}
                />
              </Field>

              <Field label="Emergency Relation">
                <select
                  name="emergencyContactRelation"
                  value={formData.emergencyContactRelation}
                  onChange={handleChange}
                  className={inputClass}
                >
                  {[
                    "Relative",
                    "Husband",
                    "Father",
                    "Son",
                    "Brother",
                    "Friend",
                    "Other",
                  ].map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Emergency Phone *"
                icon={<FaPhoneAlt className="text-emerald-600" />}
                error={errors.emergencyContactPhone}
              >
                <input
                  type="tel"
                  name="emergencyContactPhone"
                  maxLength={11}
                  value={formData.emergencyContactPhone}
                  onChange={handleChange}
                  placeholder="017XXXXXXXX"
                  className={fieldClass("emergencyContactPhone")}
                />
              </Field>
            </div>
          </Section>

          {/* ================= TRAVEL ================= */}
          <Section
            title="Travel & Accommodation"
            icon={<FaPlane className="text-blue-600" />}
          >
            <div className={gridClass}>
              <Field
                label="Travel Date (jodi thik thake)"
                icon={<FaCalendarAlt className="text-blue-600" />}
              >
                <input
                  type="date"
                  name="travelDate"
                  value={formData.travelDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>

              <Field
                label="Room Type"
                icon={<FaBed className="text-blue-600" />}
              >
                <select
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Quad">Quad Sharing</option>
                  <option value="Triple">Triple Sharing</option>
                  <option value="Double">Double Sharing</option>
                  <option value="Single">Single</option>
                </select>
              </Field>

              <Field label="Previous Hajj">
                <label className="flex h-[30px] cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-xs text-slate-700">
                  <input
                    type="checkbox"
                    name="previousHajj"
                    checked={formData.previousHajj}
                    onChange={handleChange}
                    className="accent-emerald-600"
                  />
                  Ager Hajj korechen
                </label>
              </Field>

              <Field label="Special Assistance">
                <input
                  type="text"
                  name="specialAssistance"
                  value={formData.specialAssistance}
                  onChange={handleChange}
                  placeholder="Wheelchair / Other"
                  className={inputClass}
                />
              </Field>

              <Field label="Notes" className="md:col-span-2 lg:col-span-4">
                <textarea
                  name="notes"
                  rows={2}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Additional notes..."
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>
          </Section>

          {/* ================= PACKAGE & PAYMENT ================= */}
          <Section
            title="Package & Payment"
            icon={<FaBoxes className="text-emerald-600" />}
          >
            <div className={gridClass}>
              <Field
                label="Package Type"
                icon={<FaBoxes className="text-emerald-600" />}
              >
                <select
                  name="packageType"
                  value={formData.packageType}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Economy">Economy</option>
                  <option value="Standard">Standard</option>
                  <option value="VIP / Executive">VIP / Executive</option>
                  <option value="Non-Shifting">Non-Shifting</option>
                </select>
              </Field>

              <Field
                label="Total Package Price (৳) *"
                error={errors.totalAmount}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  name="totalAmount"
                  value={formData.totalAmount}
                  onChange={handleChange}
                  placeholder="0"
                  className={fieldClass("totalAmount")}
                />
              </Field>

              <Field
                label="Paid Deposit (৳)"
                error={errors.paidAmount}
              >
                <input
                  type="text"
                  inputMode="numeric"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  placeholder="0"
                  className={fieldClass("paidAmount")}
                />
              </Field>

              <Field label="Due (৳)">
                <input
                  readOnly
                  value={due}
                  className={`${inputClass} bg-slate-100 font-semibold ${
                    due > 0 ? "text-red-600" : "text-emerald-600"
                  }`}
                />
              </Field>

              <Field
                label="Payment Method"
                icon={<FaWallet className="text-pink-600" />}
              >
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="bKash">bKash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Bank">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                </select>
              </Field>

              {formData.paymentMethod !== "Cash" && (
                <>
                  <Field
                    label="Payment Number"
                    error={errors.paymentNumber}
                  >
                    <input
                      type="tel"
                      name="paymentNumber"
                      maxLength={11}
                      value={formData.paymentNumber}
                      onChange={handleChange}
                      placeholder="017XXXXXXXX"
                      className={fieldClass("paymentNumber")}
                    />
                  </Field>

                  <Field
                    label="Transaction ID"
                    error={errors.transactionId}
                  >
                    <input
                      type="text"
                      name="transactionId"
                      value={formData.transactionId}
                      onChange={handleChange}
                      placeholder="TrxID"
                      className={fieldClass("transactionId")}
                    />
                  </Field>
                </>
              )}

              <Field label="Referred By (Agent / Staff)">
                <input
                  type="text"
                  name="referredBy"
                  value={formData.referredBy}
                  onChange={handleChange}
                  placeholder="Optional"
                  className={inputClass}
                />
              </Field>
            </div>
          </Section>

          {/* ================= SUBMIT ================= */}
          <div className="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label
              className={`flex cursor-pointer items-start gap-2 text-[11px] ${
                errors.agree ? "text-red-600" : "text-slate-600"
              }`}
            >
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className="mt-0.5 accent-emerald-600"
              />
              Ami ghoshona korchi je upore deya sob tothyo shothik ebong
              agency er shorto o niyom mene nilam.
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-600 to-amber-600 px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <FaPaperPlane className="text-[10px]" />
              {submitting ? "Submitting..." : "Complete Registration"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}