"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaPassport,
  FaPlane,
  FaFileAlt,
  FaCheckCircle,
  FaUsers,
  FaGlobeAsia,
  FaClock,
  FaShieldAlt,
  FaArrowRight,
  FaHeadset,
  FaBriefcase,
  FaUmbrellaBeach,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";

const visaServices = [
  {
    icon: FaUmbrellaBeach,
    title: "Tourist Visa",
    description:
      "Professional tourist visa processing support for your international holiday and travel plans.",
    href: "/services/visa-processing/tourist-visa",
  },
  {
    icon: FaBriefcase,
    title: "Work Permit",
    description:
      "Complete work permit assistance including document preparation and application guidance.",
    href: "/services/visa-processing/work-permit",
  },
  {
    icon: FaPassport,
    title: "Visa Consultation",
    description:
      "Get expert guidance to understand visa requirements, eligibility, and application procedures.",
    href: "/contact",
  },
];

const processSteps = [
  {
    number: "01",
    icon: FaHeadset,
    title: "Free Consultation",
    description:
      "Discuss your travel purpose and destination with our experienced visa consultants.",
  },
  {
    number: "02",
    icon: FaFileAlt,
    title: "Document Preparation",
    description:
      "We help you prepare and organize the required documents for your visa application.",
  },
  {
    number: "03",
    icon: FaPassport,
    title: "Application Submission",
    description:
      "Your application is carefully checked and prepared for submission.",
  },
  {
    number: "04",
    icon: FaCheckCircle,
    title: "Visa Decision",
    description:
      "We keep you updated throughout the process until the visa decision is received.",
  },
];

const benefits = [
  {
    icon: FaShieldAlt,
    title: "Trusted Service",
    description:
      "Reliable and transparent visa processing support from experienced professionals.",
  },
  {
    icon: FaGlobeAsia,
    title: "Multiple Destinations",
    description:
      "Visa assistance for different countries and travel purposes.",
  },
  {
    icon: FaClock,
    title: "Time Saving",
    description:
      "We simplify the application process and help you avoid unnecessary delays.",
  },
  {
    icon: FaUsers,
    title: "Expert Support",
    description:
      "Our team provides personalized guidance based on your travel requirements.",
  },
];

const documents = [
  "Valid Passport",
  "Recent Passport Size Photograph",
  "National ID Card",
  "Bank Statement",
  "Travel Itinerary",
  "Hotel Booking",
  "Air Ticket / Reservation",
  "Employment or Business Documents",
];

export default function VisaProcessingPage() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO
      ====================================================== */}
      <ServiceHero
        title="Visa Processing"
        subtitle="Travel With Confidence"
        icon={<FaPassport />}
        description="Professional visa processing assistance for tourist, work, and other travel purposes. We make your visa journey easier, clearer, and more organized."
        bgImage="https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1920&q=80"
      />

      {/* =====================================================
          INTRODUCTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        {/* Background Decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.25em]">
                <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
                <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                  Visa Assistance
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
                Your Journey Starts With{" "}
                <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                  The Right Visa
                </span>
              </h2>

              <p className="mt-5 text-base leading-relaxed text-slate-600 md:text-lg">
                Applying for a visa can be confusing and time-consuming. Our
                professional visa processing team helps you understand the
                requirements and prepare your application properly.
              </p>

              <p className="mt-4 text-base leading-relaxed text-slate-500 md:text-lg">
                From tourist visas to work permits, we provide organized
                assistance so you can focus on planning your journey with
                confidence.
              </p>

              <Link
                href="/contact"
                className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Get Visa Assistance
                <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                {
                  icon: FaPassport,
                  value: "Visa",
                  label: "Processing Support",
                },
                {
                  icon: FaGlobeAsia,
                  value: "Multiple",
                  label: "Destinations",
                },
                {
                  icon: FaUsers,
                  value: "Expert",
                  label: "Consultation",
                },
                {
                  icon: FaShieldAlt,
                  value: "Trusted",
                  label: "Service",
                },
              ].map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    viewport={{ once: true }}
                    whileHover={{ y: -6 }}
                    className="rounded-2xl border border-slate-200/80 bg-white/80 p-6 text-center shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-colors duration-300 hover:border-emerald-300"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 text-emerald-600 border border-emerald-100/60">
                      <Icon className="h-7 w-7 text-emerald-600" />
                    </div>

                    <h3 className="mt-4 text-xl font-extrabold text-slate-900">
                      {item.value}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          VISA SERVICES
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                Our Visa Services
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl">
              Visa Solutions For{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Every Journey
              </span>
            </h2>

            <p className="mt-4 text-slate-500 md:text-lg">
              Choose the visa service that matches your travel purpose and let
              our team guide you through the process.
            </p>
          </motion.div>

          {/* Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {visaServices.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Link
                    href={service.href}
                    className="group block h-full"
                  >
                    <div className="relative h-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60">
                      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-50 blur-2xl transition-all duration-300 group-hover:bg-amber-100/60" />

                      <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100">
                        <Icon className="h-8 w-8 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      <h3 className="relative mt-6 text-xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-emerald-700">
                        {service.title}
                      </h3>

                      <p className="relative mt-3 text-sm leading-relaxed text-slate-500">
                        {service.description}
                      </p>

                      <div className="relative mt-6 flex items-center gap-2 text-sm font-semibold text-emerald-600 transition-colors duration-300 group-hover:text-amber-600">
                        Learn More
                        <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          PROCESS
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/40 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                How It Works
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Simple & Easy{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Visa Process
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  viewport={{ once: true }}
                  className="relative rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/40 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100">
                      <Icon className="h-6 w-6 text-emerald-600" />
                    </div>

                    <span className="text-3xl font-black text-slate-200">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          REQUIRED DOCUMENTS
      ====================================================== */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24 border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="mb-3 flex items-center gap-3 font-mono text-xs tracking-[0.25em]">
                <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
                <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                  Documents
                </p>
              </div>

              <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
                Prepare Your{" "}
                <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                  Required Documents
                </span>
              </h2>

              <p className="mt-4 text-base leading-relaxed text-slate-500 md:text-lg">
                Required documents may vary depending on the destination and
                visa type. Our team will guide you with the appropriate
                checklist for your application.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex items-center gap-2 font-semibold text-emerald-600 transition-colors hover:text-amber-600"
              >
                Ask About Documents
                <FaArrowRight />
              </Link>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            >
              {documents.map((document, index) => (
                <motion.div
                  key={document}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                  }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/60 p-4 transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50/40 shadow-sm"
                >
                  <FaCheckCircle className="h-5 w-5 flex-shrink-0 text-amber-500" />

                  <span className="text-sm font-medium text-slate-700">
                    {document}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE US
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-3 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <p className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold uppercase text-transparent">
                Why Choose Us
              </p>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-4 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Visa Processing With{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Confidence
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-lg shadow-slate-200/30 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/50"
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-50 to-amber-50 border border-emerald-100">
                    <Icon className="h-7 w-7 text-emerald-600" />
                  </div>

                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 py-16 md:py-20 text-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
        </div>

        <div className="container relative z-10 mx-auto px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <FaPlane className="mx-auto h-10 w-10 text-amber-500" />

            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              Ready to Start Your{" "}
              <span className="block bg-gradient-to-r from-amber-400 to-emerald-400 bg-clip-text text-transparent">
                Visa Journey?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              Contact our team today and get professional guidance for your
              visa application.
            </p>

            <Link
              href="/contact"
              className="group mt-7 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-900/40 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl"
            >
              Contact Us Today
              <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}