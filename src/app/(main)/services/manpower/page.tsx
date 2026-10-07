"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaFileAlt,
  FaBriefcase,
  FaHandshake,
  FaCheckCircle,
  FaClock,
  FaGlobe,
  FaArrowRight,
  FaPassport,
  FaGraduationCap,
  FaStethoscope,
  FaShieldAlt,
  FaUserTie,
  FaBuilding,
  FaTools,
  FaHeartbeat,
  FaLaptop,
  FaUtensils,
  FaOilCan,
  FaChalkboardTeacher,
  FaShoppingCart,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";


const features = [
  {
    icon: FaUsers,
    title: "Manpower Services",
    desc: "Complete manpower service details and worker document processing for overseas employment.",
    href: "/services/manpower/details",
  },
  {
    icon: FaFileAlt,
    title: "Document Processing",
    desc: "We handle all worker documentation, verification, and attestation for international jobs.",
    href: "/services/manpower/details",
  },
  {
    icon: FaBriefcase,
    title: "Overseas Job Support",
    desc: "Connecting skilled and semi-skilled workers with international job opportunities.",
    href: "/services/manpower/details",
  },
  {
    icon: FaHandshake,
    title: "Client Consultation",
    desc: "Personalized consultation to understand your career goals and match you with the right employer.",
    href: "/services/manpower/details",
  },
];

const documents = [
  { icon: FaPassport, label: "Valid Passport (6+ months validity)" },
  { icon: FaGraduationCap, label: "Educational & Professional Certificates" },
  { icon: FaUserTie, label: "Work Experience Letters" },
  { icon: FaStethoscope, label: "Medical Fitness Report" },
  { icon: FaShieldAlt, label: "Police Clearance Certificate" },
  { icon: FaFileAlt, label: "Employment Contract (signed by employer)" },
];

const steps = [
  "Register & profile creation",
  "Document collection & verification",
  "Employer matching & interview",
  "Contract signing & attestation",
  "Visa processing & medical check",
  "Pre-departure orientation",
  "Travel & arrival support",
];

const countries = [
  "Saudi Arabia",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Malaysia",
  "Singapore",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
];

const sectors = [
  { icon: FaBuilding, label: "Construction & Infrastructure" },
  { icon: FaTools, label: "Manufacturing & Production" },
  { icon: FaHeartbeat, label: "Healthcare & Nursing" },
  { icon: FaLaptop, label: "Information Technology" },
  { icon: FaUtensils, label: "Hospitality & Tourism" },
  { icon: FaOilCan, label: "Oil & Gas" },
  { icon: FaChalkboardTeacher, label: "Education & Training" },
  { icon: FaShoppingCart, label: "Retail & Sales" },
];

export default function ManpowerPage() {
  return (
    <main className="bg-white">
      {/* HERO SECTION */}
      <ServiceHero
        title="Manpower Services"
        subtitle="Manpower"
        icon={<FaUsers />}
        description="Connecting skilled workers with international employers. We provide complete manpower solutions – from document processing and visa assistance to pre-departure training and job placement support."
        bgImage="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=1920&q=80"
      />

      {/* OVERVIEW SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 lg:py-28 border-b border-slate-100">
        {/* =====================================================
            BACKGROUND DECORATION (FeaturedTourPackages Glows)
        ====================================================== */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        {/* =====================================================
            DECORATIVE TRAVEL ROUTE SVG
        ====================================================== */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.15]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M -50 650 C 250 500, 350 750, 600 550 S 950 250, 1250 350"
            fill="none"
            stroke="#10B981"
            strokeWidth="2"
            strokeDasharray="2 14"
          />
          <circle cx="600" cy="550" r="5" fill="#10B981" />
          <circle cx="950" cy="350" r="5" fill="#F59E0B" />
        </svg>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                MANPOWER SOLUTIONS
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Building Global{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Careers
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base md:text-lg">
              We are dedicated to providing ethical and reliable manpower services
              that connect Bangladeshi workers with reputable employers worldwide.
              Our comprehensive process ensures that every worker is well-prepared,
              legally compliant, and supported throughout their employment journey.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-600" /> 95% Placement Rate
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaClock className="text-amber-600" /> 4-6 Weeks Processing
              </div>

              <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaGlobe className="text-emerald-600" /> 12+ Countries
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                SERVICES
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Manpower Services
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {features.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                      {item.href && (
                        <Link
                          href={item.href}
                          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                        >
                          Learn More →
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Feature Action Button matching FeaturedTourPackages style */}
                  <Link
                    href={item.href || "/contact"}
                    className="mt-6 block w-full rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 py-2.5 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
                  >
                    Explore Service
                  </Link>

                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REQUIRED DOCUMENTS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                CHECKLIST
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Required{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Documents
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {documents.map((doc, index) => {
              const Icon = doc.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {doc.label}
                  </h3>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROCESSING STEPS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                STEP BY STEP
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Our{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Process
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-md shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-extrabold text-emerald-700 text-sm">
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

      {/* COUNTRIES WE SERVE */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                GLOBAL NETWORK
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Countries We{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Serve
              </span>
            </h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {countries.map((country, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ y: -2 }}
                className="cursor-default rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md"
              >
                {country}
              </motion.span>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-slate-400 max-w-xl mx-auto">
            * We continuously expand our network to new countries based on demand.
          </p>
        </div>
      </section>

      {/* JOB SECTORS */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                INDUSTRIES
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600 sm:hidden" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Job{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Sectors
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {sectors.map((sector, idx) => {
              const Icon = sector.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -3 }}
                  className="group rounded-xl border border-emerald-200/80 bg-emerald-50/40 p-4 text-center shadow-sm transition-all hover:border-emerald-400 hover:bg-emerald-100/60"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 transition-transform group-hover:scale-110 mb-2">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-xs font-bold text-emerald-900 leading-tight">
                    {sector.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-2xl"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mb-2">95%</div>
              <h4 className="text-lg font-bold text-slate-900">Placement Rate</h4>
              <p className="text-sm text-slate-500 mt-1">Workers successfully placed</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-2xl"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mb-2">500+</div>
              <h4 className="text-lg font-bold text-slate-900">Workers Placed</h4>
              <p className="text-sm text-slate-500 mt-1">Since our inception</p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all hover:border-emerald-300 hover:shadow-2xl"
            >
              <div className="text-4xl font-extrabold bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text text-transparent mb-2">100+</div>
              <h4 className="text-lg font-bold text-slate-900">Employer Partners</h4>
              <p className="text-sm text-slate-500 mt-1">Global companies we work with</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24">
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-2xl shadow-emerald-100/40 md:p-12"
          >
            <span className="inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-emerald-700">
              Get Started Now
            </span>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ready to Build Your{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                International Career?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              Contact us today for a free career consultation and get started on your journey abroad.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Apply Now <FaArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services/manpower/details"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-200 bg-white/80 px-7 py-3.5 font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition-all hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-md"
              >
                View Details →
              </Link>
            </div>

            <p className="mt-6 text-sm text-slate-400 flex items-center justify-center gap-2">
              <FaHandshake className="text-emerald-600" /> Free consultation with our experts
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}