"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  FaUser,
  FaUserTie,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWallet,
  FaCamera,
  FaPaperPlane,
  FaWhatsapp,
  FaBuilding,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { createAgent } from "@/lib/serviceapi/agent/api";

const initialFormState = {
  name: "",
  fathersName: "",
  mobileNo: "",
  whatsAppNumber: "",
  bkashNumber: "",
  bankAccountNumber: "",
  presentAddress: "",
  permanentAddress: "",
  emergencyName: "",
  emergencyRelation: "",
  emergencyMobile: "",
  emergencyAddress: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const BecomeAgent: React.FC = () => {
  const router = useRouter();

  const [showBankAndBkash, setShowBankAndBkash] = useState<boolean>(true);
  const [formData, setFormData] = useState(initialFormState);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Clean up object URL to prevent memory leaks
  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
      setPhotoFile(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      toast.error("Password match kore nai");
      setLoading(false);
      return;
    }

    const payload = {
      ...formData,
      bkashNumber: showBankAndBkash ? formData.bkashNumber : "",
      bankAccountNumber: showBankAndBkash ? formData.bankAccountNumber : "",
    };

    try {
      const res = await createAgent({
        ...payload,
        photo: photoFile,
      });

      toast.success(res?.message || "Agent application submitted successfully!");

      setFormData(initialFormState);
      if (photoPreview) URL.revokeObjectURL(photoPreview);
      setPhotoFile(null);
      setPhotoPreview(null);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error: unknown) {
      const errMessage =
        error instanceof Error ? error.message : "Failed to submit registration";
      toast.error(errMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 text-center"
      >
        <div className="mb-2 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
          <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
          <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
            AGENT REGISTRATION
          </p>
          <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl md:text-4xl">
          Become an{" "}
          <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
            Agent
          </span>
        </h1>
        <p className="mt-2 text-xs text-slate-600 sm:text-sm">
          Please fill out all the fields below to complete your agent registration.
        </p>
      </motion.div>

      {/* Form Container */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSubmit}
        className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8"
      >
        {/* PERSONAL INFORMATION & PHOTO */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {/* Name */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FaUser className="text-emerald-600" /> Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Father's Name */}
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FaUserTie className="text-emerald-600" /> Father's Name
              </label>
              <input
                type="text"
                name="fathersName"
                value={formData.fathersName}
                onChange={handleChange}
                placeholder="Enter father's name"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            {/* Mobile No & WhatsApp Number */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FaPhoneAlt className="text-emerald-600" /> Mobile No
                </label>
                <input
                  type="tel"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="Mobile number"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                />
              </div>

              <div>
                <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                  <FaWhatsapp className="text-emerald-600 text-sm" /> WhatsApp Number
                </label>
                <input
                  type="tel"
                  name="whatsAppNumber"
                  value={formData.whatsAppNumber}
                  onChange={handleChange}
                  placeholder="WhatsApp number"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                />
              </div>
            </div>

            {/* Option to toggle Bank & Bkash details */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="showBankAndBkash"
                checked={showBankAndBkash}
                onChange={(e) => setShowBankAndBkash(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label htmlFor="showBankAndBkash" className="text-xs font-semibold text-slate-600">
                Include Payment / Bank Details
              </label>
            </div>

            {/* Bkash Number & Bank Account Number */}
            {showBankAndBkash && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <FaWallet className="text-amber-600" /> Bkash Number
                  </label>
                  <input
                    type="tel"
                    name="bkashNumber"
                    value={formData.bkashNumber}
                    onChange={handleChange}
                    placeholder="Bkash number"
                    required={showBankAndBkash}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  />
                </div>

                <div>
                  <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                    <FaBuilding className="text-emerald-600" /> Bank Account Number
                  </label>
                  <input
                    type="text"
                    name="bankAccountNumber"
                    value={formData.bankAccountNumber}
                    onChange={handleChange}
                    placeholder="Enter bank account no"
                    required={showBankAndBkash}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Photo Upload Section */}
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 bg-emerald-50/30 p-4 transition-colors hover:border-emerald-400">
            <div className="relative mb-3 flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl bg-white shadow-inner">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Photo Preview"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="text-center text-slate-400">
                  <FaCamera className="mx-auto mb-1 text-2xl text-amber-500" />
                  <span className="text-[10px] font-semibold text-slate-500">
                    PHOTO
                  </span>
                </div>
              )}
            </div>
            <label className="cursor-pointer rounded-full bg-gradient-to-r from-emerald-600 to-amber-600 px-4 py-1.5 text-xs font-bold text-white shadow-md transition-all hover:from-emerald-700 hover:to-amber-700">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* ACCOUNT CREDENTIALS */}
        <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/40 p-5 sm:p-6">
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-amber-800 sm:text-sm">
            Account Credentials
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FaEnvelope className="text-amber-600" /> Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="agent@example.com"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FaLock className="text-amber-600" /> Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min 6 characters"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-16 text-sm text-slate-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-amber-600">{showPassword ? "Hide" : "Show"}</button>
              </div>
            </div>
            <div>
              <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
                <FaLock className="text-amber-600" /> Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat password"
                  required
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pr-16 text-sm text-slate-800 outline-none transition-all focus:border-amber-500 focus:bg-white focus:ring-2 focus:ring-amber-200"
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-amber-600">{showConfirmPassword ? "Hide" : "Show"}</button>
              </div>
            </div>
          </div>
        </div>

        {/* ADDRESS INFORMATION */}
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <FaMapMarkerAlt className="text-amber-600" /> Present Address
            </label>
            <textarea
              name="presentAddress"
              rows={2}
              value={formData.presentAddress}
              onChange={handleChange}
              placeholder="Enter present address"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
            />
          </div>

          <div>
            <label className="mb-1.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <FaMapMarkerAlt className="text-amber-600" /> Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              rows={2}
              value={formData.permanentAddress}
              onChange={handleChange}
              placeholder="Enter permanent address"
              required
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:bg-white focus:ring-2 focus:ring-emerald-200"
            />
          </div>
        </div>

        {/* EMERGENCY CONTACT */}
        <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/40 p-5 sm:p-6">
          <h3 className="mb-4 text-xs font-extrabold uppercase tracking-wider text-emerald-800 sm:text-sm">
            Emergency Contact Details
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Name
              </label>
              <input
                type="text"
                name="emergencyName"
                value={formData.emergencyName}
                onChange={handleChange}
                placeholder="Emergency contact name"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Relation
              </label>
              <input
                type="text"
                name="emergencyRelation"
                value={formData.emergencyRelation}
                onChange={handleChange}
                placeholder="Relation (e.g. Father, Brother)"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Mobile No
              </label>
              <input
                type="tel"
                name="emergencyMobile"
                value={formData.emergencyMobile}
                onChange={handleChange}
                placeholder="Emergency mobile no"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-slate-700">
                Address
              </label>
              <input
                type="text"
                name="emergencyAddress"
                value={formData.emergencyAddress}
                onChange={handleChange}
                placeholder="Emergency contact address"
                required
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
              />
            </div>
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30 disabled:opacity-50"
        >
          <FaPaperPlane className="text-sm" />
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      </motion.form>
    </div>
  );
};

export default BecomeAgent;