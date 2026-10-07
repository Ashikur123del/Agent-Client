"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaKaaba,
} from "react-icons/fa";
import { GiCrescentStaff } from "react-icons/gi";

const AboutCTA = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50/60 via-white to-amber-50/40 py-16 md:py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[450px] w-[450px] rounded-full bg-emerald-200/30 blur-3xl" />

        <div className="absolute -right-32 top-1/4 h-[400px] w-[400px] rounded-full bg-amber-200/25 blur-3xl" />

        <div className="absolute bottom-[-180px] left-1/3 h-[450px] w-[450px] rounded-full bg-emerald-100/40 blur-3xl" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(16,185,129,0.08),transparent_30%),radial-gradient(circle_at_85%_70%,rgba(245,158,11,0.08),transparent_30%)]" />
      </div>
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

      <motion.div
        animate={{
          x: [0, 40, 0],
          y: [0, -15, 0],
          rotate: [0, 4, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute right-[8%] top-8 hidden text-7xl text-emerald-600/10 md:block"
      >
        <FaKaaba />
      </motion.div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-8 text-center shadow-2xl shadow-slate-200/60 backdrop-blur-xl md:p-12"
        >
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-emerald-400/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full bg-amber-400/10 blur-3xl" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-emerald-500/[0.03] via-transparent to-amber-500/[0.04]" />

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="relative mb-5 flex items-center justify-center gap-3"
          >
            <span className="h-px w-8 bg-gradient-to-r from-transparent to-emerald-500" />
            <span className="rounded-full border border-emerald-100 bg-emerald-50 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-emerald-700">
              Start Your Journey
            </span>
            <span className="h-px w-8 bg-gradient-to-l from-transparent to-amber-500" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative text-3xl font-extrabold text-slate-900 sm:text-4xl md:text-5xl"
          >
            Ready for Your Sacred{" "}
            <span className="bg-gradient-to-r from-emerald-700 via-amber-600 to-emerald-800 bg-clip-text text-transparent">
              Pilgrimage?
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg"
          >
            Let our experienced scholars and guides assist you with custom Hajj
            and Umrah packages. Perform your religious duties with peace of
            mind.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative mt-7 flex flex-wrap justify-center gap-3 text-sm"
          >
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-amber-300 hover:bg-amber-50 hover:text-slate-800">
              <FaPhone className="text-amber-500" />
              <span>+880 1714 544 877</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-slate-800">
              <FaWhatsapp className="text-emerald-600" />
              <span>+880 1714 544 877</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-slate-600 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-slate-800">
              <FaEnvelope className="text-emerald-600" />
              <span>www.modinahut.com</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-8 inline-block"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-700/20 transition-all duration-300 hover:from-emerald-700 hover:to-amber-700 hover:shadow-xl hover:shadow-emerald-700/30 md:text-lg"
            >
              Book Your Pilgrimage Now
              <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            viewport={{ once: true }}
            className="relative mt-5 flex items-center justify-center gap-2 text-xs text-slate-400"
          >
            <GiCrescentStaff className="text-lg text-amber-500" />
            <span>Free consultation &amp; visa guidance for pilgrims</span>
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutCTA;
