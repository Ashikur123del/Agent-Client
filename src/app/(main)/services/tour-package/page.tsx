"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHome,
  FaGlobe,
  FaMapMarkedAlt,
  FaArrowRight,
  FaClock,
  FaUsers,
  FaStar,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaTree,
} from "react-icons/fa";
import ServiceHero from "../ServiceHero";

interface PackageItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  href: string;
  color: string;
}

type TourStep = string;

const packages: PackageItem[] = [
  {
    icon: FaHome,
    title: "Bangladesh Tour Package",
    desc: "Explore the beauty of Bangladesh – Cox's Bazar, Sylhet, Sundarbans, and more.",
    href: "/services/tour-package/bangladesh",
    color: "from-emerald-600 to-amber-600",
  },
  {
    icon: FaGlobe,
    title: "International Tour Package",
    desc: "International destinations – Thailand, Singapore, Malaysia, Turkey, Europe, and more.",
    href: "/services/tour-package/international",
    color: "from-amber-600 to-emerald-600",
  },
];

const features = [
  { icon: FaUmbrellaBeach, label: "Beach & Hill Tours" },
  { icon: FaMountain, label: "Adventure & Trekking" },
  { icon: FaCity, label: "City & Cultural Tours" },
  { icon: FaTree, label: "Nature & Wildlife" },
  { icon: FaUsers, label: "Group & Family Packages" },
  { icon: FaStar, label: "Custom Itineraries" },
];

const destinations = [
  { name: "Cox's Bazar", country: "Bangladesh" },
  { name: "Sylhet", country: "Bangladesh" },
  { name: "Bangkok", country: "Thailand" },
  { name: "Singapore", country: "Singapore" },
  { name: "Kuala Lumpur", country: "Malaysia" },
  { name: "Istanbul", country: "Turkey" },
  { name: "Dubai", country: "UAE" },
  { name: "London", country: "UK" },
];

const steps: TourStep[] = [
  "Choose your destination and dates",
  "Tell us your preferences",
  "We design a custom itinerary",
  "Confirm and pay",
  "Receive travel documents",
];

export default function TourPackagePage() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="Tour Packages"
        subtitle="Tour Services"
        icon={<FaMapMarkedAlt />}
        description="Discover the world with our carefully curated tour packages – from the stunning landscapes of Bangladesh to exotic international destinations. Custom itineraries for every budget and group size."
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
      />

      {/* =====================================================
          OVERVIEW SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        {/* Full Background Decorations */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
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
            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Explore The World
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
              Your Adventure,{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              Whether you want to explore the natural wonders of Bangladesh or
              jet off to iconic cities across the globe, we design tours that
              match your dreams. Our expert guides and local partners ensure an
              unforgettable experience.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-600" /> 200+ Tours Done
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaClock className="text-amber-500" /> Flexible Schedules
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaUsers className="text-emerald-600" /> 500+ Happy Travelers
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          PACKAGE CARDS
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Destinations
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Package
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {packages.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link href={item.href} key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -8 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg shadow-emerald-600/20 text-white transition-transform duration-300 group-hover:scale-110 mb-5`}
                      >
                        <Icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-base leading-relaxed text-slate-500">
                        {item.desc}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 transition-all duration-300 group-hover:gap-3 group-hover:text-emerald-600">
                        Explore <FaArrowRight className="h-4 w-4" />
                      </span>
                    </div>
                    {/* Hover Gradient Overlay */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT WE OFFER
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Service Types
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              What We{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Offer
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {features.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-bold text-slate-700">{item.label}</p>
                  {/* Hover Gradient */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          POPULAR DESTINATIONS
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Top Destinations
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Popular{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {destinations.map((dest, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.02 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="rounded-full border border-slate-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-emerald-300 hover:text-emerald-700 hover:shadow-md hover:shadow-emerald-100/50 cursor-default"
              >
                {dest.name}{" "}
                <span className="text-sm font-normal text-slate-400">
                  ({dest.country})
                </span>
              </motion.span>
            ))}
          </div>

          <p className="mt-8 text-center text-xs font-medium text-slate-400">
            * Many more destinations available – contact us for custom packages.
          </p>
        </div>
      </section>

      {/* =====================================================
          HOW TO BOOK
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Simple Steps
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
              How to{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Book
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col items-center text-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-amber-600 font-extrabold text-white text-sm mb-3 shadow-md shadow-emerald-600/20">
                  {index + 1}
                </div>
                <p className="text-sm font-semibold leading-relaxed text-slate-700">
                  {step}
                </p>
                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          STATS SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { value: "30+", title: "Destinations", desc: "Across the globe" },
              { value: "500+", title: "Happy Travelers", desc: "Satisfaction guaranteed" },
              { value: "100%", title: "Satisfaction", desc: "Customized tours" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="text-4xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <h4 className="text-lg font-bold text-slate-800">{stat.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{stat.desc}</p>
                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA SECTION
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
          <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 md:p-12"
          >
            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Get Started
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-5 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Ready for Your Next{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Adventure?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">
              Let us plan the perfect trip for you. Contact us today for a free consultation.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
              {/* Primary Button */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Plan My Trip
                <FaArrowRight className="h-4 w-4" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white/80 px-7 py-3.5 font-semibold text-emerald-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-md"
              >
                View All Services
                <FaArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs sm:text-sm font-medium text-slate-500 border-t border-slate-100 pt-6">
              <span className="flex items-center gap-2">
                <FaPhone className="text-emerald-600" /> +880 1714 544 877 (Office Number)
              </span>
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-600" /> www.modinahut.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}