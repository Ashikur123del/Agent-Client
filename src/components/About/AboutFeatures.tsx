"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaShieldAlt,
  FaKaaba,
  FaHandsHelping,
  FaHeadset,
  FaUserCheck,
  FaCertificate,
} from "react-icons/fa";

const features = [
  {
    icon: FaShieldAlt,
    title: "Authorized & Trusted",
    description:
      "Government-approved and ministry-certified Hajj & Umrah agency committed to total transparency, honesty, and Islamic ethics.",
    badge: "⭐ 4.9/5 Rating",
  },
  {
    icon: FaKaaba,
    title: "Close to Haram Stays",
    description:
      "We arrange premium 3-star, 4-star, and 5-star hotels within short walking distance of Masjid al-Haram and Masjid an-Nabawi.",
    badge: "Prime Location",
  },
  {
    icon: FaHandsHelping,
    title: "Experienced Moallem & Guide",
    description:
      "Scholarly and experienced guides lead every group to ensure all rituals of Hajj and Umrah are performed accurately according to the Sunnah.",
    badge: "Guided Spiritual Journeys",
  },
  {
    icon: FaHeadset,
    title: "24/7 Pilgrimage Support",
    description:
      "Dedicated ground support teams in Makkah, Madina, and Bangladesh are available round-the-clock to assist you throughout your journey.",
    badge: "Always Available",
  },
  {
    icon: FaUserCheck,
    title: "Customized Packages",
    description:
      "Tailor-made itineraries for families, groups, and individual pilgrims designed to fit specific schedules, preferences, and budgets.",
    badge: "Tailored Plans",
  },
  {
    icon: FaCertificate,
    title: "Hassle-Free Visa & Flights",
    description:
      "Complete end-to-end management including fast-track Umrah visa processing, direct flight bookings, and comfortable AC transport.",
    badge: "End-to-End Service",
  },
];

const AboutFeatures: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/50 via-white to-amber-50/40 py-16 md:py-24 lg:py-28">
      {/* =====================================================
          BACKGROUND DECORATION
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top Left Glow */}
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />

        {/* Right Glow */}
        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />

        {/* Bottom Glow */}
        <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />

        {/* Soft Radial Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>

      {/* =====================================================
          DECORATIVE TRAVEL ROUTE
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

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            SECTION HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Label */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Why Choose Us
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-emerald-500" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Reasons to{" "}
            <span className="bg-gradient-to-r from-emerald-700 via-amber-600 to-emerald-800 bg-clip-text text-transparent">
              Trust Madina Travels
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Dedicated to serving the guests of Allah with sincerity, comfort, and uncompromising devotion.
          </p>
        </motion.div>

        {/* =====================================================
            FEATURES GRID
        ====================================================== */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/60"
              >
                {/* Badge */}
                <div className="absolute right-4 top-4 rounded-full border border-amber-200/80 bg-amber-50 px-3 py-1">
                  <span className="text-xs font-semibold text-amber-700">
                    {feature.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-200 group-hover:bg-emerald-100/80">
                  <Icon className="h-7 w-7 text-emerald-600 transition-transform duration-300 group-hover:scale-110" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-slate-600 transition-colors duration-300 group-hover:text-slate-700">
                  {feature.description}
                </p>

                {/* Bottom Border Accent */}
                <div className="mt-5 h-px w-0 bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-500 group-hover:w-full" />

                {/* Hover Glow */}
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutFeatures;