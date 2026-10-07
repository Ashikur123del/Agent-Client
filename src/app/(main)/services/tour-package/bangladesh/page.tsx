"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaHome,
  FaTree,
  FaMountain,
  FaShip,
  FaArrowRight,
  FaClock,
  FaUsers,
  FaPhone,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaUmbrellaBeach,
  FaFish,
  FaHiking,
  FaCamera,
} from "react-icons/fa";
import ServiceHero from "../../ServiceHero";

interface Destination {
  name: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
  bestTime: string;
  duration: string;
  highlights: string[];
}

type TourStep = string;

const destinations: Destination[] = [
  {
    name: "Cox's Bazar",
    desc: "World's longest natural sea beach with golden sands and vibrant sunset views.",
    icon: FaShip,
    bestTime: "November – February",
    duration: "2-3 days",
    highlights: ["Sea beach", "Himchari Waterfall", "Ramu Buddhist Temple"],
  },
  {
    name: "Sylhet",
    desc: "Tea gardens, rolling hills, and the beautiful Jaflong – the Switzerland of Bangladesh.",
    icon: FaTree,
    bestTime: "October – March",
    duration: "2-3 days",
    highlights: ["Tea gardens", "Jaflong", "Ratargul Swamp Forest"],
  },
  {
    name: "Sundarbans",
    desc: "Largest mangrove forest in the world, home to Royal Bengal Tigers and diverse wildlife.",
    icon: FaTree,
    bestTime: "November – March",
    duration: "2-4 days",
    highlights: ["Tiger spotting", "Crocodile sightings", "Village walks"],
  },
  {
    name: "Bandarban",
    desc: "Beautiful hill tracts with scenic waterfalls, tribal culture, and lush greenery.",
    icon: FaMountain,
    bestTime: "October – April",
    duration: "2-3 days",
    highlights: ["Boga Lake", "Nilgiri", "Tribal culture"],
  },
  {
    name: "Saint Martin",
    desc: "Coral island paradise with crystal-clear water, perfect for snorkeling and relaxation.",
    icon: FaShip,
    bestTime: "November – February",
    duration: "2-3 days",
    highlights: ["Snorkeling", "Coral reefs", "Sunset cruises"],
  },
  {
    name: "Sajek Valley",
    desc: "Queen of the hills – misty mountains, tribal villages, and breathtaking viewpoints.",
    icon: FaMountain,
    bestTime: "October – March",
    duration: "2-3 days",
    highlights: ["Misty sunrise", "Tribal homestays", "Hiking trails"],
  },
];

const packageHighlights: { icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { icon: FaUmbrellaBeach, label: "Beach & hill tours" },
  { icon: FaHiking, label: "Cultural experiences" },
  { icon: FaFish, label: "Local cuisine" },
  { icon: FaHiking, label: "Adventure activities" },
  { icon: FaCamera, label: "Photography spots" },
  { icon: FaUsers, label: "Group & family packages" },
];

const steps: TourStep[] = [
  "Choose your destination(s)",
  "Select dates and group size",
  "We create a custom itinerary",
  "Confirm and make payment",
  "Receive travel documents",
];

export default function BangladeshTourPage() {
  return (
    <main className="bg-white">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="Bangladesh Tour Package"
        subtitle="Tour Services"
        icon={<FaHome />}
        description="Explore the incredible beauty of Bangladesh – from the world's longest sea beach to lush tea gardens, dense mangrove forests, and majestic hill tracts. Custom packages available for families, couples, and groups."
        bgImage="https://images.unsplash.com/photo-1585409677983-0f6c41ca9c3b?w=1920&q=80"
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
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                Explore Bangladesh
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl md:text-6xl">
              Discover the{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Beauty of Bangladesh
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Bangladesh is a land of natural wonders – golden beaches, emerald
              hills, ancient forests, and vibrant cultures. Our curated tours
              let you experience the best of this beautiful country with comfort
              and safety.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-600 text-lg" /> 100+ Tours Completed
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaClock className="text-amber-500 text-lg" /> Flexible Itineraries
              </div>
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-2.5 text-base font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
                <FaUsers className="text-emerald-600 text-lg" /> 200+ Happy Travelers
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* =====================================================
          TOP DESTINATIONS
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
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                Top Spots
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Top{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {destinations.map((dest, index) => {
              const Icon = dest.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-amber-600 text-white shadow-lg shadow-emerald-600/20 transition-transform duration-300 group-hover:scale-110 flex-shrink-0">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                        {dest.name}
                      </h3>
                    </div>
                  </div>

                  <p className="text-slate-500 text-base mb-4 leading-relaxed">{dest.desc}</p>

                  <div className="space-y-3 text-base text-slate-700 flex-1 my-2">
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-emerald-600 flex-shrink-0 text-lg" />
                      <span>
                        Best Time:{" "}
                        <strong className="text-slate-800 font-semibold">{dest.bestTime}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock className="text-amber-500 flex-shrink-0 text-lg" />
                      <span>
                        Duration:{" "}
                        <strong className="text-slate-800 font-semibold">{dest.duration}</strong>
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {dest.highlights.map((hl, idx) => (
                        <span
                          key={idx}
                          className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 transition-colors group-hover:border-emerald-300 group-hover:bg-emerald-100"
                        >
                          {hl}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
                  >
                    Book Now <FaArrowRight className="h-4 w-4" />
                  </Link>

                  {/* Hover Gradient Overlay */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHAT'S INCLUDED
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
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                Features
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Whats{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Included
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {packageHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-7 w-7" />
                  </div>
                  <p className="text-base font-bold text-slate-800">{item.label}</p>
                  {/* Hover Gradient */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </motion.div>
              );
            })}
          </div>
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
            className="mx-auto mb-14 max-w-3xl text-center"
          >
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                Easy Process
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              How to{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Book
              </span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative flex flex-col items-center text-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-emerald-600 to-amber-600 font-extrabold text-white text-lg mb-4 shadow-md shadow-emerald-600/20">
                  {index + 1}
                </div>
                <p className="text-base font-semibold leading-snug text-slate-800">
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { value: "6+", title: "Destinations", desc: "Across Bangladesh" },
              { value: "200+", title: "Happy Travelers", desc: "Since 2026" },
              { value: "100%", title: "Satisfaction", desc: "Customized tours" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="text-5xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </div>
                <h4 className="text-xl font-bold text-slate-800">{stat.title}</h4>
                <p className="text-base text-slate-500 mt-1">{stat.desc}</p>
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
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-10 text-center shadow-lg shadow-slate-200/50 md:p-14"
          >
            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-4 py-1.5 text-sm font-bold uppercase tracking-[0.25em] text-amber-600">
                Get Started
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-5 text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Ready to Explore{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Bangladesh?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-slate-500 md:text-xl">
              Let us plan your perfect Bangladeshi adventure. Contact us today!
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              {/* Primary Button */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Book Now <FaArrowRight className="h-5 w-5" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/services/tour-package"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-white/80 px-8 py-4 text-base font-semibold text-emerald-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-md"
              >
                View All Tours
                <FaArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-8 text-base font-semibold text-slate-500 border-t border-slate-100 pt-8">
              <span className="flex items-center gap-2">
                <FaPhone className="text-emerald-600 text-lg" /> +880 1714 544 877 (Office Number)
              </span>
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-600 text-lg" /> www.modinahut.com
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}