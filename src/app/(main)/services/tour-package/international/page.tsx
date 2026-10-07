"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaLandmark,
  FaBeer,
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
  FaHiking,
  FaCamera,
  FaUtensils,
  FaDollarSign,
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
    name: "Thailand",
    desc: "Beaches, temples, and vibrant nightlife – the land of smiles.",
    icon: FaBeer,
    bestTime: "November – March",
    duration: "5-7 days",
    highlights: ["Bangkok temples", "Phuket beaches", "Chiang Mai night market"],
  },
  {
    name: "Singapore",
    desc: "Modern city with futuristic gardens, luxury shopping, and world-class dining.",
    icon: FaLandmark,
    bestTime: "February – April",
    duration: "3-5 days",
    highlights: ["Marina Bay Sands", "Gardens by the Bay", "Sentosa Island"],
  },
  {
    name: "Malaysia",
    desc: "Cultural and natural diversity – from Kuala Lumpur's towers to Borneo's rainforests.",
    icon: FaTree,
    bestTime: "May – September",
    duration: "5-8 days",
    highlights: ["Petronas Towers", "Penang street food", "Borneo wildlife"],
  },
  {
    name: "Turkey",
    desc: "Historic Istanbul & fairy-tale Cappadocia – where East meets West.",
    icon: FaLandmark,
    bestTime: "April – October",
    duration: "6-10 days",
    highlights: ["Hagia Sophia", "Cappadocia balloons", "Bosphorus cruise"],
  },
  {
    name: "Switzerland",
    desc: "Alpine paradise with pristine lakes, snow-capped peaks, and charming villages.",
    icon: FaMountain,
    bestTime: "June – September",
    duration: "5-8 days",
    highlights: ["Jungfraujoch", "Lake Geneva", "Interlaken adventure"],
  },
  {
    name: "Maldives",
    desc: "Tropical island paradise – overwater bungalows and crystal-clear waters.",
    icon: FaShip,
    bestTime: "November – April",
    duration: "4-6 days",
    highlights: ["Snorkeling", "Sunset cruises", "Underwater dining"],
  },
];

const packageHighlights: { icon: React.ComponentType<{ className?: string }>; label: string }[] = [
  { icon: FaUmbrellaBeach, label: "Beach & Island Tours" },
  { icon: FaLandmark, label: "Cultural & Historic Sites" },
  { icon: FaUtensils, label: "Local Cuisine & Food Tours" },
  { icon: FaHiking, label: "Adventure & Nature" },
  { icon: FaCamera, label: "Photography Spots" },
  { icon: FaUsers, label: "Group & Family Packages" },
];

const steps: TourStep[] = [
  "Choose your destination(s)",
  "Select travel dates and group size",
  "We design a custom itinerary",
  "Confirm and secure booking",
  "Receive travel documents & guide",
];

const tips: string[] = [
  "Book flights at least 3 months ahead for best rates.",
  "Check visa requirements for each country.",
  "Pack light and versatile clothing.",
  "Get travel insurance for peace of mind.",
  "Learn a few local phrases – it helps!",
];

export default function InternationalTourPage() {
  return (
    <main className="bg-white text-slate-800">
      {/* =====================================================
          HERO SECTION
      ====================================================== */}
      <ServiceHero
        title="International Tour Package"
        subtitle="Tour Services"
        icon={<FaGlobe />}
        description="Explore the world with our curated international tours – from the beaches of Thailand to the mountains of Switzerland. Custom packages for families, couples, and groups."
        bgImage="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&q=80"
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
          <div className="max-w-4xl mx-auto text-center">
            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Explore The Globe
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Discover the{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                World
              </span>
            </h2>

            <p className="mt-4 text-slate-500 text-lg leading-relaxed">
              From vibrant Asian cities to European alpine villages, we bring
              you the best of international travel. Our expert guides and local
              partners ensure authentic experiences and seamless logistics.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <FaCheckCircle className="text-emerald-600" /> 50+ Tours Completed
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <FaClock className="text-amber-500" /> Flexible Itineraries
              </span>
              <span className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
                <FaUsers className="text-emerald-600" /> 300+ Happy Travelers
              </span>
            </div>
          </div>
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
          <div className="text-center mb-12">
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Handpicked Destinations
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
              Top{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Destinations
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {destinations.map((dest, index) => {
              const Icon = dest.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -8 }}
                  transition={{ delay: index * 0.08, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                          {dest.name}
                        </h3>
                        <p className="text-xs text-slate-500">{dest.desc}</p>
                      </div>
                    </div>

                    <div className="my-4 space-y-2.5 text-sm text-slate-600">
                      <div className="flex items-center gap-2">
                        <FaCalendarAlt className="flex-shrink-0 text-emerald-600" />
                        <span>
                          <strong className="text-slate-800">Best Time:</strong> {dest.bestTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaClock className="flex-shrink-0 text-amber-500" />
                        <span>
                          <strong className="text-slate-800">Duration:</strong> {dest.duration}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaDollarSign className="flex-shrink-0 text-emerald-600" />
                        <span>
                          <strong className="text-slate-800">Best Value Packages</strong>
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {dest.highlights.map((hl, idx) => (
                          <span
                            key={idx}
                            className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 transition-colors group-hover:border-emerald-300 group-hover:bg-emerald-100"
                          >
                            {hl}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Link
                    href="/contact"
                    className="mt-4 block w-full rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
                  >
                    Book Now
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
          <div className="text-center mb-12">
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Features
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Whats{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Included
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {packageHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -5 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{item.label}</p>
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
          <div className="text-center mb-12">
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Simple Steps
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              How to{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Book
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 text-sm font-bold text-white shadow-md shadow-emerald-600/20">
                  {index + 1}
                </div>
                <p className="text-sm font-medium text-slate-700">{step}</p>
                {/* Hover Gradient */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TRAVEL TIPS
      ====================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 border-b border-slate-100">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />
          <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Helpful Advice
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Essential{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Travel Tips
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.06 }}
                viewport={{ once: true }}
                whileHover={{ y: -3 }}
                className="group relative flex items-start gap-3 overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-100/60"
              >
                <span className="text-xl">💡</span>
                <p className="text-sm leading-relaxed text-slate-600">{tip}</p>
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
              { value: "30+", title: "Destinations", desc: "Worldwide" },
              { value: "300+", title: "Happy Travelers", desc: "Since 2026" },
              { value: "100%", title: "Satisfaction", desc: "Customized tours" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 transition-all duration-300 hover:border-emerald-300 hover:shadow-2xl hover:shadow-emerald-100/60"
              >
                <div className="mb-2 text-4xl font-extrabold bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <h4 className="text-lg font-bold text-slate-800">{stat.title}</h4>
                <p className="mt-1 text-sm text-slate-500">{stat.desc}</p>
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
          <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-8 text-center shadow-lg shadow-slate-200/50 md:p-12">
            {/* Label */}
            <div className="mb-4 flex items-center justify-center gap-3 font-mono text-xs tracking-[0.25em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.25em] text-amber-600">
                Get Started
              </span>
              <span className="h-px w-8 bg-gradient-to-r from-amber-500 to-emerald-600" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Ready to Explore the{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                World?
              </span>
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-500">
              Let us plan your dream international trip. Contact us today for a free consultation.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {/* Primary Button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-8 py-3.5 font-bold text-white shadow-lg shadow-emerald-600/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-600/30"
              >
                Book Now <FaArrowRight className="h-4 w-4" />
              </Link>

              {/* Secondary Button */}
              <Link
                href="/services/tour-package"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white/80 px-8 py-3.5 font-semibold text-emerald-800 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-900 hover:shadow-md"
              >
                View All Tours
                <FaArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-6 border-t border-slate-100 pt-6 text-sm font-medium text-slate-500">
              <span className="flex items-center gap-2">
                <FaPhone className="text-emerald-600" /> +880 1714 544 877 (Office)
              </span>
              <span className="flex items-center gap-2">
                <FaEnvelope className="text-emerald-600" /> www.modinahut.com
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}