"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHospital,
  FaFileAlt,
  FaClock,
  FaUserMd,
  FaCheckCircle,
  FaGlobe,
  FaArrowRight,
  FaStethoscope,
  FaSyringe,
  FaHeartbeat,
  FaMicroscope,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";

const features = [
  {
    id: 1,
    icon: FaHospital,
    title: "Medical Test Guidance",
    desc: "Complete guidance for medical tests required for visa and travel. We help you understand which tests are needed and where to get them.",
    href: "/services/medical-service/documents",
  },
  {
    id: 2,
    icon: FaFileAlt,
    title: "Medical Documents",
    desc: "Assistance with all medical documentation and reports – from test results to health declarations and vaccination certificates.",
    href: "/services/medical-service/documents",
  },
  {
    id: 3,
    icon: FaClock,
    title: "Appointment Support",
    desc: "We help schedule medical appointments at partner clinics and ensure you get timely service without long waiting periods.",
    href: "/services/medical-service/documents",
  },
  {
    id: 4,
    icon: FaUserMd,
    title: "Report Collection",
    desc: "We assist with collecting, verifying, and submitting medical reports to embassies or employers as required.",
    href: "/services/medical-service/documents",
  },
];

const documents = [
  { icon: FaStethoscope, label: "Medical Test Reports (Visa-specific)" },
  { icon: FaSyringe, label: "Vaccination Certificate (COVID-19, etc.)" },
  { icon: FaHeartbeat, label: "Health Declaration Form" },
  { icon: FaMicroscope, label: "Laboratory Test Results" },
  { icon: FaFileAlt, label: "Medical Insurance Documents" },
  { icon: FaUserMd, label: "Doctor's Fitness Certificate" },
];

const steps = [
  "Consult with our medical team",
  "Schedule tests at partner clinics",
  "Complete required medical examinations",
  "Collect and verify test reports",
  "Submit documents to authorities",
  "Receive final medical clearance",
];

const clinics = [
  { name: "Dhaka Medical Center", location: "Dhaka, Bangladesh", services: "Full visa medical checkup" },
  { name: "Green Life Hospital", location: "Dhaka, Bangladesh", services: "Vaccinations & lab tests" },
  { name: "Chittagong Medical Center", location: "Chittagong, Bangladesh", services: "Pre-employment medical" },
  { name: "Sylhet Health Care", location: "Sylhet, Bangladesh", services: "Travel health consultation" },
  { name: "MediCare International", location: "Dhaka, Bangladesh", services: "Comprehensive health checkup" },
];

export default function MedicalServicePage() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="Medical Service"
        subtitle="Medical Services"
        icon={<FaHospital />}
        description="Comprehensive medical support for visa applications and travel requirements. From test guidance to document verification, we ensure your health paperwork is complete and compliant."
        bgImage="https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=1920&q=80"
      />

      {/* =====================================================
          OVERVIEW SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-40 top-1/4 h-[450px] w-[450px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Health & Compliance
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Your Health, Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Priority
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-500 md:text-lg">
              Medical examinations and health documentation are critical for visa
              approval and travel. We provide end-to-end medical service support
              – from scheduling appointments to delivering verified reports to
              embassies and employers.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <FaCheckCircle className="text-emerald-600" /> 100% Compliance
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <FaClock className="text-amber-500" /> Fast Turnaround
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm">
                <FaGlobe className="text-emerald-600" /> 5+ Partner Clinics
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          MEDICAL SERVICES SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                What We Offer
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Medical Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: item.id * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                      {item.href && (
                        <Link
                          href={item.href}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 transition-colors hover:text-emerald-600"
                        >
                          Learn More →
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          REQUIRED DOCUMENTS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Checklist
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Required{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Documents
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="group rounded-xl border border-slate-200/80 bg-white p-5 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform group-hover:scale-110 mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-xs font-bold text-slate-700 leading-snug">
                    {doc.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS STEPS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Simple Workflow
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-amber-600 font-extrabold text-white text-sm shadow-md">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-700">
                  {step}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          PARTNER CLINICS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Medical Network
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-amber-500" />
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Our Partner{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Clinics
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {clinics.map((clinic, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <FaHospital className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                      {clinic.name}
                    </h4>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">{clinic.location}</p>
                    <p className="text-xs text-emerald-700 font-medium mt-2 bg-emerald-50 px-2.5 py-1 rounded-md inline-block border border-emerald-100">
                      {clinic.services}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">
                100%
              </div>
              <h4 className="text-lg font-bold text-slate-800">Compliance Rate</h4>
              <p className="text-sm text-slate-500 mt-1">All documents meet standards</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">
                5+
              </div>
              <h4 className="text-lg font-bold text-slate-800">Partner Clinics</h4>
              <p className="text-sm text-slate-500 mt-1">Trusted medical centers</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">
                24h
              </div>
              <h4 className="text-lg font-bold text-slate-800">Fast Support</h4>
              <p className="text-sm text-slate-500 mt-1">Quick appointment scheduling</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CALL TO ACTION SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 md:p-12"
          >
            <span className="inline-block rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
              Need Help?
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Need Medical{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Assistance?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              Book your medical tests and documentation with us today. Fast, reliable, and hassle-free.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Book Appointment <FaArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/services/medical-service/documents"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white/80 px-7 py-3.5 font-semibold text-emerald-800 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900"
              >
                View Documents →
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-500 border-t border-slate-100 pt-6">
              <span className="flex items-center gap-2">
                <FaPhone className="text-emerald-600" /> +880 1884-694337
              </span>
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-600" /> akinaitravelsbd@gmail.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}