"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaPassport,
  FaCamera,
  FaUniversity,
  FaPlane,
  FaHotel,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaDollarSign,
  FaHeadset,
  FaArrowRight,
  FaFileAlt,
  FaUserTie,
} from "react-icons/fa";

import ServiceHero from "../../ServiceHero";

// ===============================
// Required Documents
// ===============================
const documents = [
  { icon: FaPassport, label: "Valid Passport" },
  { icon: FaCamera, label: "Recent Passport-size Photo" },
  { icon: FaUniversity, label: "Bank Statement" },
  { icon: FaUserTie, label: "NID / Birth Certificate" },
  { icon: FaPlane, label: "Return Flight Booking" },
  { icon: FaHotel, label: "Hotel Booking Confirmation" },
];

// ===============================
// Processing Steps
// ===============================
const steps = [
  "Collect client documents",
  "Check document validity & completeness",
  "Prepare & review application",
  "Submit visa application",
  "Track processing status",
  "Deliver visa result to client",
];

// ===============================
// Supported Countries
// ===============================
const countries = [
  "Thailand",
  "Singapore",
  "Malaysia",
  "Turkey",
  "UAE",
  "Saudi Arabia",
  "UK",
  "USA",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Italy",
  "Switzerland",
  "Japan",
  "South Korea",
];

// ===============================
// Why Choose Us
// ===============================
const whyChooseUs = [
  {
    icon: FaCheckCircle,
    title: "Expert Guidance",
    desc: "Professional guidance throughout the visa application process.",
  },
  {
    icon: FaClock,
    title: "Fast Processing",
    desc: "We help prepare your documents properly to avoid unnecessary delays.",
  },
  {
    icon: FaDollarSign,
    title: "Transparent Pricing",
    desc: "Clear service charges with no unnecessary hidden costs.",
  },
  {
    icon: FaHeadset,
    title: "Dedicated Support",
    desc: "Get assistance and updates whenever you need them.",
  },
  {
    icon: FaFileAlt,
    title: "Document Assistance",
    desc: "We guide you through the required documents and application forms.",
  },
  {
    icon: FaGlobe,
    title: "Multiple Destinations",
    desc: "Tourist visa support for various popular travel destinations.",
  },
];

export default function TouristVisaPage() {
  return (
    <main className="bg-white font-sans antialiased text-slate-800">
      {/* HERO SECTION */}
      <ServiceHero
        title="Tourist Visa Processing"
        subtitle="Visa Services"
        icon={<FaPassport />}
        description="Complete tourist visa assistance with document guidance, application support, and professional consultation for your international journey."
        bgImage="https://images.unsplash.com/photo-1507608158173-1dcec673a2e5?w=1920&q=80"
      />

      {/* =====================================================
          OVERVIEW SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        {/* Background Ambient Glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            {/* Tag Line */}
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                TOURIST VISA ASSISTANCE
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Your Gateway to the{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                World
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Planning a leisure trip abroad? We make the tourist visa application process hassle-free by helping you prepare verified documents, meet requirements, and submit applications correctly.
            </p>

            {/* Feature Pills */}
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-600 h-4 w-4" />
                Professional Assistance
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaClock className="text-amber-500 h-4 w-4" />
                Fast Documentation
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaGlobe className="text-emerald-600 h-4 w-4" />
                Global Destinations
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          REQUIRED DOCUMENTS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                REQUIREMENTS
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Required{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Documents
              </span>
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base">
              Ensure you have all necessary documentation ready before initiating your tourist visa application.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group relative flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                    {doc.label}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESSING STEPS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                OUR WORKFLOW
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Step-by-Step{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Visa Processing
              </span>
            </h2>

            <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base">
              A transparent, streamlined process ensuring your application moves forward without delays.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-amber-600 font-extrabold text-sm text-white shadow-md shadow-emerald-600/20">
                  {index + 1}
                </div>
                <p className="text-xs font-semibold leading-relaxed text-slate-700 sm:text-sm">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          SUPPORTED COUNTRIES
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                DESTINATIONS
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Popular Supported{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Countries
              </span>
            </h2>
          </div>

          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-3">
            {countries.map((country, index) => (
              <motion.span
                key={country}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="cursor-default rounded-full border border-slate-200/80 bg-white px-5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 hover:shadow-md"
              >
                {country}
              </motion.span>
            ))}
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-xs text-slate-400">
            * Specific visa rules, document prerequisites, and processing timelines depend on destination regulation.
          </p>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                WHY CHOOSE US
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Our Professional{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Advantage
              </span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {whyChooseUs.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>

                  <h3 className="mt-4 text-base font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 py-16 md:py-24 text-white">
        {/* Glow Effects */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-400 to-amber-400" />
              <p className="bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text font-semibold uppercase text-transparent">
                START YOUR APPLICATION
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-400 to-emerald-400" />
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Ready to Apply for Your{" "}
              <span className="block bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Tourist Visa?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Get in touch with our visa consultants today for quick processing and expert support tailored to your journey.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl"
              >
                Apply Now
                <FaArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services/tour-package"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-emerald-500 hover:bg-slate-800 hover:text-white"
              >
                Explore Tour Packages
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}