"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBriefcase,
  FaFileAlt,
  FaUserTie,
  FaClock,
  FaCheckCircle,
  FaGlobe,
  FaArrowRight,
  FaPassport,
  FaGraduationCap,
  FaStethoscope,
  FaShieldAlt,
  FaHandshake,
  FaChevronDown,
  FaBuilding,
  FaIdCard,
  FaStamp,
  FaAward,
  FaRegQuestionCircle,
  FaCheckDouble,
} from "react-icons/fa";
import ServiceHero from "../../ServiceHero";

// ===============================
// Key Features
// ===============================
const features = [
  {
    icon: FaBriefcase,
    title: "End-to-End Work Visa Support",
    desc: "Complete foreign employment processing, visa submission, and legal permit acquisition for Middle East, Asian, and European countries.",
  },
  {
    icon: FaFileAlt,
    title: "Document Attestation & Verification",
    desc: "Comprehensive support for educational certificate attestation, Ministry of Foreign Affairs (MOFA) authentication, and embassy legalizations.",
  },
  {
    icon: FaUserTie,
    title: "Sponsor & Employer Coordination",
    desc: "Direct liaison with foreign employers, HR agencies, and government labor portals (like Qiwa, Wared, or MoHRE) for smooth contract validation.",
  },
  {
    icon: FaClock,
    title: "Express & Regular Processing",
    desc: "Transparent processing timelines with real-time status updates, dedicated visa officers, and fast-track submission channels.",
  },
];

// ===============================
// Detailed Documents Checklist
// ===============================
const documents = [
  { 
    icon: FaPassport, 
    title: "Original Passport", 
    desc: "Must have at least 6 months validity with at least 2 consecutive blank pages available." 
  },
  { 
    icon: FaFileAlt, 
    title: "Signed Employment Contract", 
    desc: "Official offer letter or job contract legally attested by the host country's Ministry of Labor." 
  },
  { 
    icon: FaGraduationCap, 
    title: "Attested Academic Certificates", 
    desc: "Diplomas/Degrees verified by Education Board, Higher Education Commission, and MOFA." 
  },
  { 
    icon: FaStethoscope, 
    title: "GAMCA / Approved Medical Report", 
    desc: "Comprehensive health screening certificate from embassy-approved medical centers." 
  },
  { 
    icon: FaShieldAlt, 
    title: "Police Clearance Certificate", 
    desc: "Clean criminal record certificate issued by local police department with MOFA endorsement." 
  },
  { 
    icon: FaIdCard, 
    title: "Biometric & Photos", 
    desc: "Recent passport-size photographs with specific background colors according to embassy requirements." 
  },
];

// ===============================
// Detailed Processing Steps
// ===============================
const steps = [
  {
    step: "01",
    title: "Profile & Contract Assessment",
    desc: "We review your employment offer letter, verify sponsor credibility, and cross-check trade alignment.",
  },
  {
    step: "02",
    title: "Document Legalization & Attestation",
    desc: "Attestation of educational, professional, and personal certificates from required ministries and embassies.",
  },
  {
    step: "03",
    title: "Medical Checkup & Clearance",
    desc: "Scheduling appointment at GAMCA/Embassy-accredited medical centers for physical fitness reports.",
  },
  {
    step: "04",
    title: "Embassy Visa Submission",
    desc: "Filing application forms, submitting biometrics, and depositing physical passports to embassy visa section.",
  },
  {
    step: "05",
    title: "Visa Stamping & Manpower Clearance",
    desc: "Obtaining work visa sticker/e-visa and completing BMET / Bureau clearance protocols.",
  },
  {
    step: "06",
    title: "Pre-Departure & Ticket Support",
    desc: "Final document briefing, orientation session, and coordination for smooth arrival in destination country.",
  },
];

// ===============================
// Supported Countries & Tiers
// ===============================
const countryCategories = [
  {
    region: "Middle East (GCC)",
    list: ["Saudi Arabia", "United Arab Emirates", "Qatar", "Kuwait", "Bahrain", "Oman"],
  },
  {
    region: "Southeast Asia",
    list: ["Malaysia", "Singapore", "Japan", "South Korea"],
  },
  {
    region: "Europe & West",
    list: ["United Kingdom", "Romania", "Poland", "Croatia", "Canada"],
  },
];

// ===============================
// Job Sectors
// ===============================
const sectors = [
  "Construction & Civil Engineering",
  "Healthcare & Nursing",
  "Information Technology & Telecom",
  "Hospitality & Culinary Arts",
  "Manufacturing & Plant Assembly",
  "Oil, Gas & Energy Operations",
  "Education & Academic Training",
  "Retail & Logistics",
];

// ===============================
// FAQ List
// ===============================
const faqs = [
  {
    q: "How long does it usually take to get a Work Permit?",
    a: "Processing times vary depending on the destination country and trade sector. GCC work permits generally take 2 to 4 weeks, while European work visas may take 6 to 12 weeks including appointment slots and labor ministry approvals.",
  },
  {
    q: "Is medical screening compulsory for all work visas?",
    a: "Yes. Almost all countries require a certified medical fitness test (such as GAMCA for Gulf countries) to prove the applicant is free from contagious diseases and physically fit for employment.",
  },
  {
    q: "Can I bring my family along on a Work Visa?",
    a: "Initially, most work visas are processed for the employee only. Once you arrive, receive your resident permit (e.g., Iqama or Residence Card), and meet the minimum salary criteria, you can apply for family joining visas.",
  },
  {
    q: "What if my employer details or trade classification needs changes?",
    a: "Any changes to employment contracts or trade titles must be updated before final visa stamping. Our legal team coordinates with sponsors to ensure contract alignment with embassy specifications.",
  },
];

export default function WorkPermitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <main className="bg-white font-sans antialiased text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="Work Permit"
        subtitle="Global Overseas Employment Visa"
        icon={<FaBriefcase />}
        description="Launch your global career with hassle-free work visa processing. We manage end-to-end documentation, government authorizations, embassy clearances, and employer verification to secure your legitimate employment permit worldwide."
        bgImage="https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&q=80"
      />

      {/* =====================================================
          OVERVIEW SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                PROFESSIONAL WORK VISA SERVICES
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Turn Your International Job Offer Into A{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Legal Reality
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Navigating foreign labor regulations, embassy quotas, contract attestations, and government clearance protocols can be overwhelming. Whether you are an engineer moving to the Gulf, an IT professional heading to Europe, or a technician embarking on a new assignment, we ensure complete accuracy at every stage.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-600 h-4 w-4" />
                98% Verification Success Rate
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaClock className="text-amber-500 h-4 w-4" />
                Fast-Track Embassy Submissions
              </div>
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaGlobe className="text-emerald-600 h-4 w-4" />
                Authorized Employment Consultants
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          FEATURES SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                WHY WORK WITH US
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Complete Support for Your{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Overseas Transition
              </span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DETAILED REQUIRED DOCUMENTS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                DOCUMENTATION GUIDELINES
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Required Document{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Checklist
              </span>
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-sm leading-relaxed text-slate-600 sm:text-base">
              Preparing clean and authentic documentation is the most vital step to prevent work permit rejection.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-50 to-amber-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                    {doc.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-500">
                    {doc.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DETAILED PROCESSING TIMELINE / STEPS
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                WORKFLOW & TIMELINE
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Step-by-Step Work Visa{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-mono text-2xl font-black bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                </div>
                <h3 className="text-base font-bold text-slate-800 transition-colors group-hover:text-emerald-700">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          COUNTRIES & REGIONS
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                DESTINATIONS
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Regions & Countries We{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Service
              </span>
            </h2>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            {countryCategories.map((cat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50"
              >
                <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <FaGlobe className="text-emerald-600 h-5 w-5" />
                  <h3 className="text-base font-bold text-slate-800">{cat.region}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.list.map((c) => (
                    <span
                      key={c}
                      className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-100"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          INDUSTRIES & SECTORS
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                INDUSTRIES & TRADES
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Supported Job{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Sectors
              </span>
            </h2>
          </div>

          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-3">
            {sectors.map((sector, idx) => (
              <motion.div
                key={sector}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="flex items-center gap-2 rounded-xl border border-slate-200/80 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-amber-50 hover:text-emerald-900 hover:shadow-md"
              >
                <FaCheckDouble className="text-emerald-600 h-3.5 w-3.5" />
                {sector}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ ACCORDION SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                GOT QUESTIONS?
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl">
              Frequently Asked{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Questions
              </span>
            </h2>
          </div>

          <div className="mx-auto max-w-3xl space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-white overflow-hidden shadow-sm transition-all duration-200 hover:border-emerald-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-5 text-left font-bold text-slate-800 text-sm sm:text-base focus:outline-none"
                  >
                    <span className="flex items-center gap-3">
                      <FaRegQuestionCircle className="text-emerald-600 h-5 w-5 shrink-0" />
                      {faq.q}
                    </span>
                    <FaChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-emerald-600" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          DARK CTA SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 py-16 md:py-24 text-white">
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
                START YOUR JOURNEY
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-400 to-emerald-400" />
            </div>

            <h2 className="text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Ready to Accelerate Your{" "}
              <span className="block bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Work Permit Processing?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-base">
              Speak with our work permit specialists today for an initial document review and eligibility check.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl"
              >
                Apply For Work Permit
                <FaArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services/visa-processing"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/80 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-emerald-500 hover:bg-slate-800 hover:text-white"
              >
                Explore Other Visas →
              </Link>
            </div>

            <p className="mt-6 text-xs text-slate-400 flex items-center justify-center gap-2">
              <FaHandshake className="text-amber-400" /> Free eligibility check & document verification
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}