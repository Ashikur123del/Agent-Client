"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaKaaba,
  FaAward,
  FaSmile,
  FaPlaneDeparture,
  FaClock,
} from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    label: "Pilgrims Served",
    value: 5000,
    suffix: "+",
  },
  {
    icon: FaKaaba,
    label: "Sacred Sites",
    value: 15,
    suffix: "+",
  },
  {
    icon: FaPlaneDeparture,
    label: "Packages Executed",
    value: 1200,
    suffix: "+",
  },
  {
    icon: FaAward,
    label: "Govt. Recognitions",
    value: 18,
    suffix: "",
  },
  {
    icon: FaSmile,
    label: "Satisfaction Rate",
    value: 99,
    suffix: "%",
  },
  {
    icon: FaClock,
    label: "Years of Trust",
    value: 12,
    suffix: "+",
  },
];

const Statistics = () => {
  const [counts, setCounts] = useState<number[]>(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const intervalTime = duration / steps;

    const intervals = stats.map((stat, index) => {
      let current = 0;
      const increment = stat.value / steps;

      const interval = setInterval(() => {
        current += increment;

        if (current >= stat.value) {
          current = stat.value;
          clearInterval(interval);
        }

        setCounts((prev) => {
          const updated = [...prev];
          updated[index] = Math.floor(current);
          return updated;
        });
      }, intervalTime);

      return interval;
    });

    return () => {
      intervals.forEach((interval) => {
        clearInterval(interval);
      });
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 py-16 md:py-24 lg:py-28">
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

        {/* Soft Radial Gradients */}
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
        {/* =====================================================
            HEADER
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          {/* Label */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="rounded-full bg-emerald-500/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Our Track Record
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl md:text-5xl">
            Pilgrimage{" "}
            <span className="bg-gradient-to-r from-emerald-700 via-amber-600 to-emerald-800 bg-clip-text text-transparent">
              Milestones
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            The figures that reflect our unwavering dedication to serving the guests of Allah with excellence and trust.
          </p>
        </motion.div>

        {/* =====================================================
            STATS GRID
        ====================================================== */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white/80 p-5 text-center shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:border-emerald-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-100/60 sm:p-6"
              >
                {/* =================================================
                    HOVER GRADIENT
                ================================================== */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.04] via-transparent to-amber-500/[0.05] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* =================================================
                    ICON
                ================================================== */}
                <motion.div
                  whileHover={{ rotate: 8, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-amber-200 bg-amber-50/80 shadow-sm transition-all duration-300 group-hover:border-emerald-300 group-hover:bg-emerald-50"
                >
                  <Icon className="h-7 w-7 text-amber-600 transition-colors duration-300 group-hover:text-emerald-600" />
                </motion.div>

                {/* =================================================
                    NUMBER
                ================================================== */}
                <div className="relative text-3xl font-extrabold text-slate-800 sm:text-4xl">
                  {counts[index]}
                  <span className="text-amber-500 font-bold ml-0.5">
                    {stat.suffix}
                  </span>
                </div>

                {/* =================================================
                    LABEL
                ================================================== */}
                <p className="relative mt-2 text-xs font-semibold text-slate-600 sm:text-sm">
                  {stat.label}
                </p>

                {/* =================================================
                    BOTTOM ACCENT
                ================================================== */}
                <div className="mx-auto mt-4 h-1 w-8 rounded-full bg-gradient-to-r from-emerald-500 to-amber-500 opacity-60 transition-all duration-300 group-hover:w-14 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>

        {/* =====================================================
            BOTTOM TEXT
        ====================================================== */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <p className="font-mono text-xs tracking-wide text-slate-400 sm:text-sm">
            * Statistics updated as of 2026
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Statistics;