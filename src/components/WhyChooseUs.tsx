"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaKaaba, FaHandHoldingHeart, FaUserShield, FaHotel } from "react-icons/fa";
import type { IconType } from "react-icons";

type Feature = {
  icon: IconType;
  code: string;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: FaKaaba,
    code: "GUIDE—01",
    title: "Experienced Moallem Guidance",
    description:
      "Complete Islamic guidance and step-by-step rituals performed under the supervision of experienced scholars.",
  },
  {
    icon: FaHotel,
    code: "STAY—02",
    title: "Premium Proximity Hotels",
    description:
      "Handpicked 3-star, 4-star, and 5-star accommodations situated within walking distance of Masjid al-Haram and Masjid an-Nabawi.",
  },
  {
    icon: FaHandHoldingHeart,
    code: "CARE—03",
    title: "End-to-End Pilgrimage Support",
    description:
      "Hassle-free visa processing, direct flight tickets, ground transportation, and 24/7 dedicated assistance in Saudi Arabia.",
  },
];

const WhyChooseUs: React.FC = () => {
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

        {/* Soft radial gradients */}
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
          MAIN CONTAINER
      ====================================================== */}
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-14 lg:flex-row lg:gap-20">
          {/* =================================================
              LEFT CONTENT
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            {/* Section Label */}
            <div className="mb-5 flex items-center gap-3 font-mono text-xs tracking-[0.3em]">
              <span className="h-px w-8 bg-gradient-to-r from-emerald-600 to-amber-500" />
              <span className="bg-gradient-to-r from-emerald-700 to-amber-600 bg-clip-text font-semibold text-transparent">
                MADINA TRAVELS · WHY CHOOSE US
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-[52px]">
              Why{" "}
              <span className="bg-gradient-to-r from-amber-600 via-emerald-600 to-amber-700 bg-clip-text text-transparent">
                Pilgrims
              </span>{" "}
              Trust
              <br />
              <span className="bg-gradient-to-r from-emerald-600 to-amber-600 bg-clip-text italic text-transparent">
                Madina Hajj & Umrah
              </span>
            </h2>

            {/* Description */}
            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
              We are dedicated to making your sacred journey seamless, spiritually fulfilling, and stress-free. From visa processing to close proximity hotels, we handle every detail with care.
            </p>

            {/* =================================================
                FEATURES
            ================================================== */}
            <div className="mt-10 space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;

                return (
                  <motion.div
                    key={feature.code}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    viewport={{ once: true }}
                    className="group relative flex items-stretch overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 shadow-lg shadow-slate-200/40 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/50"
                  >
                    {/* Left Ticket Area */}
                    <div className="relative flex w-24 flex-shrink-0 flex-col items-center justify-center gap-2 border-r border-dashed border-slate-200 py-5">
                      {/* Ticket Cutout Top */}
                      <span
                        aria-hidden="true"
                        className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-emerald-50"
                      />

                      {/* Ticket Cutout Bottom */}
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-emerald-50"
                      />

                      {/* Icon */}
                      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-200 bg-amber-50">
                        <Icon className="h-5 w-5 text-amber-600 transition-transform duration-300 group-hover:scale-110" />
                      </div>

                      {/* Code */}
                      <span className="font-mono text-[9px] tracking-[0.18em] text-slate-400">
                        {feature.code}
                      </span>
                    </div>

                    {/* Feature Content */}
                    <div className="flex-1 px-5 py-5 sm:px-6">
                      <h4 className="font-serif text-lg font-bold text-slate-800 transition-colors duration-300 group-hover:text-emerald-700">
                        {feature.title}
                      </h4>

                      <p className="mt-1 text-sm leading-relaxed text-slate-500 transition-colors duration-300 group-hover:text-slate-600">
                        {feature.description}
                      </p>
                    </div>

                    {/* Hover Gradient */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-500/[0.04] via-transparent to-amber-500/[0.04] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* =================================================
              RIGHT IMAGE
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.2,
            }}
            viewport={{ once: true }}
            className="w-full max-w-lg flex-1 lg:max-w-none"
          >
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-slate-300/40">
              {/* Image Container */}
              <div className="relative h-[300px] w-full overflow-hidden sm:h-[350px] md:h-[400px] lg:h-[460px]">
                <Image
                  src="https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1200&q=85"
                  alt="Holy Kaaba in Makkah, Saudi Arabia"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />

                {/* Image Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                {/* Emerald Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/10 via-transparent to-amber-600/10" />

                {/* =================================================
                    VERIFIED BADGE
                ================================================== */}
                <div className="absolute right-5 top-5 flex h-20 w-20 rotate-[-12deg] items-center justify-center rounded-full border-2 border-dashed border-amber-300 bg-emerald-950/40 backdrop-blur-md shadow-lg shadow-amber-500/20 transition-transform duration-300 hover:rotate-0">
                  <span className="text-center font-mono text-[9px] font-bold uppercase leading-tight tracking-wider text-amber-200 drop-shadow-md">
                    Govt. Reg
                    <br />
                    Approved
                    <br />
                    Agency
                  </span>
                </div>

                {/* Image Bottom Content */}
                <div className="absolute bottom-5 left-5">
                  <div className="mb-1 font-mono text-[9px] uppercase tracking-[0.3em] text-emerald-200">
                    Trusted Hajj & Umrah Partner
                  </div>

                  <div className="text-xl font-semibold text-white drop-shadow-lg">
                    Journey of a Lifetime
                  </div>
                </div>
              </div>

              {/* =================================================
                  INFORMATION BAR
              ================================================== */}
              <div className="grid grid-cols-3 divide-x divide-dashed divide-slate-200 rounded-b-2xl bg-white/90 px-2 backdrop-blur-xl">
                {[
                  {
                    label: "FROM",
                    value: "BANGLADESH",
                  },
                  {
                    label: "TO",
                    value: "MAKKAH & MADINA",
                  },
                  {
                    label: "STATUS",
                    value: "TRUSTED SERVICE",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="px-2 py-4 text-center sm:px-4"
                  >
                    <div className="font-mono text-[8px] tracking-[0.2em] text-slate-400 sm:text-[9px]">
                      {item.label}
                    </div>

                    <div
                      className={`mt-1 font-mono text-[10px] font-semibold tracking-wide sm:text-xs ${
                        item.label === "STATUS"
                          ? "text-amber-600"
                          : "text-emerald-700"
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="mt-4 flex items-center justify-between px-1 font-mono text-[9px] tracking-[0.2em] text-slate-400">
              <span>HOLY JOURNEY · 2026</span>

              <span className="text-emerald-600 font-semibold">
                ✦ MADINA TRAVELS
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;